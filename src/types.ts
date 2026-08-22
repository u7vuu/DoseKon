export type RouteType = 'Syrup' | 'Injection';

export type AgeUnit = 'years' | 'months';

export type AgeRange = 'infant' | 'child' | 'older';

export interface ConcRow {
  label: string;
  factor?: number;
  factorMin?: number;
  factorMax?: number;
  freq?: string;
  unit?: 'mL' | 'drops';
  isAugHighDose?: boolean;
}

export interface RouteDetail {
  route: 'IV' | 'IM';
  text: string;
}

export interface VialGroup {
  label: string;
  routes: RouteDetail[];
}

export interface Medication {
  id: string;
  name: string;
  nameAr?: string;
  generic?: string;
  categoryTag: string;
  generation?: 1 | 2 | 3;
  isPOM?: boolean;
  dosageLine: string;
  dosageLines?: string[];
  concs?: ConcRow[];
  strengths?: string[];
  vialGroups?: VialGroup[];
  routeRows?: RouteDetail[];
  adminNote?: string;
  warnNote?: string;
}

export interface DrugCategory {
  id: string;
  titleEn: string;
  titleAr: string;
  accent: string;
  accentTint: string;
  medications: Medication[];
}
