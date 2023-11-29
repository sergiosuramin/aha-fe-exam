import { Grid } from '@mui/material'
import React, { ReactNode } from 'react'

interface FormLayoutProps {
  children: ReactNode
  className?: string
}

function ThFormLayout({ children, className }: FormLayoutProps) {
  const itemGrid = { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }

  // Wrap each child with a Grid item
  const childrenWithGridItem = React.Children.map(children, (child) => (
    <Grid item {...itemGrid} className="!tw-w-[100%] tw-my-1 tw-mx-0">
      {child}
    </Grid>
  ))

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      justifyContent="space-between"
      alignItems="stretch"
      className={className}
    >
      {childrenWithGridItem}
    </Grid>
  )
}

export default ThFormLayout
