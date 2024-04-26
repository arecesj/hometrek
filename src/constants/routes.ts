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

export enum aggRouteName {
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

export const aggRoutes = {
  [aggRouteName.DASHBOARD]: {
    route: "/agg/dashboard",
  },
  [aggRouteName.LENDERS]: {
    route: "/agg/lenders",
  },
  [aggRouteName.INSPECTIONS]: {
    route: "/agg/inspections",
  },
  [aggRouteName.APPRAISALS]: {
    route: "/agg/appraisals",
  },
  [aggRouteName.INSURANCE]: {
    route: "/agg/insurance",
  },
  [aggRouteName.TITLE]: {
    route: "/agg/title",
  },
  [aggRouteName.CLOSINGDAY]: {
    route: "/agg/closing-day",
  },
  [aggRouteName.SETTINGS]: {
    route: "/agg/settings",
  },
}
