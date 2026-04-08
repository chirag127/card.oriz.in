// Generate the master index.ts file from all card data files
import { readdir, readFile, writeFile } from "fs/promises";
import { join, relative } from "path";

const CARDS_DIR = join(import.meta.dirname, "../src/data/cards");
const OUTPUT = join(import.meta.dirname, "../src/data/index.ts");

async function findCardFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await findCardFiles(full)));
    } else if (entry.name.endsWith(".ts")) {
      files.push(full);
    }
  }
  return files;
}

async function getExportName(filePath: string): Promise<string> {
  const content = await readFile(filePath, "utf-8");
  const match = content.match(/export\s+const\s+(\w+)\s*:/);
  if (match?.[1]) return match[1];
  // Fallback: derive from filename
  const filename = filePath.split(/[/\\]/).pop()!.replace(".ts", "");
  return filename
    .split("-")
    .map((w, i) => (i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join("");
}

async function main() {
  const files = await findCardFiles(CARDS_DIR);
  files.sort();

  const imports: string[] = [];
  const exports: string[] = [];
  const typeMap: Record<string, string[]> = {
    credit: [],
    debit: [],
    prepaid: [],
  };

  for (const file of files) {
    const rel = relative(join(import.meta.dirname, "../src/data"), file).replace(
      /\\/g,
      "/"
    );
    const exportName = await getExportName(file);
    const cardType = file.includes("/credit/")
      ? "credit"
      : file.includes("/debit/")
        ? "debit"
        : "prepaid";

    imports.push(`import { ${exportName} } from "./${rel.replace(".ts", "")}";`);
    exports.push(`  ${exportName},`);
    typeMap[cardType]?.push(exportName);
  }

  const content = `// Master card index - auto-generated
// DO NOT EDIT MANUALLY - run pnpm generate:index

import type { CardData } from "@/types/card";

${imports.join("\n")}

export const ALL_CARDS: CardData[] = [
${exports.join("\n")}
];

export const CREDIT_CARDS = ALL_CARDS.filter(
  (c) => c.cardType === "credit"
);
export const DEBIT_CARDS = ALL_CARDS.filter(
  (c) => c.cardType === "debit"
);
export const PREPAID_CARDS = ALL_CARDS.filter(
  (c) => c.cardType === "prepaid"
);

export function getCardById(id: string): CardData | undefined {
  return ALL_CARDS.find((c) => c.id === id);
}

export function getCardsByBank(bankCode: string): CardData[] {
  return ALL_CARDS.filter((c) => c.bankCode === bankCode);
}

export function getCardsByNetwork(network: string): CardData[] {
  return ALL_CARDS.filter((c) => c.network === network);
}

export function getCardsByCategory(category: string): CardData[] {
  return ALL_CARDS.filter((c) => c.category === category);
}

export function getBestCards(
  criterion: string,
  limit: number = 10
): CardData[] {
  const cards = [...ALL_CARDS];
  switch (criterion) {
    case "cashback":
      return cards
        .filter((c) => c.benefits.some((b) => b.category === "cashback"))
        .sort((a, b) =>
          (b.rewardProgram?.effectiveCashbackPercent ?? 0) -
          (a.rewardProgram?.effectiveCashbackPercent ?? 0)
        )
        .slice(0, limit);
    case "travel":
      return cards
        .filter((c) => c.benefits.some((b) => b.category === "travel" || b.category === "lounge"))
        .sort((a, b) => b.value.averageValue - a.value.averageValue)
        .slice(0, limit);
    case "rewards":
      return cards
        .filter((c) => c.benefits.some((b) => b.category === "rewards"))
        .sort((a, b) =>
          (b.rewardProgram?.pointsPer100 ?? 0) -
          (a.rewardProgram?.pointsPer100 ?? 0)
        )
        .slice(0, limit);
    case "fuel":
      return cards
        .filter((c) => c.benefits.some((b) => b.category === "fuel"))
        .sort((a, b) => b.value.averageValue - a.value.averageValue)
        .slice(0, limit);
    case "premium":
      return cards
        .filter((c) =>
          c.tier === "Infinite" || c.tier === "WorldElite" ||
          c.tier === "Signature" || c.category === "premium" ||
          c.category === "super-premium"
        )
        .sort((a, b) => b.value.averageValue - a.value.averageValue)
        .slice(0, limit);
    case "no-annual-fee":
      return cards
        .filter((c) => {
          const fee = c.charges.find((ch) => ch.label.toLowerCase().includes("annual"));
          return fee?.amount === 0;
        })
        .slice(0, limit);
    default:
      return cards
        .sort((a, b) => b.value.averageValue - a.value.averageValue)
        .slice(0, limit);
  }
}
`;

  await writeFile(OUTPUT, content, "utf-8");
  console.log(`✅ Generated index.ts with ${files.length} card imports.`);
}

main().catch(console.error);
