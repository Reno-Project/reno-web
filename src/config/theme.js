import { createTheme } from "@mui/material/styles";
import red from "@mui/material/colors/red";

export const color = {
  primary: "#274BF1",
  secondary: "#D6AC85",
  white: "#ffff",
  darkGreen: "#264653",
  black: "#5A5A5A",
  lightOrange: "#F4A261",
  disable: "#00000061",
  green: "#34AB70",
  blue: "#062F6D",
  offWhite: "#E8E8E8",
};

let theme = createTheme();
// Create a theme instance.
theme = createTheme(theme, {
  palette: {
    primary: {
      main: `${color.primary}`,
    },
    secondary: {
      main: `${color.secondary}`,
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#FFFFFF",
    },
  },
  // typography: {
  //   fontFamily: fonts.mont,
  //   letterSpacing: 14,
  // },
  components: {
    MuiGrid: {
      styleOverrides: {
        container: {
          maxWidth: 1800,
          margin: "0px auto",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "0px 3px 6px #00000052",
          fontFamily: "Roobert-Regular !important",
          fontSize: "16px",
          textTransform: "capitalize",
        },
        containedPrimary: {
          color: `${color.white}`,
          background: "#274BF1",
          "&:hover": {
            backgroundColor: "#274BF1",
          },
        },
        outlinedPrimary: {
          border: "1px solid #274BF1",
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          // margin: "8px 0px !important",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: "0px !important",
          color: `${color.primary}`,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: "10px 14px",
          height: 24,
          fontSize: 14,
          minHeight: "1.3375em !important",
        },
        root: {
          // border: `1px solid ${color.primary}`,
          "&.Mui-focused": {
            border: "0px !important",
          },
          "& > textarea": {
            padding: 0,
          },
        },
        notchedOutline: {
          borderColor: color.primary,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        subtitle1: {
          fontSize: 28,
          color: color.primary,
          fontWeight: "700",
          fontFamily: "PoppinsMedium",
          letterSpacing: 1,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          paddingRight: 15,
          color: color.primary,
        },
      },
    },
    MuiStepConnector: {
      styleOverrides: {
        root: {
          height: "4px !important",
          backgroundColor: `${color.secondary}`,
          "&.Mui-active": {
            backgroundColor: `${color.primary}`,
          },
          "&.Mui-completed": {
            backgroundColor: `${color.primary}`,
          },
        },
        line: {
          border: "0px !important",
        },
      },
    },
    MuiStep: {
      styleOverrides: {
        root: {
          padding: "0px !important",
          margin: "0px !important",
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        iconContainer: {
          padding: "0px !important",
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          height: "45px !important",
          width: "45px !important",
          color: "#0000",
          border: "1px solid #1f4771",
          borderRadius: "23px !important",

          "&.Mui-active": {
            backgroundColor: `${color.white}`,
            border: "0px !important",
            "& > text": {
              fill: "#FFF",
            },
          },
          "&.Mui-completed": {
            backgroundColor: `${color.white}`,
            border: "0px !important",
          },
          [theme.breakpoints.down("md")]: {
            height: "35px !important",
            width: "35px !important",
            borderRadius: "18px !important",
          },
          [theme.breakpoints.down("sm")]: {
            height: "30px !important",
            width: "30px !important",
            borderRadius: "15px !important",
          },
        },
        text: {
          fontFamily: "PoppinsMedium",
          fill: `${color.primary}`,

          "&.Mui-active": {
            fill: `${color.white}`,
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        list: {
          paddingTop: "0px !important",
          paddingBottom: "0px !important",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: "PoppinsRegular",
          color: "#3A5B7E",
          fontSize: "15px !important",
          "&:hover": {
            color: color.white,
            backgroundColor: `${color.primary} !important`,
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {},
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: "0px 9px !important",
          "&.Mui-disabled": {
            color: "rgba(52,86,123,0.5)",
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
        bar: {
          borderRadius: 4,
          backgroundColor: `${color.primary} !important`,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          padding: "12px 45px",
        },
      },
    },
  },
});

export default theme;
