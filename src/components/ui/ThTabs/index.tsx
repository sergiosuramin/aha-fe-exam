import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { useState, ReactNode } from 'react'

interface TabPanelProps {
  children?: ReactNode
  index: number
  value: number
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      className="tw-overflow-y-scroll tw-max-h-[95vh] tw-mb-8"
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3.5, pb: 3.5, pl: 2, pr: 2 }}>{children}</Box>
      )}
    </div>
  )
}

interface Tab {
  title: string
  component: ReactNode
}

interface TabsProps {
  tabs: Tab[]
}

export default function ThTabs({ tabs }: TabsProps) {
  const [value, setValue] = useState<number>(0)

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const getTabclassName = (index: number) => {
    if (index === value) return '!tw-text-white-500 tw-font-bold'
    else return ''
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          variant="fullWidth"
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              id={`tab-${index}`}
              label={tab.title}
              className={`${getTabclassName(
                index
              )} tw-normal-case tw-text-[1rem]`}
            />
          ))}
        </Tabs>
      </Box>

      {tabs.map((tab, index) => (
        <CustomTabPanel key={index} value={value} index={index}>
          {tab.component}
        </CustomTabPanel>
      ))}
    </Box>
  )
}
