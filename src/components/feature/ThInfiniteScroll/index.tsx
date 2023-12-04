import { useEffect, useRef } from 'react'

import { FriendInterface } from '@/models'

/**
 * This component is used as infinite scroll container.
 * This is not a layout, but more like a wrapper for any items that needs an infinite scroll.
 * But since infinite scroll feature usually involves a grid layout, it will appear as if it's a layout.
 *
 * What's in here:
 * Iteration for items that needs an infinite scroll
 * dynamic parentClassName and itemClassName
 *
 * What to do:
 * Insert your child component and desired classes as props.
 *
 * This InfiniteScroll component will be triggered if the item is fully visible to screen.
 * So if your pageSize query is small in such a way that makes the last item fully visibile,
 * infinite scroll will be triggered
 *
 * How to know if it is the last item?
 * This part: ref={index === data.length - 1 ? itemRef : null}
 */

interface InfiniteScrollProps {
  data: FriendInterface[]
  parentClassName?: string
  itemClassName?: string
  setNewLimit: () => void
  onItemClick?: (item: FriendInterface) => void
  children: (item: FriendInterface, index: number) => React.ReactNode
}

const ThInfiniteScroll = ({
  data,
  parentClassName = '',
  itemClassName = '',
  setNewLimit,
  onItemClick = () => {},
  children,
}: InfiniteScrollProps) => {
  const itemRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!itemRef?.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNewLimit()
          observer.unobserve(entry.target)
        }
      },
      { threshold: 1 }
    )

    const currentRef = itemRef.current // Create a local variable

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      // clean up to prevent memory leaks
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
    // only observes the data changes (occured after setNewLimit is triggered)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <div className={parentClassName}>
      {data.map((item, index) => (
        <div
          key={index}
          ref={index === data.length - 1 ? itemRef : null}
          onClick={() => onItemClick(item)}
          className={itemClassName}
        >
          {children(item, index)}
        </div>
      ))}
    </div>
  )
}

export default ThInfiniteScroll
