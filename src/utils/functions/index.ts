export function generateMarks({
  max,
  markToShow,
}: {
  max: number
  markToShow: number
}) {
  const step = max / (markToShow - 1)
  return Array.from({ length: markToShow }, (_, index) => ({
    value: Math.round(index * step),
    label: Math.round(index * step).toString(),
  }))
}
