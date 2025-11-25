export interface LoanResponse {
  data: TEligibilityCheckDataShow;
}

export interface TEligibilityCheckDataShow {
  data: EligibilityData[];
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  totalLoans: number;
}







export interface EligibilityData {
  id: string;
  bankName: string;
  amount: number;
  periodMonths: number;
  loanType: string;
  monthlyEMI: number;
  expectedLoanTenure?: number;
  totalRepayment: number;
  coverImage: string;
  interestRate: string;
  processingFee: string;
  eligibleLoan: number;
  features: LoanFeatures;
  feesCharges: LoanFeesCharges;
  eligibility: LoanEligibility;
}

export interface LoanFeatures {
  id: string;
  loanAmount: string;
  minimumAmount: string;
  maximumAmount: string;
  loanTenure: string;
  minimumYear: string;
  maximumYear: string;
  personalLoanId: string;
}

export interface LoanFeesCharges {
  id: string;
  processingFee: string;
  earlySettlementFee: string;
  prepaymentFee: string;
  LoanReSchedulingFee: string;
  penalCharge: string;
  personalLoanId: string;
}

export interface LoanEligibility {
  id: string;
  condition: string;
  offer: string;
  minimumIncome: number;
  minimumExperience: number;
  ageRequirement: number;
  personalLoanId: string;
}














///////////////////catds types data





export interface Eligibility {
  ageRequirement: number;
  cardId: string;
  condition: string;
  id: string;
  minimumExperience: number;
  minimumIncome: number;
  offer: string;
}

export interface Features {
  cardId: string;
  id: string;
  features1: string;
  features2: string;
  features3: string;
  features4: string;
  features5: string;
}

export interface FeesCharges {
  annualFee: string;
  annualFeeWaived: string;
  balanceTransferRate: string;
  cardId: string;
  id: string;
  interestRate: string;
  latePaymentFee: string;
}

export interface CreditCard {
  id: string;
  cardId: string;
  cardName: string;
  bankName: string;
  cardImage: string;
  coverImage: string | null;
  cardType: string;
  cardNetwork: string;
  cardFeaturesType: string;

  // Basic data
  annualFeeWaivedReward: string;
  balanceTransferAvailability: string;
  cashWithdrawalLimit: string;
  currency: string;

  // Additional
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  loungeFacility: string;
  loungeVisit: string;
  otherBankATMFee: string;
  ownBankATMFee: string;
  processingFeeMinimum: string;
  regularAnnualFee: string;
  freeAnnualFee: string;
  freeSupplementaryCards: string;
  maxSupplementaryCards: string;
  latePaymentFees: string;
  interestFreePeriod: string;
  interestPerDay: string;
  userId: string | null;

  // relations
  eligibility: Eligibility;
  features: Features;
  feesCharges: FeesCharges;
}

export interface Pagination {
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}

export interface TCardsResponse {
  data: CreditCard[];
  pagination: Pagination;
}


export type FiltersType = {
    currency: string[];
    network: string[];
    type: string[];
    page: number;
    limit: number;
};
