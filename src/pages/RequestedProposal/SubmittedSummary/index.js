import {
  Button,
  CircularProgress,
  FormHelperText,
  Grid,
  InputLabel,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CAutocomplete from "../../../components/CAutocomplete";
import { useEffect, useState } from "react";
import { isArray, isEmpty } from "lodash";
import { useTheme } from "@mui/styles";
import { HighlightOffOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import authActions from "../../../redux/reducers/auth/actions";
import { getAPIProgressData, getApiData } from "../../../utils/APIHelper";
import { Setting } from "../../../utils/Setting";
import CInput from "../../../components/CInput";
import Images from "../../../config/images";
import { toast } from "react-toastify";

const SubmittedSummary = ({ villa, handleSetTabValue }) => {
  const errorObj = {
    scpErr: false,
    scpMsg: "",
    typeErr: false,
    typeMsg: "",
    nameErr: false,
    nameMsg: "",
    cNameErr: false,
    cNameMsg: "",
    descriptionErr: false,
    descriptionMsg: "",
    emailErr: false,
    emailMsg: "",
    documentErr: false,
    documentMsg: "",
  };

  const dispatch = useDispatch();
  const { setProposalDetails } = authActions;

  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));

  const [projectType, setProjectType] = useState(villa?.project_type);
  const [customerName, setCustomerName] = useState(villa?.username);
  const [description, setDescription] = useState(villa?.description);
  const [name, setName] = useState(villa?.name);
  const [email, setEmail] = useState(villa?.customer_email);
  const [scope, setScope] = useState(villa?.scope_of_work);
  const { start_date, end_date, exp_id, milestone } = villa;

  const [expertiseList, setExpertiesList] = useState([]);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [uploadLoader, setUploadLoader] = useState(false);
  const [originalDoc, setOriginalDoc] = useState([]);
  const [deleteIND, setDeleteIND] = useState(null);
  const [errObj, setErrObj] = useState(errorObj);
  const { proposalDetails } = useSelector((state) => state.auth);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getprojectList();
  }, []);

  function checkImgSize(img) {
    let valid = true;
    if (img.size > 3145728) {
      valid = false;
    } else {
      valid = true;
    }
    return valid;
  }

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const convertPhotoOriginToFiles = (budget, budInd) => {
    const photoOriginFiles = budget.photo_origin.map((base64String, index) => {
      const filename = `photo_origin_${index + 1}.jpg`;
      return convertBase64ToImageFile(base64String, filename);
    });

    return photoOriginFiles;
  };

  async function UploadFile(img) {
    const nArr1 = originalDoc ? [...originalDoc] : [];
    for (let i = 0; i < img.length; i++) {
      const base64Data = await convertToBase64(img[i]);
      nArr1.push(base64Data);
    }
    setOriginalDoc(nArr1);

    setErrObj({
      ...errObj,
      photoErr: false,
      photoMsg: "",
    });
  }

  async function getprojectList() {
    try {
      const response = await getApiData(
        `${Setting.endpoints.projectlist}`,
        "GET",
        {}
      );
      if (response.success) {
        if (isArray(response?.data) && !isEmpty(response?.data)) {
          setExpertiesList(response?.data);
        } else {
          setExpertiesList([]);
        }
      }
    } catch (error) {
      console.log("🚀 ~ file: index.js:63 ~ by id api ~ error:", error);
    }
  }

  function displayImagesView() {
    if (isArray(originalDoc) && originalDoc?.length > 0) {
      return originalDoc?.map((item, index) => {
        let imgUrl = "";
        if (item.image) {
          imgUrl = item.image;
        } else if (typeof item === "object" && item instanceof Blob) {
          imgUrl = URL.createObjectURL(item);
        } else {
          imgUrl = item;
        }
        return (
          <div
            style={{
              display: "flex",
              border: "1px solid #F2F3F4",
              borderRadius: 6,
              marginBottom: 10,
              padding: 3,
            }}
          >
            <img
              style={{
                width: 60,
                height: 70,
                borderRadius: 6,
                marginRight: 20,
                objectFit: "cover",
              }}
              src={imgUrl}
              alt="Budget Photos"
            />
            <div style={{ margin: "auto 0" }}>
              <Typography
                style={{
                  fontFamily: "Poppins-Regular",
                  fontWeight: "500",
                  color: "#202939",
                  fontSize: 18,
                }}
              >
                {item?.name || `Budget Image ${index + 1}` || ""}
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "auto",
                marginRight: 10,
              }}
            >
              {deleteIND === index ? (
                <CircularProgress style={{ color: "#274BF1" }} size={26} />
              ) : (
                <HighlightOffOutlined
                  style={{
                    zIndex: 10,
                    cursor: "pointer",
                    fontSize: 28,
                    color: "#8C92A4",
                  }}
                  onClick={() => {
                    const nArr = [...originalDoc];
                    nArr.splice(index, 1);
                    setOriginalDoc(nArr);
                    dispatch(
                      setProposalDetails({
                        ...proposalDetails,
                        project: nArr,
                      })
                    );
                  }}
                />
              )}
            </div>
          </div>
        );
      });
    }
  }

  const convertBase64ToImageFile = (base64String, filename) => {
    const arr = base64String.split(",");
    const mimeType = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const uint8Array = new Uint8Array(n);

    while (n--) {
      uint8Array[n] = bstr.charCodeAt(n);
    }
    const file = new File([uint8Array], filename, { type: mimeType });

    return file;
  };

  const convertProjectToFiles = () => {
    if (villa?.project_image) {
      const projectFiles = [];
      const files = villa?.project_image.map((item) => item.image);
      projectFiles.push(files);
      return projectFiles;
    } else {
      const projectFiles = villa?.project_image?.map((base64String, index) => {
        const filename = `project_image_${index + 1}.jpg`;
        return convertBase64ToImageFile(base64String, filename);
      });

      return projectFiles;
    }
  };

  function updateSummary() {
    const projectfiles = convertProjectToFiles();
    const transformedData = {
      email: email,
      name: name,
      username: customerName,
      project_type: projectType,
      exp_id: exp_id,
      description: description,
      start_date: start_date,
      end_date: end_date,
      project_image: projectfiles,
      proposal: JSON.stringify({
        scope_of_work: scope,
        milestone_details: milestone?.map((item) => {
          let mainObj = {
            milestone_name: item?.milestone_name,
            description: item?.description,
            start_date: item?.start_date,
            end_date: item?.end_date,
            budget_item: item?.budget.map((item) => {
              const obj = {
                name: item?.name,
                budget_id: item?.id,
                material_type: item?.material_type,
                material_unit: item?.material_unit || "",
                material_unit_price: item?.material_unit_price || "0",
                qty: item?.qty || "0",
                manpower_rate: item?.manpower_rate || "0",
                days: item?.days || "0",
                specification: item?.specification,
              };
              return obj;
            }),
          };
          return mainObj;
        }),
      }),
    };
    milestone?.budget?.forEach((budget, index) => {
      const photoOriginFiles = convertPhotoOriginToFiles(budget);
      transformedData[`budget_image_${index + 1}`] = photoOriginFiles;
    });
    updateproposalApicall(transformedData);
  }

  async function updateproposalApicall(data) {
    setButtonLoader(true);
    try {
      const response = await getAPIProgressData(
        `${Setting.endpoints.updateProposal}/${villa?.proposal_id}`,
        "POST",
        data,
        true
      );
      if (response.success) {
        dispatch(setProposalDetails({}));
      } else {
        toast.error(response.message);
      }
      setButtonLoader("");
    } catch (error) {
      toast.error(error.toString());
      setButtonLoader("");
    }
  }

  function handleSave() {
    updateSummary();
    handleSetTabValue();
  }
  return (
    <Stack height="100%" overflow="auto" gap="16px" paddingRight="8px">
      <Grid container flex columnGap={1} wrap={md ? "wrap" : "nowrap"}>
        <Grid item xs={6}>
          <CAutocomplete
            label="Type"
            placeholder="Select project type"
            value={expertiseList.find(
              (option) => option.project_name === projectType
            )}
            onChange={(e, newValue) => {
              setProjectType(newValue.project_name);
              setErrObj({
                ...errObj,
                typeErr: false,
                typeMsg: "",
              });
            }}
            options={expertiseList}
            getOptionLabel={(option) => option?.project_name}
            error={errObj.typeErr}
            helpertext={errObj.typeMsg}
          />
        </Grid>
        <Grid item xs={6}>
          <CInput
            label="Name"
            placeholder="Write here..."
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrObj({
                ...errObj,
                nameErr: false,
                nameMsg: "",
              });
            }}
            inputProps={{ maxLength: 50 }}
            error={errObj.nameErr}
            helpertext={errObj.nameMsg}
          />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <CInput
          multiline={true}
          rows={3}
          label="Description"
          placeholder="Write here..."
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setErrObj({
              ...errObj,
              descriptionErr: false,
              descriptionMsg: "",
            });
          }}
          error={errObj.descriptionErr}
          helpertext={errObj.descriptionMsg}
        />
      </Grid>
      <Grid container flex gap="16px">
        <Grid item xs={5.5}>
          <CInput
            label="Customer Name"
            placeholder="Write here..."
            value={customerName}
            onChange={(e) => {
              setCustomerName(e.target.value);
              setErrObj({
                ...errObj,
                cNameErr: false,
                cNameMsg: "",
              });
            }}
            inputProps={{ maxLength: 50 }}
            error={errObj.cNameErr}
            helpertext={errObj.cNameMsg}
          />
        </Grid>
        <Grid item xs={6}>
          <CInput
            label="Customer Email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrObj({
                ...errObj,
                emailErr: false,
                emailMsg: "",
              });
            }}
            error={errObj.emailErr}
            helpertext={errObj.emailMsg}
          />
        </Grid>
        <Grid item xs={12}>
          <CInput
            multiline={true}
            rows={4}
            label="Scope of work"
            placeholder="Write here..."
            value={scope}
            onChange={(e) => {
              setScope(e.target.value);
              setErrObj({
                ...errObj,
                scpErr: false,
                scpMsg: "",
              });
            }}
            error={errObj.scpErr}
            helpertext={errObj.scpMsg}
          />
        </Grid>
        <Grid item xs={12}>
          {uploadLoader ? (
            <Grid
              item
              container
              justifyContent={"center"}
              alignItems={"center"}
              sx={12}
              minHeight={220}
            >
              <CircularProgress style={{ color: "#274BF1" }} size={26} />
            </Grid>
          ) : (
            <>
              <InputLabel shrink error={errObj.documentErr}>
                Upload supporting pictures or documentation
              </InputLabel>
              <Grid
                item
                container
                xs={12}
                style={{
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: 170,
                    border: "1px dashed #9CA3AF",
                    borderRadius: 4,
                    gap: 1,
                  }}
                >
                  <div style={{ width: "24px", height: "24px" }}>
                    <img src={Images.upload_icon} alt="upload-icon"></img>
                  </div>
                  <InputLabel>
                    <b>
                      <span
                        style={{
                          cursor: "pointer",
                          color: "#2563EB",
                        }}
                      >
                        Click to upload Images
                      </span>{" "}
                      or drag and drop{" "}
                    </b>
                  </InputLabel>
                  <InputLabel style={{ fontSize: 12, color: "#6B7280" }}>
                    {"PNG, JPG, (max size 1200*800)"}
                  </InputLabel>
                </div>
                <input
                  type="file"
                  accept="image/jpeg, image/png, image/jpg"
                  multiple
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0,
                    cursor: "pointer",
                    width: "100%",
                  }}
                  onChange={(e) => {
                    const chosenFiles = Array.prototype.slice.call(
                      e.target.files
                    );
                    const rejected = chosenFiles.every(
                      (item) =>
                        item.type === "image/png" ||
                        item.type === "image/jpg" ||
                        item.type === "image/jpeg"
                    );
                    if (!rejected) {
                      toast.error("You can only add jpeg,jpg or png");
                    }
                    const filteredFiles = chosenFiles.filter(
                      (item) =>
                        item.type === "image/png" ||
                        item.type === "image/jpg" ||
                        item.type === "image/jpeg"
                    );

                    let showMsg = false;
                    let limit = false;
                    const newArr = [...originalDoc];
                    filteredFiles.map((item) => {
                      const bool = checkImgSize(item);
                      if (bool && newArr.length < 5) {
                        newArr.push(item);
                      } else if (newArr.length >= 4) {
                        limit = true;
                      } else {
                        showMsg = true;
                      }
                    });
                    if (limit) {
                      toast.error("You can upload maximum 5 files");
                    } else if (showMsg) {
                      toast.error(
                        "Some registraion you are attempting to upload exceeds the maximum file size limit of 3 MB. Please reduce the size of your image and try again."
                      );
                    }
                    let shouldUpload =
                      isArray(newArr) &&
                      !isEmpty(newArr) &&
                      newArr?.filter((elem) => typeof elem !== "string");
                    if (shouldUpload) {
                      UploadFile(shouldUpload);
                    }
                  }}
                />
                <FormHelperText
                  error={errObj.documentErr}
                  style={{ fontFamily: "Poppins-Regular" }}
                >
                  {errObj.documentMsg}
                </FormHelperText>
              </Grid>
              <Grid
                item
                style={{
                  marginTop: "20px",
                  overflowY: "auto",
                  maxHeight: "170px",
                  width: "100%",
                }}
              >
                {displayImagesView()}
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
      <Button
        variant="contained"
        style={{
          padding: "8px 24px",
          marginLeft: "auto",
        }}
        onClick={handleSave}
      >
        {buttonLoader ? (
          <CircularProgress size={26} style={{ color: "#fff" }} />
        ) : (
          "Save"
        )}
      </Button>
    </Stack>
  );
};

export default SubmittedSummary;
