// Card Data Types — Exhaustive interfaces for Indian debit/credit cards

export type BenefitCategory =
  | "lounge"
  | "insurance"
  | "ott"
  | "shopping"
  | "travel"
  | "food"
  | "health"
  | "entertainment"
  | "cashback"
  | "fuel"
  | "rewards"
  | "concierge"
  | "education"
  | "utility"
  | "golf"
  | "dining"
  | "movies"
  | "emi"
  | "other";

export type CardNetwork =
  | "Visa"
  | "Mastercard"
  | "RuPay"
  | "Amex"
  | "DinersClub"
  | "Discover";

export type CardTier =
  | "Classic"
  | "Gold"
  | "Platinum"
  | "Signature"
  | "Select"
  | "Infinite"
  | "InfinitePrivilege"
  | "World"
  | "WorldElite"
  | "Titanium"
  | "Business"
  | "Corporate"
  | "Premium"
  | "Other"
  | "Wealth"
  | "Burgundy"
  | "Priority"
  | "Republic"
  | "Prestige"
  | "Liberty"
  | "Kisan"
  | "Sampann"
  | "Secure Plus"
  | "Magnus"
  | "Neo"
  | "My Zone"
  | "Reserve"
  | "Horizon"
  | "Privilege"
  | "Rewards"
  | "Airtel"
  | "IndianOil"
  | "Ace";

export type CardMaterial = "Plastic" | "Metal" | "Hybrid" | "Unknown";

export type RbiBankCategory =
  | "Public Sector Banks"
  | "Private Sector Banks"
  | "Foreign Banks"
  | "Regional Rural Banks (RRBs)"
  | "Cooperative Banks"
  | "Small Finance Banks"
  | "Payments Banks"
  | "Specialized Development Banks"
  | "Other";

export type CardCategory =
  | "standard"
  | "premium"
  | "super-premium"
  | "lifestyle"
  | "travel"
  | "fuel"
  | "cashback"
  | "rewards"
  | "business"
  | "corporate"
  | "prepaid"
  | "co-branded";

export type MinBalancePurpose = "issuance" | "benefit" | "both" | null;

export type VerificationStatus = "verified" | "unverified" | "partial";

export type ApplicationChannel =
  | "online"
  | "branch"
  | "mobile"
  | "phone"
  | "doorstep";

// Charge / fee interfaces

export interface CardCharge {
  label: string;
  amount: number;
  note?: string;
  amountWithGst?: number;
}

export interface AtmCharges {
  ownBankFreePerMonth: number;
  ownBankCharge: number;
  otherBankFreePerMonth: number;
  otherBankCharge: number;
  internationalWithdrawalFee: number;
  internationalWithdrawalPercent: number;
  balanceEnquiryOwnBank: number;
  balanceEnquiryOtherBank: number;
  miniStatementOtherBank: number;
}

export interface TransactionCharges {
  currencyMarkupPercent: number;
  crossBorderFee: number;
  dccFeePercent: number;
  smsAlertPerMonth: number;
  pinRegenerationCharge: number;
  physicalStatementCharge: number;
  chequeBounceCharge?: number;
  latePaymentFee?: number;
  overLimitFee?: number;
  cashAdvanceFeePercent?: number;
  cashAdvanceFlatFee?: number;
  interestRatePerMonth?: number;
  annualInterestRate?: number;
}

export interface FuelSurcharge {
  available: boolean;
  waiverPercent: number;
  minTransactionAmount: number;
  maxTransactionAmount: number;
  maxWaiverPerCycle: number;
  fuelNetworks: string[];
}

// Benefit / perk interface

export interface CardBenefit {
  category: BenefitCategory;
  title: string;
  description: string;
  valueStr: string;
  valueNum: number;
  frequencyStr: string;
  frequencyPerYear: number;
  annualValue: number;
  conditions: string[];
  isSellable: boolean;
  sellValue: number;
  minSellValue?: number;
  maxSellValue?: number;
  avgSellValue?: number;
  maxAdvertisedValue?: number;
  isActive: boolean;
  activationRequired: boolean;
  activationInstructions?: string;
}

// Lounge access

export interface LoungeAccessTier {
  count: number;
  frequency: string;
  frequencyPerYear: number;
  valuePerVisit: number;
  guestAllowed: boolean;
  guestCharge: number;
}

export interface LoungeAccess {
  domestic: LoungeAccessTier;
  international: LoungeAccessTier;
  programs: string[];
  conditions: string[];
}

// Eligibility

export interface CardEligibility {
  employmentType?: string[];
  minSalary?: number;
  maxSalary?: number;
  minAge?: number;
  maxAge?: number;
  mab?: number;
  minAnnualIncome?: number;
  minCreditScore?: number;
  existingAccountRequired: boolean;
  accountType?: string[];
  invitationOnly: boolean;
  notes: string[];
}

// Transaction limits

export interface CardLimits {
  atmPerDay: number;
  posEcomPerDay: number;
  ecomPerDay?: number;
  contactlessPerTxn?: number;
  contactlessDailyLimit?: number;
  internationalAtmPerDay?: number;
  internationalPosPerDay?: number;
  upiDailyLimit?: number;
}

// Reward program

export interface RewardProgram {
  name: string;
  earnRate: string;
  pointsPer100: number;
  pointValue: number;
  effectiveCashbackPercent: number;
  pointsExpiry: string;
  bonusCategories: {
    category: string;
    multiplier: number;
    description: string;
  }[];
  redemptionOptions: string[];
  minRedemptionPoints: number;
  redemptionRatios?: {
    partnerTarget: string;
    pointsRequired: number;
    valueReceived: number;
    description: string;
  }[];
  rewardRateStr?: string;
  conditions?: string[];
}

export interface WelcomeBonus {
  available: boolean;
  description: string;
  valueStr: string;
  valueNum: number;
  conditions: string[];
}

export interface MilestoneBonus {
  description: string;
  spendRequired: number;
  spendPeriod: string;
  rewardStr: string;
  rewardNum: number;
}

export interface FeeWaiver {
  description: string;
  annualSpendRequired: number;
  waives: string;
}

// Value metrics

export interface CardValueMetrics {
  highestValue: number;
  averageValue: number;
  isSellable: boolean;
  marketPrice: {
    minSellPrice: number;
    maxSellPrice: number;
    averageMarketValue: number;
  };
  annualNetValue: number;
  tenYearNetValue: number;
  totalAnnualCharges: number;
  totalAnnualBenefits: number;
  roiPercent: number;
}

// Insurance

export interface InsuranceDetails {
  accidentalDeathCover: number;
  permanentDisabilityCover: number;
  partialDisabilityCover?: number;
  purchaseProtectionCover?: number;
  purchaseProtectionDays?: number;
  lostCardLiability?: number;
  lostCardLiabilityWindow?: number;
  travelInsuranceCover?: number;
  airAccidentCover?: number;
  baggageCover?: number;
  conditions: string[];
  claimProcess?: string[];
  provider: string;
}

// Credit card specific

export interface CreditCardSpecific {
  creditLimitMin?: number;
  creditLimitMax?: number;
  billingCycleDays: number;
  gracePeriodDays: number;
  minimumDuePercent: number;
  minimumDueFlat: number;
  balanceTransfer: boolean;
  emiConversion: boolean;
  addOnCardAvailable: boolean;
  maxAddOnCards: number;
  addOnCardFee: number;
}

// Lifestyle benefits

export interface ConciergeService {
  available: boolean;
  accessMethod: string;
  services: string[];
}

export interface GolfPrivileges {
  available: boolean;
  complimentaryRounds: number;
  courses: string[];
  conditions: string[];
}

export interface DiningBenefits {
  available: boolean;
  discountDescription: string;
  discountPercent: number;
  partnerRestaurants: string[];
  annualCap?: number;
}

export interface ShoppingBenefits {
  available: boolean;
  partnerMerchants: string[];
  offerDescription: string;
  discountPercent?: number;
}

export interface TravelBenefits {
  available: boolean;
  hotelPrograms: string[];
  flightPrivileges: string[];
  otherPerks: string[];
}

export interface MovieEntertainment {
  available: boolean;
  platforms: string[];
  offerDescription: string;
  monthlyLimit: number;
  annualCap?: number;
}

// Application & docs

export interface ApplicationDetails {
  channels: ApplicationChannel[];
  processingTime: string;
  notes: string[];
}

export interface DocumentRequirements {
  idProof: string[];
  addressProof: string[];
  incomeDocuments: string[];
  otherDocuments: string[];
}

// Card visual & co-brand

export interface CardImage {
  localPath: string;
  sourceUrl?: string;
  isTransparent?: boolean;
  hasBackground?: boolean;
  altText?: string;
  dominantColor?: string;
}

export interface CardVisualDetails {
  primaryColors: string[];
  designDescription: string;
  notableFeatures: string[];
}

export interface CoBrandDetails {
  partnerName: string;
  partnerCategory: string;
  specialPerks: string[];
}

// EMI options

export interface EmiOptions {
  available: boolean;
  minTransactionAmount: number;
  tenureOptions: number[];
  interestRatePerMonth?: number;
  processingFeePercent?: number;
}

// Data quality

export interface DataQuality {
  status: VerificationStatus;
  verifiedFields: string[];
  unverifiedFields: string[];
  sourceUrls: string[];
  lastVerified: string;
}

// Reviews

export interface CardReview {
  provider: string;
  overallRating: number;
  maxRating: number;
  categoryRatings?: {
    category: string;
    rating: number;
    maxRating: number;
  }[];
  summary?: string;
  pros?: string[];
  cons?: string[];
  reviewUrl?: string;
  lastUpdated?: string;
}

// Main CardData interface

export interface CardData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  bank: string;
  bankCode: string;
  network: CardNetwork;
  cardType: "debit" | "credit" | "prepaid";
  tier: CardTier;
  variant: string;
  usage: "Domestic" | "International" | "Global";
  bin: string;
  material: CardMaterial;
  colorScheme: string;
  virtualCardAvailable: boolean;

  eligibility: CardEligibility;
  charges: CardCharge[];
  atmCharges: AtmCharges;
  transactionCharges: TransactionCharges;
  fuelSurcharge?: FuelSurcharge;
  limits: CardLimits;

  insurance?: InsuranceDetails;
  loungeAccess?: LoungeAccess;
  benefits: CardBenefit[];
  rewardProgram?: RewardProgram;
  welcomeBonus?: WelcomeBonus;
  milestoneBonuses: MilestoneBonus[];
  feeWaivers: FeeWaiver[];

  features: string[];
  validity: string;
  contactless: boolean;
  ncmc: boolean;

  creditCardDetails?: CreditCardSpecific;

  gradientColors: [string, string];
  value: CardValueMetrics;

  minimumAccountBalance?: number | null;
  minimumBalanceDescription?: string;
  minimumBalancePurpose?: MinBalancePurpose;

  conciergeService?: ConciergeService;
  golfPrivileges?: GolfPrivileges;
  diningBenefits?: DiningBenefits;
  shoppingBenefits?: ShoppingBenefits;
  travelBenefits?: TravelBenefits;
  movieEntertainment?: MovieEntertainment;

  applicationDetails?: ApplicationDetails;
  documentRequirements?: DocumentRequirements;

  image?: CardImage;
  cardVisualDetails?: CardVisualDetails;
  coBrandDetails?: CoBrandDetails;

  emiOptions?: EmiOptions;

  category?: CardCategory;
  internationalUsable?: boolean;
  bestFor?: string[];

  dataQuality?: DataQuality;

  reviews?: CardReview[];

  customerCareNumber?: string;
  applyUrl?: string;
  lastUpdated: string;
}
