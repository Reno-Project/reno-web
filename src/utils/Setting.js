const baseUrl = process.env.REACT_APP_BASE_URL;
export const Setting = {
  baseUrl,
  api: baseUrl,
  socketURL: baseUrl, ///'https://reno-home.azurewebsites.net',
  GOOLE_MAPS_KEY: "AIzaSyBO1ZlrBp68Oj02lrpoF4gJ7DbuzaFQLNA",
  FACEBOOK_APP_ID: "",
  GOOGLE_CLIENT_ID:
    "271291217173-edt0r9crj6puar4o75r2ipagf0inimue.apps.googleusercontent.com",
  GOOGLE_CLIENT_SECRET_KEY: "",

  endpoints: {
    me: "api/user/me",
    login: "api/user/login",
    signup: "api/user/signup",
    googleData: "auth/google",
    verifyOtp: "api/user/verify-otp",
    resendOtp: "api/user/resend-otp",
    updatepassword: "api/user/update-password",
    updatePasswordOtp: "api/user/update-password-otp",
    addContractorDetails: "api/contractor/add-contractor-details",
    addPortfolio: "api/contractor/add-portfolio",
    addBillingInfo: "api/contractor/add-billing-info",
    forgotPassword: "api/user/forgot-password",
    contarctorById: "api/contractor",
    deleteportfolio: "api/contractor/delete-portfolio",
    updatesecuritysettings: "api/user/update-security-settings",
    updateUserSetting: "api/user/update-user-settings",
    twoFactorSetting: "api/user/verified-two-factor",
    logoutall: "api/user/logout-all",
    logindeviceslist: "api/user/login-devices-list",
    projectlist: "api/project/project-list",
    milestoneProposalList: "api/project/milestone-project-list",
    singleDeviceLogout: "api/user/other-devices-logout/",
    createproposal: "api/contractor/create-proposal",
    directproposal: "api/contractor/create-direct-proposal",
    addFCMToken: "api/user/add-fcm-token",
    logout: "api/user/logout",
    createMilestone: "api/project/create-milestone-project",
    createBudget: "api/project/create-proposal-budget-item",
    budgetList: "api/project/list-proposal-budget-item",
    projectDetails: "api/project/my-projects",
    uploadTemplate: "api/project/upload-template",
    deleteTemplate: "api/project/upload-template-delete",
    listcontractorproject: "api/project/list-contractor-project",
    deleteImage: "api/contractor/delete-image",
    deleteMilestone: "api/project/milestone-proposal-delete",
    deleteBudget: "api/project/delete-budget-item",
    proposalDetails: "/api/project/project-details",
    getProject: "api/project/get-projects",
    deleteSummaryImage: "api/user/delete-image",
    alreadySentProposal: "api/project/already-proposal",
    notificationList: "api/user/notifications-list",
    paymentList: "api/stripe/payment-transaction-list",
    paymentRequest: "api/contractor/add-payment-request",
    milestoneCount: "api/project/project-common-data",
    submitMilestone: "api/project/milestone-delivery",
    updateMilestone: "api/project/single-milestone-update",
    createSingleBudget: "api/project/create-single-proposal-budget-item",
    updateSingleBudget: "/api/project/single-proposal-budget-update",
    budgetDelete: "api/project/delete-budget-item",
    milestoneDelete: "api/project/milestone-proposal-delete",
    contractorStates: "api/contractor/stats",
    balanceBreakdown: "api/project/balance-details",
    createUser: "api/contractor/user",
  },

  JS_Regex: {
    email_Regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    pwd1_Regex: /^.{8,}$/, // /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    phone_Regex: /^(\+44\s?\d{10}|0044\s?\d{10}|0\s?\d{10})?$/,
    alphabatic_Regex: /^[A-Za-z]+$/,
  },

  page_name: {},
};
