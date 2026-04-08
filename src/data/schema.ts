import { z } from "zod";

export const CardChargeSchema = z.object({
  label: z.string(),
  amount: z.number(),
  note: z.string().optional(),
  amountWithGst: z.number().optional(),
});

export const AtmChargesSchema = z.object({
  ownBankFreePerMonth: z.number(),
  ownBankCharge: z.number(),
  otherBankFreePerMonth: z.number(),
  otherBankCharge: z.number(),
  internationalWithdrawalFee: z.number(),
  internationalWithdrawalPercent: z.number(),
  balanceEnquiryOwnBank: z.number(),
  balanceEnquiryOtherBank: z.number(),
  miniStatementOtherBank: z.number(),
});

export const TransactionChargesSchema = z.object({
  currencyMarkupPercent: z.number(),
  crossBorderFee: z.number(),
  dccFeePercent: z.number(),
  smsAlertPerMonth: z.number(),
  pinRegenerationCharge: z.number(),
  physicalStatementCharge: z.number(),
  chequeBounceCharge: z.number().optional(),
  latePaymentFee: z.number().optional(),
  overLimitFee: z.number().optional(),
  cashAdvanceFeePercent: z.number().optional(),
  cashAdvanceFlatFee: z.number().optional(),
  interestRatePerMonth: z.number().optional(),
  annualInterestRate: z.number().optional(),
});

export const FuelSurchargeSchema = z.object({
  available: z.boolean(),
  waiverPercent: z.number(),
  minTransactionAmount: z.number(),
  maxTransactionAmount: z.number(),
  maxWaiverPerCycle: z.number(),
  fuelNetworks: z.array(z.string()),
});

export const CardBenefitSchema = z.object({
  category: z.enum([
    "lounge", "insurance", "ott", "shopping", "travel", "food", "health",
    "entertainment", "cashback", "fuel", "rewards", "concierge", "education",
    "utility", "golf", "dining", "movies", "emi", "other",
  ]),
  title: z.string(),
  description: z.string(),
  valueStr: z.string(),
  valueNum: z.number(),
  frequencyStr: z.string(),
  frequencyPerYear: z.number(),
  annualValue: z.number(),
  conditions: z.array(z.string()),
  isSellable: z.boolean(),
  sellValue: z.number(),
  minSellValue: z.number().optional(),
  maxSellValue: z.number().optional(),
  avgSellValue: z.number().optional(),
  maxAdvertisedValue: z.number().optional(),
  isActive: z.boolean(),
  activationRequired: z.boolean(),
  activationInstructions: z.string().optional(),
});

export const LoungeAccessTierSchema = z.object({
  count: z.number(),
  frequency: z.string(),
  frequencyPerYear: z.number(),
  valuePerVisit: z.number(),
  guestAllowed: z.boolean(),
  guestCharge: z.number(),
});

export const LoungeAccessSchema = z.object({
  domestic: LoungeAccessTierSchema,
  international: LoungeAccessTierSchema,
  programs: z.array(z.string()),
  conditions: z.array(z.string()),
});

export const CardEligibilitySchema = z.object({
  employmentType: z.array(z.string()).optional(),
  minSalary: z.number().optional(),
  maxSalary: z.number().optional(),
  minAge: z.number().optional(),
  maxAge: z.number().optional(),
  mab: z.number().optional(),
  minAnnualIncome: z.number().optional(),
  minCreditScore: z.number().optional(),
  existingAccountRequired: z.boolean(),
  accountType: z.array(z.string()).optional(),
  invitationOnly: z.boolean(),
  notes: z.array(z.string()),
});

export const CardLimitsSchema = z.object({
  atmPerDay: z.number(),
  posEcomPerDay: z.number(),
  ecomPerDay: z.number().optional(),
  contactlessPerTxn: z.number().optional(),
  contactlessDailyLimit: z.number().optional(),
  internationalAtmPerDay: z.number().optional(),
  internationalPosPerDay: z.number().optional(),
  upiDailyLimit: z.number().optional(),
});

export const RewardProgramSchema = z.object({
  name: z.string(),
  earnRate: z.string(),
  pointsPer100: z.number(),
  pointValue: z.number(),
  effectiveCashbackPercent: z.number(),
  pointsExpiry: z.string(),
  bonusCategories: z.array(z.object({
    category: z.string(),
    multiplier: z.number(),
    description: z.string(),
  })),
  redemptionOptions: z.array(z.string()),
  minRedemptionPoints: z.number(),
  redemptionRatios: z.array(z.object({
    partnerTarget: z.string(),
    pointsRequired: z.number(),
    valueReceived: z.number(),
    description: z.string(),
  })).optional(),
  rewardRateStr: z.string().optional(),
  conditions: z.array(z.string()).optional(),
});

export const WelcomeBonusSchema = z.object({
  available: z.boolean(),
  description: z.string(),
  valueStr: z.string(),
  valueNum: z.number(),
  conditions: z.array(z.string()),
});

export const MilestoneBonusSchema = z.object({
  description: z.string(),
  spendRequired: z.number(),
  spendPeriod: z.string(),
  rewardStr: z.string(),
  rewardNum: z.number(),
});

export const FeeWaiverSchema = z.object({
  description: z.string(),
  annualSpendRequired: z.number(),
  waives: z.string(),
});

export const CardValueMetricsSchema = z.object({
  highestValue: z.number(),
  averageValue: z.number(),
  isSellable: z.boolean(),
  marketPrice: z.object({
    minSellPrice: z.number(),
    maxSellPrice: z.number(),
    averageMarketValue: z.number(),
  }),
  annualNetValue: z.number(),
  tenYearNetValue: z.number(),
  totalAnnualCharges: z.number(),
  totalAnnualBenefits: z.number(),
  roiPercent: z.number(),
});

export const InsuranceDetailsSchema = z.object({
  accidentalDeathCover: z.number(),
  permanentDisabilityCover: z.number(),
  partialDisabilityCover: z.number().optional(),
  purchaseProtectionCover: z.number().optional(),
  purchaseProtectionDays: z.number().optional(),
  lostCardLiability: z.number().optional(),
  lostCardLiabilityWindow: z.number().optional(),
  travelInsuranceCover: z.number().optional(),
  airAccidentCover: z.number().optional(),
  baggageCover: z.number().optional(),
  conditions: z.array(z.string()),
  claimProcess: z.array(z.string()).optional(),
  provider: z.string(),
});

export const CreditCardSpecificSchema = z.object({
  creditLimitMin: z.number().optional(),
  creditLimitMax: z.number().optional(),
  billingCycleDays: z.number(),
  gracePeriodDays: z.number(),
  minimumDuePercent: z.number(),
  minimumDueFlat: z.number(),
  balanceTransfer: z.boolean(),
  emiConversion: z.boolean(),
  addOnCardAvailable: z.boolean(),
  maxAddOnCards: z.number(),
  addOnCardFee: z.number(),
});

export const CardImageSchema = z.object({
  localPath: z.string(),
  sourceUrl: z.string().optional(),
  isTransparent: z.boolean().optional(),
  hasBackground: z.boolean().optional(),
  altText: z.string().optional(),
  dominantColor: z.string().optional(),
});

export const DataQualitySchema = z.object({
  status: z.enum(["verified", "unverified", "partial"]),
  verifiedFields: z.array(z.string()),
  unverifiedFields: z.array(z.string()),
  sourceUrls: z.array(z.string()),
  lastVerified: z.string(),
});

export const CardReviewSchema = z.object({
  provider: z.string(),
  overallRating: z.number(),
  maxRating: z.number(),
  categoryRatings: z.array(z.object({
    category: z.string(),
    rating: z.number(),
    maxRating: z.number(),
  })).optional(),
  summary: z.string().optional(),
  pros: z.array(z.string()).optional(),
  cons: z.array(z.string()).optional(),
  reviewUrl: z.string().optional(),
  lastUpdated: z.string().optional(),
});

export const CardDataSchema = z.object({
  id: z.string(),
  name: z.string(),
  tagline: z.string(),
  description: z.string(),
  bank: z.string(),
  bankCode: z.string(),
  network: z.enum(["Visa", "Mastercard", "RuPay", "Amex", "DinersClub", "Discover"]),
  cardType: z.enum(["debit", "credit", "prepaid"]),
  tier: z.string(),
  variant: z.string(),
  usage: z.enum(["Domestic", "International", "Global"]),
  bin: z.string(),
  material: z.enum(["Plastic", "Metal", "Hybrid", "Unknown"]),
  colorScheme: z.string(),
  virtualCardAvailable: z.boolean(),

  eligibility: CardEligibilitySchema,
  charges: z.array(CardChargeSchema),
  atmCharges: AtmChargesSchema,
  transactionCharges: TransactionChargesSchema,
  fuelSurcharge: FuelSurchargeSchema.optional(),
  limits: CardLimitsSchema,

  insurance: InsuranceDetailsSchema.optional(),
  loungeAccess: LoungeAccessSchema.optional(),
  benefits: z.array(CardBenefitSchema),
  rewardProgram: RewardProgramSchema.optional(),
  welcomeBonus: WelcomeBonusSchema.optional(),
  milestoneBonuses: z.array(MilestoneBonusSchema),
  feeWaivers: z.array(FeeWaiverSchema),

  features: z.array(z.string()),
  validity: z.string(),
  contactless: z.boolean(),
  ncmc: z.boolean(),

  creditCardDetails: CreditCardSpecificSchema.optional(),

  gradientColors: z.tuple([z.string(), z.string()]),
  value: CardValueMetricsSchema,

  minimumAccountBalance: z.number().nullable().optional(),
  minimumBalanceDescription: z.string().optional(),
  minimumBalancePurpose: z.enum(["issuance", "benefit", "both"]).nullable().optional(),

  emiOptions: z.object({
    available: z.boolean(),
    minTransactionAmount: z.number(),
    tenureOptions: z.array(z.number()),
    interestRatePerMonth: z.number().optional(),
    processingFeePercent: z.number().optional(),
  }).optional(),

  category: z.enum([
    "standard", "premium", "super-premium", "lifestyle", "travel",
    "fuel", "cashback", "rewards", "business", "corporate", "prepaid", "co-branded",
  ]).optional(),

  internationalUsable: z.boolean().optional(),
  bestFor: z.array(z.string()).optional(),

  dataQuality: DataQualitySchema.optional(),
  reviews: z.array(CardReviewSchema).optional(),

  customerCareNumber: z.string().optional(),
  applyUrl: z.string().optional(),
  lastUpdated: z.string(),
});

export type ValidatedCardData = z.infer<typeof CardDataSchema>;
