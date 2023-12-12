import { Box, Fade, Modal, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "@emotion/react";
import "./index.css";
import { Close } from "@mui/icons-material";
function TermsAndConditions(props) {
  const { visible = false, handleClose = () => null, validation } = props;
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: sm ? 300 : 600,
    height: sm ? 350 : 500,
    bgcolor: "background.paper",
    borderRadius: 1,
    boxShadow: 24,
    padding: 50,
    p: 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
  };

  const handleScroll = (e) => {
    const scrollHeight = e.target.scrollHeight;
    const scrollTop = e.target.scrollTop;
    const clientHeight = e.target.clientHeight;
    setIsScrolledToBottom(scrollTop + clientHeight >= scrollHeight);
  };

  return (
    <Modal open={visible} onClose={handleClose}>
      <Fade in={visible}>
        <Box sx={style}>
          <div className="terms-container">
            <div className="terms-header">
              <h2>Terms & Conditions</h2>
              <Close
                style={{ cursor: "pointer" }}
                onClick={() => handleClose()}
              />
            </div>

            <div className="terms-content" onScroll={handleScroll}>
              {/* <div dangerouslySetInnerHTML={{ __html: termsContent }} /> */}
              Please read all the terms of this Agreement carefully. Your
              continued use of the Service shall be deemed irrevocable
              acceptance of this Agreement. If you do not understand any of the
              terms of this Agreement, please contact <u>
                support@Reno.com
              </u>{" "}
              <p>
                before proceeding further, any communication regarding your
                understanding of this Agreement shall not mean by any means
                negotiating its changes, withdrawing any of the mentioned terms,
                and/or lacking of its effectiveness between Reno and You.
              </p>
              Lectus arcu bibendum at varius vel pharetra vel turpis. Eget arcu
              dictum varius duis at. Turpis egestas pretium aenean pharetra
              magna ac placerat. Ut placerat orci nulla pellentesque dignissim
              enim sit amet venenatis. Morbi leo urna molestie at elementum.
              Etiam sit amet nisl purus in mollis nunc. Volutpat ac tincidunt
              vitae semper quis.
              <p>
                Malesuada fames ac turpis egestas maecenas. Magna sit amet purus
                gravida quis. Tortor vitae purus faucibus ornare suspendisse sed
                nisi lacus. Ante metus dictum at tempor. Iaculis urna id
                volutpat lacus laoreet. Faucibus nisl tincidunt eget nullam non
                nisi.
              </p>{" "}
              Turpis massa sed elementum tempus egestas sed sed risus pretium.
              Hendrerit gravida rutrum quisque non. Egestas erat imperdiet sed
              euismod nisi. Fringilla phasellus faucibus scelerisque eleifend
              donec pretium. Condimentum id venenatis a condimentum vitae sapien
              pellentesque habitant morbi. Blandit massa enim nec dui nunc
              mattis. Amet consectetur adipiscing elit ut aliquam purus sit amet
              luctus. Semper quis lectus nulla at volutpat diam ut. Lorem ipsum
              dolor sit amet consectetur adipiscing elit. Ornare arcu odio ut
              sem nulla pharetra diam sit. Sollicitudin nibh sit amet commodo
              nulla. Pellentesque pulvinar pellentesque habitant morbi tristique
              senectus et. Rhoncus est pellentesque elit ullamcorper dignissim
              cras tincidunt lobortis. Ornare lectus sit amet est placerat in
              egestas erat imperdiet. Nulla pharetra diam sit amet nisl suscipit
              adipiscing. Arcu ac tortor dignissim convallis aenean et tortor at
              risus. Arcu cursus vitae congue mauris. Mattis aliquam faucibus
              purus in massa tempor nec.
            </div>
            <div className="acceptance-bar">
              {/* <label>I have read and agree to the terms and conditions.</label> */}
              <div className="submit-container">
                <button
                  disabled={!isScrolledToBottom}
                  className={isScrolledToBottom ? "submit" : "submit-disabled"}
                  onClick={validation}
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}

export default TermsAndConditions;
