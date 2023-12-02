import { useEffect, useRef } from 'react'

import { FriendInterface } from '@/models'

/**
 * This component is used as infinite scroll container.
 * This is not a layout, but more like a wrapper for any items that needs an infinite scroll.
 * But since infinite scroll feature usually involves a grid layout, It will look like it's a layout.
 *
 * What's in here:
 * Iteration of items which needs to have infinite scroll
 * dynamic parentClassName and itemClassName
 *
 * What to do:
 * Insert your child component and desired classes.
 *
 * Note:
 * Sometimes, items in a grid layout is interactive. (ex: "in the same page event" -> click to show in modal).
 * By then, we dont need to run the infinite scroll effect.
 *
 * Infinite Scroll will be triggered if the item is fully visible to screen.
 * So if your pageSize query is small in such a way that make all items visibile, infinite scroll will be triggered
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
    // only observer data changes (occured when setNewLimit is triggered)
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