import React from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { CircularProgress } from "@mui/material";
import PropTypes from "prop-types";
import Images from "../../config/images";
import useStyles from "./styles";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";

function FacebookLoginButton(props) {
  const { onSuccess, loader } = props;
  const classes = useStyles();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const responseFacebook = (response) => {
    const obj = { email: response?.email, password: response?.accessToken };
    onSuccess(obj);
  };

  return (
    <FacebookLogin
      appId="598128852185515"
      autoLoad={false}
      fields="name,email,picture"
      scope="public_profile, email"
      onFailure={() => {
        // setButtonLoader(false);
      }}
      disableMobileRedirect={true}
      callback={responseFacebook}
      render={(renderProps) => {
        return (
          <div
            className={classes.socialContainerStyle + " " + classes.facebook}
            onClick={() => renderProps.onClick()}
          >
            {loader ? (
              <CircularProgress style={{ color: "#274BF1" }} size={26} />
            ) : (
              <>
                <img
                  src={Images.Facebook}
                  alt="facebook"
                  className={classes.socialImgStyle}
                  style={{ marginRight: sm && 5 }}
                />
                <span
                  className={classes.socialTextStyle}
                  style={{ fontSize: sm && 12 }}
                >
                  Continue with Facebook
                </span>
              </>
            )}
          </div>
        );
      }}
    />
  );
}

FacebookLoginButton.propTypes = {
  onSuccess: PropTypes.func,
  loader: PropTypes.bool,
};

FacebookLoginButton.defaultProps = {
  onSuccess: () => {},
  loader: false,
};

export default FacebookLoginButton;
