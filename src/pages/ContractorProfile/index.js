import React, { useState } from "react";
import {
  Avatar,
  Button,
  CircularProgress,
  Divider,
  Fade,
  Grid,
  Grow,
  IconButton,
  InputAdornment,
  MenuItem,
  Rating,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { clone, cloneDeep, isArray, isEmpty } from "lodash";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import authActions from "../../redux/reducers/auth/actions";
import { Setting } from "../../utils/Setting";
import CInput from "../../components/CInput";
import GoogleLoginButton from "../../components/SocialLogin/GoogleLoginButton";
import Images from "../../config/images";
import { getApiData } from "../../utils/APIHelper";
import useStyles from "./styles";
import {
  Favorite,
  FavoriteBorder,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { color } from "../../config/theme";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import BlueAbout from "../../components/BlueAbout";
const reviews = [
  {
    id: 1,
    position: "CEO at New Corporation",
    date: "31 Jan, 2023",
    name: "John Smith",
    title: "Efficient Collaborating",
    profile_url: [Images.profile],
    rating: 5,
    images: [Images.building, Images.building],
    isLiked: true,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo euismod mi vel tincidunt. Etiam in volutpat lorem, a molestie massa. Sed vel aliquet tellus. Nulla facilisi.",
    replies: [
      {
        id: 1,
        name: "Jane Doe",
        content:
          "Thank you for your review! We're glad you're enjoying our product.",
        date: "1 feb, 2023",
      },
      {
        id: 2,
        name: "Bob Johnson",
        content:
          "We appreciate your feedback and will continue to improve our product based on customer input.",
        date: "1 feb, 2023",
      },
    ],
  },
  {
    id: 2,
    position: "CEO at New Corporation",
    date: "31 Dec, 2022",
    name: "Jane Doe",
    title: "Efficient Collaborating",
    isLiked: true,
    rating: 4,
    profile_url: [Images.profile],
    images: [Images.building, Images.building],
    content:
      "Sed vestibulum libero ac sapien efficitur, a finibus nibh consectetur. Sed eu eros non enim pharetra aliquam. Aliquam blandit, arcu in fringilla efficitur, ipsum elit sagittis odio, sit amet gravida arcu turpis at tellus.",
    replies: [
      {
        id: 1,
        name: "John Smith",
        content:
          "Thanks for your review! We strive to provide the best possible service for our customers.",
        date: "31 Jan, 2023",
      },
    ],
  },
  {
    id: 3,
    name: "Bob Johnson",
    title: "Could be better",
    position: "CEO at New Corporation",
    date: "26 Jan, 2023",
    isLiked: false,
    rating: 3,
    profile_url: [Images.profile],
    images: [Images.building, Images.building],
    content:
      "Vestibulum vitae aliquet metus. Sed consequat interdum metus, sed commodo turpis bibendum at. Nulla facilisi. Maecenas placerat luctus ligula, sit amet sagittis nibh convallis ut.",
    replies: [
      {
        id: 1,
        name: "Jane Doe",
        content:
          "We're sorry to hear that you didn't have a great experience. Please let us know how we can improve.",
        date: "31 Jan, 2023",
      },
      {
        id: 2,
        name: "John Smith",
        content:
          "Thank you for your feedback. We'll take it into consideration as we work to improve our product.",
        date: "31 Jan, 2023",
      },
    ],
  },
];

const expertiseArea = [
  {
    id: 1,
    title: "Interior design",
  },
  {
    id: 2,
    title: "Renovation",
  },
  {
    id: 3,
    title: "Kitchen",
  },
];

const ContractorProfile = (props) => {
  const classes = useStyles();
  const { userData } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const portfolioList = cloneDeep(userData?.contractor_data?.portfolio) || [];
  const [RList, setRList] = useState(cloneDeep(reviews));
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const totalReview = 480;
  const rating = 4.0;
  const [showAll, setShowAll] = useState(false);
  const displayedImages = showAll ? portfolioList : portfolioList.slice(0, 5);

  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyName, setReplyName] = useState("");
  const [activeInd, setActiveInd] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [showMoreR, setShowMoreR] = useState(false);
  const reviewList = showMoreR ? RList : RList.slice(0, 2);
  const handleReplySubmit = (e, review) => {
    e.preventDefault();
    const newReply = {
      id: review.replies.length + 1,
      name: replyName,
      content: replyContent,
    };
    review.replies.push(newReply);
    setReplyName("");
    setReplyContent("");
    setShowReplyForm(false);
  };

  const handleLikeBtn = (ind) => {
    let dummyArr = [...RList];
    dummyArr.map((e, i) => {
      if (ind === i) {
        e.isLiked = !e.isLiked;
      }
      setRList(dummyArr);
    });
  };

  const handleShare = async () => {
    // try {
    //   await navigator.share({
    //     title: "Share Contractor Profile",
    //     url: userData?.profile_url,
    //   });
    //   console.log("Content shared successfully!");
    // } catch (error) {
    //   console.error("Error sharing content:", error);
    // }
  };

  return (
    <div className={classes.main}>
      <Grid item>
        <img src={portfolioList[0] || ""} className={classes.coverStyle} />
      </Grid>
      <Grid
        container
        style={{
          maxWidth: 1200,
          padding: sm ? "20px 20px " : "20px 40px 50px",
          flexGrow: 1,
          boxSizing: "border-box",
        }}
      >
        <Grid item container sm={6}>
          <Grid
            item
            sm={12}
            alignItems={"flex-start"}
            style={{ paddingRight: md ? 20 : 0 }}
          >
            <img
              src={userData?.profile_url}
              alt="profile"
              className={classes.avtar}
            />
          </Grid>
          <Grid item sm={12}>
            <div className={classes.row}>
              <Typography
                className={`${classes.loginHeaderText} ${classes.mrL3}`}
              >
                {userData?.contractor_data?.company_name}
              </Typography>
              {userData?.is_email_verified && (
                <div className={classes.verifycontainer}>
                  <img
                    src={Images.verified}
                    alt={"verify"}
                    style={{ width: 20, height: 20 }}
                  />
                  <Typography style={{ marginLeft: 4 }}>Verified</Typography>
                </div>
              )}
            </div>
            <div>
              <Typography style={{}} className={classes.address}>
                {userData?.contractor_data?.company_address}
                <img src={Images.Location} alt="Location" />
              </Typography>
              <Typography className={classes.review}>
                {`(${totalReview} Reviews)`}
                <Rating
                  name="single-star"
                  value={1}
                  max={1}
                  precision={1}
                  style={{ marginLeft: 4 }}
                  readOnly
                />
                <span style={{ color: "rgba(233, 181, 92, 1)" }}>
                  {rating.toFixed(1)}
                </span>
              </Typography>
            </div>
          </Grid>
        </Grid>
        <Grid item container sm={6}>
          <Grid xs={12} item>
            {!sm && <div className={classes.avtar} />}

            <div
              className={classes.row}
              style={{
                height: 45,
                justifyContent: sm ? "flex-start" : "flex-end",
              }}
            >
              <Button
                variant="outlined"
                className={classes.btnStyle}
                onClick={handleShare}
              >
                <img src={Images.share} alt="share" />
              </Button>
              <Button
                variant="outlined"
                className={classes.btnStyle}
                style={{ margin: "0px 10px" }}
                onClick={() => {
                  navigator.clipboard.writeText(userData?.profile_url);
                  toast.success("Coppied!", { toastId: 1 });
                }}
              >
                <img src={Images.copy} alt="copy" />
              </Button>
              <Button
                variant="outlined"
                className={classes.btnStyle}
                onClick={() => {
                  navigate("/account-setting");
                }}
              >
                <Typography>Edit Profile</Typography>
              </Button>
            </div>
          </Grid>
        </Grid>
        <div className={classes.separator} />
        <Grid container>
          <Grid item md={6}>
            <Grid item>
              <Typography className={classes.titleStyle}>About Us</Typography>
            </Grid>
            <Grid item>
              <Typography style={{ paddingRight: 20 }}>
                Lorem Ipsum has been the industry's standard dummy text ever
                since. When an unknown printer took a galley of type and
                scrambled it to make a type specimen book. It has survived not
                only five centuries, but also the leap into electronic
                typesetting, remaining essentially.
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            container
            md={6}
            alignItems="center"
            margin={0}
            marginTop={md ? "20px" : 0}
          >
            <Grid item xs={12} sm={6} md={6}>
              <Grid item xs={12}>
                <Typography className={classes.titleStyle}>Rating</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.rating}>
                  {rating.toFixed(1)}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Rating
                  name="half-rating"
                  defaultValue={4}
                  precision={0.5}
                  readOnly
                />
                <Typography className={classes.review}>
                  {`(${totalReview} Reviews)`}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              alignItems="center"
              marginTop={sm ? "20px" : 0}
            >
              <Grid item xs={12}>
                <Typography>Overall rating</Typography>
              </Grid>
              <Grid
                item
                xs={12}
                justifyContent="space-between"
                className={classes.row}
              >
                <span>Service quality</span>
                <Rating name="half-rating" value={1} max={5} readOnly />
              </Grid>
              <Grid
                item
                xs={12}
                className={classes.row}
                justifyContent="space-between"
              >
                <span>Timing</span>
                <Rating name="half-rating" value={1} max={5} readOnly />
              </Grid>
              <Grid
                item
                xs={12}
                className={classes.row}
                justifyContent="space-between"
              >
                <span>communication</span>
                <Rating name="half-rating" value={1} max={5} readOnly />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {isArray(portfolioList) && !isEmpty(portfolioList) && (
          <Grid container style={{ marginTop: 20 }}>
            <Typography className={classes.titleStyle} mb={1}>
              Our Portfolios:
            </Typography>
            <Grid
              item
              container
              rowGap={2}
              // columnGap={1}
            >
              {isArray(displayedImages) && !isEmpty(displayedImages)
                ? displayedImages.map((e, i) =>
                    !showAll && portfolioList.length > 5 && i === 4 ? (
                      <Fade in={true}>
                        <Grid
                          item
                          sm={2.4}
                          xs={4}
                          padding={1}
                          className={classes.imgContainer}
                          onClick={() => {
                            setShowAll(true);
                          }}
                        >
                          <img
                            src={e}
                            alt={`img_${i}`}
                            className={classes.portfolioImg}
                          />
                          <div className={classes.overlay}>
                            <Typography
                              style={{
                                color: "#fff",
                                fontSize: 16,
                                fontWeight: "bold",
                                cursor: "pointer",
                              }}
                            >
                              {`+${portfolioList.length - 4} more`}
                            </Typography>
                          </div>
                        </Grid>
                      </Fade>
                    ) : (
                      <Fade in={true}>
                        <Grid item sm={2.4} xs={4} padding={1}>
                          <img
                            src={e}
                            alt={`img_${i}`}
                            className={classes.portfolioImg}
                          />
                        </Grid>
                      </Fade>
                    )
                  )
                : null}

              {isArray(displayedImages) &&
              !isEmpty(displayedImages) &&
              portfolioList.length > 5 &&
              displayedImages.length === portfolioList.length ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    marginBottom: 10,
                  }}
                >
                  <Button variant="outlined" onClick={() => setShowAll(false)}>
                    Show Less
                  </Button>
                </div>
              ) : null}
            </Grid>
          </Grid>
        )}
        <div className={classes.separator} />
        <Grid contaier>
          <Grid item>
            <Typography className={classes.titleStyle}>Reviews</Typography>
          </Grid>
          <Grid item style={{ marginTop: 20 }}>
            <span style={{ marginRight: 10 }}>Sort by</span>
            <Select value={"Most Recent"} variant="standard">
              <MenuItem value={"Most Recent"} selected>
                Most Recent
              </MenuItem>
              <MenuItem value={"Newest"}>Newest</MenuItem>
            </Select>
          </Grid>
          {isArray(reviewList) &&
            !isEmpty(reviewList) &&
            reviewList.map((review, len) => {
              return (
                <>
                  <div className={classes.separator} />
                  <Grid
                    item
                    container
                    key={review.id}
                    flexWrap="nowrap"
                    alignItems={"flex-start"}
                    columnGap={2}
                    className={classes.reviewMain}
                  >
                    <Grid item className={classes.row}>
                      <Avatar src={review.profile_url} />
                    </Grid>
                    <Grid item>
                      <Typography variant="h6" fontWeight={"bold"}>
                        {review.name}
                      </Typography>
                      <Typography variant="subtitle2">
                        {review.position}
                      </Typography>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Rating
                          value={review.rating}
                          readOnly
                          max={5}
                          sx={{ py: 1 }}
                        />
                        <Typography
                          sx={{ mt: 1 }}
                          variant="caption"
                          color={color.captionText}
                        >
                          | {review.date}
                        </Typography>
                      </div>
                      <Typography fontWeight={"bold"} my={1}>
                        {review.title}
                      </Typography>
                      <Typography fontFamily={"Roobert-Regular !important"}>
                        {review.content}
                      </Typography>
                      <Grid item container columnGap={2} rowGap={1}>
                        {isArray(review.images) &&
                          !isEmpty(review.images) &&
                          review.images.map((ele, ind) => {
                            return (
                              <img
                                src={ele}
                                alt={`img_${ind}`}
                                style={{
                                  width: 117,
                                  height: 88,
                                  borderRadius: 8,
                                }}
                              />
                            );
                          })}
                      </Grid>
                      <div className={classes.separator} />

                      <Grid item container columnGap={1}>
                        <Button
                          variant="outlined"
                          className={classes.btnStyle}
                          onClick={() => {
                            len === activeInd
                              ? setActiveInd(false)
                              : setActiveInd(len);
                          }}
                        >
                          <img src={Images.reply} style={{ width: 14 }} />
                          <Typography
                            variant="caption"
                            color={color.captionText}
                            ml={0.5}
                          >
                            Reply
                          </Typography>
                        </Button>
                        <Button
                          variant="outlined"
                          className={classes.btnStyle}
                          onClick={() => handleLikeBtn(len)}
                        >
                          {review.isLiked ? (
                            <img
                              src={Images.Heart}
                              style={{ width: 24, height: 20 }}
                              alt="heart"
                            />
                          ) : (
                            <FavoriteBorder style={{ color: color.primary }} />
                          )}
                        </Button>
                      </Grid>
                      {activeInd === len ? (
                        <Grid item container alignItems={"center"}>
                          <Grid item sx={3}>
                            <CInput placeholder="reply" />
                          </Grid>
                          <Button
                            sx={{ ml: 1 }}
                            variant="contained"
                            onClick={() => setActiveInd(null)}
                          >
                            submit
                          </Button>
                        </Grid>
                      ) : null}
                      {isArray(review.replies) && !isEmpty(review.replies) && (
                        <div className={classes.replies}>
                          {review.replies.map((reply) => (
                            <div
                              style={{
                                padding: 20,
                                borderLeft: "1px solid #ccc",
                              }}
                            >
                              <div
                                key={reply.id}
                                className={classes.reply}
                                style={{ flexWrap: sm ? "wrap" : "unset" }}
                              >
                                <Typography fontWeight={"bold"}>
                                  <img
                                    src={Images.reply}
                                    alt="reply"
                                    style={{
                                      transform: "rotate(180deg)",
                                      width: 14,
                                      marginRight: 8,
                                    }}
                                  />
                                  Reply from {reply.name}
                                </Typography>
                                <Typography
                                  style={{
                                    fontSize: 16,
                                    lineHeight: 1.5,
                                    letterSpacing: "0.00938em",
                                    marginLeft: 8,
                                  }}
                                  variant="caption"
                                  color={color.captionText}
                                >
                                  | {reply.date}
                                </Typography>
                              </div>
                              <span>{reply?.content}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {len === reviewList.length - 1 && (
                        <>
                          <div className={classes.separator} />
                          {showMoreR ? (
                            <Typography
                              variant="caption"
                              style={{
                                cursor: "pointer",
                                fontWeight: "bold",
                                color: color.primary,
                              }}
                              onClick={() => {
                                setShowMoreR(false);
                              }}
                            >
                              - See Less
                            </Typography>
                          ) : (
                            <Typography
                              variant="caption"
                              style={{
                                cursor: "pointer",
                                fontWeight: "bold",
                                color: color.primary,
                              }}
                              onClick={() => {
                                setShowMoreR(true);
                              }}
                            >
                              + See More
                            </Typography>
                          )}
                        </>
                      )}
                    </Grid>
                  </Grid>
                </>
              );
            })}
        </Grid>
        <Grid container mt={3}>
          <Typography className={classes.titleStyle} mb={1}>
            Expertise Area:
          </Typography>
          <Grid item container columnGap={2} rowGap={2}>
            {expertiseArea.map((ele, ind) => {
              return (
                <Grid item className={classes.chip}>
                  <Typography textTransform={"uppercase"}>
                    {ele.title}
                  </Typography>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid container mt={3}>
          <Typography className={classes.titleStyle} mb={1}>
            Social media
          </Typography>
          <Grid item container columnGap={2} rowGap={2}>
            {userData?.contractor_data?.fb_url && (
              <Grid
                item
                className={classes.chip}
                onClick={() => {
                  window.open(userData?.contractor_data?.fb_url, "_blank");
                }}
              >
                <>
                  <img
                    src={Images.Facebook}
                    style={{ marginRight: 8 }}
                    alt="fbico"
                  />
                  <Typography>Facebook</Typography>
                </>
              </Grid>
            )}
            {userData?.contractor_data?.insta_url && (
              <Grid
                item
                className={classes.chip}
                onClick={() => {
                  window.open(userData?.contractor_data?.insta_url, "_blank");
                }}
              >
                <>
                  <img
                    src={Images.Instagram}
                    style={{ marginRight: 8 }}
                    alt="instaico"
                  />
                  <Typography>Instagram</Typography>
                </>
              </Grid>
            )}
            {userData?.contractor_data?.yt_url && (
              <Grid
                item
                className={classes.chip}
                onClick={() => {
                  window.open(userData?.contractor_data?.yt_url, "_blank");
                }}
              >
                <>
                  <img src={Images.Yt} style={{ marginRight: 8 }} alt="ytico" />
                  <Typography>Youtube</Typography>
                </>
              </Grid>
            )}
            {userData?.contractor_data?.linkedin_url && (
              <Grid
                item
                className={classes.chip}
                onClick={() => {
                  window.open(
                    userData?.contractor_data?.linkedin_url,
                    "_blank"
                  );
                }}
              >
                <>
                  <img
                    src={Images.Linkedin}
                    style={{ marginRight: 8 }}
                    alt="linkedinico"
                  />
                  <Typography>Linkedin</Typography>
                </>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
      <BlueAbout />
    </div>
  );
};

export default ContractorProfile;
