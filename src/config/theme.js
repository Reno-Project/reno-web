import { alpha, createTheme } from "@mui/material/styles";
import red from "@mui/material/colors/red";

export const color = {
  primary: "#274BF1",
  secondary: "#202939",
  white: "#ffff",
  darkGreen: "#264653",
  black: "#000",
  lightOrange: "#F4A261",
  disable: "#00000061",
  green: "#34AB70",
  blue: "#062F6D",
  offWhite: "#E8E8E8",
  fadedblue: "rgba(227, 247, 255, 1)",
  borderColor: "#E8E8E8E8",
  shadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
  captionText: "rgba(100, 111, 134, 1)",
  LightSurface: "#F5F6F8",
  verydarkgrey: "#7A828D",
  cardDescColor: "#475569",
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
          fontFamily: "Poppins-Regular !important",
          fontSize: "15px",
          textTransform: "inherit",
          borderRadius: "7px",
        },
        containedPrimary: {
          color: `${color.white}`,
          background: "#274BF1",
          "&:hover": {
            backgroundColor: "#274BF1",
          },
        },
        outlinedPrimary: {
          border: "0px",
          color: color.secondary,
          backgroundColor: color.LightSurface,
          boxShadow: "none",
          "&:hover": {
            border: "none",
          },
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
          backgroundColor: "#fff",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: "Poppins-Regular",
          color: "#202939",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: "10px 12px",
          fontSize: 14,
          minHeight: "1.3375em !important",
        },
        root: {
          backgroundColor: "#FFF",
          "&.Mui-focused": {
            boxShadow: "rgba(39, 75, 241, 0.25) 0 0 0 0.2rem",
            borderColor: "#274BF1",
          },
          "& > textarea": {
            padding: 0,
          },
        },
        notchedOutline: {
          borderColor: "#E8E8E8",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          wordWrap: "break-word",
        },
        subtitle1: {
          fontSize: 28,
          color: color.primary,
          fontWeight: "700",
          fontFamily: "PoppinsMedium",
          letterSpacing: 1,
        },
        h6: {
          fontWeight: "700",
          letterSpacing: "0.075em",
        },
        h5: {
          fontFamily: "Poppins-Regular",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          paddingRight: 12,
          color: color.primary,
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          color: color.primary,
          position: "relative",
          backgroundColor: "#F5F6F8",
          fontFamily: "Poppins-Regular",
          padding: 0,
        },
        tag: {
          borderRadius: 4,
        },
      },
    },
    MuiStepConnector: {
      styleOverrides: {
        root: {
          height: "3px !important",
          marginTop: "5px",
          // backgroundColor: `${color.secondary}`,
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
        label: {
          fontFamily: "Poppins-Regular !important",
          fontSize: "14px !important",
        },
        iconContainer: {
          padding: "0px !important",
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          height: "35px !important",
          width: "35px !important",
          color: "#0000",
          border: "1px solid #1f4771",
          borderRadius: "23px !important",

          "&.Mui-active": {
            backgroundColor: `${color.white}`,
            color: `${color.primary}`,
            border: "0px !important",
            "& > text": {
              fill: "#FFF",
            },
          },
          "&.Mui-completed": {
            backgroundColor: `${color.white}`,
            color: "#6BBBD8",
            border: "0px !important",
          },
          [theme.breakpoints.down("md")]: {
            height: "30px !important",
            width: "30px !important",
            borderRadius: "18px !important",
          },
          [theme.breakpoints.down("sm")]: {
            height: "30px !important",
            width: "30px !important",
            borderRadius: "15px !important",
          },
        },
        text: {
          fontWeight: "700",
          fill: "#475569",

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
            backgroundColor: `#F2F4F7 !important`,
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
          textTransform: "capitalize",
          fontFamily: "Poppins-Regular",
          fontWeight: "500",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          "&:last-child": {
            paddingBottom: "16px",
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          margin: "0px",
        },
      },
    },
  },
});

export default theme;
