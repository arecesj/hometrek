type UserData = {
  name: string | null;
  state: string | null;
  downPayment: string | null;

}

type Lenders = {
  [key: string]: {
    name: string;
    nmls: number;
    minCreditScore: number;
    minDownPaymentPercentage: number
  }
}