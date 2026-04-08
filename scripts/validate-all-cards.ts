// Validate all card data files against Zod schema
import { CardDataSchema } from "../src/data/schema";
import { ALL_CARDS } from "../src/data/index";


interface ValidationError {
  cardId: string;
  field: string;
  message: string;
}

const errors: ValidationError[] = [];

for (const card of ALL_CARDS) {
  const result = CardDataSchema.safeParse(card);
  if (!result.success) {
    for (const issue of result.error.issues) {
      errors.push({
        cardId: card.id,
        field: issue.path.join("."),
        message: issue.message,
      });
    }
  }

  // Additional business logic validations
  if (card.value.totalAnnualBenefits > 0 && card.value.totalAnnualCharges > 0) {
    const expectedRoi =
      ((card.value.totalAnnualBenefits - card.value.totalAnnualCharges) /
        card.value.totalAnnualCharges) *
      100;
    if (Math.abs(card.value.roiPercent - expectedRoi) > 1) {
      errors.push({
        cardId: card.id,
        field: "value.roiPercent",
        message: `ROI ${card.value.roiPercent}% doesn't match calculated ${expectedRoi.toFixed(1)}%`,
      });
    }
  }

  if (!card.lastUpdated || !/^\d{4}-\d{2}-\d{2}$/.test(card.lastUpdated)) {
    errors.push({
      cardId: card.id,
      field: "lastUpdated",
      message: "lastUpdated must be a valid ISO date (YYYY-MM-DD)",
    });
  }

  if (!card.applyUrl || !card.applyUrl.startsWith("http")) {
    errors.push({
      cardId: card.id,
      field: "applyUrl",
      message: "applyUrl must be a valid URL",
    });
  }
}

if (errors.length > 0) {
  console.error(`\n❌ Validation failed with ${errors.length} error(s):\n`);
  for (const err of errors) {
    console.error(`  [${err.cardId}] ${err.field}: ${err.message}`);
  }
  process.exit(1);
} else {
  console.log(
    `\n✅ All ${ALL_CARDS.length} cards validated successfully against Zod schema.`
  );
}
