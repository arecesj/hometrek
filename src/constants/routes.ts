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
  INSPECTIONS = "Inspections",
  APPRAISALS = "Appraisals",
  INSURANCE = "Insurance",
  TITLE = "Title",
  CLOSINGDAY = "Closing Day",
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
  [manageRouteName.INSPECTIONS]: {
    route: "/manage/inspections",
  },
  [manageRouteName.APPRAISALS]: {
    route: "/manage/appraisals",
  },
  [manageRouteName.INSURANCE]: {
    route: "/manage/insurance",
  },
  [manageRouteName.TITLE]: {
    route: "/manage/title",
  },
  [manageRouteName.CLOSINGDAY]: {
    route: "/manage/closing-day",
  },
  [manageRouteName.SETTINGS]: {
    route: "/manage/settings",
  },
}
