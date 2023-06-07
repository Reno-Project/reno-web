import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Images from "../../config/images";
import useStyles from "./styles";

const NotificationPopup = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { isNotify, notiData } = useSelector((state) => state.auth);
  const title = notiData?.title !== "" ? notiData?.title : "-";
  const description = notiData?.msg !== "" ? notiData?.body : "-";

  return isNotify ? (
    <div
      style={{
        cursor: "pointer",
      }}
      onClick={() => {
        if (notiData?.type === "requested") {
          navigate("/request-proposal", {
            state: { villa: { proposal_id: notiData?.proposal_id } },
          });
        }
      }}
    >
      <div className={`${classes.notificationContainer} ${classes.topRight}`}>
        <div className={classes.subDivForNotification}>
          <div className={classes.subFlexCon}>
            <div className={classes.notificationImage}>
              <img
                loading="lazy"
                src={Images.header_logo}
                alt={"AppIcon"}
                className={classes.notiAppLogo}
              />
            </div>
            <span className={classes.notificationTitle}>{title}</span>
            <span className={classes.notificationMessage}>{description}</span>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default NotificationPopup;
