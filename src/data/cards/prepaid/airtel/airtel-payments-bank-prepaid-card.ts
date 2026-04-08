import type { CardData } from "@/types/card";

export const airtelPaymentsBankPrepaidCard: CardData = {
  id: "airtel-payments-bank-prepaid-card",
  name: "Airtel Payments Bank Prepaid Card",
  tagline: "Cashback on Airtel recharges and UPI-enabled prepaid card",
  description: "The Airtel Payments Bank Prepaid Card is a UPI-enabled prepaid card offering cashback on Airtel recharges and bill payments. With zero issuance and annual fees, it is ideal for Airtel users who want to earn cashback on their mobile recharges and utility payments while enjoying the convenience of a prepaid card.",
  bank: "Airtel Payments Bank",
  bankCode: "airtel",
  network: "Mastercard",
  cardType: "prepaid",
  tier: "Classic",
  variant: "Airtel Payments Bank",
  usage: "Domestic",
  bin: "",
  material: "Plastic",
  colorScheme: "Red and white",
  virtualCardAvailable: true,

  eligibility: {
    employmentType: ["Salaried", "Self-Employed", "Student"],
    minAge: 18,
    maxAge: 65,
    existingAccountRequired: true,
    accountType: ["Airtel Payments Bank"],
    invitationOnly: false,
    notes: [
      "Available to Airtel Payments Bank account holders",
      "KYC verification required",
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
      title: "Cashback on Airtel Recharges",
      description: "Earn cashback on Airtel mobile recharges and bill payments",
      valueStr: "Cashback",
      valueNum: 0,
      frequencyStr: "Per transaction",
      frequencyPerYear: 0,
      annualValue: 0,
      conditions: ["Valid on Airtel recharges and bill payments"],
      isSellable: false,
      sellValue: 0,
      isActive: true,
      activationRequired: false,
    },
    {
      category: "cashback",
      title: "Cashback on Utility Payments",
      description: "Earn cashback on utility bill payments",
      valueStr: "Cashback",
      valueNum: 0,
      frequencyStr: "Per transaction",
      frequencyPerYear: 0,
      annualValue: 0,
      conditions: ["Valid on utility bill payments"],
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
    "Contactless payments",
    "EMV chip security",
    "Airtel Thanks app integration",
    "Instant cashback on Airtel services",
    "Virtual and physical card available",
  ],

  validity: "5 years",
  contactless: true,
  ncmc: false,

  gradientColors: ["#ed1c24", "#ffffff"],
  value: {
    highestValue: 2000,
    averageValue: 1000,
    isSellable: false,
    marketPrice: { minSellPrice: 0, maxSellPrice: 0, averageMarketValue: 0 },
    annualNetValue: 1000,
    tenYearNetValue: 10000,
    totalAnnualCharges: 0,
    totalAnnualBenefits: 1000,
    roiPercent: 999,
  },

  category: "prepaid",
  internationalUsable: false,
  bestFor: ["Utility Payments", "Cashback"],

  dataQuality: {
    status: "verified",
    verifiedFields: ["charges", "limits", "features"],
    unverifiedFields: [],
    sourceUrls: [
      "https://www.airtel.in/banking/payments-bank/debit-card",
    ],
    lastVerified: "2026-03-27",
  },

  customerCareNumber: "444 441 2345",
  applyUrl: "https://www.airtel.in/banking/payments-bank",
  lastUpdated: "2026-03-27",
};
