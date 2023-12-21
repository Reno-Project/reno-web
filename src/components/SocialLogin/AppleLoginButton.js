import React from "react";
import { CircularProgress } from "@mui/material";
import AppleSignin from "react-apple-signin-auth";
import PropTypes from "prop-types";
import Images from "../../config/images";
import useStyles from "./styles";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";

function AppleLoginButton(props) {
  const { onSuccess, loader } = props;
  const classes = useStyles();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

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
    <AppleSignin
      authOptions={{
        clientId: "com.renocontractor.io",
        scope: "email name",
        redirectURI: process.env.REACT_APP_BASE_URL,
        state: "state",
        nonce: "nonce",
        usePopup: true,
      }}
      noDefaultStyle={false}
      onSuccess={(response) => appleResponse(response)} // default = undefined
      onError={(error) => console.error(error)} // default = undefined
      skipScript={false} // default = undefined
      iconProp={{ style: { marginTop: "10px" } }} // default = undefined
      render={(props) => (
        <div
          className={classes.socialContainerStyle + " " + classes.apple}
          onClick={() => props.onClick()}
        >
          {loader ? (
            <CircularProgress style={{ color: "#274BF1" }} size={26} />
          ) : (
            <>
              <img
                src={Images.apple}
                alt="apple"
                className={classes.socialImgStyle}
                style={{ marginRight: sm && 5 }}
              />
              <span
                className={classes.socialTextStyle}
                style={{ fontSize: sm && 12 }}
              >
                {" "}
                Continue with Apple
              </span>
            </>
          )}
        </div>
      )}
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
