import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { Typography, CircularProgress } from "@mui/material";
import PropTypes from "prop-types";
import Images from "../../config/images";
import useStyles from "./styles";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";

function GoogleLoginButton(props) {
  const { onGoogleDone, loader } = props;
  const classes = useStyles();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: (tokenResponse) => {
      onGoogleDone(tokenResponse);
    },
    onError: (error) => console.log("error ===>>>", error),
    onNonOAuthError: (error) => console.log("error ===>>>>", error),
  });

  return (
    <div
      className={classes.socialContainerStyle}
      onClick={() => {
        if (loader) {
          return null;
        } else {
          login();
        }
      }}
    >
      {loader ? (
        <CircularProgress style={{ color: "#274BF1" }} size={26} />
      ) : (
        <>
          <img
            src={Images.google}
            alt="google"
            className={classes.socialImgStyle}
            style={{ marginRight: sm && 5 }}
          />
          <span
            className={classes.socialTextStyle}
            style={{ fontSize: sm && 12 }}
          >
            {" "}
            Continue with Google
          </span>
        </>
      )}
    </div>
  );
}

GoogleLoginButton.propTypes = {
  onGoogleDone: PropTypes.func,
  loader: PropTypes.bool,
};

GoogleLoginButton.defaultProps = {
  onGoogleDone: () => {},
  loader: false,
};

export default GoogleLoginButton;
