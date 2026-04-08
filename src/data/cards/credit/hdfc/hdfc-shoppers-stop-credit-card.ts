import type { CardData } from "@/types/card";

export const hdfcShoppersStopCreditCard: CardData = {
  id: "hdfc-shoppers-stop-credit-card",
  name: "Shoppers Stop HDFC Bank Credit Card",
  tagline: "Earn cashback on Shoppers Stop with a low annual fee",
  description: "The Shoppers Stop HDFC Bank Credit Card is an entry-level co-branded credit card offering 3% cashback on all Shoppers Stop purchases and 1% on all other retail spends. Perfect for regular Shoppers Stop shoppers who want rewards on fashion and lifestyle purchases at an affordable fee.",
  bank: "HDFC Bank",
  bankCode: "hdfc",
  network: "Visa",
  cardType: "credit",
  tier: "Gold",
  variant: "Shoppers Stop",
  usage: "Domestic",
  bin: "",
  material: "Plastic",
  colorScheme: "Red and white gradient",
  virtualCardAvailable: true,

  eligibility: {
    employmentType: ["Salaried", "Self-Employed"],
    minSalary: 20000,
    minAge: 21,
    maxAge: 65,
    minAnnualIncome: 240000,
    minCreditScore: 650,
    existingAccountRequired: false,
    invitationOnly: false,
    notes: [
      "Salaried: Gross Monthly Income > ₹20,000",
      "Self-Employed: ITR > ₹2.4 Lakh p.a.",
    ],
  },

  charges: [
    { label: "Joining Fee", amount: 299, amountWithGst: 353, note: "Excluding GST" },
    { label: "Annual Fee", amount: 299, amountWithGst: 353, note: "Excluding GST" },
    { label: "Add-on Card Fee", amount: 0, note: "Free" },
  ],

  atmCharges: {
    ownBankFreePerMonth: 0,
    ownBankCharge: 250,
    otherBankFreePerMonth: 0,
    otherBankCharge: 250,
    internationalWithdrawalFee: 250,
    internationalWithdrawalPercent: 2.5,
    balanceEnquiryOwnBank: 0,
    balanceEnquiryOtherBank: 25,
    miniStatementOtherBank: 25,
  },

  transactionCharges: {
    currencyMarkupPercent: 3.5,
    crossBorderFee: 0,
    dccFeePercent: 1,
    smsAlertPerMonth: 0,
    pinRegenerationCharge: 100,
    physicalStatementCharge: 100,
    chequeBounceCharge: 500,
    latePaymentFee: 1300,
    overLimitFee: 500,
    cashAdvanceFeePercent: 2.5,
    cashAdvanceFlatFee: 500,
    interestRatePerMonth: 3.75,
    annualInterestRate: 45,
  },

  limits: {
    atmPerDay: 20000,
    posEcomPerDay: 150000,
    contactlessPerTxn: 5000,
    contactlessDailyLimit: 50000,
  },

  benefits: [
    {
      category: "shopping",
      title: "Shoppers Stop Cashback",
      description: "3% cashback on all purchases at Shoppers Stop stores and online",
      valueStr: "3% cashback",
      valueNum: 0,
      frequencyStr: "Every transaction",
      frequencyPerYear: 0,
      annualValue: 0,
      conditions: ["Valid at Shoppers Stop stores and online"],
      isSellable: false,
      sellValue: 0,
      isActive: true,
      activationRequired: false,
    },
    {
      category: "cashback",
      title: "All Other Spends",
      description: "1% cashback on all other retail purchases",
      valueStr: "1% cashback",
      valueNum: 0,
      frequencyStr: "Every transaction",
      frequencyPerYear: 0,
      annualValue: 0,
      conditions: [],
      isSellable: false,
      sellValue: 0,
      isActive: true,
      activationRequired: false,
    },
    {
      category: "shopping",
      title: "Exclusive Shoppers Stop Offers",
      description: "Exclusive sale previews and additional discounts during Shoppers Stop sales events",
      valueStr: "Exclusive offers",
      valueNum: 0,
      frequencyStr: "Periodic",
      frequencyPerYear: 4,
      annualValue: 1000,
      conditions: ["During Shoppers Stop sale events"],
      isSellable: false,
      sellValue: 0,
      isActive: true,
      activationRequired: false,
    },
  ],

  rewardProgram: {
    name: "Shoppers Stop Cashback",
    earnRate: "3% on Shoppers Stop, 1% other",
    pointsPer100: 0,
    pointValue: 1,
    effectiveCashbackPercent: 1,
    pointsExpiry: "Cashback credited as statement credit",
    bonusCategories: [
      { category: "Shoppers Stop", multiplier: 3, description: "3% cashback at Shoppers Stop" },
    ],
    redemptionOptions: [
      "Statement credit (automatic)",
    ],
    minRedemptionPoints: 0,
    rewardRateStr: "1% to 3%",
    conditions: ["Excluded: fuel, rent, wallet loads, EMI conversion"],
  },

  welcomeBonus: {
    available: true,
    description: "₹200 Shoppers Stop gift voucher on card activation",
    valueStr: "₹200 SS Gift Voucher",
    valueNum: 200,
    conditions: ["Activate card and complete first transaction within 30 days"],
  },

  milestoneBonuses: [],

  feeWaivers: [
    {
      description: "Annual fee waived on spending ₹50,000 in the preceding year",
      annualSpendRequired: 50000,
      waives: "Annual fee of ₹299 + GST",
    },
  ],

  features: [
    "Contactless payments",
    "EMV chip security",
    "Add-on cards available",
    "EMI conversion facility",
    "Shoppers Stop First Citizen integration",
    "Exclusive sale access",
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
    maxAddOnCards: 2,
    addOnCardFee: 0,
  },

  gradientColors: ["#b91c1c", "#fef2f2"],
  value: {
    highestValue: 8000,
    averageValue: 4000,
    isSellable: false,
    marketPrice: { minSellPrice: 0, maxSellPrice: 0, averageMarketValue: 0 },
    annualNetValue: 3647,
    tenYearNetValue: 36470,
    totalAnnualCharges: 353,
    totalAnnualBenefits: 4000,
    roiPercent: 1033,
  },

  emiOptions: {
    available: true,
    minTransactionAmount: 2500,
    tenureOptions: [3, 6, 9, 12],
    interestRatePerMonth: 1.5,
    processingFeePercent: 1,
  },

  category: "co-branded",
  internationalUsable: false,
  bestFor: ["Shopping"],

  dataQuality: {
    status: "verified",
    verifiedFields: ["charges", "cashback", "eligibility"],
    unverifiedFields: [],
    sourceUrls: [
      "https://www.hdfcbank.com/personal/pay/cards/credit-cards/shoppers-stop-credit-card",
      "https://www.paisabazaar.com/credit-card/shoppers-stop-hdfc-credit-card/",
    ],
    lastVerified: "2026-03-27",
  },

  customerCareNumber: "1800 266 4332",
  applyUrl: "https://www.hdfcbank.com/personal/pay/cards/credit-cards/shoppers-stop-credit-card",
  lastUpdated: "2026-03-27",
};
