import { Box, Fade, Modal, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "@emotion/react";
import "./index.css";
import { Close } from "@mui/icons-material";
function TermsAndConditions(props) {
  const { visible = false, handleClose = () => null, acceptTerms } = props;
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: sm ? 300 : 650,
    height: sm ? 350 : 500,
    bgcolor: "background.paper",
    borderRadius: 1,
    boxShadow: 24,
    padding: "15px",
    p: 2,
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
              <>
                <div title="header"></div>
                <p style={{ marginLeft: "2in", marginBottom: "0.11in" }}>
                  <u>
                    <b>SERVICE AGREEMENT</b>
                  </u>
                </p>
                <p
                  align="justify"
                  style={{ lineHeight: "115%", marginBottom: "0.11in" }}
                >
                  <a name="_Hlk126591345" />
                  <font>This Service Agreement (</font>
                  <font>
                    <b>the “Engagement”)</b>
                  </font>
                  <font> is entered into and made effective on the</font>
                  <font>______</font>
                  <font></font>
                  <font>
                    <b>of April 2023 </b>
                  </font>
                  <font>(the</font>
                  <font>
                    <b>“Effective Date”</b>
                  </font>
                  <font>)</font>
                </p>
                <p
                  align="justify"
                  style={{ lineHeight: "115%", marginBottom: "0.11in" }}
                >
                  <font>
                    <b>BY AND BETWEEN:</b>
                  </font>
                </p>
                <ol>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font face="Calibri, serif">
                        <font>
                          <b>RENO HOME HOLDINGS LIMITED, </b>
                        </font>
                        <font>
                          a company limited by shares duly incorporated in and
                          operating under the laws of the Emirate of Abu Dhabi,
                          the United Arab Emirates, bearing Professional
                          Commercial License No. 000009539,
                        </font>
                        <font>
                          <b> </b>
                        </font>
                        <font>
                          having its registered office located at
                          DD-15-134-004-007, Level 15, Wework Hub,71, Al Khatem
                          Tower, Abu Dhabi Global Market Square, Al Maryah
                          Island, Abu Dhabi the United Arab Emirates (UAE), (
                        </font>
                        <font>
                          <b>
                            Hereinafter referred to as the “the “Service
                            Provider”/ “Reno”)
                          </b>
                        </font>
                      </font>
                    </p>
                  </li>
                </ol>
                <p
                  align="justify"
                  style={{ lineHeight: "100%", marginBottom: "0in" }}
                ></p>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    textIndent: "0.5in",
                    marginBottom: "0in",
                  }}
                >
                  <font face="Calibri, serif">
                    <font>
                      <b>AND;</b>
                    </font>
                  </font>
                </p>
                <p
                  align="justify"
                  style={{ lineHeight: "100%", marginBottom: "0in" }}
                ></p>
                <ol start={2}>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font face="Calibri, serif">
                        <font>
                          <b>____________________________________</b>
                        </font>
                        <font>
                          <b>,</b>
                        </font>
                        <font>
                          a company duly incorporated in and operating under the
                          laws of the Emirate of _______, the United Arab
                          Emirates, bearing Professional Commercial License
                          No._______,
                        </font>
                        <font>
                          <b> </b>
                        </font>
                        <font>
                          having its registered office located at
                          _________________________________________, the United
                          Arab Emirates (UAE),
                        </font>
                        <font>
                          <b>
                            {" "}
                            (Hereinafter referred to as the “Contractor”/
                            “Client”){" "}
                          </b>
                        </font>
                      </font>
                    </p>
                  </li>
                </ol>

                <p
                  align="justify"
                  style={{
                    lineHeight: "115%",
                    marginLeft: "0.25in",
                    marginBottom: "0.11in",
                  }}
                >
                  <font>
                    <i>
                      Hereinafter, each Party Service Provider/Reno and
                      Contractor/Client, individually shall be referred to as a
                      “Party” and collectively as “Parties”.
                    </i>
                  </font>
                </p>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "2in",
                    textIndent: "0.5in",
                    marginBottom: "0in",
                  }}
                >
                  <font face="Calibri, serif">
                    <font>
                      <u>
                        <b>PREAMBLE</b>
                      </u>
                    </font>
                  </font>
                </p>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "2in",
                    textIndent: "0.5in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol type="A">
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font size={3} style={{ fontSize: "12pt" }}>
                        <font size={2} style={{ fontSize: "11pt" }}>
                          <b>Whereas,</b>
                        </font>
                        <font color="#212529">
                          <font size={2} style={{ fontSize: "11pt" }}>
                            <span style={{ background: "#ffffff" }}>
                              the Service Provider/Reno shall provide a platform
                              to the Contractor to connect with the clients
                              seeking home renovation/improvement services (the{" "}
                            </span>
                          </font>
                        </font>
                        <font color="#212529">
                          <font size={2} style={{ fontSize: "11pt" }}>
                            <b>
                              <span style={{ background: "#ffffff" }}>
                                “Homeowner (s)”
                              </span>
                            </b>
                          </font>
                        </font>
                        <font color="#212529">
                          <font size={2} style={{ fontSize: "11pt" }}>
                            <span style={{ background: "#ffffff" }}>
                              ) wherein the Contractor and the Homeowner shall
                              have the opportunity to connect for mutual benefit
                              using Reno Platform/App and Contractor may enter
                              into agreements with the Homeowner (s) for
                              providing the Contractor’s home improvement
                              services. Provided that the Contracts terms shall
                              be in compliance with the terms and conditions of
                              the Reno Platform/App and agreements signed with
                              the Reno. (the
                            </span>
                          </font>
                        </font>
                        <font color="#212529">
                          <font size={2} style={{ fontSize: "11pt" }}>
                            <b>
                              <span style={{ background: "#ffffff" }}>
                                “Contractor Services”/or “Contracts”
                              </span>
                            </b>
                          </font>
                        </font>
                        <font color="#212529">
                          <font size={2} style={{ fontSize: "11pt" }}>
                            <span style={{ background: "#ffffff" }}>).</span>
                          </font>
                        </font>
                      </font>
                    </p>
                  </li>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "0.5in",
                    marginBottom: "0in",
                  }}
                >
                  <font color="#212529">
                    <span style={{ background: "#ffffff" }}></span>
                  </font>
                </p>
                <ol type="A" start={2}>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font size={3} style={{ fontSize: "12pt" }}>
                        <font color="#212529">
                          <font size={2} style={{ fontSize: "11pt" }}>
                            <span style={{ textDecoration: "none" }}>
                              <b>
                                <span style={{ background: "#ffffff" }}>
                                  Whereas
                                </span>
                              </b>
                            </span>
                          </font>
                        </font>
                        <font color="#212529">
                          <font size={2} style={{ fontSize: "11pt" }}>
                            <span style={{ textDecoration: "none" }}>
                              <span style={{ background: "#ffffff" }}>
                                , Project(s) agreed to be initiated between the
                                Contractor and the Homeowner pursuant to the
                                Contract(s) shall be managed and operated online
                                through Reno app/Reno Platform and the terms and
                                conditions of the Reno Platform/app shall be
                                read with and construed as electronic document
                                legally binding on the Contractor along with the
                                terms and conditions of this Agreement.
                              </span>
                            </span>
                          </font>
                        </font>
                      </font>
                    </p>
                  </li>
                </ol>
                <p
                  style={{
                    lineHeight: "100%",
                    marginLeft: "0.5in",
                    marginBottom: "0in",
                    textDecoration: "none",
                  }}
                >
                  <br />
                </p>
                <ol type="A" start={3}>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font size={3} style={{ fontSize: "12pt" }}>
                        <font color="#212529">
                          <font size={2} style={{ fontSize: "11pt" }}>
                            <span style={{ textDecoration: "none" }}>
                              <b>
                                <span style={{ background: "#ffffff" }}>
                                  Whereas
                                </span>
                              </b>
                            </span>
                          </font>
                        </font>
                        <font color="#212529">
                          <font size={2} style={{ fontSize: "11pt" }}>
                            <span style={{ textDecoration: "none" }}>
                              <span style={{ background: "#ffffff" }}>,</span>
                            </span>
                          </font>
                        </font>
                        <font color="#212529">
                          <font size={2} style={{ fontSize: "11pt" }}>
                            <span style={{ background: "#ffffff" }}>
                              Reno has professional experience, expertise, and
                              relevant license to provide the Services (as
                              defined below) to the Client further this
                              Agreement contains Reno's terms of engagement with
                              the Contractor and payment of the
                              Consideration/Fee for the Services provided by
                              Reno.{" "}
                            </span>
                          </font>
                        </font>
                      </font>
                    </p>
                  </li>
                  <li>
                    <p
                      align="justify"
                      style={{
                        lineHeight: "115%",
                        marginTop: "0.08in",
                        textDecoration: "none",
                      }}
                    >
                      <font color="#000000">
                        <font face="Arial, serif">
                          <font color="#212529">
                            <font face="Times New Roman, serif">
                              <b>
                                <span style={{ background: "#ffffff" }}>
                                  Whereas,
                                </span>
                              </b>
                            </font>
                          </font>
                          <font color="#212529">
                            <font face="Times New Roman, serif">
                              <span style={{ background: "#ffffff" }}>
                                the Client wishes to engage Reno for the purpose
                                of receiving the Services as per the terms and
                                conditions of this Agreement. Therefore, both
                                the Parties wish to evidence their agreement in
                                writing and both the Parties have the capacity
                                to enter into and perform this contract.
                              </span>
                            </font>
                          </font>
                        </font>
                      </font>
                    </p>
                  </li>
                </ol>
                <p
                  align="justify"
                  style={{ lineHeight: "100%", marginBottom: "0.11in" }}
                >
                  <font>
                    <b>NOW, THEREFORE</b>
                  </font>
                  <font>
                    , in consideration of the aforesaid and of the mutual
                    promises set forth herein, and intending to make it legally
                    binding, the Reno and the Client{" "}
                  </font>
                  <font>
                    <b>HEREBY</b>
                  </font>
                  <font>agree as follows:</font>
                </p>
                <ol>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font face="Calibri, serif">
                        <font>
                          <u>
                            <b>DEFINITIONS AND INTERPRETATIONS</b>
                          </u>
                        </font>
                      </font>
                    </p>
                  </li>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "0.5in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol>
                  <ol>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font face="Calibri, serif">
                          <font>
                            In furtherance to the terms that have been defined
                            elsewhere in this Agreement, the following terms
                            shall have their respective meanings, unless the
                            Context requires otherwise:{" "}
                          </font>
                        </font>
                      </p>
                    </li>
                  </ol>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "1in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol>
                  <ol>
                    <ol>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font face="Calibri, serif">
                            <font>
                              <b>Agreement:</b>
                            </font>
                            <font>
                              means this Services Agreement and electronic terms
                              and conditions of the Reno Platform/App,
                              schedules, and Annexures, addendums attached
                              hereto as varied, amended, or modified and any
                              other document which shall be considered as
                              forming part of this Agreement by the Parties.
                            </font>
                          </font>
                        </p>
                      </li>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font face="Calibri, serif">
                            <font>
                              <b>Annexure: </b>
                            </font>
                            <font>
                              means Annexures specified below or any other
                              Annexures added at a later stage after the
                              execution of the Agreement:{" "}
                            </font>
                          </font>
                        </p>
                      </li>
                    </ol>
                  </ol>
                </ol>
                <ul>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font size={3} style={{ fontSize: "12pt" }}>
                        <font size={2} style={{ fontSize: "11pt" }}>
                          Annexure – A: Detail of the Package
                        </font>
                      </font>
                    </p>
                  </li>
                </ul>
                <ol>
                  <ol>
                    <ol start={3}>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font size={3} style={{ fontSize: "12pt" }}>
                            <font>
                              <font size={2} style={{ fontSize: "11pt" }}>
                                <span style={{ letterSpacing: "-0.1pt" }}>
                                  <b>Escrow Account:</b>
                                </span>
                              </font>
                            </font>
                            <font>
                              <font size={2} style={{ fontSize: "11pt" }}>
                                <span style={{ letterSpacing: "-0.1pt" }}>
                                  means a temporary pass-through account held by
                                  Reno during the process of the Project
                                  transaction between the Homeowner and the
                                  Contractor.{" "}
                                </span>
                              </font>
                            </font>
                          </font>
                        </p>
                      </li>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font size={3} style={{ fontSize: "12pt" }}>
                            <font>
                              <font size={2} style={{ fontSize: "11pt" }}>
                                <span style={{ letterSpacing: "-0.1pt" }}>
                                  <b>Milestone(s):</b>
                                </span>
                              </font>
                            </font>
                            <font>
                              <font size={2} style={{ fontSize: "11pt" }}>
                                <span style={{ letterSpacing: "-0.1pt" }}>
                                  means a scheduled event signifying the
                                  completion of a major deliverable or a set of
                                  related deliverables or a phase of work or the
                                  division of the Project. In general, this is a
                                  major sub-objective or stage for world
                                  performance monitoring and measuring the
                                  levels of completion of the Project.{" "}
                                </span>
                              </font>
                            </font>
                          </font>
                        </p>
                      </li>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font size={3} style={{ fontSize: "12pt" }}>
                            <font>
                              <font size={2} style={{ fontSize: "11pt" }}>
                                <span style={{ letterSpacing: "-0.1pt" }}>
                                  <b>Project:</b>
                                </span>
                              </font>
                            </font>
                            <font>
                              <font size={2} style={{ fontSize: "11pt" }}>
                                <span style={{ letterSpacing: "-0.1pt" }}>
                                  means the home renovation/or
                                  construction/Modification of the home
                                  structure of the Homeowner by the Contractor
                                  by using the Reno Platform under a separate
                                  Contract along with the terms and conditions
                                  of the Reno Platform/app.
                                </span>
                              </font>
                            </font>
                          </font>
                        </p>
                      </li>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font size={3} style={{ fontSize: "12pt" }}>
                            <font>
                              <font size={2} style={{ fontSize: "11pt" }}>
                                <span style={{ letterSpacing: "-0.1pt" }}>
                                  <b>Personal Information:</b>
                                </span>
                              </font>
                            </font>
                            <font color="#161616">
                              <font face="Arial, serif">
                                <font size={2} style={{ fontSize: "9pt" }}>
                                  <span
                                    style={{ background: "#ffffff" }}
                                  ></span>
                                </font>
                              </font>
                            </font>
                            <font>
                              <font size={2} style={{ fontSize: "11pt" }}>
                                <span style={{ letterSpacing: "-0.1pt" }}>
                                  means information about the Contractor or the
                                  User individual.
                                </span>
                              </font>
                            </font>
                            <font>
                              <font size={2} style={{ fontSize: "11pt" }}>
                                <span style={{ letterSpacing: "-0.1pt" }}>
                                  <b></b>
                                </span>
                              </font>
                            </font>
                          </font>
                        </p>
                      </li>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font size={3} style={{ fontSize: "12pt" }}>
                            <font>
                              <font size={2} style={{ fontSize: "11pt" }}>
                                <span style={{ letterSpacing: "-0.1pt" }}>
                                  <b>User:</b>
                                </span>
                              </font>
                            </font>
                            <font>
                              <font size={2} style={{ fontSize: "11pt" }}>
                                <span style={{ letterSpacing: "-0.1pt" }}>
                                  refers to the Contractor and or the person or
                                  entity browsing, accessing, or otherwise using
                                  the Reno Platform.
                                </span>
                              </font>
                            </font>
                          </font>
                        </p>
                      </li>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font size={3} style={{ fontSize: "12pt" }}>
                            <font>
                              <font size={2} style={{ fontSize: "11pt" }}>
                                <span style={{ letterSpacing: "-0.1pt" }}>
                                  <b>User Data:</b>
                                </span>
                              </font>
                            </font>
                            <font>
                              <font size={2} style={{ fontSize: "11pt" }}>
                                <span style={{ letterSpacing: "-0.1pt" }}>
                                  means any data, information, content, records,
                                  and files that a User load or enters into,
                                  transmits to, or makes available to the Reno
                                  Platform, including but not limited to
                                  Personal Information.
                                </span>
                              </font>
                            </font>
                          </font>
                        </p>
                      </li>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <span style={{ letterSpacing: "-0.1pt" }}>
                            &nbsp;
                            <font size={3} style={{ fontSize: "12pt" }}>
                              <font>
                                <font size={2} style={{ fontSize: "11pt" }}>
                                  <b>Reno Platform: </b>
                                </font>
                              </font>
                            </font>
                          </span>
                          <font size={3} style={{ fontSize: "12pt" }}>
                            <font>
                              <font size={2} style={{ fontSize: "11pt" }}>
                                <span style={{ letterSpacing: "-0.1pt" }}>
                                  means app/website which is used for (i)
                                  services through which Reno hosts and makes
                                  available through its online platform
                                  connecting the Contractor and Homeowner(s);
                                  (ii) any component or Modification of the
                                  services referred to in (i); and (iii) the
                                  Support Services.{" "}
                                </span>
                              </font>
                            </font>
                          </font>
                        </p>
                      </li>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font size={3} style={{ fontSize: "12pt" }}>
                            <font>
                              <font size={2} style={{ fontSize: "11pt" }}>
                                <span style={{ letterSpacing: "-0.1pt" }}>
                                  <b>Intellectual Property Rights:</b>
                                </span>
                              </font>
                            </font>
                            <font>
                              <font size={2} style={{ fontSize: "11pt" }}>
                                <span style={{ letterSpacing: "-0.1pt" }}>
                                  means any and all patents, trademarks, service
                                  marks, rights in designs, get-up, trade,
                                  business or domain names, goodwill associated
                                  with the foregoing, copyright including rights
                                  in computer software and databases, topography
                                  rights (in each case whether registered or not
                                  and any applications to register or rights to
                                  apply for registration of any of the
                                  foregoing), rights in inventions, technical
                                  information, knowhow, trade secrets, and other
                                  confidential information, rights in databases
                                  and other intellectual property rights of a
                                  similar or corresponding character which may
                                  now or in the future subsist in any part of
                                  the world.
                                </span>
                              </font>
                            </font>
                          </font>
                        </p>
                      </li>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font size={3} style={{ fontSize: "12pt" }}>
                            <font>
                              <font size={2} style={{ fontSize: "11pt" }}>
                                <span style={{ letterSpacing: "-0.1pt" }}>
                                  <b>Third Party Inspection: </b>
                                </span>
                              </font>
                            </font>
                            <font>
                              <font size={2} style={{ fontSize: "11pt" }}>
                                <span style={{ letterSpacing: "-0.1pt" }}>
                                  means a legal or natural entity that is not
                                </span>
                              </font>
                            </font>
                            <font>
                              <font size={2} style={{ fontSize: "11pt" }}>
                                a party to this Agreement, however subject to
                                the package selected by the Homeowner, the Reno
                                shall provide a Third-Party Inspector for the
                                inspection of the Contractor’s Services.
                              </font>
                            </font>
                          </font>
                        </p>
                      </li>
                    </ol>
                  </ol>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "1.25in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol>
                  <ol start={2}>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font face="Calibri, serif">
                          <font>
                            The Parties agree that the provisions of this
                            Agreement shall be construed upon taking the
                            following into consideration.
                          </font>
                        </font>
                      </p>
                    </li>
                  </ol>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "1.25in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol>
                  <ol>
                    <ol>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font face="Calibri, serif">
                            <font>
                              Pronouns are used interchangeably, and their
                              linguistic variations shall have the same meaning
                              unless stated otherwise;
                            </font>
                          </font>
                        </p>
                      </li>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font face="Calibri, serif">
                            <font>
                              the term ‘includes’ or ‘including’ shall impliedly
                              mean include or including without limitation;
                            </font>
                          </font>
                        </p>
                      </li>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font face="Calibri, serif">
                            <font>
                              any forms, schedules and recitals, attachments,
                              annexures herein if specified or attached shall
                              form an integral part of this Agreement, unless
                              expressed otherwise under this Agreement;
                            </font>
                          </font>
                        </p>
                      </li>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font face="Calibri, serif">
                            <font>
                              references to singular terms shall mean and
                              include the plural of such term and vice versa,
                              unless otherwise expressly mentioned;
                            </font>
                          </font>
                        </p>
                      </li>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font face="Calibri, serif">
                            <font>
                              references made to grammatical tenses (past tense,
                              present tense, and future tense) are used
                              interchangeably and their cognate variations shall
                              have the same meaning unless otherwise stated;
                            </font>
                          </font>
                        </p>
                      </li>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font face="Calibri, serif">
                            <font>
                              A reference to any particular “law or Law” or
                              “Applicable Law”, “Statutory Provision” shall
                              include all applicable laws, rules, regulations,
                              and orders issued by any Governmental Authority,
                              including any common or customary law,
                              constitution, code, ordinance, statute, or other
                              legislative measure and any regulation, rule,
                              treaty, order, decree or judgment, and “lawful”
                              shall be construed accordingly, as it is in force
                              for the time being taking account of any
                              amendment, extension, or re-enactment and includes
                              any subordinate legislation for the time being in
                              force made under it;
                            </font>
                          </font>
                        </p>
                      </li>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font face="Calibri, serif">
                            <font>
                              Unless the context otherwise requires, a reference
                              to one gender shall include a reference to the
                              other genders.{" "}
                            </font>
                          </font>
                        </p>
                      </li>
                    </ol>
                  </ol>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "1.25in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol start={2}>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font face="Calibri, serif">
                        <font>
                          <u>
                            <b>SCOPE OF WORK (THE “SERVICES”)</b>
                          </u>
                        </font>
                      </font>
                    </p>
                  </li>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "0.25in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol>
                  <ol>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font size={3} style={{ fontSize: "12pt" }}>
                          <font>
                            <font size={2} style={{ fontSize: "11pt" }}>
                              The Reno is a marketplace where the Contractor
                              shall be able to connect with Homeowner(s) seeking
                              home renovation and improvement services through
                              professional Contractor by entering into a
                              Contract through Reno Platform/app. Reno shall
                              through its platform/app perform and provide the
                              Services as specified below, in a time-efficient
                              and professional manner and in accordance with the
                              terms and conditions of this Agreement and the
                              terms provided on the app/or online Reno Platform.{" "}
                            </font>
                          </font>
                          <font size={2} style={{ fontSize: "11pt" }}>
                            The Preamble shall be considered an integral part of
                            the Agreement and shall be read with it at all times
                            along with the annexures and appendices (if any).
                          </font>
                        </font>
                      </p>
                    </li>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font face="Calibri, serif">
                          <font>
                            Reno shall be engaged for the Services for
                            connecting the Contractor with the Homeowner
                            throughout the Project and all payment in relation
                            to the Project shall be made through Escrow Account
                            managed and operated by the Reno, to the Contractor
                            and not otherwise.
                          </font>
                        </font>
                      </p>
                    </li>
                  </ol>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "1.25in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol type="a">
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font size={3} style={{ fontSize: "12pt" }}>
                        <font size={2} style={{ fontSize: "11pt" }}>
                          Reno shall provide a Platform to the Contractor
                          subject to the terms of this Agreement and Term of Use
                          of the Reno Platform;
                        </font>
                      </font>
                    </p>
                  </li>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font size={3} style={{ fontSize: "12pt" }}>
                        <font size={2} style={{ fontSize: "11pt" }}>
                          Reno shall provide the Platform to the Contractor to
                          enables the Contractor to setup their profile
                          according to the Reno’s predefined set of required
                          fields/inputs;
                        </font>
                      </font>
                    </p>
                  </li>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font face="Calibri, serif">
                        <font face="Times New Roman, serif">
                          Reno shall provide project management tools to the
                          Contractor on the Reno Platform in order for
                          Contractor to manage the Project using such tools.
                          Provided that Project Management tool shall be
                          including but not limited to, Milestone planning,
                          budgeting as to budget items, and budget sub-item
                          levels, Specifications of the Budget Items or
                          Sub-Items; Quantity of the budget item(s) of the
                          Project; Price (any increase or decrease in the
                          Project price). Further Project Management tool shall
                          be managed and updated as per the type of the Project
                          selected by the Homeowner.
                        </font>
                      </font>
                    </p>
                  </li>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font face="Calibri, serif">
                        <font face="Times New Roman, serif">
                          Chat feature with customer(s)/Homeowner(s)/Users to
                          ensure all variations as required are available and
                          safe at Reno Platform for the Contractor and the
                          Homeowner;
                        </font>
                      </font>
                    </p>
                  </li>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font face="Calibri, serif">
                        <font face="Times New Roman, serif">
                          Contractor shall be provided with the incentives in
                          order to encourage Contractor to compete the Project
                          on time and Reno shall also reserve right to penalize
                          Contractor in the event of delay caused by
                          Contractors’ default;
                        </font>
                      </font>
                    </p>
                  </li>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font size={3} style={{ fontSize: "12pt" }}>
                        <font size={2} style={{ fontSize: "11pt" }}>
                          Upon the request of the Homeowner Reno shall process
                          the bid for the Contractor and the Contractor shall
                          submit the bid within the given timelines; or{" "}
                        </font>
                      </font>
                    </p>
                  </li>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font size={3} style={{ fontSize: "12pt" }}>
                        <font size={2} style={{ fontSize: "11pt" }}>
                          Reno shall guarantee the release of full agreed fee of
                          the Contractor as agreed under the Contract upon the
                          Third-Party Inspection of the Project and based on the
                          project type selected by the Homeowner. Provided that
                          release of Contractor fee as agreed in the Contract
                          shall be dependent upon the terms and conditions of
                          the Contract between Contractor and the Homeowner.
                        </font>
                      </font>
                    </p>
                  </li>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font size={3} style={{ fontSize: "12pt" }}>
                        <font color="#161616">
                          <font size={2} style={{ fontSize: "11pt" }}>
                            <span style={{ background: "#ffffff" }}>
                              Reno shall provide Escrow Services for the mutual
                              benefit of the Homeowner (s) and the Contractor.
                            </span>
                          </font>
                        </font>
                      </font>
                    </p>
                  </li>
                </ol>
                <p
                  style={{
                    lineHeight: "100%",
                    marginLeft: "0.5in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol start={3}>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font face="Calibri, serif">
                        <font>
                          <u>
                            <b>TERMS OF USING THE RENO PLATFORM</b>
                          </u>
                        </font>
                      </font>
                    </p>
                  </li>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "0.5in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol>
                  <ol>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font face="Calibri, serif">
                          <font>
                            The Contractor shall use the Reno Platform subject
                            to the following terms (the{" "}
                          </font>
                          <font>
                            <b>“Terms of Use”</b>
                          </font>
                          <font>):</font>
                        </font>
                      </p>
                      <ol>
                        <li>
                          <p
                            align="justify"
                            style={{ lineHeight: "100%", marginBottom: "0in" }}
                          >
                            <font face="Calibri, serif">
                              <font>
                                <u>
                                  <b>User Accounts: </b>
                                </u>
                              </font>
                            </font>
                          </p>
                        </li>
                      </ol>
                    </li>
                  </ol>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "1.25in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol type="a">
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font face="Calibri, serif">
                        <font>
                          To access certain features of the Reno Platform, the
                          Contractor (s) must register for a Reno Platform
                          Account (the{" "}
                        </font>
                        <font>
                          <b>“Account”</b>
                        </font>
                        <font>
                          ). Reno may reject Account registrations at its sole
                          discretion. The Contractor shall be solely responsible
                          for all actions made on Contractor’s Account and for
                          keeping its login credentials safe and private. The
                          Contractor agrees not to share its login credentials
                          with anyone else or use another User’s account to
                          access the Reno Platform. The Contractor must promptly
                          notify us of any actual or suspected unauthorized use
                          of the Contractors’ Account.
                        </font>
                      </font>
                    </p>
                  </li>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "1.25in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol type="a" start={2}>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font face="Calibri, serif">
                        <font>
                          If any third party will request an Account on behalf
                          of the Contractor, the such third party represents and
                          warrant that it is permitted by such person or entity
                          to use the Reno Platform on Contractor’s behalf,
                          including by requesting Contractor Services, posting
                          bids, fulfilling Contracts, evaluating, and selecting
                          Contractors to provide Contractor Services, and paying
                          for Contractor Services.
                        </font>
                      </font>
                    </p>
                  </li>
                </ol>
                <p
                  style={{
                    lineHeight: "100%",
                    marginLeft: "0.5in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol>
                  <ol>
                    <ol start={2}>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font face="Calibri, serif">
                            <font>
                              <u>
                                <b>Vetting Process: </b>
                              </u>
                            </font>
                          </font>
                        </p>
                      </li>
                    </ol>
                  </ol>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "1.25in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol type="a">
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font face="Calibri, serif">
                        <font>
                          <a
                            href="https://www.lawinsider.com/clause/prior-to"
                            target="_blank"
                          >
                            Prior to
                          </a>{" "}
                          the onboarding on the Reno Platform and undertaking
                          any of the Project, Contractor shall undergo the
                          vetting process of the Reno. Contractor&nbsp; shall
                          undergo a&nbsp;
                          <a
                            href="https://www.lawinsider.com/clause/background-check"
                            target="_blank"
                          >
                            background check
                          </a>
                          &nbsp;
                          <a
                            href="https://www.lawinsider.com/clause/in-accordance-with"
                            target="_blank"
                          >
                            in accordance with
                          </a>
                          &nbsp;
                          <a
                            href="https://www.lawinsider.com/clause/the-standards"
                            target="_blank"
                          >
                            the standards
                          </a>
                          &nbsp;
                          <a
                            href="https://www.lawinsider.com/dictionary/set-out"
                            target="_blank"
                          >
                            set out
                          </a>
                          &nbsp;below.
                        </font>
                      </font>
                    </p>
                  </li>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font face="Calibri, serif">
                        <font>
                          Reno shall perform a background investigation with the
                          following scope of work:
                        </font>
                      </font>
                    </p>
                  </li>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "1.25in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol type="i">
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font face="Calibri, serif">
                        <font>
                          according to the applicable laws of the United Arab
                          Emirates (UAE)- will verify proof of right to work in
                          the UAE, checking and recording documents as per the
                          standards laid out by the Governmental Authorities and
                          concerned departments;{" "}
                        </font>
                      </font>
                    </p>
                  </li>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font face="Calibri, serif">
                        <font>
                          will carry out a basic criminal record check;{" "}
                        </font>
                      </font>
                    </p>
                  </li>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font face="Calibri, serif">
                        <font>
                          will carry out due diligence for the verifications of
                          the License of the Contractor in order to confirm if
                          Contractor is eligible to carry out required
                          activities in the jurisdiction of the UAE;
                        </font>
                      </font>
                    </p>
                  </li>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font face="Calibri, serif">
                        <font>
                          will carry out an Identity check – this must be a
                          current signed passport, or identity document or
                          photocard identity document or a valid copy of the
                          License and Emirates ID issued by the Government
                          authority;
                        </font>
                      </font>
                    </p>
                  </li>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font face="Calibri, serif">
                        <font>
                          verify the Contractor by inspecting and visiting the
                          offices of the Contractor;
                        </font>
                      </font>
                    </p>
                  </li>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font face="Calibri, serif">
                        <font>
                          verify the concerned Contractor by inspecting and
                          checking the portfolio of the Contractor;
                        </font>
                      </font>
                    </p>
                  </li>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font face="Calibri, serif">
                        <font>
                          KYC and verification as to the existence of the
                          required and applicable insurance of the Contractor;
                        </font>
                      </font>
                    </p>
                  </li>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font face="Calibri, serif">
                        <font>
                          Due diligence as to the customer’s/Homeowner(s)
                          references;
                        </font>
                      </font>
                    </p>
                  </li>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font face="Calibri, serif">
                        <font>
                          Verification of the Contractor through any other
                          certifications.
                        </font>
                      </font>
                    </p>
                  </li>
                </ol>
                <p
                  align="justify"
                  style={{ lineHeight: "100%", marginBottom: "0in" }}
                >
                  <br />
                </p>
                <ol>
                  <ol>
                    <ol start={3}>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          &nbsp;
                          <font face="Calibri, serif">
                            <font>
                              <u>
                                <b>Electronic Communications:</b>
                              </u>
                            </font>
                          </font>
                        </p>
                      </li>
                    </ol>
                  </ol>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "1.25in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol type="a" start={3}>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font face="Calibri, serif">
                        <font>
                          When the Contractor shall use or view the Reno
                          Platform or send e-mails, texts, or other electronic
                          messages to the Reno/Service Provider, the Contractor
                          acknowledge the fact that it is communicating with the
                          Reno electronically, and the Contractor consent to
                          receive communications from the Reno electronically.
                          Reno/Service Provider will communicate with Contractor
                          by e-mail or by posting notices on the Reno Platform.
                          The Contractor acknowledges and agrees that all
                          agreements, notices, disclosures, and other
                          communications that the Reno/Service Provider provides
                          to the Contractor electronically satisfy any legal
                          requirement that such communications be in writing.
                        </font>
                      </font>
                    </p>
                  </li>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "1.25in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol type="a" start={4}>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font face="Calibri, serif">
                        <font>
                          Reno Platform shall also be used for communication
                          between the Contractor and the Homeowner throughout
                          the Project duration and Reno reserves the right to
                          have access and view all communications and chats
                          between the Homeowner and the Contractor and or among
                          the Users in the event of a conflict between the
                          Homeowner and the Contractor or between the Users.
                        </font>
                      </font>
                    </p>
                  </li>
                </ol>
                <p
                  align="justify"
                  style={{ lineHeight: "100%", marginBottom: "0in" }}
                >
                  <br />
                </p>
                <ol>
                  <ol>
                    <ol start={4}>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          &nbsp;
                          <font face="Calibri, serif">
                            <font>
                              <u>
                                <b>Prohibited Uses:</b>
                              </u>
                            </font>
                          </font>
                        </p>
                      </li>
                    </ol>
                  </ol>
                </ol>
                <p
                  style={{
                    lineHeight: "100%",
                    marginLeft: "0.5in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol type="a">
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font face="Calibri, serif">
                        <font>
                          The Contractor will not, nor will Contractor permit
                          others to:{" "}
                        </font>
                      </font>
                    </p>
                  </li>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "1.25in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol type="i">
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font face="Calibri, serif">
                        <font>
                          use the Reno Platform to resell or permit timesharing
                          or service bureau use of the Reno Platform;
                        </font>
                      </font>
                    </p>
                  </li>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font face="Calibri, serif">
                        <font>
                          knowingly submit or post any User Feedback (as defined
                          below) that is untrue or inaccurate;
                        </font>
                      </font>
                    </p>
                  </li>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font face="Calibri, serif">
                        <font>
                          use the Reno Platform to create, collect, transmit,
                          store, use, or process any User Data: (A) that
                          contains any computer viruses, worms, malicious code,
                          or any software intended to damage or alter a computer
                          system or data; (B) that the Contractor does not have
                          the lawful right to create, collect, transmit, store,
                          use or process; (C) that violates any applicable laws,
                          or infringes, violates or otherwise misappropriates
                          the intellectual property or other rights of any third
                          party (including any moral right, privacy right or
                          right of publicity);{" "}
                        </font>
                      </font>
                    </p>
                  </li>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font face="Calibri, serif">
                        <font>
                          reverse engineer, decompile, or disassemble any
                          component of the Reno Platform;{" "}
                        </font>
                      </font>
                    </p>
                  </li>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font face="Calibri, serif">
                        <font>
                          remove or obscure any proprietary notices or labels on
                          the Reno Platform;
                        </font>
                      </font>
                    </p>
                  </li>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font face="Calibri, serif">
                        <font>
                          access or use the Reno Platform for the purpose of
                          building a similar or competitive product or service;
                          or
                        </font>
                      </font>
                    </p>
                  </li>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font face="Calibri, serif">
                        <font>
                          perform any vulnerability, penetration, or similar
                          testing of the Reno Platform.
                        </font>
                      </font>
                    </p>
                  </li>
                </ol>
                <p
                  align="justify"
                  style={{ lineHeight: "100%", marginBottom: "0in" }}
                >
                  <br />
                </p>
                <ol>
                  <ol>
                    <ol start={5}>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font face="Calibri, serif">
                            <font>
                              <u>
                                <b>User Ratings.</b>
                              </u>
                            </font>
                          </font>
                        </p>
                      </li>
                    </ol>
                  </ol>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "1.75in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol type="a">
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font face="Calibri, serif">
                        <font>
                          The Contractor acknowledge and agree that: (A) Users
                          may submit feedback and ratings about other Users’
                          content and services (the{" "}
                        </font>
                        <font>
                          <b>“User Feedback”) </b>
                        </font>
                        <font>
                          and such User Feedback will be used to establish each
                          User’s{" "}
                        </font>
                        <font>
                          <b>“Platform Rating”</b>
                        </font>
                        <font>
                          {" "}
                          associated with their Account (as defined in
                          sub-clause 4.1.1. ; (B) Platform Ratings do not
                          reflect the opinion of the Reno; (C) Reno will make
                          Platform Ratings visible to other Users; (D) Reno is
                          not responsible for and does not verify User Feedback
                          for accuracy or completeness.
                        </font>
                      </font>
                    </p>
                  </li>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font face="Calibri, serif">
                        <font>
                          The Contractor, agree not to submit User Feedback that
                          is: (A) false, misleading, or impersonates any other
                          person; (B) is bullying, harassing, abusive,
                          threatening, vulgar, obscene, or offensive, or that
                          contains pornography, nudity, violence, or that
                          promotes violence, racism, discrimination, bigotry,
                          hatred, or physical harm of any kind against any group
                          or individual.
                        </font>
                      </font>
                    </p>
                  </li>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "1.25in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol>
                  <ol>
                    <ol start={6}>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font face="Calibri, serif">
                            <font>
                              <u>
                                <b>Contractor’ Responsibility</b>
                              </u>
                            </font>
                          </font>
                        </p>
                      </li>
                    </ol>
                  </ol>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "1.25in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol type="a">
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font face="Calibri, serif">
                        <font>
                          The Contractors are solely responsible for (A)
                          determining which requests for Contractor Services to
                          bid on; (B) which Contracts to enter into; (C)
                          providing the Contractor Services; and (D) ensuring
                          that Contracts and Contractor Services comply with all
                          applicable laws, including applicable building code
                          and consumer protection laws. Contractors will not use
                          or access the Reno Platform or enter into Contracts:
                          (1) in violation of any applicable law or a third
                          party’s rights; (2) in a manner that threatens the
                          security or functionality of the Reno Platform; or (3)
                          in any manner not expressly permitted in these Terms
                          of Use.
                        </font>
                      </font>
                    </p>
                  </li>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font face="Calibri, serif">
                        <font>
                          Contractor shall be solely responsible for the{" "}
                        </font>
                      </font>
                    </p>
                  </li>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font face="Calibri, serif">
                        <font>
                          The Contractor will not use or access the Reno
                          Platform or request User’s/Homeowner’s information and
                          data in violation of any applicable law or a third
                          party’s rights:
                        </font>
                      </font>
                    </p>
                  </li>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "1.25in",
                    marginBottom: "0in",
                  }}
                ></p>
                <ol type="i">
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font face="Calibri, serif">
                        <font>
                          in a manner that threatens the security or
                          functionality of the Reno Platform; or{" "}
                        </font>
                      </font>
                    </p>
                  </li>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font face="Calibri, serif">
                        <font>
                          in any manner not expressly permitted in these Terms
                          of Use.
                        </font>
                      </font>
                    </p>
                  </li>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "1.79in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol start={4}>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font face="Calibri, serif">
                        <font>
                          <u>
                            <b>
                              PAYMENT TERMS (THE ‘COMPENSATION’ OR THE ‘FEE’){" "}
                            </b>
                          </u>
                        </font>
                      </font>
                    </p>
                  </li>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "0.5in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol>
                  <ol>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font face="Calibri, serif">
                          <font>
                            The Fee and terms of payment for furnishing Services
                            under this Agreement shall be based on the schedule
                            under Annexure-A, which shall be attached hereto and
                            by this reference incorporated herein. Said Reno Fee
                            shall remain in effect for the entire term of this
                            Agreement and the Contract unless otherwise mutually
                            agreed in the Annex-A at the time of signing of
                            Annex-A. (the{" "}
                          </font>
                          <font>
                            <b>“Annex-A”</b>
                          </font>
                          <font>)</font>
                        </font>
                      </p>
                    </li>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font face="Calibri, serif">
                          <font>
                            Both the Parties agree on the Reno Fee as fixed fee
                            to be agreed in Annex-A on a case-to-case basis and
                            payable by the Contractor to Reno subject to the
                            agreed terms and conditions detailed in the Annex-A.
                            Reno and the Contractor shall sign the Fee Schedule
                            containing Reno Fee and any other additional payment
                            terms (as mutually negotiated and agreed between the
                            Contractor and the Reno) at the time of assigning of
                            the Project by Reno to the Contractor or at the time
                            Contractor agrees on the Project with Homeowner.{" "}
                          </font>
                        </font>
                      </p>
                    </li>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font face="Calibri, serif">
                          <font>
                            Annex-A containing Reno Fee and the terms of payment
                            shall form an integral part of this Agreement and
                            shall be read along with the terms and conditions of
                            this Agreement.{" "}
                          </font>
                        </font>
                      </p>
                    </li>
                  </ol>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "1in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol start={5}>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font face="Calibri, serif">
                        <font>
                          <u>
                            <b>
                              DUTIES AND OBLIGATIONS OF THE RENO/SERVICE
                              PROVIDER
                            </b>
                          </u>
                        </font>
                      </font>
                    </p>
                  </li>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "0.25in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol>
                  <ol>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font face="Calibri, serif">
                          <font>
                            The Reno hereby agrees to abide by the below-stated
                            provisions during the period of this Agreement:
                          </font>
                        </font>
                      </p>
                    </li>
                  </ol>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "0.25in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol>
                  <ol>
                    <ol>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font size={3} style={{ fontSize: "12pt" }}>
                            <font>
                              <font size={2} style={{ fontSize: "11pt" }}>
                                To the best of his abilities perform and provide
                                all the Services in a professional manner and
                                exercise all the necessary care, diligence, and
                                skill during the discharge of Services.
                              </font>
                            </font>
                          </font>
                        </p>
                      </li>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font size={3} style={{ fontSize: "12pt" }}>
                            <font>
                              <font size={2} style={{ fontSize: "11pt" }}>
                                To abide by work ethics and professional
                                standards during the course of this Agreement.{" "}
                              </font>
                            </font>
                          </font>
                        </p>
                      </li>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font size={3} style={{ fontSize: "12pt" }}>
                            <font>
                              <font size={2} style={{ fontSize: "11pt" }}>
                                To allow such time as is reasonably required to
                                provide the Services and for their proper
                                performance; and
                              </font>
                            </font>
                          </font>
                        </p>
                      </li>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font size={3} style={{ fontSize: "12pt" }}>
                            <font>
                              <font size={2} style={{ fontSize: "11pt" }}>
                                Notify the Contractor of all such details and
                                reports as it may reasonably deem necessary
                                pertaining to the matters in connection with the
                                discharge of the Services.
                              </font>
                            </font>
                          </font>
                        </p>
                      </li>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font size={3} style={{ fontSize: "12pt" }}>
                            <font>
                              <font size={2} style={{ fontSize: "11pt" }}>
                                To the reasonable extent possible, Reno shall
                                ensure to make himself available at all times,
                                provided it has received reasonable notice to
                                provide such assistance or information from the
                                Contractor.
                              </font>
                            </font>
                          </font>
                        </p>
                      </li>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font size={3} style={{ fontSize: "12pt" }}>
                            <font>
                              <font size={2} style={{ fontSize: "11pt" }}>
                                To hold the amount of fee payable to the
                                Contractor until the completion of the Project
                                between the Homeowner and the Contractor.
                              </font>
                            </font>
                          </font>
                        </p>
                      </li>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font size={3} style={{ fontSize: "12pt" }}>
                            <font>
                              <font size={2} style={{ fontSize: "11pt" }}>
                                Shall provide Reno Platform to connect the
                                Homeowner and the Contractor for communication
                                purposes and manage the project tools of the
                                Project.
                              </font>
                            </font>
                          </font>
                        </p>
                      </li>
                    </ol>
                  </ol>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "1.5in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol start={6}>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font face="Calibri, serif">
                        <font>
                          <u>
                            <b>
                              DUTIES AND OBLIGATIONS OF THE RENO/SERVICE
                              PROVIDER
                            </b>
                          </u>
                        </font>
                      </font>
                    </p>
                  </li>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "1.5in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol>
                  <ol>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font face="Calibri, serif">
                          <font>
                            The Contractor hereby agrees to abide by the
                            below-stated provisions during the period of this
                            Agreement to:
                          </font>
                        </font>
                      </p>
                    </li>
                  </ol>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "1in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol>
                  <ol>
                    <ol>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font size={3} style={{ fontSize: "12pt" }}>
                            <font>
                              <font size={2} style={{ fontSize: "11pt" }}>
                                provide the Service Provider/Reno with all the
                                required information and material in order for
                                the Service Provider/Reno to deliver and perform
                                its Services hereunder this Agreement.
                              </font>
                            </font>
                          </font>
                        </p>
                      </li>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font size={3} style={{ fontSize: "12pt" }}>
                            <font>
                              <font size={2} style={{ fontSize: "11pt" }}>
                                comply with all applicable laws and regulations
                                that may apply to its access to or use of the
                                Reno Platform and posting of any Contracts.
                              </font>
                            </font>
                          </font>
                        </p>
                      </li>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font size={3} style={{ fontSize: "12pt" }}>
                            <font>
                              <font size={2} style={{ fontSize: "11pt" }}>
                                co-operate and extend any external assistance
                                that is required from the Contractor in order
                                for the Service Provider/Reno to perform and
                                deliver its Services hereunder this Agreement.
                              </font>
                            </font>
                          </font>
                        </p>
                      </li>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font size={3} style={{ fontSize: "12pt" }}>
                            <font>
                              <font size={2} style={{ fontSize: "11pt" }}>
                                notify the Service Provider/Reno pertaining to
                                any information, changes, modification,
                                deletion, and/or any other such relevant
                                information in a reasonable time in order for
                                the Service Provider/Reno to perform and deliver
                                its Services on time.{" "}
                              </font>
                            </font>
                          </font>
                        </p>
                      </li>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font size={3} style={{ fontSize: "12pt" }}>
                            <font size={2} style={{ fontSize: "11pt" }}>
                              provide Reno (in the capacity of Escrow Agent)
                              with the Post-Dated Cheque of the amount
                              equivalent to the down payment released to the
                              Contractor as agreed between the Contractor and
                              the Homeowner at the signing of the Contract to
                              finance the Project, as a personal guaranty. Once
                              is Project is successfully delivered to the
                              Homeowner; Reno shall release the Post-Dated
                              Cheque.
                            </font>
                          </font>
                        </p>
                      </li>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font size={3} style={{ fontSize: "12pt" }}>
                            <font size={2} style={{ fontSize: "11pt" }}>
                              render assistance to Reno when requested and
                              notified by Reno, with respect to the approvals
                              required to be obtained from any governmental
                              bodies and corporate authorities from time to
                              time. Further Contractor shall provide all such
                              documents and do all needful for providing
                              complete documents regarding the Project when
                              required and if notified by Reno during the Term
                              of this Agreement.{" "}
                            </font>
                          </font>
                        </p>
                      </li>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font size={3} style={{ fontSize: "12pt" }}>
                            <font size={2} style={{ fontSize: "11pt" }}>
                              be obligated to pay 0.5% of the bid amount as a
                              referral fee in case the Contractor is selected as
                              one of the 3 offers offered to the Client.
                            </font>
                          </font>
                        </p>
                      </li>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font size={3} style={{ fontSize: "12pt" }}>
                            <font size={2} style={{ fontSize: "11pt" }}>
                              submit its bids, when and if required by Reno.
                            </font>
                          </font>
                        </p>
                      </li>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font size={3} style={{ fontSize: "12pt" }}>
                            <font>
                              <font size={2} style={{ fontSize: "11pt" }}>
                                at all times perform the services and its other
                                obligations under this Agreement in accordance
                                with and subject to the provisions of this
                                Agreement; Good Industry Practice; all
                                Applicable Laws; any standards, or guidelines
                                established by the Government of the United Arab
                                Emirates or any code of practice development in
                                relation to the services industry
                                internationally; and any instructions and
                                directions of the Homeowner given from time to
                                time on Platform.
                              </font>
                            </font>
                          </font>
                        </p>
                      </li>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font size={3} style={{ fontSize: "12pt" }}>
                            <font size={2} style={{ fontSize: "11pt" }}>
                              provide Reno with such documents, approvals and
                              NOCs as would be requested by Reno from time to
                              time. Furthermore, Contractor shall assist Reno
                              with any Governmental procedure with regards the
                              Project (if applicable).
                            </font>
                          </font>
                        </p>
                      </li>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font size={3} style={{ fontSize: "12pt" }}>
                            <font size={2} style={{ fontSize: "11pt" }}>
                              fully comply with the terms and conditions of the
                              Reno App and or Reno Platform and shall abide by
                              the terms of use of Reno Platform depending upon
                              the nature of the Project opted by the Homeowner.
                            </font>
                          </font>
                        </p>
                      </li>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font size={3} style={{ fontSize: "12pt" }}>
                            <font size={2} style={{ fontSize: "11pt" }}>
                              coordinate, assist, and provide all support to any
                              Third Party Inspector to visit and inspect the
                              premises so constructed and renovated by the
                              Contractor as per the Project and or degree of
                              inspection required by the Homeowner, in this
                              regard if any clarifications and documents are
                              required by such third- party inspector, the
                              Contractor shall provide all such required
                              documents and information as would be needed for
                              the purposes of the inspection.
                            </font>
                          </font>
                        </p>
                      </li>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font size={3} style={{ fontSize: "12pt" }}>
                            <font color="#000000">
                              <font size={2} style={{ fontSize: "11pt" }}>
                                <span lang="en-AE">
                                  source the materials required for the Project
                                  from Reno's approved vendor list, in the event
                                  Reno does not have the named vendor(s) on the
                                  list provided by Reno, Contractor can request
                                  Reno's approval to add the vendor (s) to the
                                  Reno approved list.
                                </span>
                              </font>
                            </font>
                          </font>
                        </p>
                      </li>
                    </ol>
                  </ol>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "1.5in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol start={7}>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font face="Calibri, serif">
                        <font>
                          <u>
                            <b>
                              REPRESENATIONS AND WARRANTIES OF THE CONTRACTOR
                            </b>
                          </u>
                        </font>
                      </font>
                    </p>
                  </li>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "0.25in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol>
                  <ol>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font face="Calibri, serif">
                          <font>
                            The Contractor hereby irrevocably undertakes,
                            represents and warrants to abide by the below-stated
                            provisions during the period of this Agreement to:
                          </font>
                        </font>
                      </p>
                    </li>
                  </ol>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "0.25in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol>
                  <ol>
                    <ol>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font size={3} style={{ fontSize: "12pt" }}>
                            <font>
                              <font size={2} style={{ fontSize: "11pt" }}>
                                remain engaged with Reno/the Service Provider
                                during the term of the Contract between the
                                Homeowner and or the Contractor. Contractor
                                further undertakes and acknowledges that in the
                                event the Contractor engages with the Homeowner
                                (s) through Reno Platform it shall be construed
                                as a breach of the terms of this Agreement and
                                Reno shall be entitled to such direct, indirect
                                consequential, and injunctive remedies as would
                                be available to the Reno under the applicable
                                Laws of the UAE.{" "}
                              </font>
                            </font>
                          </font>
                        </p>
                      </li>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font size={3} style={{ fontSize: "12pt" }}>
                            <font>
                              <font size={2} style={{ fontSize: "11pt" }}>
                                use the communication services available on the
                                Reno Platform to communicate with other Users
                                prior to entering into a Contract. Contractor
                                warrants that before entering the Contract with
                                the Homeowner or User Contractor shall:
                              </font>
                            </font>
                          </font>
                        </p>
                      </li>
                    </ol>
                  </ol>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "1.5in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol type="i">
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font size={3} style={{ fontSize: "12pt" }}>
                        <font>
                          <font size={2} style={{ fontSize: "11pt" }}>
                            only use the Reno Platform to communicate with other
                            Users;{" "}
                          </font>
                        </font>
                      </font>
                    </p>
                  </li>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font size={3} style={{ fontSize: "12pt" }}>
                        <font>
                          <font size={2} style={{ fontSize: "11pt" }}>
                            not provide its information that would allow another
                            person to contact the Contractor directly (the{" "}
                          </font>
                        </font>
                        <font>
                          <font size={2} style={{ fontSize: "11pt" }}>
                            <b>“Direct Contact Information”</b>
                          </font>
                        </font>
                        <font>
                          <font size={2} style={{ fontSize: "11pt" }}>
                            ) to any other User or another person that
                            Contractor identified or was identified by through
                            the Reno Platform;{" "}
                          </font>
                        </font>
                      </font>
                    </p>
                  </li>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font size={3} style={{ fontSize: "12pt" }}>
                        <font>
                          <font size={2} style={{ fontSize: "11pt" }}>
                            not use the Direct Contact information of another
                            User to attempt or to communicate with, solicit,
                            contact, or find the contact information of a User
                            outside of the Reno Platform;{" "}
                          </font>
                        </font>
                      </font>
                    </p>
                  </li>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font size={3} style={{ fontSize: "12pt" }}>
                        <font>
                          <font size={2} style={{ fontSize: "11pt" }}>
                            not ask for, provide, or attempt to identify through
                            public means the contact information of another
                            User; and{" "}
                          </font>
                        </font>
                      </font>
                    </p>
                  </li>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font size={3} style={{ fontSize: "12pt" }}>
                        <font>
                          <font size={2} style={{ fontSize: "11pt" }}>
                            not include any direct contact information or use
                            such means by which the Contractor’s contact
                            information could be discovered in any request or
                            bid for Contractor Services, except as otherwise
                            provided on the Reno Platform.{" "}
                          </font>
                        </font>
                      </font>
                    </p>
                  </li>
                </ol>
                <ol>
                  <ol>
                    <ol>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font size={3} style={{ fontSize: "12pt" }}>
                            <font size={2} style={{ fontSize: "11pt" }}>
                              covenant with Reno that Contractor’s User Data
                              will only contain Personal Information in respect
                              of which Contractor have provided all notices and
                              disclosures, obtained all applicable third party
                              consents and permissions, and otherwise have all
                              authority, in each case as required by applicable
                              laws, to enable Reno to provide the Reno Platform,
                              including with respect to the collection, storage,
                              access, use, disclosure, processing and
                              transmission of personal information, including by
                              or to Reno and to or from all applicable third
                              parties.
                            </font>
                          </font>
                        </p>
                      </li>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font size={3} style={{ fontSize: "12pt" }}>
                            <font size={2} style={{ fontSize: "11pt" }}>
                              that during the Term of this Agreement and the
                              Contract, Reno shall be the point of contact
                              between the Homeowner and the Contractor, and in
                              no case, the Contractor shall directly or
                              indirectly engage with any of the Contractor’s and
                              Users of the Reno Platform when the User/Homeowner
                              is introduced with Contractor or User through Reno
                              and Reno Platform.
                            </font>
                          </font>
                        </p>
                      </li>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font size={3} style={{ fontSize: "12pt" }}>
                            <font color="#161616">
                              <font size={2} style={{ fontSize: "11pt" }}>
                                <span style={{ background: "#ffffff" }}>
                                  that Reno shall not take responsibility to
                                  facilitate or arbitrate any disputes between
                                  Homeowners and Contractors. Users/Contractor
                                  who have entered into a Contract are
                                  encouraged to resolve disputes among
                                  themselves and come to an agreement with
                                  respect to any cancellation of the Contract or
                                  refunds of any due payments toward each other.
                                </span>
                              </font>
                            </font>
                          </font>
                        </p>
                      </li>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font size={3} style={{ fontSize: "12pt" }}>
                            <font size={2} style={{ fontSize: "11pt" }}>
                              not object to the selection criteria which shall
                              be up to Reno’s discretion and subject to the
                              rules and regulations of the Reno Platform/Reno
                              app.
                            </font>
                          </font>
                        </p>
                      </li>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font size={3} style={{ fontSize: "12pt" }}>
                            <font>
                              <font size={2} style={{ fontSize: "11pt" }}>
                                enter into this Agreement in relation to the
                                Reno services, solely upon the reliance of the
                                undertakings, acknowledgements, warranties,
                                representations and covenants as assured by
                                Contractor to Reno under this Agreement and
                                therefore, Contractor agrees to not commit any
                                action or make omissions of any actions,
                                directly or indirectly that amounts to breach of
                                or is in inconsistent with any of its
                                warranties, undertakings, acknowledgements,
                                representations and covenants under this
                                Agreement with respect to the using Reno
                                Platform, and opting Reno Services, Release and
                                retainment of the Reno Fee as well any other
                                provisions as contained under this Agreement.{" "}
                              </font>
                            </font>
                          </font>
                        </p>
                      </li>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font size={3} style={{ fontSize: "12pt" }}>
                            <font>
                              <font size={2} style={{ fontSize: "11pt" }}>
                                that Reno shall have and reserve all rights as
                                available under the applicable law, in addition
                                to any other rights and remedies as stated under
                                this Agreement, against Contractor in connection
                                with this Agreement and to ensure that
                                Contractor discharges all of its obligations,
                                representations, undertakings, acknowledgements,
                                warranties as covenanted hereunder to clear this
                                Agreement.
                              </font>
                            </font>
                          </font>
                        </p>
                      </li>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font size={3} style={{ fontSize: "12pt" }}>
                            <font>
                              <font size={2} style={{ fontSize: "11pt" }}>
                                to sign the Annex-A to this Agreement containing
                                Reno Fee Schedule at time of assignment of the
                                Project by Reno or at the time Homeowner and the
                                Contractor agrees on any Project. In either of
                                the cases, Contractor shall be obliged to sign
                                the Annex-A (schedule) containing the terms of
                                the Reno Fee prior to initiating the Project.
                                Contractor further acknowledges that
                                non-compliance with this sub-clause shall be
                                regarded as breach of the Agreement and
                                Contractor shall be subject to such penalty as
                                stated in clause 12 of this Agreement and Reno
                                shall be entitled to such other additional
                                direct, indirect consequential and monetary
                                compensation as would be available under the
                                applicable laws of the UAE.
                              </font>
                            </font>
                          </font>
                        </p>
                      </li>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font size={3} style={{ fontSize: "12pt" }}>
                            <font>
                              <font size={2} style={{ fontSize: "11pt" }}>
                                abide by the terms of payment and release of the
                                Project amount pursuant to the Contract between
                                the Homeowner and the Contractor, wherein
                                Contractor shall allow the Reno (in the capacity
                                of the Escrow Agent) to retain/withhold the 15%
                                of the Contractor Fee throughout the period of
                                the Project and by way of guarantee for:
                              </font>
                            </font>
                          </font>
                        </p>
                      </li>
                    </ol>
                  </ol>
                </ol>
                <ol type="i">
                  <li>
                    <p lang="en-GB" className="recitals-western">
                      <font color="#000000">
                        <font face="Times New Roman, serif">
                          <span lang="en-AE">
                            successful delivery of the project;
                          </span>
                        </font>
                      </font>
                    </p>
                  </li>
                  <li>
                    <p lang="en-GB" className="recitals-western">
                      <font color="#000000">
                        <font face="Times New Roman, serif">
                          <span lang="en-AE">
                            avoiding the delays to deliver the Project within
                            agreed time frame;
                          </span>
                        </font>
                      </font>
                    </p>
                  </li>
                  <li>
                    <p lang="en-GB" className="recitals-western">
                      <font color="#000000">
                        <font face="Times New Roman, serif">
                          <span lang="en-AE">
                            1 year warranty as agreed between the Homeowner and
                            the Contractor (depending upon the type of the
                            Project selected by the Homeowner)
                          </span>
                        </font>
                      </font>
                    </p>
                  </li>
                </ol>
                <ol>
                  <ol>
                    <ol start={11}>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font size={3} style={{ fontSize: "12pt" }}>
                            <font size={2} style={{ fontSize: "11pt" }}>
                              cooperate and assist Reno with the Vetting Process
                              subject to the provisions of Clause 3 (3.1.2) of
                              this Agreement and render support by providing all
                              documents including but not limited to the list of
                              contractor (s) sub-contractor (s), relevant
                              licences, approvals, NOCs from the Government
                              authorities and required insurances (as per the
                              applicable laws of the UAE) and such other
                              documents as may be required by Reno from time to
                              time.
                            </font>
                          </font>
                        </p>
                      </li>
                    </ol>
                  </ol>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "1.25in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol start={8}>
                  <li>
                    <p lang="en-GB" className="recitals-western">
                      <font>
                        <u>
                          <b>
                            ESCROW SERVICES AND PAYMENT TERMS OF THE PROJECT
                          </b>
                        </u>
                      </font>
                    </p>
                    <ol>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font face="Calibri, serif">
                            <font>
                              Reno shall provide Escrow Services solely to
                              deliver, hold, or receive payment for the services
                              engaged through the Reno Platform, and to pay fees
                              including service obtained from the Contractor
                              based upon the completion of each Milestone, and
                              release the fee subject to the Package selected by
                              the Homeowner, membership and payment processing
                              and Reno Fee. Reno shall be entitled to the Escrow
                              Service Fee at the rate of{" "}
                            </font>
                            <font>___</font>
                            <font>
                              % to be paid by the Contractor along with the Reno
                              Fee.
                            </font>
                          </font>
                        </p>
                      </li>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font face="Calibri, serif">
                            <font>
                              The Contractor acknowledges the release of the
                              Project amount and the Contractor fee as agreed
                              under terms of the Contract by using Escrow
                              Services of the Reno during the term of the
                              Contract and shall irrevocably agree to the
                              release or the Project Price and the Contractor
                              subject to the terms and conditions of the Reno
                              Platform/Reno App.
                            </font>
                          </font>
                        </p>
                      </li>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font face="Calibri, serif">
                            <font>
                              Contractor irrevocably authorizes Reno to release
                              applicable portions of each Milestone successfully
                              completed by and (each portion, a “
                            </font>
                            <font>
                              <b>Release</b>
                            </font>
                            <font>
                              ”) to the Contractor’s provided bank account upon
                              the approval of the Homeowner, of the delivered
                              completed Milestone. The Contractor shall in no
                              manner object to the deduction of the divided
                              percentage of the Reno Fee with the completion of
                              each Milestone.{" "}
                            </font>
                          </font>
                        </p>
                      </li>
                    </ol>
                  </li>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "1in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol start={9}>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font face="Calibri, serif">
                        <font>
                          <u>
                            <b>APPLICABLE TAX</b>
                          </u>
                        </font>
                      </font>
                    </p>
                  </li>
                </ol>
                <p
                  align="justify"
                  style={{ lineHeight: "100%", marginBottom: "0in" }}
                >
                  <br />
                </p>
                <ol>
                  <ol>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font face="Calibri, serif">
                          <font>
                            The Fee including the Reno Fee set out hereunder{" "}
                          </font>
                          <font>
                            <i>
                              <u>
                                <b>is exclusive of</b>
                              </u>
                            </i>
                          </font>
                          <font>
                            {" "}
                            all applicable sales, use, gross receipts,
                            value-added, excise, personal property or other
                            taxes (if applicable), government charges, or
                            duties, unless specifically agreed to otherwise in
                            writing either under this Agreement or in any other
                            written form. Any applicable VAT/Taxes/duties on the
                            provision of Services shall be borne by each Party
                            individually and is payable in accordance with the
                            applicable laws of the United Arab Emirates.
                          </font>
                        </font>
                      </p>
                    </li>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font face="Calibri, serif">
                          <font>
                            Contractor will be responsible for and pay all
                            applicable taxes, duties, tariffs, assessments,
                            export, and import fees or similar charges
                            (including interest and penalties imposed thereon)
                            on the transactions contemplated in this Agreement
                            other than taxes based on the net income or profits
                            of Reno.
                          </font>
                        </font>
                      </p>
                    </li>
                  </ol>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "1in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol start={10}>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font face="Calibri, serif">
                        <font>
                          <u>
                            <b>TERM OF THE AGREEMENT</b>
                          </u>
                        </font>
                      </font>
                    </p>
                  </li>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "0.25in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol>
                  <ol>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font size={3} style={{ fontSize: "12pt" }}>
                          <font>
                            <font size={2} style={{ fontSize: "11pt" }}>
                              This Agreement shall commence from the effective
                              date as determined above, which is{" "}
                            </font>
                          </font>
                          <font>
                            <font size={2} style={{ fontSize: "11pt" }}>
                              <b>[insert the date</b>
                            </font>
                          </font>
                          <font>
                            <font size={2} style={{ fontSize: "11pt" }}>
                              <b>],</b>
                            </font>
                          </font>
                          <font>
                            <font size={2} style={{ fontSize: "11pt" }}>
                              and continue to remain active until the completion
                              of the Project subject to the Contract executed
                              between the Homeowner and the Contractor
                            </font>
                          </font>
                          <font>
                            <font size={2} style={{ fontSize: "11pt" }}>
                              <b>,</b>
                            </font>
                          </font>
                          <font>
                            <font size={2} style={{ fontSize: "11pt" }}>
                              or unless otherwise terminated by the Contractor
                              or the Service Provider/Reno as per clause 10 of
                              Termination of the Agreement or by any other
                              provisions as stipulated under this Agreement, or
                              by the virtue of mutual consent between the
                              Contractor and the Service Provider/Reno to end
                              this Agreement. (the{" "}
                            </font>
                          </font>
                          <font>
                            <font size={2} style={{ fontSize: "11pt" }}>
                              <b>“Term”</b>
                            </font>
                          </font>
                          <font>
                            <font size={2} style={{ fontSize: "11pt" }}>
                              )
                            </font>
                          </font>
                        </font>
                      </p>
                    </li>
                  </ol>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "1in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol start={11}>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font size={3} style={{ fontSize: "12pt" }}>
                        <font>
                          <font size={2} style={{ fontSize: "11pt" }}>
                            <u>
                              <b>TERMINATION OF THE AGREEMENT</b>
                            </u>
                          </font>
                        </font>
                      </font>
                    </p>
                  </li>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "0.25in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol>
                  <ol>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font size={3} style={{ fontSize: "12pt" }}>
                          <font>
                            <font size={2} style={{ fontSize: "11pt" }}>
                              <span lang="en-GB">
                                Either Contractor or the Service Provider/Reno
                                may terminate this Agreement with or without
                                reason, wherein, the terminating party shall
                                give written notice of no less than seven (
                              </span>
                            </font>
                          </font>
                          <font>
                            <font size={2} style={{ fontSize: "11pt" }}>
                              <span lang="en-GB">
                                <b>7</b>
                              </span>
                            </font>
                          </font>
                          <font>
                            <font size={2} style={{ fontSize: "11pt" }}>
                              <span lang="en-GB">
                                ) days to the non-terminating party, by the
                                email address registered with Reno Platform or
                                Reno Platform for notifying the non-terminating
                                party of the intention to terminate this
                                Agreement. Wherein, the Agreement shall be
                                terminated effective immediately from the date
                                of notice of termination of this Agreement (
                              </span>
                            </font>
                          </font>
                          <font>
                            <font size={2} style={{ fontSize: "11pt" }}>
                              <span lang="en-GB">
                                <b>Termination Date</b>
                              </span>
                            </font>
                          </font>
                          <font>
                            <font size={2} style={{ fontSize: "11pt" }}>
                              <span lang="en-GB">).</span>
                            </font>
                          </font>
                          <font color="#161616">
                            <font face="Arial, serif">
                              <font size={2} style={{ fontSize: "9pt" }}>
                                <span style={{ background: "#ffffff" }}></span>
                              </font>
                            </font>
                          </font>
                          <font>
                            <font size={2} style={{ fontSize: "11pt" }}>
                              <span lang="en-GB">
                                Contractor may terminate this Agreement by
                                requesting by email that Contractor’s Account be
                                deleted, ceasing use of the Reno Platform, and
                                uninstalling and deleting the Reno Platform. For
                                greater certainty, if the Contractor continues
                                to use any portion of the Reno Platform that is
                                publicly available after this Agreement has been
                                terminated and for as long as Contractor
                                Services are being provided under this Agreement
                                and the Contract,&nbsp;the terms of this
                                Agreement will continue to apply to the extent
                                of such use.
                              </span>
                            </font>
                          </font>
                        </font>
                      </p>
                    </li>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font size={3} style={{ fontSize: "12pt" }}>
                          <font>
                            <font size={2} style={{ fontSize: "11pt" }}>
                              In the event of termination of this Agreement in
                              accordance with Clause 11.1 of this Agreement, the
                              Contractor shall be responsible to clear all the
                              due payments for the Services rendered by the
                              Service Provider/Reno in accordance with the terms
                              and conditions of this Agreement until the date of
                              termination of this Agreement, within seven (
                            </font>
                          </font>
                          <font>
                            <font size={2} style={{ fontSize: "11pt" }}>
                              <b>7</b>
                            </font>
                          </font>
                          <font>
                            <font size={2} style={{ fontSize: "11pt" }}>
                              ) days from the date of the effective date of
                              termination of this Agreement.{" "}
                            </font>
                          </font>
                        </font>
                      </p>
                    </li>
                  </ol>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "1in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol start={12}>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font size={3} style={{ fontSize: "12pt" }}>
                        <font>
                          <font size={2} style={{ fontSize: "11pt" }}>
                            <u>
                              <b>CONSEQUENCES OF BREACH OF THE AGREEMENT</b>
                            </u>
                          </font>
                        </font>
                      </font>
                    </p>
                  </li>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "0.5in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol>
                  <ol>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font size={3} style={{ fontSize: "12pt" }}>
                          <font>
                            <font size={2} style={{ fontSize: "11pt" }}>
                              <span lang="en-GB">
                                Upon the effective date of termination of this
                                Agreement, all legal obligations, rights, and
                                duties arising out of this Agreement shall
                                terminate except for such legal obligations,
                                rights, and duties as shall have accrued prior
                                to the effective date of termination and except
                                as otherwise expressly provided in this
                                Agreement. Further, it is pertinent to note that
                                the Service Provider shall be entitled to be
                                paid a due Reno Fee in accordance with the
                                agreed payment terms as specified in Clause 4 of
                                this Agreement for the scope of Services
                                rendered unto the Contractor as per the terms
                                and conditions of this Agreement
                              </span>
                            </font>
                          </font>
                          <font>
                            <span lang="en-GB">.</span>
                          </font>
                        </font>
                      </p>
                    </li>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font size={3} style={{ fontSize: "12pt" }}>
                          <font>
                            <font size={2} style={{ fontSize: "11pt" }}>
                              The following Clauses, together with any other
                              provision of this Agreement which expressly or by
                              its nature survives termination or expiration, or
                              which contemplates performance or observance
                              subsequent to termination or expiration of this
                              Agreement, will survive expiration or termination
                              of this Agreement for any reason: Clauses 13(Data;
                              Intellectual Property), 7 (Representations and
                              Warranties of the Contractor), 6 (Duties and
                              Obligations of the Contractor) 4 (Fees) 14
                              (Confidential Information), 16 and 17 (Limitation
                              of liability; Disclaimer),15 (Non-Circumvention),
                              and 20 (Final Stipulations).
                            </font>
                          </font>
                        </font>
                      </p>
                    </li>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font face="Calibri, serif">
                          <font face="Times New Roman, serif">
                            <span lang="ro-RO">
                              Further to clarify the remedy available to Reno
                              against the breach of any of the terms and
                              conditions of this Agreement, the Contractor shall
                              be obliged to pay the penalty of amount{" "}
                            </span>
                          </font>
                          <font face="Times New Roman, serif">
                            <span lang="ro-RO">
                              <b>USD. 250,000</b>
                            </span>
                          </font>
                          <font face="Times New Roman, serif">
                            <span lang="ro-RO">
                              (Dollars. Two Hundred and Fifty Thousand only) for
                              breaching the terms of this Agreement and for
                              directly or indirectly engaging with any of the
                              Users or Contractors’ of the Reno Platform without
                              intimating Reno of such intentions.{" "}
                            </span>
                          </font>
                        </font>
                      </p>
                    </li>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font face="Calibri, serif">
                          <font face="Times New Roman, serif">
                            <span lang="ro-RO">
                              The Reno shall be entitled to such other
                              liquidated damages, compensation, or relief
                              available to it under the applicable laws of the
                              United Arab Emirates if the damages accrued to the
                              Reno in respect of the Contractor’s prohibited act
                              or violation of the provisions of this Agreement
                              are greater than the penalty described in the
                              forgoing clauses.
                            </span>
                          </font>
                        </font>
                      </p>
                    </li>
                  </ol>
                </ol>
                <p
                  lang="ro-RO"
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "1in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol start={13}>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font size={3} style={{ fontSize: "12pt" }}>
                        <font>
                          <font size={2} style={{ fontSize: "11pt" }}>
                            <u>
                              <b>DATA; INTELLECTUAL PROPERTY</b>
                            </u>
                          </font>
                        </font>
                      </font>
                    </p>
                  </li>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "0.5in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol>
                  <ol>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font face="Calibri, serif">
                          <font face="Times New Roman, serif">
                            <span lang="ro-RO">
                              Except as expressly set forth in this Agreement,
                              nothing in this Agreement assigns or grants to
                              Reno any right, title, or interest, including any
                              intellectual property rights, in or to the
                              Contractors’/User Data. Contractor grant to Reno a
                              nonexclusive, worldwide, royalty-free,
                              irrevocable, fully paid-up right to access, use,
                              process, store, collect, disclose, and transmit
                              User Data to: (i) provide the Reno Platform; (ii)
                              improve and enhance the Reno Platform and for
                              other Reno offerings; and (iii) produce data,
                              information or other materials that are not
                              identified as relating to a particular individual
                              or Account (such data, information, and materials
                              may be referred to as the{" "}
                            </span>
                          </font>
                          <font face="Times New Roman, serif">
                            <span lang="ro-RO">
                              <b>“Aggregated Data</b>
                            </span>
                          </font>
                          <font>
                            <b>”</b>
                          </font>
                          <font>
                            . Reno may use Aggregated Data for any purpose and
                            without restriction or obligation to the Contractor.
                            Reno or its licensors retain all ownership and
                            intellectual property rights in and to: (i) the Reno
                            Platform; (ii) anything developed or delivered by or
                            on behalf of Reno under this Agreement, including
                            the Domain Name, if applicable; and (iii) any
                            Modifications to the foregoing (i) and (ii).
                          </font>
                        </font>
                      </p>
                    </li>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font face="Calibri, serif">
                          <font face="Times New Roman, serif">
                            <span lang="ro-RO">
                              Contractor may request Reno to delete Contractors’
                              Account or Account record (including Personal
                              Information in Contractor’s Account) as set out in
                              Reno’s privacy policy located at
                              <a href="https://www.bidmii.com/privacy-policy">
                                &nbsp;
                              </a>
                            </span>
                          </font>
                          <a href="https://www.bidmii.com/privacy-policy">
                            <font face="Times New Roman, serif">
                              <span lang="ro-RO">www....______________</span>
                            </font>
                          </a>
                          <font face="Times New Roman, serif">
                            <span lang="ro-RO">
                              . Contractor must cease using the Reno Platform
                              immediately upon the suspension and or deletion of
                              the Account.
                            </span>
                          </font>
                        </font>
                      </p>
                    </li>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font face="Calibri, serif">
                          <font face="Times New Roman, serif">
                            <span lang="ro-RO">
                              All rights not expressly granted by Reno to
                              Contractor under this Agreement are reserved.
                            </span>
                          </font>
                        </font>
                      </p>
                    </li>
                  </ol>
                </ol>
                <p
                  lang="ro-RO"
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "1in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol start={14}>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font size={3} style={{ fontSize: "12pt" }}>
                        <font>
                          <font size={2} style={{ fontSize: "11pt" }}>
                            <u>
                              <b>CONFIDENTIAL INFORMATION</b>
                            </u>
                          </font>
                        </font>
                      </font>
                    </p>
                  </li>
                </ol>
                <p
                  align="justify"
                  style={{ lineHeight: "100%", marginBottom: "0in" }}
                >
                  <br />
                </p>
                <ol>
                  <ol>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font face="Calibri, serif">
                          <font face="Times New Roman, serif">
                            <span lang="ro-RO">
                              For the purpose of this Agreement Confidential and
                              Proprietary Information shall mean, any and all
                              information disclosed by the Reno/Service Provider
                              (the{" "}
                            </span>
                          </font>
                          <font face="Times New Roman, serif">
                            <span lang="ro-RO">
                              <b>“Disclosing Party and/or its Affiliates”</b>
                            </span>
                          </font>
                          <font face="Times New Roman, serif">
                            <span lang="ro-RO">
                              ), representatives, employees, officers, agents,
                              or any other members associated with such
                              Disclosing Party{" "}
                            </span>
                          </font>
                          <font face="Times New Roman, serif">
                            <span lang="ro-RO">
                              <b>(Collectively the “Affiliates”),</b>
                            </span>
                          </font>
                          <font face="Times New Roman, serif">
                            <span lang="ro-RO">
                              including any such information as disclosed prior
                              to the signing of this Agreement, to the
                              Contractor/Client (the{" "}
                            </span>
                          </font>
                          <font face="Times New Roman, serif">
                            <span lang="ro-RO">
                              <b>“Receiving Party”</b>
                            </span>
                          </font>
                          <font face="Times New Roman, serif">
                            <span lang="ro-RO">)</span>
                          </font>
                          <font>
                            whether orally or in writing, via any means, that is
                            designated as confidential or that reasonably should
                            be understood to be confidential given the nature of
                            the information and the circumstances of disclosure.
                            Confidential Information includes but without
                            limitation{" "}
                          </font>
                          <font>
                            any data or information that is competitively
                            sensitive material and not generally known to the
                            public and directly or indirectly belongs to or is
                            related to the Disclosing Party, including but
                            without limitations, any trade secrets, information
                            and documents related to the client of the
                            Disclosing Party, Intellectual and Proprietary
                            Rights, ideas, methods, procedures, proprietary
                            information, customers lists and details, documents
                            whether original or the copies of the clients, list
                            of clients and their details, employees and their
                            details, analytical, graphical data, financial
                            status and details, including, all such information
                          </font>
                          <font>
                            <span lang="en-GB">
                              Disclosing Party’s past, present or future
                              customers, suppliers, technology or business, and
                              where Disclosing Party is User includes User Data;
                              and or such information{" "}
                            </span>
                          </font>
                          <font>
                            which the Receiving Party creates, develops,
                            identifies, discovers, receives or obtains in
                            connection with any relationship existing between
                            the Parties under any agreements whether or not such
                            agreements are referred to be part of this Agreement
                            or under this Agreement, irrespective of if such
                            information (if anything other than oral form) is
                            sealed as Confidential Information or not and any
                            other such information which the Disclosing Party
                            deems to hold as Confidential Information or where
                            the Disclosing Party is found exercising reasonable
                            care to protect any information from being
                            unauthorizedly disclosed
                          </font>
                          <font>
                            . However, Confidential Information does not include
                            any information that (i) is or becomes generally
                            known to the public without breach of any obligation
                            owed to the Disclosing Party, (ii) was known to the
                            Receiving Party prior to its disclosure by the
                            Disclosing Party without breach of any obligation
                            owed to the Disclosing Party, (iii) is received from
                            a third party without breach of any obligation owed
                            to the Disclosing Party, or (iv) was independently
                            developed by the Receiving Party{" "}
                          </font>
                          <font face="Times New Roman, serif">
                            <span lang="ro-RO">(the</span>
                          </font>
                          <font face="Times New Roman, serif">
                            <span lang="ro-RO">
                              <b>“Confidential and Proprietary Information”</b>
                            </span>
                          </font>
                          <font face="Times New Roman, serif">
                            <span lang="ro-RO">).</span>
                          </font>
                        </font>
                      </p>
                    </li>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font face="Calibri, serif">
                          <font>
                            The Receiving Party hereby acknowledges and agrees
                            that during the Term of this Agreement, the
                            Disclosing Party may give the Receiving Party access
                            to Confidential and Proprietary Information. The
                            Receiving Party understands its responsibility to
                            preserve and protect such information shared with
                            them, during the course of this Agreement,
                            therefore, the Receiving Party agrees to observe the
                            below-stated restraints while handling the
                            Confidential Information:
                          </font>
                        </font>
                      </p>
                    </li>
                  </ol>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "1in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol type="a">
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font size={3} style={{ fontSize: "12pt" }}>
                        <font>
                          <font size={2} style={{ fontSize: "11pt" }}>
                            The Receiving Party shall not disclose or permit any
                            sort of access to the confidential information to
                            any third party without the prior written consent of
                            the other Disclosing Party.
                          </font>
                        </font>
                      </font>
                    </p>
                  </li>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font size={3} style={{ fontSize: "12pt" }}>
                        <font>
                          <font size={2} style={{ fontSize: "11pt" }}>
                            The Receiving Party shall not use the Confidential
                            Information for any other purpose except for the
                            purposes the Disclosing Party had consented to in
                            writing either in this Agreement or separately.
                          </font>
                        </font>
                      </font>
                    </p>
                  </li>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font size={3} style={{ fontSize: "12pt" }}>
                        <font>
                          <font size={2} style={{ fontSize: "11pt" }}>
                            The Receiving Party shall take all reasonable care
                            to prevent the publication or disclosure of the
                            Confidential Information, except otherwise as
                            advised by the Disclosing Party.
                          </font>
                        </font>
                      </font>
                    </p>
                  </li>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "1.75in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol start={15}>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font size={3} style={{ fontSize: "12pt" }}>
                        <font>
                          <font size={2} style={{ fontSize: "11pt" }}>
                            <u>
                              <b>NON –CIRCUMVENTION </b>
                            </u>
                          </font>
                        </font>
                      </font>
                    </p>
                  </li>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "115%",
                    marginLeft: "0.25in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol>
                  <ol>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font size={3} style={{ fontSize: "12pt" }}>
                          <font size={2} style={{ fontSize: "11pt" }}>
                            <span lang="ro-RO">
                              Contractor shall not use or disclose any of the
                              Information of the Reno clients/User’s
                              Homeowner(s) etc. for the purpose of circumventing
                              the intentions of this Agreement, or to avoid,
                              bypass or otherwise exclude the First Party from
                              the opportunities under discussion.
                            </span>
                          </font>
                        </font>
                      </p>
                    </li>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font size={3} style={{ fontSize: "12pt" }}>
                          <font size={2} style={{ fontSize: "11pt" }}>
                            <span lang="ro-RO">
                              Contractor shall not in any manner approach or try
                              to approach, directly or indirectly to the
                              clients/User’s/Homeowner(s) involved in the
                              transaction.{" "}
                            </span>
                          </font>
                        </font>
                      </p>
                    </li>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font size={3} style={{ fontSize: "12pt" }}>
                          <font size={2} style={{ fontSize: "11pt" }}>
                            <span lang="ro-RO">
                              Contractor confirms and undertakes to not to enter
                              directly or indirectly into business with any
                              firm, partnership, corporation and/or any other
                              entity and/or person, that is referred or
                              introduced by and through the Reno/Reno Plateform.{" "}
                            </span>
                          </font>
                        </font>
                      </p>
                    </li>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font size={3} style={{ fontSize: "12pt" }}>
                          <font size={2} style={{ fontSize: "11pt" }}>
                            <span lang="ro-RO">
                              Contractor agree that during the term of the
                              Agreement and for twelve (12) months after the
                              termination thereof, regardless of the reason for
                              the termination. Provided that Contractor shall
                              forward all enquiries received from the other
                              clients, User (s), Homeowner(s) and or such third
                              parties who were introduced to the Contractor
                              through Reno Plateform.
                            </span>
                          </font>
                        </font>
                      </p>
                    </li>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font size={3} style={{ fontSize: "12pt" }}>
                          <font size={2} style={{ fontSize: "11pt" }}>
                            <span lang="ro-RO">
                              Contractor recognizes that a breach of this
                              Agreement may cause irreparable harm to Reno and
                              that actual damages may be difficult to ascertain
                              and in any event may be inadequate. Accordingly,
                              the Contractor agrees that in the event of such
                              breach, Reno may be entitled to injunctive relief
                              in addition to such other legal or equitable
                              remedies as may be available to the Reno under the
                              applicable laws of the UAE.
                            </span>
                          </font>
                        </font>
                      </p>
                    </li>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font size={3} style={{ fontSize: "12pt" }}>
                          <font size={2} style={{ fontSize: "11pt" }}>
                            <span lang="ro-RO">
                              All representatives, agents, officers,
                              contractor(s) and sub-contractor(s) and employees
                              of the Contractor and anyone acting on its behalf
                              shall comply with all obligations of the
                              Contractor as agreed herein.
                            </span>
                          </font>
                        </font>
                      </p>
                    </li>
                  </ol>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "1.75in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol start={16}>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font size={3} style={{ fontSize: "12pt" }}>
                        <font>
                          <font size={2} style={{ fontSize: "11pt" }}>
                            <u>
                              <b>
                                INDEMNIFICATION AND LIMITATION OF LIABILITY{" "}
                              </b>
                            </u>
                          </font>
                        </font>
                      </font>
                    </p>
                  </li>
                </ol>
                <p
                  lang="ro-RO"
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "0.5in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol>
                  <ol>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font size={3} style={{ fontSize: "12pt" }}>
                          <font size={2} style={{ fontSize: "11pt" }}>
                            <span lang="ro-RO">
                              To the fullest extent permitted by applicable law,
                              Contractor shall defend, indemnify and hold
                              harmless Reno, and its officers, directors,
                              employees, and agents (each shall be referred to
                              as the
                            </span>
                          </font>
                          <font size={2} style={{ fontSize: "11pt" }}>
                            <span lang="ro-RO">
                              <b>"Reno Indemnitee"</b>
                            </span>
                          </font>
                          <font size={2} style={{ fontSize: "11pt" }}>
                            <span lang="ro-RO">
                              ) from and against any and all losses incurred by
                              a Reno and or Reno Indemnitee arising out of or
                              relating to any action (other than by an affiliate
                              of Reno Indemnitee) that arise from or relate to
                              the provision of this Agreement and any personal
                              injury, damage to property or disputes arising
                              from or relating to the Contractor Services
                              pursuant to the Contract between the Contractor
                              and the Homeowner.
                            </span>
                          </font>
                        </font>
                      </p>
                    </li>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font size={3} style={{ fontSize: "12pt" }}>
                          <font size={2} style={{ fontSize: "11pt" }}>
                            <span lang="ro-RO">
                              The following provisions shall survive and
                              continue in full force and effect despite any
                              failure of consideration or of an exclusive
                              remedy:
                            </span>
                          </font>
                        </font>
                      </p>
                    </li>
                  </ol>
                </ol>
                <p
                  lang="ro-RO"
                  align="justify"
                  style={{ lineHeight: "100%", marginBottom: "0.11in" }}
                >
                  <br />
                  <br />
                </p>
                <ol type="A">
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font size={3} style={{ fontSize: "12pt" }}>
                        <font size={2} style={{ fontSize: "11pt" }}>
                          <span lang="ro-RO">
                            To the fullest extent permitted by applicable law
                            and except as otherwise provided in section 16.3, to
                            the maximum extent permitted under applicable law,
                            in no event will the total aggregate liability of
                            Reno in connection with or under the terms of this
                            agreement, whether in contract, tort (including
                            negligence or gross negligence), or otherwise,
                            exceed (i) the amount of the Reno Fees paid by the
                            Contractor for the period immediately preceding the
                            event giving rise to the claim; or (ii) if the Reno
                            platform has been provided to the Contractor without
                            the payment of fees, $100 USD. for greater
                            certainty, the existence of one or more claims under
                            these terms of use will not increase this maximum
                            liability amount.
                          </span>
                        </font>
                      </font>
                    </p>
                  </li>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font size={3} style={{ fontSize: "12pt" }}>
                        <font size={2} style={{ fontSize: "11pt" }}>
                          <span lang="ro-RO">
                            to the fullest extent permitted by applicable law
                            and except as otherwise provided in clause 16.3, to
                            the maximum extent permitted under applicable law,
                            in no event will Reno be liable to Contractor for
                            (i) special, exemplary, punitive, indirect,
                            incidental, or consequential damages; (ii) lost or
                            loss of (a) savings, (b) profit, (c) data, (d) use,
                            or (e) goodwill; (iii) business interruption; (iv)
                            costs for the procurement of substitute products or
                            services; (v) personal injury or death; (vi)
                            personal or property damage arising out of or in any
                            way connected to the Reno platform or terms of this
                            agreement; or (vii) any claims arising from or
                            relating to the contractor services or any disputes
                            between Homeowners and contractors regardless of the
                            cause of action or the theory of liability, whether
                            in contract, tort (including negligence), or
                            otherwise, and even if notified in advance of the
                            possibilities of such damages.
                          </span>
                        </font>
                      </font>
                    </p>
                  </li>
                </ol>
                <ol>
                  <ol start={3}>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font size={3} style={{ fontSize: "12pt" }}>
                          <font size={2} style={{ fontSize: "11pt" }}>
                            <span lang="ro-RO">
                              The exclusions and limitations in Clause 16.2 (B)
                              do not apply to losses arising out of or relating
                              to the Reno’s gross negligence or more culpable
                              conduct, including any willful misconduct or
                              intentional wrongful acts.
                            </span>
                          </font>
                        </font>
                      </p>
                    </li>
                  </ol>
                </ol>
                <p
                  lang="ro-RO"
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "1in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol start={17}>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font color="#161616">
                        <span style={{ background: "#ffffff" }}>&nbsp;</span>
                      </font>
                      <font size={3} style={{ fontSize: "12pt" }}>
                        <font>
                          <font size={2} style={{ fontSize: "11pt" }}>
                            <u>
                              <b>DISCLAIMER</b>
                            </u>
                          </font>
                        </font>
                      </font>
                    </p>
                  </li>
                </ol>
                <p
                  lang="ro-RO"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "0.5in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol>
                  <ol>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font size={3} style={{ fontSize: "12pt" }}>
                          <font size={2} style={{ fontSize: "11pt" }}>
                            <span lang="ro-RO">
                              EXCEPT AS EXPRESSLY PROVIDED IN THIS AGREEMENT AND
                              TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW,
                              RENO DOES NOT WARRANT THAT THE RENO PLATFORM WILL
                              BE UNINTERRUPTED OR ERROR-FREE OR THAT ALL ERRORS
                              CAN OR WILL BE CORRECTED; NOR DOES IT MAKE ANY
                              WARRANTY AS TO THE RESULTS THAT MAY BE OBTAINED
                              FROM USE OF THE RENO PLATFORM. EXCEPT AS
                              SPECIFICALLY PROVIDED IN TERMS OF THIS AGREEMENT,
                              THE RENO PLATFORM (OR ANY PART THEREOF), AND ANY
                              OTHER PRODUCTS AND SERVICES PROVIDED BY RENO TO
                              THE CONTRACTOR ARE PROVIDED “
                            </span>
                          </font>
                          <font size={2} style={{ fontSize: "11pt" }}>
                            <span lang="ro-RO">
                              <b>AS IS” AND “AS AVAILABLE”.</b>
                            </span>
                          </font>
                        </font>
                      </p>
                    </li>
                  </ol>
                </ol>
                <p
                  lang="ro-RO"
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "1in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol>
                  <ol start={2}>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font size={3} style={{ fontSize: "12pt" }}>
                          <font size={2} style={{ fontSize: "11pt" }}>
                            <span lang="ro-RO">
                              THE CONTRACTOR ACKNOWLEDGES THAT RENO IS NOT
                              RESPONSIBLE FOR THE ACTIONS OR OMISSIONS OF
                              HOMEOWNERS, CONTRACTORS, OR FOR ANY OF THE
                              CONTRACTOR SERVICES OR CLAIMS RELATING THERETO.
                            </span>
                          </font>
                        </font>
                      </p>
                    </li>
                  </ol>
                </ol>
                <p
                  style={{
                    lineHeight: "100%",
                    marginLeft: "0.5in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol>
                  <ol start={3}>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font size={3} style={{ fontSize: "12pt" }}>
                          <font color="#161616">
                            <font size={2} style={{ fontSize: "11pt" }}>
                              TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW,
                              RENO HEREBY DISCLAIMS ALL EXPRESS, IMPLIED,
                              COLLATERAL, OR STATUTORY WARRANTIES,
                              REPRESENTATIONS, AND CONDITIONS, WHETHER WRITTEN
                              OR ORAL, INCLUDING ANY IMPLIED WARRANTIES OR
                              CONDITIONS OF MERCHANTABILITY, MERCHANTABLE
                              QUALITY, COMPATIBILITY, TITLE, NON-INFRINGEMENT,
                              SECURITY, RELIABILITY, COMPLETENESS, QUIET
                              ENJOYMENT, ACCURACY, QUALITY, INTEGRATION OR
                              FITNESS FOR A PARTICULAR PURPOSE OR USE, OR ANY
                              WARRANTIES OR CONDITIONS ARISING OUT OF COURSE OF
                              DEALING OR USAGE OF TRADE. WITHOUT LIMITING THE
                              GENERALITY OF ANY OF THE FOREGOING, RENO EXPRESSLY
                              DISCLAIMS ANY REPRESENTATION, CONDITION, OR
                              WARRANTY THAT ANY DATA OR INFORMATION PROVIDED TO
                              THE CONTRACTOR/USER IN CONNECTION WITH THE
                              USER’S/CONTRACTORS’ USE OF THE RENO PLATFORM (OR
                              ANY PART THEREOF) IS ACCURATE, OR CAN OR SHOULD BE
                              RELIED UPON BY USER FOR ANY PURPOSE WHATSOEVER.
                            </font>
                          </font>
                        </font>
                      </p>
                    </li>
                  </ol>
                </ol>
                <p
                  lang="ro-RO"
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "1in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol start={18}>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font color="#161616">
                        <span style={{ background: "#ffffff" }}>&nbsp; </span>
                      </font>
                      <font size={3} style={{ fontSize: "12pt" }}>
                        <font color="#161616">
                          <font size={2} style={{ fontSize: "11pt" }}>
                            <u>
                              <b>
                                <span style={{ background: "#ffffff" }}>
                                  FORCE MAJEURE
                                </span>
                              </b>
                            </u>
                          </font>
                        </font>
                      </font>
                    </p>
                  </li>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "0.5in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol>
                  <ol>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        “
                        <font size={3} style={{ fontSize: "12pt" }}>
                          <font>
                            <font size={2} style={{ fontSize: "11pt" }}>
                              <span lang="en-GB">
                                <b>Force Majeure Event</b>
                              </span>
                            </font>
                          </font>
                          <font>
                            <font size={2} style={{ fontSize: "11pt" }}>
                              <span lang="en-GB">
                                ” for the purpose of this Agreement shall
                                include acts of god, fire, epidemics, floods
                                storms, adverse weather conditions, natural
                                phenomena or calamities or other natural
                                disturbance, acts of war or active hostilities
                                or conditions arising out of or attribution to
                                war or active hostilities (declared or
                                undeclared ), civil disturbance, blockades,
                                insurrection riots and police actions,
                                unforeseen delay in transportation or
                                availability of vital personnel, technology or
                                equipment, compliance with laws or regulation of
                                any governmental authority or acts of failures
                                to act by any governmental authority (whether or
                                not promulgated as law) which prevent or delay
                                performance by a party, or delay performance by
                                a party, or{" "}
                              </span>
                            </font>
                          </font>
                          <font color="#161616">
                            <font size={2} style={{ fontSize: "11pt" }}>
                              Internet service failures or delays, or the
                              unavailability or Modification by third parties of
                              telecommunications or hosting infrastructure or
                              third party websites and or{" "}
                            </font>
                          </font>
                          <font>
                            <font size={2} style={{ fontSize: "11pt" }}>
                              <span lang="en-GB">
                                any other cause of whatsoever kind. Force
                                Majeure also includes any labour disturbances,
                                strikes, and lockouts. Force Majeure will not
                                cancel any outstanding
                                amounts/liabilities/obligations/indemnifications/termination
                                rights owed by one party to the other and such
                                amounts will be settled as soon as the
                                opportunity to do so will offer itself.
                              </span>
                            </font>
                          </font>
                        </font>
                      </p>
                    </li>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font face="Calibri, serif">
                          <font>
                            In the event of any Force Majeure Event, the parties
                            shall not be held liable for complete or partial
                            non-fulfillment of the obligations under this
                            Agreement. However, any Party who is unable to
                            discharge its respective obligations hereunder due
                            to the existence of the Force Majeure Event shall
                            duly and promptly inform the other Party of the
                            existence of such Force Majeure Events, within 5
                            days from the date of the existence of such Force
                            Majeure Events. Further, the Parties agree that
                            failure to inform a Party of the existence of the
                            Force Majeure Event within 5 days from the date of
                            such existence of such Force Majeure Events or in
                            any other case a reasonable time as mutually agreed
                            between the Parties shall constitute as a waiver of
                            the right to be released from the Contractual
                            Obligations hereunder on the part of the Party
                            failing to comply with Clause 16.
                          </font>
                        </font>
                      </p>
                    </li>
                  </ol>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "1in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol start={19}>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font face="Calibri, serif">
                        <font>
                          <u>
                            <b>DISPUTE RESOLUTION AND GOVERNING LAW</b>
                          </u>
                        </font>
                        <font> </font>
                      </font>
                    </p>
                  </li>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "0.5in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol>
                  <ol>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font face="Calibri, serif">
                          <font>
                            All questions concerning the construction,
                            interpretation, validity, and enforceability of this
                          </font>
                          <font> </font>
                          <font>Agreement,</font>
                          <font></font>
                          <font>whether</font>
                          <font> </font>
                          <font>in</font>
                          <font></font>
                          <font>a</font>
                          <font> </font>
                          <font>court</font>
                          <font></font>
                          <font>of</font>
                          <font> </font>
                          <font>law</font>
                          <font></font>
                          <font>or</font>
                          <font> </font>
                          <font>arbitration,</font>
                          <font></font>
                          <font>shall</font>
                          <font> </font>
                          <font>be</font>
                          <font></font>
                          <font>governed</font>
                          <font> </font>
                          <font>by</font>
                          <font></font>
                          <font>and</font>
                          <font> </font>
                          <font>construed,</font>
                          <font></font>
                          <font>and</font>
                          <font> </font>
                          <font>enforced</font>
                          <font></font>
                          <font>in</font>
                          <font> </font>
                          <font>accordance</font>
                          <font></font>
                          <font>with</font>
                          <font> </font>
                          <font>the</font>
                          <font></font>
                          <font>laws</font>
                          <font> </font>
                          <font>
                            of the Emirate of Abu Dhabi and the Federal Law of
                            the UAE,
                          </font>
                          <font></font>
                          <font>without</font>
                          <font> </font>
                          <font>giving</font>
                          <font></font>
                          <font>effect</font>
                          <font> </font>
                          <font>to</font>
                          <font></font>
                          <font>any</font>
                          <font> </font>
                          <font>choice</font>
                          <font></font>
                          <font>or</font>
                          <font> </font>
                          <font>conflict</font>
                          <font></font>
                          <font>of</font>
                          <font> </font>
                          <font>law</font>
                          <font></font>
                          <font>provision</font>
                          <font> </font>
                          <font>or</font>
                          <font></font>
                          <font>rule</font>
                          <font> </font>
                          <font>that</font>
                          <font></font>
                          <font>would</font>
                          <font> </font>
                          <font>cause</font>
                          <font></font>
                          <font>the</font>
                          <font> </font>
                          <font>laws</font>
                          <font></font>
                          <font>of</font>
                          <font> </font>
                          <font>any</font>
                          <font></font>
                          <font>other</font>
                          <font></font>
                          <font>jurisdiction</font>
                          <font> </font>
                          <font>to</font>
                          <font></font>
                          <font>apply.</font>
                        </font>
                      </p>
                    </li>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font face="Calibri, serif">
                          <font>Any</font>
                          <font></font>
                          <font>dispute,</font>
                          <font></font>
                          <font>controversy,</font>
                          <font> </font>
                          <font>or</font>
                          <font></font>
                          <font>claim</font>
                          <font> </font>
                          <font>arising</font>
                          <font></font>
                          <font>out</font>
                          <font> </font>
                          <font>of</font>
                          <font></font>
                          <font>or</font>
                          <font> </font>
                          <font>relating</font>
                          <font></font>
                          <font>to</font>
                          <font> </font>
                          <font>this</font>
                          <font></font>
                          <font>Agreement</font>
                          <font></font>
                          <font>including</font>
                          <font> </font>
                          <font>any</font>
                          <font></font>
                          <font>question</font>
                          <font></font>
                          <font>regarding</font>
                          <font> </font>
                          <font>its</font>
                          <font></font>
                          <font>existence,</font>
                          <font></font>
                          <font>interpretation,</font>
                          <font></font>
                          <font>validity,</font>
                          <font></font>
                          <font>breach</font>
                          <font> </font>
                          <font>or</font>
                          <font></font>
                          <font>termination,</font>
                          <font> </font>
                          <font>or</font>
                          <font></font>
                          <font>the</font>
                          <font> </font>
                          <font>
                            business relationship created by it shall be
                            referred to and finally resolved by the courts of
                            Abu Dhabi unless otherwise agreed between the
                            Parties in writing.
                          </font>
                        </font>
                      </p>
                    </li>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font face="Calibri, serif">
                          <font>
                            This Agreement and all disputes and claims arising
                            out of or in connection with its subject matter are
                            governed by and construed in accordance with
                            Regulations, and applicable Federal laws and laws of
                            Abu Dhabi, the United Arab Emirates.{" "}
                          </font>
                        </font>
                      </p>
                    </li>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font face="Calibri, serif">
                          <font>
                            Any dispute, controversy, or claim arising out of or
                            relating to this Agreement including any question
                            regarding its existence, interpretation, validity,
                            breach or termination, or the business relationship
                            created by it SHALL be referred to and finally
                            resolved by the appointed Arbitrators as per rules
                            and regulations of the Abu Dhabi Arbitration Center,
                            the place of the arbitration shall be Abu Dhabi, the
                            United Arab Emirates and the Language of the
                            Arbitration shall be English.{" "}
                            {/* Kindly customise this part as per your mutual agreement. */}
                          </font>
                        </font>
                      </p>
                    </li>
                  </ol>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "1in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol start={20}>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font face="Calibri, serif">
                        <font>
                          <u>
                            <b>FINAL STIPULATIONS/MISCELLANEOUS PROVISIONS</b>
                          </u>
                        </font>
                      </font>
                    </p>
                  </li>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "0.5in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol>
                  <ol>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font face="Calibri, serif">
                          <font>
                            <u>
                              <b>Language:</b>
                            </u>
                          </font>
                          <font>
                            English shall be the sole language governing the
                            interpretation of this Agreement. All notices and
                            communications between the Parties under or relating
                            to this Agreement shall be in English. In the event
                            this Agreement is translated into any language, the
                            English text shall prevail over the translated text
                            during any conflict between the English and
                            translated language.{" "}
                          </font>
                        </font>
                      </p>
                    </li>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font face="Calibri, serif">
                          <font>
                            <u>
                              <b>Notices:</b>
                            </u>
                          </font>
                          <font>
                            Notices sent to either party will be effective when
                            delivered in writing and in person or by email, one
                            day after being sent by overnight courier, or five
                            days after being sent by mail postage prepaid to the
                            official contact designated by the party to whom a
                            notice is being given. Notices must be sent:{" "}
                          </font>
                        </font>
                      </p>
                    </li>
                  </ol>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "1in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol type="i">
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font face="Calibri, serif">
                        <font>if to Reno, to the following address:</font>
                      </font>
                    </p>
                  </li>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "1.5in",
                    marginBottom: "0in",
                  }}
                >
                  <font face="Calibri, serif">
                    <font>­­­­­­­­­­</font>
                    <font>___________________________</font>
                  </font>
                </p>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "1.5in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "1.5in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol type="i" start={2}>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font face="Calibri, serif">
                        <font>
                          if to User/Contractor, to the following address:
                        </font>
                      </font>
                    </p>
                  </li>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "1.5in",
                    marginBottom: "0in",
                  }}
                >
                  <font face="Calibri, serif">
                    <font>____________________________</font>
                  </font>
                </p>
                <ol>
                  <ol start={3}>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font face="Calibri, serif">
                          <font>
                            <u>
                              <b>Entire Agreement:</b>
                            </u>
                          </font>
                          <font>
                            {" "}
                            This Agreement constitutes the entire agreement
                            between the Parties concerning the subject matter
                            hereof. This Agreement supersedes and replaces any
                            oral or written understandings, agreements, or
                            representations between the Parties. Without
                            limiting the generality of the foregoing, the
                            execution of this Agreement terminates all prior
                            agreements between the Parties relating to the sale
                            of the Equipment.
                          </font>
                        </font>
                      </p>
                    </li>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font face="Calibri, serif">
                          <font face="Times New Roman, serif">
                            <u>
                              <b>Exclusivity:</b>
                            </u>
                          </font>
                          <font face="Times New Roman, serif">
                            Contractor acknowledge and agree: (i) that a
                            substantial value to the Contractor is the
                            relationships Contractor makes with other Users when
                            Contractor identifies or is identified by another
                            person through the Reno Platform (the{" "}
                          </font>
                          <font face="Times New Roman, serif">
                            <b>“Reno Relationship”</b>
                          </font>
                          <font face="Times New Roman, serif">
                            ); and (ii) for 24 months from the start of a Reno
                            Relationship (the
                          </font>
                          <font face="Times New Roman, serif">
                            <b>“Non-Circumvention Period”</b>
                          </font>
                          <font face="Times New Roman, serif">
                            ), the Contractor agrees to use the Reno Platform as
                            Contractor’s exclusive method to request, make, and
                            receive all payments for Contractor Services
                            directly or indirectly with that person or arising
                            out of Contractor relationship with that person and
                            not to circumvent the payment methods offered on the
                            Reno Platform. If Contractor uses the Reno Platform
                            as an employee, agent, or representative of another
                            business, then the Non-Circumvention Period applies
                            to the Contractor and other employees, agents, or
                            representatives of the business or its successor
                            when acting in that capacity with respect to the
                            other User.
                          </font>
                        </font>
                      </p>
                    </li>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font face="Calibri, serif">
                          <font>
                            <u>
                              <b>Waiver:</b>
                            </u>
                          </font>
                          <font>
                            There shall be no waiver of any term, provision, or
                            condition of this Agreement unless such waiver is
                            made in writing and duly signed by the Party
                            granting such waiver. No such waiver shall be deemed
                            to be or construed as a continuing waiver of any
                            term, provision, or condition unless such writing
                            expressly states otherwise. The waiver by a Party of
                            any of its rights or remedies under this Agreement
                            in a particular instance shall not be considered as
                            a waiver of the same or the different rights or
                            remedies in the subsequent instances.
                          </font>
                        </font>
                      </p>
                    </li>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font face="Calibri, serif">
                          <font>
                            <u>
                              <b>Severability:</b>
                            </u>
                          </font>
                          <font>
                            If any provision of this Agreement is declared void
                            or unenforceable by any court or governmental
                            authority, the remaining provisions of this
                            Agreement shall control, unless either, in its sole
                            discretion, decides that such declaration adversely
                            affects the original intent of the Parties, in which
                            event this Agreement shall terminate on thirty (30)
                            days written notice from one party to another party,
                            subject to each Party being obligated to discharge
                            their any pending monetary/non-monetary and other
                            liabilities as applicable.
                          </font>
                        </font>
                      </p>
                    </li>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font face="Calibri, serif">
                          <font>
                            <u>
                              <b>Counterparts:</b>
                            </u>
                          </font>
                          <font>
                            This Agreement may be executed in any number of
                            counterparts, each of which, when executed and
                            delivered, shall be deemed as original, but all the
                            counterparts shall together constitute one
                            agreement.{" "}
                          </font>
                        </font>
                      </p>
                    </li>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font face="Calibri, serif">
                          <font>
                            <u>
                              <b>Construction of Headings:</b>
                            </u>
                          </font>
                          <font>
                            {" "}
                            All the titles and captions of Clauses contained in
                            this Agreement are inserted as a matter of
                            convenience and for reference, and do not affect the
                            scope or meaning of this Agreement or the intent of
                            any provisions thereof.
                          </font>
                        </font>
                      </p>
                    </li>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font face="Calibri, serif">
                          <font>
                            <u>
                              <b>
                                Electronic Execution or Communication and
                                Signatures:
                              </b>
                            </u>
                          </font>
                          <font>
                            The Parties confirm the validity of the signed
                            scanned copies of this Agreement, as well as other
                            documents transmitted to each other by e-mail, the
                            addresses of which are specified under the Notices
                            clause of this Agreement.{" "}
                          </font>
                        </font>
                      </p>
                    </li>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font face="Calibri, serif">
                          <font>
                            <u>
                              <b>Assignment:</b>
                            </u>
                          </font>
                          <font>
                            During the Term of this Agreement the Contractor
                            shall not assign this Agreement to any third party
                            without Reno’s prior written consent. Reno may
                            assign this Agreement or any rights under the terms
                            of this Agreement to any third party without
                            Contractor’s consent. Terms of this Agreement will
                            inure to the benefit of and be binding upon the
                            parties, their permitted successors, and permitted
                            assignees.
                          </font>
                        </font>
                      </p>
                    </li>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font face="Calibri, serif">
                          <font>
                            <u>
                              <b>Relationship:</b>
                            </u>
                          </font>
                          <font>
                            The Reno and the Contractor are independent
                            contractors of each other, and neither has the
                            authority to bind the other to any third party or
                            act in any way as the representative of the other
                            unless otherwise expressly agreed to in writing by
                            both the Parties.
                          </font>
                        </font>
                      </p>
                    </li>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <a name="_Hlk117730953" />
                        <a name="_Hlk117731277" />
                        <font face="Calibri, serif">
                          <font>
                            Any typing or printing or grammatical errors
                            hereunder shall not in any manner change the
                            interpretation of any Clause contained hereunder and
                            each Clause shall be read and interpreted in the
                            context of the entire agreement or as per the
                            original intention of the Parties. The Parties in
                            this regard reserve all rights to make any
                            corrections to reflect the actual intention of the
                            Parties, at any time after the execution of the
                            Agreement should any such error be discovered.{" "}
                          </font>
                        </font>
                      </p>
                    </li>
                  </ol>
                </ol>
                <p
                  align="justify"
                  style={{ lineHeight: "100%", marginBottom: "0in" }}
                >
                  <br />
                </p>
                <p
                  align="justify"
                  style={{ lineHeight: "100%", marginBottom: "0in" }}
                >
                  <br />
                </p>
                <p
                  align="justify"
                  style={{ lineHeight: "100%", marginBottom: "0in" }}
                >
                  <font face="Calibri, serif">
                    <font>
                      <b>
                        IN WITNESS WHEREOF Parties hereto having understood the
                        contents hereof placed their respective signatures on
                        the date specified hereunder and at the place set out
                        herein below.{" "}
                      </b>
                    </font>
                  </font>
                </p>
                <p
                  align="justify"
                  style={{ lineHeight: "100%", marginBottom: "0in" }}
                >
                  <br />
                </p>
                <p
                  align="justify"
                  style={{ lineHeight: "100%", marginBottom: "0in" }}
                >
                  <br />
                </p>
                <p
                  align="justify"
                  style={{ lineHeight: "100%", marginBottom: "0in" }}
                >
                  <font face="Calibri, serif">
                    <font>
                      <b>_________________________________</b>
                    </font>
                  </font>
                </p>
                <p
                  align="justify"
                  style={{ lineHeight: "100%", marginBottom: "0in" }}
                >
                  <font face="Calibri, serif">
                    <font>
                      <b>Authorized Signatory</b>
                    </font>
                  </font>
                </p>
                <p
                  align="justify"
                  style={{ lineHeight: "100%", marginBottom: "0in" }}
                >
                  <font face="Calibri, serif">
                    <font>
                      <b>RENO:</b>
                    </font>
                  </font>
                </p>
                <p
                  align="justify"
                  style={{ lineHeight: "100%", marginBottom: "0in" }}
                >
                  <font face="Calibri, serif">
                    <font>
                      <b>­Name:</b>
                    </font>
                  </font>
                </p>
                <p
                  align="justify"
                  style={{ lineHeight: "100%", marginBottom: "0in" }}
                >
                  <br />
                </p>
                <p
                  align="justify"
                  style={{ lineHeight: "100%", marginBottom: "0in" }}
                >
                  <br />
                </p>
                <p
                  align="justify"
                  style={{ lineHeight: "100%", marginBottom: "0in" }}
                >
                  <font face="Calibri, serif">
                    <font>
                      <b>________________________________</b>
                    </font>
                  </font>
                </p>
                <p
                  align="justify"
                  style={{ lineHeight: "100%", marginBottom: "0in" }}
                >
                  <font face="Calibri, serif">
                    <font>
                      <b>Authorized Signatory </b>
                    </font>
                  </font>
                </p>
                <p
                  align="justify"
                  style={{ lineHeight: "100%", marginBottom: "0in" }}
                >
                  <font face="Calibri, serif">
                    <font>
                      <b>CONTRACTOR:</b>
                    </font>
                  </font>
                </p>
                <p
                  align="justify"
                  style={{ lineHeight: "100%", marginBottom: "0in" }}
                >
                  <font face="Calibri, serif">
                    <font>
                      <b>Name:</b>
                    </font>
                    <font>
                      <b></b>
                    </font>
                  </font>
                </p>
                <p
                  align="justify"
                  style={{ lineHeight: "100%", marginBottom: "0in" }}
                >
                  <br />
                </p>
                <p
                  align="justify"
                  style={{ lineHeight: "100%", marginBottom: "0in" }}
                >
                  <br />
                </p>
                <p
                  align="justify"
                  style={{ lineHeight: "100%", marginBottom: "0in" }}
                >
                  <font face="Calibri, serif">
                    <font>
                      <b>Witnesses:</b>
                    </font>
                  </font>
                </p>
                <p
                  align="justify"
                  style={{ lineHeight: "100%", marginBottom: "0in" }}
                >
                  <br />
                </p>
                <p
                  align="justify"
                  style={{ lineHeight: "100%", marginBottom: "0in" }}
                >
                  <font face="Calibri, serif">
                    <font>
                      <b>1. 2</b>
                    </font>
                  </font>
                </p>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "1in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <p align="justify" style={{ marginBottom: "0.17in" }}>
                  <br />
                  <br />
                </p>
                <p
                  align="justify"
                  style={{
                    marginLeft: "1in",
                    textIndent: "0.5in",
                    marginBottom: "0.17in",
                  }}
                >
                  <br />
                  <br />
                </p>
                <p
                  align="justify"
                  style={{
                    marginLeft: "1in",
                    textIndent: "0.5in",
                    marginBottom: "0.17in",
                  }}
                >
                  <u>
                    <b>ANNEXTURE-A TO THE SERVICE AGREEMENT</b>
                  </u>
                </p>
                <p align="justify" style={{ marginBottom: "0.17in" }}>
                  (RENO FEE AND THE TERMS OF PAYMENT)
                </p>
                <ol>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0.17in" }}
                    >
                      <font size={3} style={{ fontSize: "12pt" }}>
                        <font size={2} style={{ fontSize: "11pt" }}>
                          In consideration of Services provided under Clause 2
                          and the payment of Consideration and Fee pursuant to
                          Clause 4 of the Service Agreement signed on the
                          Effective Date dated:_____________, Reno shall be
                          entitled to the fixed fee of _________ percent (___%)
                          amounting the United Arab Dirhams ___________only
                          (AED.__________)of the total value of the Project
                          pursuant to the Contract as agreed between the
                          Contractor and the Homeowner. (the{" "}
                        </font>
                        <font size={2} style={{ fontSize: "11pt" }}>
                          <b>“Reno Fee”/ “Consideration”/ “Fee”)</b>
                        </font>
                      </font>
                    </p>
                    <ol>
                      <li>
                        <p
                          align="justify"
                          style={{ lineHeight: "100%", marginBottom: "0in" }}
                        >
                          <font face="Calibri, serif">
                            <font>
                              Reno Fee shall be payable by the Contractor to
                              Reno with the completion of each Milestone. Reno
                              shall deduct Reno Fee as a markup percentage of
                              the total amount of the Milestone to be released
                              through the Escrow Account at the time of
                              completion of each Milestone, upon obtaining
                              approval from the Homeowner or Inspection (if
                              applicable). It is worth mentioning here that in
                              the event of disapproval by the Homeowner against
                              the completed Milestone upon inspection, in
                              consideration of the performance and delivery of
                              the Services, Reno shall be entitled to retain the
                              Contractor Fee unless the deficiency is cured, and
                              satisfactory report is received from the
                              Third-Party Inspection/inspector.
                            </font>
                          </font>
                        </p>
                      </li>
                    </ol>
                  </li>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "0.5in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol>
                  <ol start={2}>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font face="Calibri, serif">
                          <font>
                            If due to any unforeseen circumstances the Project
                            is not successfully completed and or Contractor
                            decides to cancel the Project, the Reno Fee shall be
                            settled on prorated basis meaning thereby Reno shall
                            be entitled to the Reno Fee in percentage subject to
                            the level of completed Milestones.{" "}
                          </font>
                        </font>
                      </p>
                    </li>
                  </ol>
                </ol>
                <p
                  align="justify"
                  style={{ lineHeight: "100%", marginBottom: "0in" }}
                >
                  <br />
                </p>
                <ol>
                  <ol start={3}>
                    <li>
                      <p
                        align="justify"
                        style={{ lineHeight: "100%", marginBottom: "0in" }}
                      >
                        <font face="Calibri, serif">
                          <font>
                            Reno shall be entitled to additional compensation if
                            the Contractor requires the Reno to render Services
                            out of the scope of Services as stipulated under
                            this Agreement. Such compensation for the additional
                            scope of services shall be agreed upon in writing
                            prior to rendering those additional Services.
                          </font>
                        </font>
                      </p>
                    </li>
                  </ol>
                </ol>
                <p
                  style={{
                    lineHeight: "100%",
                    marginLeft: "0.5in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <ol start={2}>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0.17in" }}
                    >
                      <font size={3} style={{ fontSize: "12pt" }}>
                        <font color="#000000">
                          <font size={2} style={{ fontSize: "11pt" }}>
                            All other provisions of the Service Agreement remain
                            in full force and effect, other than any provision
                            that conflicts with the terms and spirit of this
                            Annexure-A, which shall be deemed to be amended
                            appropriately in order to be consistent with this
                            Annexure-A.
                          </font>
                        </font>
                      </font>
                    </p>
                  </li>
                </ol>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "0.5in",
                    marginBottom: "0.17in",
                  }}
                >
                  <br />
                  <br />
                </p>
                <ol start={3}>
                  <li>
                    <p
                      align="justify"
                      style={{ lineHeight: "100%", marginBottom: "0in" }}
                    >
                      <font size={3} style={{ fontSize: "12pt" }}>
                        <font size={2} style={{ fontSize: "11pt" }}>
                          This Annexure-A shall be executed in two (2) original
                          copies. Each Party shall receive one (1) original
                          copy, all of which shall be equally valid and
                          enforceable.
                        </font>
                      </font>
                    </p>
                  </li>
                </ol>
                <p
                  style={{
                    lineHeight: "100%",
                    marginLeft: "0.5in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <p
                  align="justify"
                  style={{
                    lineHeight: "100%",
                    marginLeft: "0.5in",
                    marginBottom: "0in",
                  }}
                >
                  <br />
                </p>
                <p
                  align="justify"
                  style={{ lineHeight: "100%", marginBottom: "0in" }}
                >
                  <font face="Calibri, serif">
                    <font>
                      <b>
                        IN WITNESS WHEREOF Parties hereto having understood the
                        contents hereof placed their respective signatures on
                        the date specified hereunder and at the place set out
                        herein below.{" "}
                      </b>
                    </font>
                  </font>
                </p>
                <p
                  align="justify"
                  style={{ lineHeight: "100%", marginBottom: "0in" }}
                >
                  <br />
                </p>
                <p
                  align="justify"
                  style={{ lineHeight: "100%", marginBottom: "0in" }}
                >
                  <font face="Calibri, serif">
                    <font>
                      <b>_________________________________</b>
                    </font>
                  </font>
                </p>
                <p
                  align="justify"
                  style={{ lineHeight: "100%", marginBottom: "0in" }}
                >
                  <font face="Calibri, serif">
                    <font>
                      <b>Authorized Signatory</b>
                    </font>
                  </font>
                </p>
                <p
                  align="justify"
                  style={{ lineHeight: "100%", marginBottom: "0in" }}
                >
                  <font face="Calibri, serif">
                    <font>
                      <b>RENO:</b>
                    </font>
                  </font>
                </p>
                <p
                  align="justify"
                  style={{ lineHeight: "100%", marginBottom: "0in" }}
                >
                  <font face="Calibri, serif">
                    <font>
                      <b>­Name:</b>
                    </font>
                  </font>
                </p>
                <p
                  align="justify"
                  style={{ lineHeight: "100%", marginBottom: "0in" }}
                >
                  <br />
                </p>
                <p
                  align="justify"
                  style={{ lineHeight: "100%", marginBottom: "0in" }}
                >
                  <br />
                </p>
                <p
                  align="justify"
                  style={{ lineHeight: "100%", marginBottom: "0in" }}
                >
                  <font face="Calibri, serif">
                    <font>
                      <b>________________________________</b>
                    </font>
                  </font>
                </p>
                <p
                  align="justify"
                  style={{ lineHeight: "100%", marginBottom: "0in" }}
                >
                  <font face="Calibri, serif">
                    <font>
                      <b>Authorized Signatory </b>
                    </font>
                  </font>
                </p>
                <p
                  align="justify"
                  style={{ lineHeight: "100%", marginBottom: "0in" }}
                >
                  <font face="Calibri, serif">
                    <font>
                      <b>CONTRACTOR:</b>
                    </font>
                  </font>
                </p>
                <p
                  align="justify"
                  style={{ lineHeight: "100%", marginBottom: "0in" }}
                >
                  <font face="Calibri, serif">
                    <font>
                      <b>Name:</b>
                    </font>
                  </font>
                </p>
                <div title="footer">
                  <p
                    style={{
                      lineHeight: "100%",
                      marginTop: "0.47in",
                      marginBottom: "0in",
                    }}
                  >
                    <br />
                  </p>
                </div>
              </>
            </div>
            <div className="acceptance-bar">
              {/* <label>I have read and agree to the terms and conditions.</label> */}
              <div className="submit-container">
                <button
                  disabled={!isScrolledToBottom}
                  className={isScrolledToBottom ? "submit" : "submit-disabled"}
                  onClick={acceptTerms}
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
