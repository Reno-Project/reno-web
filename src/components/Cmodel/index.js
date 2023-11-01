import { CloseOutlined } from "@mui/icons-material";
import { Button, Divider, Grid, Modal, Typography } from "@mui/material";
import React from "react";
import { isMobile } from "react-device-detect";
import Cselect from "../../components/CSelect";
import { useState } from "react";

export default function Cmodal(props) {
  const[selectedLanguage,setSelectedLanguage]=useState("");

  const {
    visible = false,
    handleClose = () => null,
    loader = false,
    currency = "",
  } = props;

  const handleSelectLanguage = (e) => {
    console.log(">>>>> e", e);
    setSelectedLanguage(e)
  };

  return (
    <Modal
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      disableAutoFocus
      open={visible}
    >
      <Grid
        item
        xs={10}
        sm={8}
        md={6}
        lg={6}
        justifyContent={"center"}
        style={{
          backgroundColor: "#FFF",
          borderRadius: 12,
          maxWidth: "470px",
          minWidth: "350px",
          width: "40vw",
        }}
      >
        <Grid item container>
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
            padding={"26px"}
            borderBottom={"1px solid #F2F4F7"}
          >
            <Grid item>
              <Typography
                style={{
                  color: "#030F1C ",
                  fontFamily: "ElMessiri-SemiBold",
                  fontSize: "28px",
                  lineHeight: "36px",
                  fontWeight: "600",
                }}
              >
                {currency === "currency" ? "Currency" : "Language"}
              </Typography>
            </Grid>
            <Grid item>
              <CloseOutlined onClick={handleClose} />
            </Grid>
          </Grid>
          <Grid container padding={"20px 26px"}>
            {currency === "currency" ? (
              <Cselect
                renderTags={[
                  "Swiss Franc",
                  "Indian Rupee",
                  "US Doller",
                  "UAE Dirham",
                ]}
                label="Select your Currency"
                placeholder="Select your Currency"
              />
            ) : (
              <>
                <Grid item>
                  <Typography
                    style={{
                      color: "#030F1C",
                      fontFamily: "Roobert-Regular",
                      fontWeight: 500,
                      fontSize: "22px",
                      lineHeight: "32px",
                    }}
                  >
                    Preferred Language
                  </Typography>
                  <Typography
                    style={{
                      color: "#646F86",
                      fontFamily: "Roobert-Regular",
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "24px",
                    }}
                  >
                    Select language to use for Reno’s app, website, and
                    marketing emails.
                  </Typography>
                </Grid>
                <Cselect
                  renderTags={[
                    "English",
                    "Hindi",
                    "Arebic",
                    "Franch",
                    "Japanies",
                    "German",
                  ]}
                  placeholder="Select prefered language"
                  handleSelect={handleSelectLanguage}
                  value={selectedLanguage}
                />
              </>
            )}
          </Grid>
          <Grid
            container
            justifyContent={"flex-end"}
            gap={isMobile ? 1 : 2}
            wrap="nowrap"
            padding={"0 26px 26px 0"}
          >
            <Grid item xs={3}>
              <Button fullWidth variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button fullWidth variant="contained" onClick={handleClose}>
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
}
