'use client'
import { createTheme } from '@mui/material'

const OutlinedInputHeight = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputHeight = (props: any) => (props.multiline ? 'auto' : '60px')
  return inputHeight
}

declare module '@mui/material/styles' {
  interface TypographyVariants {
    display1: React.CSSProperties
    display2: React.CSSProperties
    subtitle1Reg: React.CSSProperties
    subtitle2Reg: React.CSSProperties
    textButton: React.CSSProperties
    textButtonDanger: React.CSSProperties
    caption1: React.CSSProperties
    caption2: React.CSSProperties
    labelBig: React.CSSProperties
    labelSmall: React.CSSProperties
    helperText: React.CSSProperties
  }

  interface TypographyVariantsOptions {
    display1?: React.CSSProperties
    display2?: React.CSSProperties
    subtitle1Reg?: React.CSSProperties
    subtitle2Reg?: React.CSSProperties
    textButton?: React.CSSProperties
    textButtonDanger?: React.CSSProperties
    caption1?: React.CSSProperties
    caption2?: React.CSSProperties
    labelBig?: React.CSSProperties
    labelSmall?: React.CSSProperties
    helperText?: React.CSSProperties
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    display1: true
    display2: true
    subtitle1Reg: true
    subtitle2Reg: true
    textButton: true
    textButtonDanger: true
    caption1: true
    caption2: true
    labelBig: true
    labelSmall: true
    helperText: true
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    primary: true
    secondary: true
  }
}

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 640, // default was 600
      md: 768, // default was 900
      lg: 1024, // default was 1200
      xl: 1440, // default was 1536
    },
  },
  components: {
    MuiButton: {
      //Button's Global Style
      //-------------------------------
      styleOverrides: {
        root: {
          fontSize: '14px',
          fontWeight: 700,
          lineHeight: '20px',
          letterSpacing: '2%',
          textTransform: 'none',
          borderRadius: '12px',
        },
      },
      //Create New Variants for Buttons
      //-------------------------------
      variants: [
        {
          props: { variant: 'primary' },
          style: {
            backgroundColor: '#FFF !important',
            color: '#000',
            width: '100%',
            height: '40px',
            boxShadow: 'none',
            border: '1px solid #FFF',
            transition: '0.3s',
            borderRadius: '3px !important',
            ':hover': {
              backgroundColor: '#121212 !important',
              boxShadow: 'none',
              color: '#fff !important',
              border: '1px solid #fff !important',
            },
            ':disabled': {
              borderColor: '#F3F6F9',
              color: 'black',
            },
          },
        },
        {
          props: { variant: 'secondary' },
          style: {
            borderColor: '#FFD05D',
            backgroundColor: 'transparent',
            color: '#FF9B33',
            width: '100%',
            height: '40px',
            boxShadow: 'none',
            border: '1px solid #FF9B33',
            transition: '0.3s',
            borderRadius: '3px !important',
            ':hover': {
              backgroundColor: '#FFF',
            },
            ':disabled': {
              borderColor: '#A0A5AB',
              color: '#A0A5AB',
            },
          },
        },
        {
          props: { variant: 'contained' },
          style: {
            backgroundColor: '#FFF !important',
            color: '#000',
            width: '100%',
            height: '29px',
            boxShadow: 'none',
            border: '1px solid #FFF',
            transition: '0.3s',
            borderRadius: '20px !important',
            ':hover': {
              backgroundColor: '#121212 !important',
              boxShadow: 'none',
              color: '#fff !important',
              border: '1px solid #fff !important',
            },
            ':disabled': {
              borderColor: '#F3F6F9',
              color: 'white',
            },
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            backgroundColor: '#121212 !important',
            color: '#FFF',
            width: '100%',
            height: '29px',
            boxShadow: 'none',
            border: '1px solid #FFF',
            transition: '0.3s',
            borderRadius: '20px !important',
            ':hover': {
              backgroundColor: '#FFF !important',
              boxShadow: 'none',
              color: '#000 !important',
              border: '1px solid #fff !important',
            },
            ':disabled': {
              borderColor: '#F3F6F9',
              color: 'white',
            },
          },
        },
      ],
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          height: `${OutlinedInputHeight}`,
          // Customize the root style of outlined TextField
          borderRadius: '6px',
          color: 'white',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.5) !important', // White 50% on normal
            borderWidth: '3px',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white !important', // White 100% on hover
            borderWidth: '3px',
          },
          '&:focus-within .MuiOutlinedInput-notchedOutline': {
            borderColor: '#FF9B33 !important', // Primary color on focus
            borderWidth: '3px',
          },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: '#cf1c0c !important', // Red color for error state
          },
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgb(249 250 251 / 0.05) !important',
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        rail: {
          backgroundColor: 'white !important',
          borderWidth: '4px !important',
        },
        track: {
          background: 'linear-gradient(to right, #FF5C01, #FFD25F) !important',
          border: '#FFD25F',
          height: '9px !important',
        },
        mark: {
          backgroundColor: 'transparent !important',
        },
        markLabel: {
          color: 'white',
          fontSize: '14px !important',
        },
        thumb: {
          width: '24px',
          height: '24px',
          background: '#181818 !important',
          borderWidth: '6px',
          borderColor: '#FFD25F !important',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: '#FFF',
        },
        root: {
          paddingTop: '1.25rem !important',
          selected: {
            color: '#FFF !important',
            fontWeight: '700',
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: '#929292 !important',
        },
      },
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF9B33', // Primary color
      light: '#fdbb75',
      dark: '#ffac56',
      contrastText: '#fff',
    },
    secondary: {
      main: '#FFD05D', // Secondary color
      light: '#FFD05D',
      dark: '#ffd672',
      contrastText: '#fff',
    },
    error: {
      main: '#cf1c0c',
      light: '#e57373',
      dark: '#d32f2f',
      contrastText: '#fff',
    },
    // Add more custom colors as needed
  },
  //Added New Variants and Edited Current Variants for Texts Variants
  //----------------------------------------------------------------------
  typography: {
    fontFamily: '__Ubuntu_5449ac',
    display1: {
      fontSize: '48px',
      lineHeight: '60px',
      color: 'white',
    },
    display2: {
      fontSize: '32px',
      lineHeight: '48px',
      color: 'white',
    },
    h1: {
      fontSize: '24px',
      // fontWeight: 700,
      lineHeight: '36px',
      color: 'white',
    },
    h2: {
      fontSize: '21px',
      lineHeight: '32px',
      color: 'white',
    },
    h3: {
      fontSize: '18px',
      lineHeight: '28px',
      color: 'white',
    },
    subtitle1: {
      fontSize: '16px',
      fontWeight: 700,
      lineHeight: '24px',
      color: 'white',
    },
    subtitle1Reg: {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '24px',
      color: 'white',
    },
    subtitle2: {
      fontSize: '14px',
      fontWeight: 700,
      lineHeight: '16px',
      color: 'white',
    },
    subtitle2Reg: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '20px',
      color: 'white',
    },
    textButton: {
      fontSize: '14px',
      lineHeight: '18px',
      fontWeight: 700,
      textDecoration: 'underline',
      cursor: 'pointer',
      color: '#FF9B33',
    },
    textButtonDanger: {
      fontSize: '12px',
      lineHeight: '18px',
      textDecoration: 'underline',
      cursor: 'pointer',
      color: '#cf1c0c',
    },
    body1: {
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: 400,
      color: 'white',
    },
    body2: {
      fontSize: '12px',
      lineHeight: '18px',
      fontWeight: 400,
      color: 'white',
    },
    caption1: {
      fontSize: '11px',
      lineHeight: '20px',
      fontWeight: 400,
      color: 'white',
    },
    caption2: {
      fontSize: '10px',
      lineHeight: '18px',
      fontWeight: 400,
      color: 'white',
    },
    labelBig: {
      fontSize: '14px',
      lineHeight: '18px',
      letterSpacing: '6%',
      color: 'white',
    },
    labelSmall: {
      fontSize: '11px',
      lineHeight: '18px',
      letterSpacing: '6%',
      color: 'white',
    },
    helperText: {
      margin: '3px 14px',
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: '18px',
      letterSpacing: '6%',
      color: '#cf1c0c',
    },
  },
})
