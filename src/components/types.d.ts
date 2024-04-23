type ContextProps = {
  context: ContextStateProps;
  setContext: Dispatch<SetStateAction<ContextStateProps>>;
}
type ContextStateProps = {
  user: UserContext;
  lenders: LendersContext;
  inspections: InspectionsContext;
  appraisals: AppraisalsContext;
  insurance: InsuranceContext;
  title: TitleContext;
  closingDay: ClosingDayContext;
  route: routeNames;
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
  selectedLender: any;
}

type OfferedLenders = Lenders;

type InspectionsContext = {
  offeredInspectors: OfferedInspectors;
  selectedInspector: any;
}
type OfferedInspectors = YelpBusinesses;

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

type LendersUserData = {
  name: string;
  state: string;
  downPayment: string;
  // potentialDownPayment: string;
  // potentialHomePrice: string;
}

type InspectionsUserData = {
  zipCode: string;
}

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
