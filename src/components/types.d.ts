
// CONTEXT
// CONTEXT
// CONTEXT

type ContextProps = {
  userContext: UserContext;
  setUserContext: Dispatch<SetStateAction<UserContext>>;
  homeClosingContext: HomeClosingContext;
  setHomeClosingContext: Dispatch<SetStateAction<HomeClosingContext>>;
  routeContext: string;
  setRouteContext: Dispatch<SetStateAction<string>>;
}

// HOME CLOSING CONTEXT
// HOME CLOSING CONTEXT
// HOME CLOSING CONTEXT

type HomeClosingContext = {
  id?: string;
  state: string;
  zipCode: string;
  lenders: LendersContext;
  inspections: InspectionsContext;
  appraisals: AppraisalsContext;
  insurance: InsuranceContext;
  title: TitleContext;
  closingDay: ClosingDayContext;
  tasks: TaskContext[];
  createdAt?: Date;
  updatedAt?: Date;
}

// USER CONTEXT
// USER CONTEXT
// USER CONTEXT

type UserContext = {
  id?: string;
  name: string;
  email: string;
}

// LENDERS CONTEXT
// LENDERS CONTEXT
// LENDERS CONTEXT

type LendersContext = {
  id?: string;
  // trek
  potentialDownPayment?: string;
  potentialHomePrice?: string;
  offeredLenders?: OfferedLenders;
  selectedLender?: SelectedLender;
  // manage
  hasOwnLender?: boolean;
  plaidAccessToken?: string;
  // TODO after Plaid API hook up
  mortgageDetails?: any;
}

type OfferedLenders = Lenders;

type SelectedLender = {
  id?: string;
  name: string;
  nmls: string;
  minCreditScore: string;
  minDownPaymentPercentage: string
  currInterestRate: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// INSPECTIONS CONTEXT
// INSPECTIONS CONTEXT
// INSPECTIONS CONTEXT

type InspectionsContext = {
  id?: string;
  offeredInspectors?: OfferedInspectors;
  selectedInspector?: SelectedInspector;
  hasInspector?: boolean;
  hasInspected?: boolean;
  inspectionDetails?: InspectionDetails
}

type OfferedInspectors = YelpBusinesses;

type SelectedInspector = {
  id?: string;
  name: string;
  imageURL: string;
  rating: number;
  distance: number;
  pitch: string;
  location: string;
  avgCost: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type InspectionDetails = {
  id?: string;
  name: string;
  date: Date;
  cost: string;
}

// APPRAISALS CONTEXT
// APPRAISALS CONTEXT
// APPRAISALS CONTEXT

type AppraisalsContext = {
  id?: string;
  // trek
  selectedAppraiser?: SelectedAppraiser;
  //  manage
  hasAppraiser?: boolean;
  hasAppraised?: boolean;
  appraisalDetails?: AppraisalDetails;
}

type SelectedAppraiser = {
  id?: string;
  name: string;
  imageURL: string;
  rating: number;
  distance: number;
  pitch: string;
  location: string;
  avgCost: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type AppraisalDetails = {
  id?: string;
  name: string;
  date: Date;
  cost: string;
}

// INSURANCE CONTEXT
// INSURANCE CONTEXT
// INSURANCE CONTEXT

type InsuranceContext = {
  id?: string;
  // trek
  selectedPolicy: any;
  //  manage
  hasInsurance: boolean;
  insuranceDetails: any;
  createdAt?: Date;
  updatedAt?: Date;
}

// TITLE CONTEXT
// TITLE CONTEXT
// TITLE CONTEXT

type TitleContext = {
  id?: string;
  // trek
  selectedTitleAgent?: any;
  //  manage
  hasTitleAgent?: boolean;
  hasTitleTransfer?: boolean;
  titleDetails?: TitleDetails;
  createdAt?: Date;
  updatedAt?: Date;
}

type SelectedTitleAgent = {
  id?: string;
  name: string;
  imageURL: string;
  rating: number;
  distance: number;
  pitch: string;
  location: string;
  avgCost: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type TitleDetails = {
  id?: string;
  name: string;
  date: Date;
  cost: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// CLOSING DAY CONTEXT
// CLOSING DAY CONTEXT
// CLOSING DAY CONTEXT

type ClosingDayContext = any;

// TASK CONTEXT
// TASK CONTEXT
// TASK CONTEXT
type TaskContext = {
  id?: string;
  category: string;
  task: string;
  status: string;
  priority: string;
  createdAt?: string;
  updatedAt?: string;
}

// COST CONTEXT
// COST CONTEXT
// COST CONTEXT
type CostContext = any;

// OTHER TYPES
// OTHER TYPES
// OTHER TYPES

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
  id?: string,
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
