import { UrlObject } from "url";

export enum routeNames {
  HOME = "Home",
  DASHBOARD = "Dashboard",
  LENDERS = "Lenders",
  INSPECTIONS = "Inspections",
  INSURANCE = "Insurance",
  TITLE = "Title",
  CLOSINGDAY = "Closing Day",
  SETTINGS = "Settings",
}

export const routes = {
  [routeNames.HOME]: {
    route: "/",
  },
  [routeNames.DASHBOARD]: {
    route: "/trek/dashboard",
  },
  [routeNames.LENDERS]: {
    route: "/trek/lenders",
  },
  [routeNames.INSPECTIONS]: {
    route: "/trek/inspections",
  },
  [routeNames.INSURANCE]: {
    route: "/trek/insurance",
  },
  [routeNames.TITLE]: {
    route: "/trek/title",
  },
  [routeNames.CLOSINGDAY]: {
    route: "/trek/closing-day",
  },
  [routeNames.SETTINGS]: {
    route: "/trek/settings",
  },

}