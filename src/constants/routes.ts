export enum universalRouteName {
  HOME = "Home",
  SIGNUP = "Sign up",
  LOGIN = "Log in",
}

export enum trekRouteName {
  DASHBOARD = "Dashboard",
  LENDERS = "Lenders",
  INSPECTIONS = "Inspections",
  APPRAISALS = "Appraisals",
  INSURANCE = "Insurance",
  TITLE = "Title",
  CLOSINGDAY = "Closing Day",
  SETTINGS = "Settings",
}

export enum manageRouteName {
  DASHBOARD = "Dashboard",
  LENDERS = "Lenders",
  LENDERS_EDIT = "Lenders Edit",
  INSPECTIONS = "Inspections",
  INSPECTIONS_EDIT = "Inspections Edit",
  APPRAISALS = "Appraisals",
  APPRAISALS_EDIT = "Appraisals Edit",
  INSURANCE = "Insurance",
  INSURANCE_EDIT = "Insurance Edit",
  TITLE = "Title",
  TITLE_EDIT = "Title Edit",
  CLOSINGDAY = "Closing Day",
  CLOSINGDAY_EDIT = "Closing Day Edit",
  SETTINGS = "Settings",
}

export const universalRoutes = {
  [universalRouteName.HOME]: {
    route: "/",
  },
  [universalRouteName.SIGNUP]: {
    route: "/signup",
  },
  [universalRouteName.LOGIN]: {
    route: "/login",
  },
}

export const trekRoutes = {
  [trekRouteName.DASHBOARD]: {
    route: "/trek/dashboard",
  },
  [trekRouteName.LENDERS]: {
    route: "/trek/lenders",
  },
  [trekRouteName.INSPECTIONS]: {
    route: "/trek/inspections",
  },
  [trekRouteName.APPRAISALS]: {
    route: "/trek/appraisals",
  },
  [trekRouteName.INSURANCE]: {
    route: "/trek/insurance",
  },
  [trekRouteName.TITLE]: {
    route: "/trek/title",
  },
  [trekRouteName.CLOSINGDAY]: {
    route: "/trek/closing-day",
  },
  [trekRouteName.SETTINGS]: {
    route: "/trek/settings",
  },
}

export const manageRoutes = {
  [manageRouteName.DASHBOARD]: {
    route: "/manage/dashboard",
  },
  [manageRouteName.LENDERS]: {
    route: "/manage/lenders",
  },
  [manageRouteName.LENDERS_EDIT]: {
    route: "/manage/lenders/edit",
  },
  [manageRouteName.INSPECTIONS]: {
    route: "/manage/inspections",
  },
  [manageRouteName.INSPECTIONS_EDIT]: {
    route: "/manage/inspections/edit",
  },
  [manageRouteName.APPRAISALS]: {
    route: "/manage/appraisals",
  },
  [manageRouteName.APPRAISALS_EDIT]: {
    route: "/manage/appraisals/edit",
  },
  [manageRouteName.INSURANCE]: {
    route: "/manage/insurance",
  },
  [manageRouteName.INSURANCE_EDIT]: {
    route: "/manage/insurance/edit",
  },
  [manageRouteName.TITLE]: {
    route: "/manage/title",
  },
  [manageRouteName.TITLE_EDIT]: {
    route: "/manage/title/edit",
  },
  [manageRouteName.CLOSINGDAY]: {
    route: "/manage/closing-day",
  },
  [manageRouteName.CLOSINGDAY_EDIT]: {
    route: "/manage/closing-day/edit",
  },
  [manageRouteName.SETTINGS]: {
    route: "/manage/settings",
  },
}
