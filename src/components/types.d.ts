
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
  createdAt?: string;
  updatedAt?: string;
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
  mortgageDetails?: MortgageDetails;
  assets?: any;
}

type OfferedLenders = Lenders;

type SelectedLender = {
  id?: string;
  name: string;
  nmls: string;
  minCreditScore: string;
  minDownPaymentPercentage: string
  currInterestRate: string;
  createdAt?: string;
  updatedAt?: string;
}

type MortgageDetails = {
  accountId?: string;
  accountNumber?: string;
  currentLateFee?: number;
  escrowBalance?: number;
  hasPMI?: boolean;
  hasPrepaymentPenalty?: boolean;
  interestRatePercentage?: number;
  interestRateType?: string;
  lastPaymentAmount?: number;
  lastPaymentDate?: string;
  loanTerm?: string;
  loanTypeDescription?: string;
  maturityDate?: string;
  nextMonthlyPayment?: number;
  nextPaymentDueDate?: string;
  originationDate?: string;
  originationPrincipalAmount?: number;
  pastDueAmount?: number;
  city?: string;
  country?: string;
  postalCode?: string;
  region?: string;
  street?: string;
  ytdInterestPaid?: number;
  ytdPrincipalPaid?: number;
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
  inspectionDetails?: InspectionDetails;
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
  createdAt?: string;
  updatedAt?: string;
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
  createdAt?: string;
  updatedAt?: string;
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
  canopyPullId: string;
  insuranceDetails?: InsuranceDetails;
  createdAt?: string;
  updatedAt?: string;
}

// https://www.mass.gov/info-details/understanding-home-insurance
type InsuranceDetails = {
  id?: string;
  insuranceProviderName?: string;
  noPolicies?: boolean;
  noDocuments?: boolean;
  // will need its own table
  // only grab HOMEOWNERS (pull.policies.filter(p => p.policy_type === "HOMEOWNERS")) - let's not store what we don't need
  policy?: PolicyDetails;
  agent: AgentDetails;
  createdAt?: string;
  updatedAt?: string;
}

type PolicyDetails = {
  id?: string;
  policyId?: string;
  name?: string;
  description?: string;
  carrierPolicyNumber?: string;
  policyType?: string;
  effectiveDate?: string;
  expiryDate?: string;
  renewalDate?: string;
  canceledDate?: string;
  totalPremiumCents?: number;
  carrierName?: string;
  status?: string;
  limitedAccess?: boolean;
  formOfBusiness?: any;
  deductibleCents?: number;
  paidInFull?: boolean;
  amountDueCents?: number;
  amountPaidCents?: number;
  isSelected?: boolean;
  totalEstimatedAnnualPremiumCents?: number;
  totalMinimumPremiumCents?: number;
  totalDepositPremiumCents?: number;
  isMonoline?: boolean;
  // Only store first for MVP
  // As a new feature; we can ask which one we want to store - should be an easy build
  dwellings?: Dwelling;
  // store all since people usually buy a house with their partner
  namedInsureds?: NamedInsured[];
  createdAt?: string;
  updatedAt?: string;
}

type Dwelling = {
  id?: string;
  dwellingId?: string;
  replacementCostCents?: number;
  cashValueCents?: number;
  propertyDataFetched?: boolean;
  lossSettlementType?: string;
  extendedReplacementCostPercent?: number;
  // keep in mind this is gonna be funky since it's its own object and we dont need another table
  addressId?: string;
  fullAddress?: string;
  country?: string;
  addressNature?: string;
  number?: string;
  street?: string;
  // this is address.type
  addressType?: string;
  city?: string;
  state?: string;
  secUnitType?: string;
  secUnitNum?: string;
  zip?: string
  // store all since they're all part of the insurance
  coverages?: CoverageDetails[];
  propertyData?: PropertyData;
  createdAt?: string;
  updatedAt?: string;
}

type CoverageDetails = {
  id?: string;
  dwellingCoverageId?: string;
  name?: string;
  friendlyName?: string;
  premiumCents?: number;
  perPersonLimitCents?: number;
  perPersonUnlimited?: boolean;
  perIncidentLimitCents?: number;
  perIncidentUnlimited?: boolean;
  perIncidentLimitPercent?: number;
  deductibleCents?: number;
  deductiblePercent?: string;
  isDeclined?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

type PropertyData = {
  id?: string;
  // diff from dwellingID - this is from Canopy - sorry, i know it's annoying
  canopyDwellingId?: string;
  propertyDataId?: string;
  apn?: string;
  class?: string;
  subType?: string;
  yearBuilt?: number;
  constructionType?: string;
  wallType?: string;
  foundationType?: string;
  frameType?: string;
  roofCover?: string;
  roofShape?: string;
  coolingType?: string;
  heatingType?: string;
  heatingFuel?: string;
  energyType?: string;
  sewerType?: string;
  buildingShape?: string;
  constructionQuality?: string;
  hasFireplace?: boolean;
  numFireplaces?: number;
  fireplaceType?: string;
  hasPool?: boolean;
  poolType?: string;
  squareFt?: number;
  numBeds?: number;
  numBathsFull?: number;
  numBathsPartial?: number;
  numStories?: number;
  numUnits?: number;
  garageType?: string;
  garageSquareFt?: number;
  numParkingSpaces?: number;
  assessedImprovementValueCents?: number;
  assessedLandValueCents?: number;
  assessedTotalValueCents?: number;
  marketImprovementValueCents?: number;
  marketLandValueCents?: number;
  marketTotalValueCents?: number;
  owner1FirstName?: string;
  owner1LastName?: string;
  owner2FirstName?: string;
  owner2LastName?: string;
  owner3FirstName?: string;
  owner3LastName?: string;
  owner4FirstName?: string;
  owner4LastName?: string;
  firstMortgageAmountCents?: number;
  firstMortgageLender?: string;
  secondMortgageAmountCents?: number;
  secondMortgageLender?: string;
  purchaseDate?: string;
  purchasePriceCents?: number;
  lastUpdateDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

type NamedInsured = {
  id?: string;
  namedInsuredId?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  fullName?: string;
  isPrimaryNamedInsured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

type AgentDetails = {
  agentInfoId?: string;
  addressId?: string;
  agencyName?: string;
  agentFullName?: string;
  phoneNumber?: string;
  email?: string;
  // This will be JSON - not worth its own table
  policyIds?: string;
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
  createdAt?: string;
  updatedAt?: string;
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
  createdAt?: string;
  updatedAt?: string;
}

type TitleDetails = {
  id?: string;
  name: string;
  date: Date;
  cost: string;
  createdAt?: string;
  updatedAt?: string;
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
    minDownPaymentPercentage: number;
  }
}

type YelpBusinesses = YelpBusiness[]

type YelpBusiness = {
  id?: string;
  alias: string;
  name: string;
  image_url: string;
  is_closed: boolean;
  url: string;
  review_count: number;
  categories: YelpCategory[];
  rating: number;
  coordinates: YelpCoordinates;
  transactions: any[];
  location: YelpLocation;
  phone: string;
  display_phone: string;
  distance: number;
  attributes:YelpAttributes;
}

type YelpCategory = {
  alias: string;
  title: string;
}

type YelpCoordinates = {
  latitude: number;
  longitude: number;
}

type YelpLocation = {
  address1: string | null;
  address2: string | null;
  address3: string | null;
  city: string;
  zip_code: string;
  country: string;
  state: string;
  display_address: string[];
}

type YelpAttributes = {
  business_temp_closed: string | null;
  waitlist_reservation: string | null;
}

type CanopyConnectInsurancePull = {
  insurance_provider_name: string;
  no_policies: boolean;
  no_documents: boolean;
  policies: CanopyPolicyDetails[];
  agents: CanopyAgent[];
}

type CanopyPolicyDetails = {
  policy_id: string;
  name: string;
  description: string;
  carrier_policy_number: string;
  policy_type: string;
  effective_date: string;
  expiry_date: string;
  renewal_date: string;
  canceled_date: string | null;
  total_premium_cents: number;
  carrier_name: string;
  status: string;
  limited_access: boolean;
  form_of_business: string | null;
  deductible_cents: number | null;
  paid_in_full: boolean;
  amount_due_cents: number | null;
  amount_paid_cents: number | null;
  is_selected: boolean;
  total_estimated_annual_premium_cents: number | null;
  total_minimum_premium_cents: number | null;
  total_deposit_premium_cents: number | null;
  is_monoline: boolean;
  dwellings: CanopyDwelling[];
  named_insureds: CanopyNamedInsureds[];
}

type CanopyDwelling = {
  dwelling_id: string;
  replacement_cost_cents: number;
  cash_value_cents: number;
  property_data_fetched: boolean;
  loss_settlement_type: string;
  extended_replacement_cost_percent: number;
  address: {
      address_id: string;
      full_address: string;
      country: string | null;
      address_nature: string;
      number: string;
      street: string;
      type: string;
      city: string;
      state: string;
      sec_unit_type: string;
      sec_unit_num: string;
      zip: string;
  };
  coverages: CanopyCoverageDetails[];
  property_data: {
      dwelling_id: string;
      property_data_id: string;
      apn: string;
      class: string;
      sub_type: string;
      year_built: number;
      construction_type: string;
      wall_type: string;
      foundation_type: string;
      frame_type: string;
      roof_cover: string;
      roof_shape: string;
      cooling_type: string;
      heating_type: string;
      heating_fuel: string;
      energy_type: string;
      sewer_type: string;
      building_shape: string;
      construction_quality: string;
      has_fireplace: boolean;
      num_fireplaces: number;
      fireplace_type: string;
      has_pool: boolean;
      pool_type: string;
      square_ft: number;
      num_beds: number;
      num_baths_full: number;
      num_baths_partial: number;
      num_stories: number;
      num_units: number;
      garage_type: string;
      garage_square_ft: number;
      num_parking_spaces: number;
      assessed_improvement_value_cents: number;
      assessed_land_value_cents: number;
      assessed_total_value_cents: number;
      market_improvement_value_cents: number;
      market_land_value_cents: number;
      market_total_value_cents: number;
      owner1_first_name: string;
      owner1_last_name: string;
      owner2_first_name: string | null;
      owner2_last_name: string | null;
      owner3_first_name: string | null;
      owner3_last_name: string | null;
      owner4_first_name: string | null;
      owner4_last_name: string | null;
      first_mortgage_amount_cents: number | null;
      first_mortgage_lender: string | null;
      second_mortgage_amount_cents: number | null;
      second_mortgage_lender: string | null;
      purchase_date: string;
      purchase_price_cents: number;
      last_update_date: string;
  };
}

type CanopyCoverageDetails = {
  dwelling_coverage_id: string;
  name: string;
  friendly_name: string;
  premium_cents: number | null;
  per_person_limit_cents: number | null;
  per_person_unlimited: boolean;
  per_incident_limit_cents: number | null;
  per_incident_unlimited: boolean;
  per_incident_limit_percent: string | null;
  deductible_cents: number | null;
  deductible_percent: string | null;
  is_declined: boolean;
}

type CanopyNamedInsureds = {
  named_insured_id: string;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  full_name: string;
  is_primary_named_insured: boolean;
}

type CanopyAgent = {
  agent_info_id: string;
  address_id: string;
  agency_name: string;
  agent_full_name: string;
  phone_number: string;
  email: string;
  policy_ids: string[];
}