import { IconButton, ListItemText, Stack, Typography } from "@mui/material";
import React from "react";
import useStyles from "./styles";
import { color } from "../../config/theme";
import Images from "../../config/images";

export default function BlueAbout() {
  const classes = useStyles();

  const quickLinks = ["Home", "Our Services", "About Us", "FAQs", "Sign Up"];

  return (
    <Stack
      width="100%"
      direction="column"
      gap="16px"
      padding="20px 0px"
      sx={{ backgroundColor: color.secondary }}
    >
      <Stack direction="row" justifyContent="space-evenly">
        <Stack>
          <img src={Images.logo_white} alt="logo" style={{ maxWidth: 225 }} />
        </Stack>
        <Stack gap="4px">
          {/* <Typography variant="h5" color={color.white}>
            Quick Links
          </Typography>
          {quickLinks.map((item, index) => {
            return (
              <div key={`quickLinks_${index}`}>
                <ListItemText className={classes.text}>{item}</ListItemText>
              </div>
            );
          })} */}
        </Stack>
        <Stack gap="8px">
          <Typography variant="h5" color={color.white}>
            Contact Us
          </Typography>
          <Stack direction="column">
            <a href="tel:++971 56 976 7673" className={classes.text}>
              +971 56 976 7673
            </a>
            <a href="https://renohome.io/" className={classes.text}>
              https://renohome.io/
            </a>
            <a href="mailto:help@renohome.io.com?" className={classes.text}>
              help@renohome.io
            </a>
          </Stack>
        </Stack>
        <Stack gap="8px">
          <Typography variant="h5" color={color.white}>
            Follow Us
          </Typography>
          <Stack direction="row">
            <IconButton
              onClick={() =>
                window.open(" https://www.facebook.com/renoapp?mibextid=LQQJ4d")
              }
            >
              <img src={Images.fb_white} alt="fb_logo" />
            </IconButton>
            <IconButton
              onClick={() =>
                window.open(
                  "https://instagram.com/renohomeapp?igshid=MTFtMGo5dm9xYTY2dw=="
                )
              }
            >
              <img src={Images.insta_white} alt="insta_logo" />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
      <Typography display="flex" color="#B1B1B1" justifyContent="center">
        2023 © Reno. All Rights Reserved
      </Typography>
    </Stack>
  );
}
