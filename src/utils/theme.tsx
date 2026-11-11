import { createTheme } from '@mui/material/styles';
import { createStyled } from '@mui/system';

declare module '@mui/material/styles/createPalette' {
  interface TypeText {
    primary: string;
    secondary: string;
    heading: string;
    disabled: string;
  }

  interface Palette {
    company: {
      isotype: string;
      logotype: string;
    };
    status: {
      green: string;
      yellow: string;
      red: string;
      purple: string;
      grey: string;
    };
    text: {
      primary: string;
      secondary: string;
      heading: string;
      disabled: string;
    };
    drawer: {
      active: string;
      divider: string;
      hover: string;
      pressed: string;
    };
    surface: {
      hover: string;
      subtleHover: string;
      selected: string;
    };
  }
  interface PaletteOptions {
    company: {
      isotype: string;
      logotype: string;
    };
    status: {
      green: string;
      yellow: string;
      red: string;
      purple: string;
      grey: string;
    };
    drawer: {
      active: string;
      divider: string;
      hover: string;
      pressed: string;
    };
    surface: {
      hover: string;
      subtleHover: string;
      selected: string;
    };
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    h1_web: true;
    h2_web: true;
    h3_web: true;
    h4_web: true;
    h5_web: true;
  }
}

declare module '@mui/material/styles' {
  interface TypographyVariants {
    h1_web: React.CSSProperties;
    h2_web: React.CSSProperties;
    h3_web: React.CSSProperties;
    h4_web: React.CSSProperties;
    h5_web: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    h1_web?: React.CSSProperties;
    h2_web?: React.CSSProperties;
    h3_web?: React.CSSProperties;
    h4_web?: React.CSSProperties;
    h5_web?: React.CSSProperties;
  }
}

export const customPalette = {
  primary: {
    main: '#006398',
    dark: '#003352',
    light: '#CDE5FF',
  },
  secondary: {
    main: '#56778E',
    dark: '#233240',
    light: '#D6E8F4',
  },
  error: {
    main: '#BA1A1A',
  },
  info: {
    main: '#56778E',
  },
  grey: {
    100: '#FCFCFF',
    200: '#E3E3E4',
    300: '#AAABAE',
    500: '#727376',
    700: '#45474A',
    900: '#1A1C1E',
  },
  text: {
    heading: '#001D32',
    primary: '#233240',
    secondary: '#374953',
    disabled: '#979799',
  },
  background: {
    default: '#FCFCFF',
  },
  success: {
    main: '#00A300',
  },
  warning: {
    main: '#EE9926',
  },
  company: {
    isotype: '#D61D41',
    logotype: '#006398',
  },
  status: {
    purple: '#67587A',
    yellow: '#EE9926',
    green: '#00A300',
    red: '#BA1A1A',
    grey: '#76777A',
    blue: '#006398',
  },
  drawer: {
    active: '#E7F2FF',
    divider: '#CAC4D0',
    hover: '#FCFCFF20',
    pressed: '#FCFCFF40',
  },
  surface: {
    hover: '#EDEDED',
    subtleHover: '#F5F5F5',
    selected: '#C7D7E4',
  },
};

export const themeInstance = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontSize: '0.875rem',
          lineHeight: '1.25rem',
          fontWeight: 300,
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          fontVariantNumeric: 'tabular-nums',
        },
        // Reduced motion: keep fades and color changes so state changes stay
        // visible, but drop movement (transforms, size, position).
        '@media (prefers-reduced-motion: reduce)': {
          '*, *::before, *::after': {
            transitionProperty:
              'opacity, color, background-color, border-color !important',
          },
          '.MuiSkeleton-root, .MuiSkeleton-root::after': {
            animation: 'none !important',
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          color: 'white',
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'hover',
      },
    },
    MuiChip: {
      styleOverrides: {
        // Chips inherit the light body weight (300), which is too thin to
        // read as small text on a coloured background.
        label: {
          fontWeight: 600,
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          // backgroundColor: '#00000080',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          lineHeight: '1.5rem',
          fontWeight: 700,
          marginTop: 26,
          marginBottom: 8,
          display: 'block',
          '&.Mui-disabled': {
            opacity: '0.5',
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          '& > .MuiFormControlLabel-label': {
            fontWeight: 300,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          marginTop: 'inherit',
          marginBottom: 'inherit',
          display: 'inherit',
          fontWeight: 300,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 2,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&.MuiButtonBase-root': {
            backgroundColor: customPalette.grey[100],
          },
          '& fieldset': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderColor: customPalette.grey[700],
          backgroundColor: '#fff',
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1_web: 'h1',
          h2_web: 'h2',
          h3_web: 'h3',
          h4_web: 'h4',
          h5_web: 'h5',
          // h5/h6 are used for body and caption text, not document headings
          h5: 'p',
          h6: 'p',
        },
      },
    },
  },
  typography: {
    fontFamily: 'Open Sans',
    h1: {
      fontSize: '2.8125rem',
      lineHeight: '3.25rem',
      fontWeight: 700,
      textWrap: 'balance',
    },
    h2: {
      fontSize: '1.5rem',
      lineHeight: '2rem',
      fontWeight: 700,
      textWrap: 'balance',
    },
    h3: {
      fontSize: '1.375rem',
      lineHeight: '1.75rem',
      fontWeight: 700,
      textWrap: 'balance',
    },
    h4: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
      fontWeight: 700,
      textWrap: 'balance',
    },
    h5: {
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      fontWeight: 700,
    },
    h6: {
      fontSize: '0.75rem',
      lineHeight: '1rem',
      fontWeight: 700,
      letterSpacing: '0.5px',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      fontWeight: 700,
    },
    button: {
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      fontWeight: 700,
    },
    h1_web: {
      fontSize: '2.8125rem',
      lineHeight: '3.25rem',
      fontWeight: 700,
      textWrap: 'balance',
    },
    h2_web: {
      fontSize: '1.375rem',
      lineHeight: '1.75rem',
      fontWeight: 700,
      textWrap: 'balance',
    },
    h3_web: {
      fontSize: '1.375rem',
      lineHeight: '1.75rem',
      fontWeight: 300,
    },
    h4_web: {
      fontSize: '1rem',
      lineHeight: '1.75rem',
      fontWeight: 300,
    },
    h5_web: {
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      fontWeight: 300,
    },
  },
  palette: customPalette,
  breakpoints: {
    values: {
      xs: 400,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export const styled = createStyled({ defaultTheme: themeInstance });
