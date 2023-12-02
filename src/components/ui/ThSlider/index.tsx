import Slider from '@mui/material/Slider'

import { useScreenSize } from '@/context/MediaQuery'
import { generateSliderMarks } from '@/utils/functions'

interface SliderProps {
  value: number | number[] | 0
  onChange: (newValue: number | number[]) => void
  min?: number
  max?: number
}

function ariaValueText(value: number) {
  return `${value}`
}

export default function ThSllider({
  value,
  min = 1,
  max = 50,
  onChange,
}: SliderProps) {
  const { isExtraSmallScreen } = useScreenSize()

  const getMarkLabelStyle = (markValue: number) => {
    return {
      color: value === markValue ? 'white' : 'gray',
    }
  }

  const handleChange = (_event: Event, newValue: number | number[]) => {
    onChange(newValue)
  }

  const marker = isExtraSmallScreen
    ? generateSliderMarks({ max, markToShow: 3 })
    : generateSliderMarks({ max, markToShow: 6 })

  return (
    <Slider
      value={value}
      getAriaValueText={ariaValueText}
      step={1}
      valueLabelDisplay="auto"
      marks={marker.map((mark) => ({
        ...mark,
        label: (
          <span style={getMarkLabelStyle(mark.value)}>
            {ariaValueText(mark.value)}
          </span>
        ),
      }))}
      onChange={handleChange}
      min={min}
      max={max}
    />
  )
}
