import type { RbiBankCategory } from "./card";

export interface BankData {
  id: string;
  name: string;
  shortName: string;
  logoPath: string;
  website: string;
  category: RbiBankCategory;
  headquartersCity: string;
  foundedYear: number;
  tagline: string;
  description: string;
  cardCount: number;
  applicationStatusUrl: string;
  customerCareNumber: string;
  socialLinks: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  lastUpdated: string;
}
