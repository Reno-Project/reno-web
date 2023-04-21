import React from "react";
import { Typography, CircularProgress } from "@mui/material";
import AppleLogin from "react-apple-login";
import PropTypes from "prop-types";
import Images from "../../config/images";
import useStyles from "./styles";

function AppleLoginButton(props) {
  const { onSuccess, loader } = props;
  const classes = useStyles();

  const appleResponse = (response) => {
    if (!response.error) {
      const obj = {
        email: response?.user?.email,
        password: response?.authorization?.id_token,
      };
      onSuccess(obj);
    }
  };

  return (
    <AppleLogin
      clientId="com.renocontractor.io"
      redirectURI="https://reno-home-contractor.azurewebsites.net/"
      usePopup={true}
      callback={appleResponse}
      scope="email name"
      responseMode="query"
      render={(renderProps) => {
        return (
          <div
            className={classes.socialContainerStyle}
            onClick={() => renderProps.onClick()}
          >
            {loader ? (
              <CircularProgress style={{ color: "#274BF1" }} size={26} />
            ) : (
              <>
                <img
                  src={Images.apple}
                  alt="apple"
                  className={classes.socialImgStyle}
                />
                <Typography className={classes.socialTextStyle}>
                  Apple
                </Typography>
              </>
            )}
          </div>
        );
      }}
    />
  );
}

AppleLoginButton.propTypes = {
  onSuccess: PropTypes.func,
  loader: PropTypes.bool,
};

AppleLoginButton.defaultProps = {
  onSuccess: () => {},
  loader: false,
};

export default AppleLoginButton;
