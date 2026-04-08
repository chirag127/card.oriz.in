import type { BankData } from "@/types/bank";
import { hdfcBank } from "./banks/hdfc";
import { sbiBank } from "./banks/sbi";
import { iciciBank } from "./banks/icici";
import { axisBank } from "./banks/axis";
import { kotakBank } from "./banks/kotak";
import { indusindBank } from "./banks/indusind";
import { yesBank } from "./banks/yes";
import { rblBank } from "./banks/rbl";
import { amexBank } from "./banks/amex";
import { idfcBank } from "./banks/idfc";
import { hsbcBank } from "./banks/hsbc";
import { pnbBank } from "./banks/pnb";
import { bobBank } from "./banks/bob";
import { canaraBank } from "./banks/canara";
import { unionBank } from "./banks/union";

export const ALL_BANKS: BankData[] = [
  hdfcBank,
  sbiBank,
  iciciBank,
  axisBank,
  kotakBank,
  indusindBank,
  yesBank,
  rblBank,
  amexBank,
  idfcBank,
  hsbcBank,
  pnbBank,
  bobBank,
  canaraBank,
  unionBank,
];

export function getBankByCode(code: string): BankData | undefined {
  return ALL_BANKS.find((b) => b.id === code);
}

export function getBankById(id: string): BankData | undefined {
  return ALL_BANKS.find((b) => b.id === id);
}
