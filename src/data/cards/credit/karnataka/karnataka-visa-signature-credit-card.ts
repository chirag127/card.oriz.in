import type { CardData } from "@/types/card";

export const karnatakaVisaSignatureCreditCard: CardData = {
  id: "karnataka-visa-signature-credit-card",
  name: "KBL Visa Signature Credit Card",
  tagline: "Visa Signature with 3X rewards from Karnataka Bank",
  description: "The KBL Visa Signature Credit Card is a premium Visa Signature card from Karnataka Bank offering 3 reward points per ₹100 spent. With comprehensive benefits and competitive rewards, it provides solid value for professionals seeking a reliable premium credit card from a trusted regional bank.",
  bank: "Karnataka Bank",
  bankCode: "karnataka",
  network: "Visa",
  cardType: "credit",
  tier: "Signature",
  variant: "Visa Signature",
  usage: "International",
  bin: "",
  material: "Hybrid",
  colorScheme: "Dark blue and silver",
  virtualCardAvailable: true,

  eligibility: {
    employmentType: ["Salaried", "Self-Employed"],
    minSalary: 50000,
    minAge: 21,
    maxAge: 65,
    minAnnualIncome: 600000,
    minCreditScore: 720,
    existingAccountRequired: false,
    invitationOnly: false,
    notes: [
      "Salaried: Net Monthly Income > ₹50,000",
      "Self-Employed: ITR > ₹6 Lakh p.a.",
      "Age 21–65 years",
    ],
  },

  charges: [
    { label: "Joining Fee", amount: 2000, amountWithGst: 2360, note: "Plus GST" },
    { label: "Annual Fee", amount: 2000, amountWithGst: 2360, note: "Plus GST, waived on ₹4L annual spend" },
    { label: "Add-on Card Fee", amount: 0, note: "Free" },
  ],

  atmCharges: {
    ownBankFreePerMonth: 5,
    ownBankCharge: 0,
    otherBankFreePerMonth: 3,
    otherBankCharge: 250,
    internationalWithdrawalFee: 250,
    internationalWithdrawalPercent: 2.5,
    balanceEnquiryOwnBank: 0,
    balanceEnquiryOtherBank: 25,
    miniStatementOtherBank: 25,
  },

  transactionCharges: {
    currencyMarkupPercent: 2.5,
    crossBorderFee: 0,
    dccFeePercent: 1,
    smsAlertPerMonth: 25,
    pinRegenerationCharge: 50,
    physicalStatementCharge: 100,
    chequeBounceCharge: 500,
    latePaymentFee: 1000,
    overLimitFee: 500,
    cashAdvanceFeePercent: 2.5,
    cashAdvanceFlatFee: 500,
    interestRatePerMonth: 3.25,
    annualInterestRate: 39,
  },

  fuelSurcharge: {
    available: true,
    waiverPercent: 1,
    minTransactionAmount: 400,
    maxTransactionAmount: 5000,
    maxWaiverPerCycle: 250,
    fuelNetworks: [],
  },

  limits: {
    atmPerDay: 50000,
    posEcomPerDay: 500000,
    contactlessPerTxn: 5000,
    contactlessDailyLimit: 50000,
    internationalAtmPerDay: 20000,
    internationalPosPerDay: 200000,
  },

  insurance: {
    accidentalDeathCover: 5000000,
    permanentDisabilityCover: 5000000,
    purchaseProtectionCover: 50000,
    purchaseProtectionDays: 60,
    lostCardLiability: 500000,
    lostCardLiabilityWindow: 24,
    travelInsuranceCover: 1000000,
    airAccidentCover: 0,
    baggageCover: 0,
    conditions: [
      "Personal accident cover: ₹50 Lakh",
      "Lost card liability: ₹5 Lakh",
    ],
    provider: "Karnataka Bank",
  },

  loungeAccess: {
    domestic: {
      count: 0,
      frequency: "Not available",
      frequencyPerYear: 0,
      valuePerVisit: 0,
      guestAllowed: false,
      guestCharge: 0,
    },
    international: {
      count: 0,
      frequency: "Not available",
      frequencyPerYear: 0,
      valuePerVisit: 0,
      guestAllowed: false,
      guestCharge: 0,
    },
    programs: [],
    conditions: [],
  },

  benefits: [
    {
      category: "rewards",
      title: "3 Reward Points per ₹100",
      description: "Earn 3 reward points on every ₹100 spent",
      valueStr: "3 RP/₹100",
      valueNum: 0.75,
      frequencyStr: "Every transaction",
      frequencyPerYear: 0,
      annualValue: 0,
      conditions: ["Excluded: fuel, rent, wallet loads"],
      isSellable: false,
      sellValue: 0,
      isActive: true,
      activationRequired: false,
    },
    {
      category: "fuel",
      title: "Fuel Surcharge Waiver",
      description: "1% fuel surcharge waiver on transactions between ₹400–₹5,000",
      valueStr: "1% waiver",
      valueNum: 250,
      frequencyStr: "Per statement cycle",
      frequencyPerYear: 12,
      annualValue: 3000,
      conditions: ["Valid on transactions ₹400–₹5,000", "Max ₹250 per statement cycle"],
      isSellable: false,
      sellValue: 0,
      isActive: true,
      activationRequired: false,
    },
  ],

  rewardProgram: {
    name: "KBL Reward Points",
    earnRate: "3 RP per ₹100 on all spends",
    pointsPer100: 3,
    pointValue: 0.25,
    effectiveCashbackPercent: 0.75,
    pointsExpiry: "Valid for 3 years",
    bonusCategories: [],
    redemptionOptions: [
      "Products & Vouchers via KBL Rewards Portal",
      "Cashback (1 RP = ₹0.25)",
    ],
    minRedemptionPoints: 500,
    rewardRateStr: "0.75%",
    conditions: ["Excluded: fuel, rent, wallet loads, EMI conversion"],
  },

  welcomeBonus: {
    available: false,
    description: "No welcome bonus currently offered",
    valueStr: "Nil",
    valueNum: 0,
    conditions: [],
  },

  milestoneBonuses: [
    {
      description: "Annual fee waiver on spending ₹4 Lakh in a year",
      spendRequired: 400000,
      spendPeriod: "Annual",
      rewardStr: "Annual fee waiver",
      rewardNum: 2360,
    },
  ],

  feeWaivers: [
    {
      description: "Annual fee waived on spending ₹4 Lakh in a membership year",
      annualSpendRequired: 400000,
      waives: "Annual Fee",
    },
  ],

  features: [
    "Visa Signature privileges",
    "Contactless payments",
    "EMV chip security",
    "International acceptance",
    "Add-on cards available",
    "EMI conversion facility",
    "Insurance coverage",
  ],

  validity: "5 years",
  contactless: true,
  ncmc: false,

  creditCardDetails: {
    billingCycleDays: 30,
    gracePeriodDays: 50,
    minimumDuePercent: 5,
    minimumDueFlat: 200,
    balanceTransfer: true,
    emiConversion: true,
    addOnCardAvailable: true,
    maxAddOnCards: 3,
    addOnCardFee: 0,
  },

  gradientColors: ["#0d47a1", "#c0c0c0"],
  value: {
    highestValue: 15000,
    averageValue: 10000,
    isSellable: false,
    marketPrice: { minSellPrice: 0, maxSellPrice: 0, averageMarketValue: 0 },
    annualNetValue: 7640,
    tenYearNetValue: 76400,
    totalAnnualCharges: 2360,
    totalAnnualBenefits: 10000,
    roiPercent: 424,
  },

  emiOptions: {
    available: true,
    minTransactionAmount: 2500,
    tenureOptions: [3, 6, 9, 12, 18, 24],
    interestRatePerMonth: 1.3,
    processingFeePercent: 1,
  },

  category: "premium",
  internationalUsable: true,
  bestFor: ["Rewards", "International Travel", "Insurance"],

  dataQuality: {
    status: "verified",
    verifiedFields: ["charges", "rewards"],
    unverifiedFields: ["insurance"],
    sourceUrls: [
      "https://www.karnatakabank.com/credit-cards",
    ],
    lastVerified: "2026-03-27",
  },

  customerCareNumber: "1800 425 1444",
  applyUrl: "https://www.karnatakabank.com/credit-cards",
  lastUpdated: "2026-03-27",
};
