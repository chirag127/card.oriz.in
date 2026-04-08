import type { CardData } from "@/types/card";

export const freechargePrepaidCard: CardData = {
  id: "freecharge-prepaid-card",
  name: "FreeCharge Prepaid Card",
  tagline: "Mastercard prepaid powered by FreeCharge",
  description: "The FreeCharge Prepaid Card is a Mastercard Classic prepaid card integrated with the FreeCharge app. It enables cashless transactions, bill payments, and online shopping with easy reload via UPI and FreeCharge wallet.",
  bank: "FreeCharge",
  bankCode: "freecharge",
  network: "Mastercard",
  cardType: "prepaid",
  tier: "Classic",
  variant: "Prepaid",
  usage: "Domestic",
  bin: "",
  material: "Plastic",
  colorScheme: "Purple and white",
  virtualCardAvailable: true,

  eligibility: {
    employmentType: ["Salaried", "Self-Employed", "Student"],
    minAge: 18,
    maxAge: 65,
    existingAccountRequired: false,
    invitationOnly: false,
    notes: [
      "Available for all Indian residents above 18 years",
      "FreeCharge account required",
      "Full KYC verification required",
    ],
  },

  charges: [
    { label: "Issuance Fee", amount: 0, note: "Free" },
    { label: "Annual Fee", amount: 0, note: "Free" },
    { label: "Reload Fee", amount: 0, note: "Free via UPI" },
  ],

  atmCharges: {
    ownBankFreePerMonth: 0,
    ownBankCharge: 0,
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
    atmPerDay: 0,
    posEcomPerDay: 100000,
    contactlessPerTxn: 5000,
    contactlessDailyLimit: 25000,
  },

  benefits: [
    {
      category: "cashback",
      title: "FreeCharge Cashback",
      description: "Earn cashback on FreeCharge bill payments and recharges",
      valueStr: "Cashback offers",
      valueNum: 0,
      frequencyStr: "Per transaction",
      frequencyPerYear: 0,
      annualValue: 0,
      conditions: ["Valid on FreeCharge ecosystem"],
      isSellable: false,
      sellValue: 0,
      isActive: true,
      activationRequired: false,
    },
  ],

  welcomeBonus: {
    available: false,
    description: "No welcome bonus",
    valueStr: "Nil",
    valueNum: 0,
    conditions: [],
  },

  milestoneBonuses: [],
  feeWaivers: [],

  features: [
    "Contactless payments",
    "EMV chip security",
    "Instant reload via UPI",
    "Virtual card available",
    "Integrated with FreeCharge app",
    "Bill payments and recharges",
  ],

  validity: "5 years",
  contactless: true,
  ncmc: false,

  gradientColors: ["#6a1b9a", "#ffffff"],
  value: {
    highestValue: 0,
    averageValue: 0,
    isSellable: false,
    marketPrice: { minSellPrice: 0, maxSellPrice: 0, averageMarketValue: 0 },
    annualNetValue: 0,
    tenYearNetValue: 0,
    totalAnnualCharges: 0,
    totalAnnualBenefits: 0,
    roiPercent: 0,
  },

  category: "prepaid",
  internationalUsable: false,
  bestFor: ["Bill Payments", "Online Shopping"],

  dataQuality: {
    status: "verified",
    verifiedFields: ["charges", "features"],
    unverifiedFields: [],
    sourceUrls: ["https://www.freecharge.in"],
    lastVerified: "2026-03-27",
  },

  applyUrl: "https://www.freecharge.in",
  lastUpdated: "2026-03-27",
};
