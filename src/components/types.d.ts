
/* CONTEXT TYPES */
type ContextProps = {
  trekContext: TrekContext;
  setTrekContext: Dispatch<SetStateAction<TrekContext>>;
  aggContext: AggContext;
  setAggContext: Dispatch<SetStateAction<AggContext>>;
}

/* TREK CONTEXT TYPES */
type TrekContext = {
  user: UserContext;
  lenders: LendersContext;
  inspections: InspectionsContext;
  appraisals: AppraisalsContext;
  insurance: InsuranceContext;
  title: TitleContext;
  closingDay: ClosingDayContext;
  route: trekRouteName;
}

type UserContext = {
  name: string;
  state: string;
  zipCode: string;
  date: string;
}

type LendersContext = {
  potentialDownPayment: string;
  potentialHomePrice: string;
  offeredLenders: OfferedLenders;
  selectedLender: SelectedLender;
}

type OfferedLenders = Lenders;

type SelectedLender = {
    name: string;
    nmls: number;
    minCreditScore: number;
    minDownPaymentPercentage: number
}

type InspectionsContext = {
  offeredInspectors: OfferedInspectors;
  selectedInspector: SelectedInspector;
}

type OfferedInspectors = YelpBusinesses;

type SelectedInspector = {
  id: string;
  name: string;
  rating: string;
  location: string;
  display_phone: string;
}

type AppraisalsContext = {
  selectedAppraiser: any;
}

type InsuranceContext = {
  selectedPolicy: any;
}

type TitleContext = {
  selectedInsurance: any;
}

type ClosingDayContext = any;

/* AGG CONTEXT TYPES */
type AggContext = {
  user: AggUserContext;
  lenders: AggLendersContext;
  inspections: AggInspectionsContext;
  appraisals: AggAppraisalsContext;
  insurance: AggInsuranceContext;
  title: AggTitleContext;
  closingDay: AggClosingDayContext;
  route: aggRouteName;
}

type AggUserContext = {
  isLoggedIn: boolean;
  userSID: string;
};

type AggLendersContext = {
  hasLender: boolean;
  accessToken: string;
  mortgageDetails: any;
}

type AggInspectionsContext = {
  hasInspector: boolean;
  hasInspected: boolean;
  inspectionDetails: AggInspectionDetails;
}

type AggAppraisalsContext = {
  hasAppraiser: boolean;
  hasAppraised: boolean;
  appraisalDetails: AggAppraisalDetails;
}

type AggInsuranceContext = {
  hasInsurance: boolean;
}

type AggTitleContext = {
  hasTitle: boolean;
  hasTitleInsurance: boolean;
}

type AggClosingDayContext = {
  hasClosed: boolean;
}

type AggInspectionDetails = {
  name: string;
  date: Date;
  cost: string;
}

type AggAppraisalDetails = {
  name: string;
  date: Date;
  cost: string;
}

/* OTHER TYPES */
type Lenders = {
  [key: string]: {
    name: string;
    nmls: number;
    minCreditScore: number;
    minDownPaymentPercentage: number
  }
}

type YelpBusinesses = YelpBusiness[]

type YelpBusiness = {
  id: string,
  alias: string,
  name: string,
  image_url: string,
  is_closed: boolean,
  url: string,
  review_count: number,
  categories: YelpCategory[],
  rating: number,
  coordinates: YelpCoordinates,
  transactions: any[],
  location: YelpLocation,
  phone: string,
  display_phone: string,
  distance: number,
  attributes:YelpAttributes
}

type YelpCategory = {
  alias: string,
  title: string,
}

type YelpCoordinates = {
  latitude: number,
  longitude: number,
}

type YelpLocation = {
  address1: string | null,
  address2: string | null,
  address3: string | null,
  city: string,
  zip_code: string,
  country: string,
  state: string,
  display_address: string[]
}

type YelpAttributes = {
  business_temp_closed: string | null,
  waitlist_reservation: string | null
}
