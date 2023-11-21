import Image from 'next/image'

interface ThImageLoaderProps {
  alt?: string
  src: string
  width?: number
  height?: number
  sizes?: string
  className?: string
  priority?: boolean
}

function ThImageLoader({
  alt = 'img-alt',
  src,
  width = 0,
  height = 0,
  className = '',
  priority = false,
}: ThImageLoaderProps) {
  const sizes = width === 0 && height === 0 ? '100vw' : ''

  return (
    <Image
      className={`${className}`}
      priority={priority}
      alt={alt}
      src={src}
      width={width}
      height={height}
      sizes={sizes}
    />
  )
}

export default ThImageLoader
