import type { CardData } from "@/types/card";

export const paytmPaymentsBankPrepaidCard: CardData = {
  id: "paytm-payments-bank-prepaid-card",
  name: "Paytm Payments Bank Prepaid Card",
  tagline: "UPI and NCMC-enabled prepaid card for digital payments",
  description: "The Paytm Payments Bank Prepaid Card is a feature-rich prepaid card offering cashback on Paytm transactions, UPI support, and NCMC (National Common Mobility Card) functionality. With zero fees and integration with the Paytm ecosystem, it is ideal for users who primarily make digital payments.",
  bank: "Paytm Payments Bank",
  bankCode: "paytm",
  network: "RuPay",
  cardType: "prepaid",
  tier: "Classic",
  variant: "Paytm Payments Bank",
  usage: "Domestic",
  bin: "",
  material: "Plastic",
  colorScheme: "Blue and white",
  virtualCardAvailable: true,

  eligibility: {
    employmentType: ["Salaried", "Self-Employed", "Student"],
    minAge: 18,
    maxAge: 65,
    existingAccountRequired: true,
    accountType: ["Paytm Payments Bank"],
    invitationOnly: false,
    notes: [
      "Available to Paytm Payments Bank account holders",
      "Full KYC verification required",
      "No minimum balance required",
    ],
  },

  charges: [
    { label: "Issuance Fee", amount: 0, note: "Free" },
    { label: "Annual Fee", amount: 0, note: "Free" },
  ],

  atmCharges: {
    ownBankFreePerMonth: 3,
    ownBankCharge: 20,
    otherBankFreePerMonth: 0,
    otherBankCharge: 20,
    internationalWithdrawalFee: 0,
    internationalWithdrawalPercent: 0,
    balanceEnquiryOwnBank: 0,
    balanceEnquiryOtherBank: 8.5,
    miniStatementOtherBank: 8.5,
  },

  transactionCharges: {
    currencyMarkupPercent: 0,
    crossBorderFee: 0,
    dccFeePercent: 0,
    smsAlertPerMonth: 0,
    pinRegenerationCharge: 50,
    physicalStatementCharge: 0,
  },

  limits: {
    atmPerDay: 25000,
    posEcomPerDay: 100000,
    contactlessPerTxn: 5000,
    contactlessDailyLimit: 25000,
  },

  benefits: [
    {
      category: "cashback",
      title: "Cashback on Paytm Transactions",
      description: "Earn cashback on transactions made through Paytm ecosystem",
      valueStr: "Cashback",
      valueNum: 0,
      frequencyStr: "Per transaction",
      frequencyPerYear: 0,
      annualValue: 0,
      conditions: ["Valid on Paytm ecosystem transactions"],
      isSellable: false,
      sellValue: 0,
      isActive: true,
      activationRequired: false,
    },
  ],

  welcomeBonus: {
    available: false,
    description: "No welcome bonus currently offered",
    valueStr: "Nil",
    valueNum: 0,
    conditions: [],
  },

  milestoneBonuses: [],

  feeWaivers: [],

  features: [
    "UPI enabled",
    "NCMC enabled (National Common Mobility Card)",
    "Contactless payments",
    "EMV chip security",
    "Paytm app integration",
    "Virtual and physical card available",
    "Metro and transit payments via NCMC",
  ],

  validity: "5 years",
  contactless: true,
  ncmc: true,

  gradientColors: ["#00b9f1", "#ffffff"],
  value: {
    highestValue: 1500,
    averageValue: 800,
    isSellable: false,
    marketPrice: { minSellPrice: 0, maxSellPrice: 0, averageMarketValue: 0 },
    annualNetValue: 800,
    tenYearNetValue: 8000,
    totalAnnualCharges: 0,
    totalAnnualBenefits: 800,
    roiPercent: 999,
  },

  category: "prepaid",
  internationalUsable: false,
  bestFor: ["Digital Payments", "Cashback"],

  dataQuality: {
    status: "verified",
    verifiedFields: ["charges", "limits", "features"],
    unverifiedFields: [],
    sourceUrls: [
      "https://paytm.com/payments-bank/debit-card",
    ],
    lastVerified: "2026-03-27",
  },

  customerCareNumber: "0120-4456-456",
  applyUrl: "https://paytm.com/payments-bank",
  lastUpdated: "2026-03-27",
};
