import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import type { CardData } from "@/types/card";

interface CardChartsProps {
  card: CardData;
}

const COLORS = ["#D97706", "#10B981", "#EF4444", "#6366F1", "#0EA5E9", "#8B5CF6"];

function formatCurrency(value: number): string {
  return `₹${value.toLocaleString("en-IN")}`;
}

export const CardValueChart: React.FC<CardChartsProps> = ({ card }) => {
  const valueData = [
    { name: "Benefits", value: card.value.totalAnnualBenefits, fill: "#10B981" },
    { name: "Charges", value: card.value.totalAnnualCharges, fill: "#EF4444" },
    { name: "Net Value", value: card.value.annualNetValue, fill: "#D97706" },
  ];

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={valueData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" fontSize={12} />
          <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} tickFormatter={(v: number) => `₹${(v / 1000).toFixed(0)}K`} />
          <Tooltip
            formatter={(value: unknown) => [formatCurrency(value as number)]}
            contentStyle={{
              backgroundColor: "#1F2937",
              border: "1px solid #374151",
              borderRadius: "8px",
              color: "#F9FAFB",
            }}
          />
          <Bar dataKey="value" radius={[6, 6, 0, 0]}>
            {valueData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const CardBenefitsPieChart: React.FC<CardChartsProps> = ({ card }) => {
  const benefitsByCategory = card.benefits.reduce(
    (acc, benefit) => {
      const cat = benefit.category;
      if (!acc[cat]) acc[cat] = 0;
      acc[cat] += benefit.annualValue;
      return acc;
    },
    {} as Record<string, number>
  );

  const pieData = Object.entries(benefitsByCategory)
    .map(([name, value]) => ({ name, value }))
    .filter((d) => d.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  if (pieData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-text-tertiary">
        <p>Benefit breakdown data not available</p>
      </div>
    );
  }

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {pieData.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length] as string} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: unknown) => [formatCurrency(value as number), "Annual Value"]}
            contentStyle={{
              backgroundColor: "#1F2937",
              border: "1px solid #374151",
              borderRadius: "8px",
              color: "#F9FAFB",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export const CardLimitsChart: React.FC<CardChartsProps> = ({ card }) => {
  const limitData = [
    { name: "ATM/Day", value: card.limits.atmPerDay },
    { name: "POS/E-Com/Day", value: card.limits.posEcomPerDay },
    ...(card.limits.contactlessPerTxn
      ? [{ name: "Contactless/Txn", value: card.limits.contactlessPerTxn }]
      : []),
  ];

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={limitData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <defs>
            <linearGradient id="colorLimit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#D97706" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#D97706" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" fontSize={12} />
          <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} tickFormatter={(v: number) => `₹${(v / 100000).toFixed(1)}L`} />
          <Tooltip
            formatter={(value: unknown) => [formatCurrency(value as number)]}
            contentStyle={{
              backgroundColor: "#1F2937",
              border: "1px solid #374151",
              borderRadius: "8px",
              color: "#F9FAFB",
            }}
          />
          <Area type="monotone" dataKey="value" stroke="#D97706" fillOpacity={1} fill="url(#colorLimit)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const CardRadarChart: React.FC<CardChartsProps> = ({ card }) => {
  const maxLounge = 16;
  const maxInsurance = 10000000;
  const maxAtm = 500000;
  const maxPos = 1000000;

  const loungeCount = card.benefits
    .filter((b) => b.category === "lounge")
    .reduce((sum, b) => sum + (b.frequencyPerYear || 1), 0);

  const insuranceCover = card.insurance
    ? (card.insurance.accidentalDeathCover || 0) +
      (card.insurance.permanentDisabilityCover || 0)
    : 0;

  const radarData = [
    {
      subject: "Lounge",
      A: Math.min((loungeCount / maxLounge) * 100, 100),
      fullMark: 100,
    },
    {
      subject: "Insurance",
      A: Math.min((insuranceCover / maxInsurance) * 100, 100),
      fullMark: 100,
    },
    {
      subject: "ATM Limit",
      A: Math.min((card.limits.atmPerDay / maxAtm) * 100, 100),
      fullMark: 100,
    },
    {
      subject: "POS Limit",
      A: Math.min((card.limits.posEcomPerDay / maxPos) * 100, 100),
      fullMark: 100,
    },
    {
      subject: "ROI",
      A: Math.min(card.value.roiPercent / 50, 100),
      fullMark: 100,
    },
    {
      subject: "Benefits",
      A: Math.min((card.value.totalAnnualBenefits / 50000) * 100, 100),
      fullMark: 100,
    },
  ];

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
          <PolarGrid stroke="rgba(255,255,255,0.15)" />
          <PolarAngleAxis dataKey="subject" stroke="rgba(255,255,255,0.5)" fontSize={11} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="rgba(255,255,255,0.2)" />
          <Radar
            name={card.name}
            dataKey="A"
            stroke="#D97706"
            fill="#D97706"
            fillOpacity={0.4}
          />
          <Tooltip
            formatter={(value: unknown) => [`${(value as number).toFixed(0)}%`, "Score"]}
            contentStyle={{
              backgroundColor: "#1F2937",
              border: "1px solid #374151",
              borderRadius: "8px",
              color: "#F9FAFB",
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const CardChargesBreakdownChart: React.FC<CardChartsProps> = ({ card }) => {
  const chargeData = card.charges
    .filter((c) => c.amount > 0)
    .map((c) => ({
      name: c.label.replace(" Fee", ""),
      value: c.amountWithGst || c.amount,
    }));

  if (chargeData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-text-tertiary">
        <p>No charges applicable</p>
      </div>
    );
  }

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chargeData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" fontSize={12} />
          <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} tickFormatter={(v: number) => `₹${v}`} />
          <Tooltip
            formatter={(value: unknown) => [formatCurrency(value as number), "Amount"]}
            contentStyle={{
              backgroundColor: "#1F2937",
              border: "1px solid #374151",
              borderRadius: "8px",
              color: "#F9FAFB",
            }}
          />
          <Bar dataKey="value" fill="#EF4444" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
