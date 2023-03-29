import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { Typography } from "@mui/material";
import Images from "../../config/images";
import useStyles from "./styles";

function GoogleLoginButton(props) {
  const classes = useStyles();

  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: (tokenResponse) => console.log(tokenResponse),
    onError: (error) => console.log("error ===>>>", error),
    onNonOAuthError: (error) => console.log("error ===>>>>", error),
  });

  return (
    <div className={classes.socialContainerStyle} onClick={login}>
      <img
        src={Images.google}
        alt="google"
        className={classes.socialImgStyle}
      />
      <Typography className={classes.socialTextStyle}>Google</Typography>
    </div>
  );
}

GoogleLoginButton.propTypes = {};

GoogleLoginButton.defaultProps = {};

export default GoogleLoginButton;
