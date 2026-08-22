import { DrugCategory } from '../types';

export const syrupCategories: DrugCategory[] = [
  {
    id: 'penicillins',
    titleEn: 'Penicillins',
    titleAr: 'البنسلينات',
    accent: 'var(--teal)',
    accentTint: 'var(--teal-tint)',
    medications: [
      {
        id: 'amoxicillin-oral',
        name: 'Amoxicillin',
        categoryTag: 'Penicillin',
        dosageLine: '40–45 mg/kg/day — mild to moderate infection  ·  80–90 mg/kg/day — severe infection',
        concs: [
          { label: '125 mg / 5 mL', factor: 0.5, freq: '×3/day' },
          { label: '250 mg / 5 mL', factor: 0.25, freq: '×3/day' }
        ],
        adminNote: 'With or without food.'
      },
      {
        id: 'augmentin-oral',
        name: 'Amoxicillin/Clavulanic acid',
        generic: 'Augmentin®',
        categoryTag: 'Penicillin',
        dosageLine: '4:1 — 20–40 mg(amox)/kg/day divided q8hr.\n7:1 — 25–45 mg(amox)/kg/day divided q12hr.\n14:1 — 90 mg(amox)/kg/day divided q12hr.',
        concs: [
          { label: '156 mg / 5 mL', factor: 0.25, freq: '×3/day' },
          { label: '312 mg / 5 mL', factor: 0.15, freq: '×3/day' },
          { label: '457 mg / 5 mL (BID)', factor: 0.2, freq: '×2/day' },
          { label: '642 mg / 5 mL', factor: 0.35, freq: '×2/day', isAugHighDose: true }
        ],
        adminNote: 'Take with food, ideally at the start of a meal.'
      }
    ]
  },
  {
    id: 'cephalosporins',
    titleEn: 'Cephalosporins',
    titleAr: 'السيفالوسبورينات',
    accent: 'var(--amber)',
    accentTint: 'var(--amber-tint)',
    medications: [
      {
        id: 'cephalexin',
        name: 'Cephalexin',
        generic: 'Keflex®',
        categoryTag: '1st Gen',
        generation: 1,
        dosageLine: '25–50 mg/kg/day divided q6–8–12hr',
        concs: [
          { label: '125 mg / 5 mL', factor: 0.4, freq: '×4/day' },
          { label: '250 mg / 5 mL', factor: 0.2, freq: '×4/day' }
        ],
        adminNote: 'With or without food.'
      },
      {
        id: 'cefadroxil',
        name: 'Cefadroxil',
        generic: 'Roxil®',
        categoryTag: '1st Gen',
        generation: 1,
        dosageLine: '30 mg/kg/day divided q12hr, for 10 days',
        concs: [
          { label: '250 mg / 5 mL', factor: 0.3, freq: '×2/day' }
        ]
      },
      {
        id: 'cefaclor',
        name: 'Cefaclor',
        categoryTag: '2nd Gen',
        generation: 2,
        dosageLine: '20–40 mg/kg/day divided q8–12hr',
        concs: [
          { label: '125 mg / 5 mL', factor: 0.6, freq: '×2/day' },
          { label: '250 mg / 5 mL', factor: 0.3, freq: '×2/day' },
          { label: '375 mg / 5 mL', factor: 0.2, freq: '×2/day' }
        ]
      },
      {
        id: 'cefuroxime',
        name: 'Cefuroxime',
        categoryTag: '2nd Gen',
        generation: 2,
        dosageLine: '30 mg/kg/day divided q12hr',
        concs: [
          { label: '125 mg / 5 mL', factor: 0.6, freq: '×2/day' },
          { label: '250 mg / 5 mL', factor: 0.3, freq: '×2/day' }
        ],
        adminNote: 'With food → improves absorption.',
        warnNote: 'Not below 3 months'
      },
      {
        id: 'cefdinir',
        name: 'Cefdinir',
        categoryTag: '3rd Gen',
        generation: 3,
        dosageLine: '14 mg/kg/day divided q12–24hr, for 5–10 days',
        concs: [
          { label: '125 mg / 5 mL', factor: 0.56, freq: 'q24h' },
          { label: '125 mg / 5 mL', factor: 0.28, freq: '×2/day' }
        ],
        adminNote: 'With or without food; separate from iron supplements.',
        warnNote: 'Not below 6 months'
      },
      {
        id: 'cefixime',
        name: 'Cefixime',
        categoryTag: '3rd Gen',
        generation: 3,
        dosageLine: '8 mg/kg/day divided q12–24hr, for 7–10 days',
        concs: [
          { label: '100 mg / 5 mL', factor: 0.4, freq: 'q24h' },
          { label: '100 mg / 5 mL', factor: 0.2, freq: '×2/day' }
        ],
        warnNote: 'Not below 6 months'
      },
      {
        id: 'cefpodoxime',
        name: 'Cefpodoxime',
        categoryTag: '3rd Gen',
        generation: 3,
        dosageLine: '10 mg/kg/day divided q12hr',
        concs: [
          { label: '50 mg / 5 mL', factor: 0.5, freq: '×2/day' },
          { label: '100 mg / 5 mL', factor: 0.25, freq: '×2/day' }
        ],
        warnNote: 'Not below 2 months'
      }
    ]
  },
  {
    id: 'macrolides',
    titleEn: 'Macrolides',
    titleAr: 'الماكروليدات',
    accent: 'var(--plum)',
    accentTint: 'var(--plum-tint)',
    medications: [
      {
        id: 'azithromycin',
        name: 'Azithromycin',
        categoryTag: 'Macrolide',
        dosageLine: '5–12 mg/kg/day q24hr, for 3 days',
        concs: [
          { label: '200 mg / 5 mL', factor: 0.25, freq: '×1/day' }
        ],
        adminNote: 'Susp: with or without food.',
        warnNote: 'Not below 6 months'
      },
      {
        id: 'clarithromycin',
        name: 'Clarithromycin',
        categoryTag: 'Macrolide',
        dosageLine: '7.5 mg/kg/dose q12hr',
        concs: [
          { label: '250 mg / 5 mL', factor: 0.15, freq: '×2/day' }
        ],
        adminNote: 'With or without food.',
        warnNote: 'Not below 6 months'
      },
      {
        id: 'erythromycin',
        name: 'Erythromycin',
        categoryTag: 'Macrolide',
        dosageLine: '40–50 mg/kg/day divided q6–8hr',
        concs: [
          { label: '125 mg / 5 mL', factor: 0.4, freq: '×4/day' },
          { label: '250 mg / 5 mL', factor: 0.2, freq: '×4/day' }
        ],
        adminNote: 'Administer ethylsuccinate (EES) without regard to meals; may consider administering after food to decrease GI discomfort.'
      }
    ]
  },
  {
    id: 'other-agents',
    titleEn: 'Other Agents',
    titleAr: 'أدوية أخرى',
    accent: 'var(--slate)',
    accentTint: 'var(--slate-tint)',
    medications: [
      {
        id: 'metronidazole-oral',
        name: 'Metronidazole',
        generic: 'Flagyl®',
        categoryTag: 'Antiprotozoal',
        dosageLine: '15–50 mg/kg/day divided q8hr',
        concs: [
          { label: '125 mg / 5 mL', factor: 0.4, freq: '×3/day' },
          { label: '200 mg / 5 mL', factor: 0.25, freq: '×3/day' }
        ],
        adminNote: 'With or after food if it causes GI upset; avoid alcohol during treatment and for at least 3 days after.'
      },
      {
        id: 'cotrimoxazole',
        name: 'Cotrimoxazole',
        generic: 'Methprim® (TMP/SMX)',
        categoryTag: 'Sulfonamide',
        dosageLine: '8–12 mg(TMP)/kg/day divided q12hr',
        concs: [
          { label: 'TMP 40 / SMX 200 per 5 mL', factor: 0.5, freq: '×2/day' }
        ],
        adminNote: 'With or without food; plenty of fluids.',
        warnNote: 'Not below 2 months'
      },
      {
        id: 'nalidixic-acid',
        name: 'Nalidixic Acid',
        categoryTag: 'Quinolone',
        dosageLine: '8.25–13.75 mg/kg/dose q6hr',
        concs: [
          { label: '250 mg / 5 mL', factor: 0.2, freq: 'q6hr' },
          { label: '300 mg / 5 mL', factor: 0.16, freq: 'q6hr' }
        ],
        warnNote: 'Not below 3 months'
      },
      {
        id: 'nitrofurantoin',
        name: 'Nitrofurantoin',
        categoryTag: 'Urinary',
        dosageLine: '5–7 mg/kg/day divided q6hr',
        concs: [
          { label: '25 mg / 5 mL', factor: 0.3, freq: '×4/day' }
        ],
        adminNote: 'With food or milk → improves absorption/tolerability.',
        warnNote: 'Not below 1 month'
      },
      {
        id: 'furazolidone',
        name: 'Furazolidone',
        isPOM: true,
        categoryTag: 'Nitrofuran',
        dosageLine: '1.25 mg/kg/dose q6hr, for 3–7 days (7–10 days in giardiasis)',
        concs: [
          { label: '50 mg / 15 mL (16.6 mg/5 mL)', factor: 0.375, freq: '×4/day' }
        ],
        warnNote: 'Not below 1 month'
      }
    ]
  },
  {
    id: 'analgesics',
    titleEn: 'Analgesics & Antipyretics',
    titleAr: 'المسكنات وخافضات الحرارة',
    accent: 'var(--coral)',
    accentTint: 'var(--coral-tint)',
    medications: [
      {
        id: 'paracetamol-oral',
        name: 'Paracetamol',
        generic: 'Acetaminophen',
        categoryTag: 'Analgesic/Antipyretic',
        dosageLine: '10–15 mg/kg/dose PO q4–6hr prn — infants, children & adolescents',
        concs: [
          { label: '125 mg / 5 mL', factor: 0.5, freq: '×3–4/day' },
          { label: '250 mg / 5 mL', factor: 0.25, freq: '×3–4/day' }
        ],
        adminNote: 'May administer without regard to food; may give with food to decrease possible GI upset.',
        warnNote: 'Not below 1 month'
      },
      {
        id: 'ibuprofen',
        name: 'Ibuprofen',
        categoryTag: 'NSAID',
        dosageLine: '4–10 mg/kg/dose (max 600 mg/dose) PO q6–8hr — max 40 mg/kg/day or 2,400 mg/day',
        concs: [
          { label: '100 mg / 5 mL', factorMin: 0.25, factorMax: 0.5, freq: '×3–4/day' }
        ],
        adminNote: 'Administer with food or milk.',
        warnNote: 'Not below 6 months'
      }
    ]
  },
  {
    id: 'antihistamines',
    titleEn: 'Antihistamines',
    titleAr: 'مضادات الهستامين',
    accent: 'var(--sky)',
    accentTint: 'var(--sky-tint)',
    medications: [
      {
        id: 'cetirizine',
        name: 'Cetirizine',
        categoryTag: '2nd-Gen Antihistamine',
        dosageLine: '6mo–6y: 2.5–5 mL PO qDay (may increase to 5 mL qDay or 2.5 mL q12hr)  ·  >6y: 5–10 mL PO qDay',
        concs: [
          { label: '5 mg / 5 mL (1 mg/mL)', factor: 0.25, freq: '×1/day' }
        ],
        adminNote: 'May be administered with or without food.',
        warnNote: 'Not below 6 months'
      },
      {
        id: 'loratadine',
        name: 'Loratadine',
        categoryTag: '2nd-Gen Antihistamine',
        dosageLine: '2–6y: 5 mL PO qDay  ·  >6y: 10 mL PO qDay',
        concs: [
          { label: '5 mg / 5 mL — 2–6y', factor: 0.2, freq: '×1/day' },
          { label: '5 mg / 5 mL — >6y', factor: 0.3, freq: '×1/day' }
        ],
        adminNote: 'Administer without regard to meals.',
        warnNote: 'Not below 2 years'
      },
      {
        id: 'levocetirizine',
        name: 'Levocetirizine',
        categoryTag: '2nd-Gen Antihistamine',
        dosageLine: '6mo–5y: 2.5 mL PO qDay  ·  6–12y: 5 mL PO qDay',
        concs: [
          { label: '2.5 mg / 5 mL', factor: 0.2, freq: '×1/day' }
        ],
        adminNote: 'Administer in the evening with or without food.',
        warnNote: 'Not below 6 months'
      },
      {
        id: 'desloratadine',
        name: 'Desloratadine',
        categoryTag: '2nd-Gen Antihistamine',
        dosageLine: '6–12mo: 2 mL PO qDay  ·  1–5y: 2.5 mL PO qDay  ·  6–12y: 5 mL PO qDay',
        concs: [
          { label: '2.5 mg / 5 mL — 6–12mo', factor: 0.2, freq: '×1/day' },
          { label: '2.5 mg / 5 mL — 1–5y', factor: 0.15, freq: '×1/day' },
          { label: '2.5 mg / 5 mL — 6–12y', factor: 0.15, freq: '×1/day' }
        ],
        adminNote: 'May be taken with or without food.',
        warnNote: 'Not below 6 months'
      },
      {
        id: 'diphenhydramine',
        name: 'Diphenhydramine',
        categoryTag: '1st-Gen Antihistamine',
        dosageLine: '2–6y: 3.5 mL PO q4–6hr  ·  6–12y: 6.25–12.5 mL PO q4–6hr',
        concs: [
          { label: '10 mg / 5 mL', factor: 0.625, freq: '×3–4/day' }
        ],
        adminNote: 'May administer without regard to meals; when used to prevent motion sickness, give the first dose 30–60 minutes prior to exposure.',
        warnNote: 'Not below 2 years'
      },
      {
        id: 'chlorpheniramine',
        name: 'Chlorpheniramine',
        categoryTag: '1st-Gen Antihistamine',
        dosageLine: '2–<6y: 2.5 mL q4–6hr (max 15 mL/day)  ·  6–<12y: 5 mL q4–6hr (max 30 mL/day)',
        concs: [
          { label: '2 mg / 5 mL — 2–<6y', factor: 0.4, freq: '×3–4/day' },
          { label: '2 mg / 5 mL — 6–<12y', factor: 0.375, freq: '×3–4/day' }
        ],
        adminNote: 'May be administered with food or water.',
        warnNote: 'Not below 2 years'
      }
    ]
  },
  {
    id: 'corticosteroids',
    titleEn: 'Corticosteroids',
    titleAr: 'الكورتيكوستيرويدات',
    accent: 'var(--red)',
    accentTint: 'var(--red-tint)',
    medications: [
      {
        id: 'prednisolone',
        name: 'Prednisolone',
        categoryTag: 'Corticosteroid',
        dosageLine: '0.1–2 mg/kg/day PO in divided doses, 1–4 times daily',
        concs: [
          { label: '15 mg / 5 mL', factor: 0.15, freq: '×1/day' },
          { label: '5 mg / 5 mL', factor: 0.5, freq: '×1/day' }
        ],
        adminNote: 'Administer after meals or with food/milk to decrease GI upset.'
      },
      {
        id: 'dexamethasone',
        name: 'Dexamethasone',
        categoryTag: 'Corticosteroid',
        dosageLine: '0.08–0.3 mg/kg/day IV/PO/IM, divided q6hr or q12hr',
        concs: [
          { label: '0.5 mg / 5 mL', factor: 1, freq: '×2/day' },
          { label: '0.5 mg / 5 mL', factor: 0.5, freq: '×4/day' }
        ]
      }
    ]
  },
  {
    id: 'gastrointestinal',
    titleEn: 'Gastrointestinal',
    titleAr: 'الجهاز الهضمي',
    accent: 'var(--indigo)',
    accentTint: 'var(--indigo-tint)',
    medications: [
      {
        id: 'lactulose',
        name: 'Lactulose',
        categoryTag: 'Laxative',
        dosageLine: '1–11mo: 2.5 mL  ·  1–4y: 2.5–10 mL  ·  5–17y: 5–20 mL  ·  Adult: 15–30 mL — PO twice daily',
        concs: [
          { label: '667 g/L (10 g/15 mL)', factor: 0.5, freq: '×2/day' }
        ],
        adminNote: 'May mix with fruit juice, water, or milk; preferably after meals.',
        warnNote: 'Not below 1 month'
      },
      {
        id: 'metoclopramide',
        name: 'Metoclopramide',
        categoryTag: 'Prokinetic/Antiemetic',
        dosageLine: '0.1–0.15 mg/kg/dose PO, 3–4 times daily',
        concs: [
          { label: '5 mg / 5 mL (1 mg/mL)', factor: 0.1, freq: '×3–4/day' }
        ],
        adminNote: 'Administer 30 minutes before meals and at bedtime.'
      },
      {
        id: 'ondansetron',
        name: 'Ondansetron',
        categoryTag: 'Antiemetic',
        dosageLine: '0.2 mg/kg/dose PO q12hr',
        concs: [
          { label: '4 mg / 5 mL', factor: 0.25, freq: '×2/day' }
        ],
        adminNote: 'Administer 30 minutes before meals.',
        warnNote: 'Not below 3 months'
      },
      {
        id: 'hyoscine',
        name: 'Hyoscine Butylbromide',
        generic: 'Buscopan®',
        categoryTag: 'Antispasmodic',
        dosageLine: '6–11y: 10 mL PO three times daily',
        concs: [
          { label: '5 mg / 5 mL (1 mg/mL)', factor: 0.3, freq: '×3/day' }
        ],
        adminNote: 'Administration 30–60 minutes before meals is recommended, but not required, when treating GI disorders.',
        warnNote: 'Not below 2 years (OTC: above 6 years)'
      }
    ]
  },
  {
    id: 'oral-drops',
    titleEn: 'Oral Drops',
    titleAr: 'قطرات فموية',
    accent: 'var(--sky)',
    accentTint: 'var(--sky-tint)',
    medications: [
      {
        id: 'paracetamol-drops',
        name: 'Paracetamol Drop',
        generic: 'Acetaminophen',
        categoryTag: 'Oral Drop',
        dosageLine: 'Up to 3 months → 8 drops as needed\n4–11 months → 16 drops as needed\n12–23 months → 24 drops as needed',
        concs: [
          { label: '100 mg / 1 mL', factor: 2, freq: 'as needed', unit: 'drops' }
        ],
        adminNote: 'From birth–3 months: not above 40 mg per dose.\nMay be added with a small amount of milk or given directly into the mouth.'
      },
      {
        id: 'dimetindene-drops',
        name: 'Dimetindene (Fenistil)',
        categoryTag: 'Antihistamine',
        dosageLine: 'Adults: The usual recommended dose is 1–2 mg 3 times daily.\nChildren: The usual dose is approximately 0.1 mg/kg body weight per day.\nChildren 1 month–1 year: 3–10 drops 3 times a day.\nChildren 1–3 years: 10–15 drops 3 times a day.\nChildren 3–12 years: 15–20 drops 3 times a day.',
        concs: [
          { label: '1 mg / 1 mL', factor: 0.66, freq: '×3/day', unit: 'drops' }
        ],
        warnNote: 'Not below 1 month'
      }
    ]
  }
];

export const injectionCategories: DrugCategory[] = [
  {
    id: 'injectable-agents',
    titleEn: 'Injectable Medications — IV / IM',
    titleAr: 'المضادات الحيوية والأدوية الوريدية والعضلية',
    accent: 'var(--indigo)',
    accentTint: 'var(--indigo-tint)',
    medications: [
      {
        id: 'paracetamol-vial',
        name: 'Paracetamol vial',
        generic: 'Acetaminophen',
        categoryTag: 'Vial · IV',
        dosageLine: '<50 kg: 15 mg/kg/dose every 6 hours\n≥50 kg: 1,000 mg every 6 hours or 650 mg every 4 hours',
        strengths: ['×4/day'],
        vialGroups: [
          {
            label: 'Administration',
            routes: [
              { route: 'IV', text: 'Give by IV infusion over 15 minutes' }
            ]
          }
        ],
        adminNote: 'Single use only.'
      },
      {
        id: 'amoxicillin-inj',
        name: 'Amoxicillin',
        categoryTag: 'Vial',
        dosageLine: 'Mild–moderate: 25 mg/kg/dose every 8 hours IV (≈75 mg/kg/day)\nSevere infections: 50 mg/kg/dose every 8 hours IV (≈150 mg/kg/day)',
        strengths: ['500 mg', '1000 mg'],
        vialGroups: [
          {
            label: 'Vial: 500 mg',
            routes: [
              { route: 'IV', text: '500 mg in 10 mL WFI or N.S — IV direct or dilute in 100 mL N.S infusion' },
              { route: 'IM', text: 'in 2.5 mL N.S or Lidocaine 1%' }
            ]
          },
          {
            label: 'Vial: 1000 mg',
            routes: [
              { route: 'IV', text: '1000 mg in 20 mL N.S — IV direct or dilute into a 100 mL N.S infusion' },
              { route: 'IM', text: 'in 2.5 mL N.S or Lidocaine 1%' }
            ]
          }
        ],
        adminNote: 'Compatible with: N.S 0.9%\nIV: Inject over 3–4 min; Infuse over 30–60 min'
      },
      {
        id: 'augmentin-inj',
        name: 'Amoxicillin/Clavulanic acid',
        generic: 'Augmentin®',
        categoryTag: 'Vial · IV only',
        dosageLine: '0–3 months: 30 mg/kg/dose q12hr\n3 months–12 years: 30 mg/kg/dose q8hr\n>12 years: 1.2 g q8hr',
        strengths: ['600 mg', '1.2 g'],
        vialGroups: [
          {
            label: 'Vial: 600 mg',
            routes: [
              { route: 'IV', text: '600 mg in 10 mL WFI or N.S — IV direct or dilute in 100 mL N.S' }
            ]
          },
          {
            label: 'Vial: 1.2 g',
            routes: [
              { route: 'IV', text: '1.2 g in 20 mL WFI or N.S — IV direct or dilute in 100 mL N.S' }
            ]
          }
        ],
        adminNote: 'Compatible with: N.S 0.9%\nIV: Inject over 3–4 min; Infuse over 30–40 min'
      },
      {
        id: 'ceftriaxone',
        name: 'Ceftriaxone',
        categoryTag: 'Vial',
        dosageLine: '50–75 mg/kg/day divided q12H',
        strengths: ['500 mg', '1 g'],
        vialGroups: [
          {
            label: 'Vial: 500 mg',
            routes: [
              { route: 'IV', text: '500 mg in 5 mL WFI or N.S — IV direct or dilute into a 100 mL N.S infusion' },
              { route: 'IM', text: 'in 3.5 mL Lidocaine 1%' }
            ]
          },
          {
            label: 'Vial: 1 g',
            routes: [
              { route: 'IV', text: '1 g in 10 mL WFI or N.S — IV direct or dilute into a 100 mL N.S infusion' },
              { route: 'IM', text: 'in 3.5 mL Lidocaine 1%' }
            ]
          }
        ],
        adminNote: 'Compatible with: NaCl 0.9%, Gluc 5%, Gluc-NaCl\nIV: Inject over 2–4 min; Infuse over at least 30 min'
      },
      {
        id: 'cefotaxime',
        name: 'Cefotaxime',
        categoryTag: 'Vial',
        dosageLine: '150–180 mg/kg/day divided q6–8hr',
        strengths: ['500 mg', '1 g'],
        vialGroups: [
          {
            label: 'Vial: 500 mg',
            routes: [
              { route: 'IV', text: '500 mg in 10 mL WFI or N.S — or dilute into a 100 mL N.S infusion' },
              { route: 'IM', text: 'in 3 mL Lidocaine 1% or N.S' }
            ]
          },
          {
            label: 'Vial: 1 g',
            routes: [
              { route: 'IV', text: '1 g in 10 mL WFI or N.S — or dilute into a 100 mL N.S infusion' },
              { route: 'IM', text: 'in 3 mL Lidocaine 1% or N.S' }
            ]
          }
        ],
        adminNote: 'Compatible with: NaCl 0.9%, Gluc 5%, Gluc-NaCl\nIV: Inject over 3–5 min; Infuse over 20–60 min'
      },
      {
        id: 'ceftazidime',
        name: 'Ceftazidime',
        categoryTag: 'Vial',
        dosageLine: '90–150 mg/kg/day divided q8hr',
        strengths: ['500 mg', '1 g'],
        vialGroups: [
          {
            label: 'Vial: 500 mg',
            routes: [
              { route: 'IV', text: '500 mg in 5 mL WFI — IV direct or dilute in 100 mL N.S' },
              { route: 'IM', text: 'in 1.5 mL WFI or Lidocaine 1%' }
            ]
          },
          {
            label: 'Vial: 1 g',
            routes: [
              { route: 'IV', text: '1 g in 10 mL WFI — IV direct or dilute in 100 mL N.S' },
              { route: 'IM', text: 'in 3 mL WFI or Lidocaine 1%' }
            ]
          }
        ],
        adminNote: 'Compatible with: NaCl 0.9%, Gluc 5%, NaCl-Gluc, Ringer\'s\nIV: Inject over 3–4 min; Infuse over 20–30 min'
      },
      {
        id: 'cefepime',
        name: 'Cefepime',
        categoryTag: 'Vial',
        dosageLine: '50 mg/kg/dose, q8–12hr',
        strengths: ['1 g'],
        routeRows: [
          { route: 'IV', text: '1 g in 10 mL WFI or N.S — IV direct or dilute into a 100 mL N.S infusion' },
          { route: 'IM', text: 'in 3 mL Lidocaine 1% or N.S' }
        ],
        adminNote: 'Compatible with: IV: NaCl 0.9%, Gluc 5%, Gluc-NaCl; IM: WFI, N.S, Gluc 5%, Lidocaine 0.5% or 1%\nIV: Inject over 3–4 min; Infuse over 30 min'
      },
      {
        id: 'gentamicin',
        name: 'Gentamicin',
        categoryTag: 'Amp',
        dosageLine: '2–2.5 mg/kg/dose, q8hr',
        strengths: ['80 mg / 2 mL', '20 mg / 2 mL'],
        routeRows: [
          { route: 'IV', text: 'direct, or diluted in 100 mL N.S' },
          { route: 'IM', text: 'Withdraw the required dose and inject it in large muscles (Gluteus/Large aspect of the thigh)' }
        ],
        adminNote: 'Compatible with: NaCl 0.9%, Gluc 5%, Gluc-NaCl\nIV: Inject over 3–5 min; Infuse over 30–60 min'
      },
      {
        id: 'amikacin',
        name: 'Amikacin',
        categoryTag: 'Vial & Amp',
        dosageLine: '15–22.5 mg/kg/day divided q8hr',
        strengths: ['500 mg / 2 mL', '100 mg / 2 mL'],
        routeRows: [
          { route: 'IV', text: 'direct, or diluted in 100 mL N.S' },
          { route: 'IM', text: 'Withdraw the required dose and inject it in large muscles (Gluteus/Large aspect of the thigh)' }
        ],
        adminNote: 'Compatible with: NaCl 0.9%, Gluc 5%\nIV: Inject over 2–3 min; Infuse over 30 min'
      },
      {
        id: 'metronidazole-inj',
        name: 'Metronidazole',
        categoryTag: 'Vial · IV only',
        dosageLine: '22.5–40 mg/kg/day divided q8hr',
        strengths: ['500 mg / 100 mL'],
        routeRows: [
          { route: 'IV', text: 'IV only — ready-to-use infusion bag, no reconstitution' }
        ],
        adminNote: 'Compatible with: NaCl 0.9%, Gluc 5%, Gluc-NaCl\nIV: Infuse over 20 min'
      },
      {
        id: 'vancomycin',
        name: 'Vancomycin',
        categoryTag: 'Vial · IV only',
        dosageLine: '45–60 mg/kg/day divided q6–8hr',
        strengths: ['500 mg', '1000 mg'],
        vialGroups: [
          {
            label: 'Vial: 500 mg',
            routes: [
              { route: 'IV', text: '500 mg in 10 mL WFI — then diluted in 100 mL N.S' }
            ]
          },
          {
            label: 'Vial: 1000 mg',
            routes: [
              { route: 'IV', text: '1000 mg in 20 mL WFI — then diluted in 100 mL N.S' }
            ]
          }
        ],
        adminNote: 'Compatible with: NaCl 0.9%, Gluc 5%\nIV: Infuse 500 mg over a minimum 60 min and 1000 mg over 2 hr'
      },
      {
        id: 'meropenem',
        name: 'Meropenem',
        categoryTag: 'Vial · IV only',
        dosageLine: '20 mg/kg/dose, q8hr',
        strengths: ['500 mg', '1000 mg'],
        vialGroups: [
          {
            label: 'Vial: 500 mg',
            routes: [
              { route: 'IV', text: '500 mg in 10 mL WFI — or diluted in 100 mL N.S' }
            ]
          },
          {
            label: 'Vial: 1000 mg',
            routes: [
              { route: 'IV', text: '1000 mg in 20 mL WFI — or diluted in 100 mL N.S' }
            ]
          }
        ],
        adminNote: 'Compatible with: NaCl 0.9%, Gluc 5%\nIV: Inject over 5 min; Infuse over 15–30 min'
      },
      {
        id: 'imipenem',
        name: 'Imipenem / Cilastatin',
        categoryTag: 'Vial · IV only',
        dosageLine: '15–25 mg/kg/dose, q6hr',
        strengths: ['500/500 mg'],
        routeRows: [
          { route: 'IV', text: '500 mg in 10 mL N.S — then diluted in 100 mL N.S' }
        ],
        adminNote: 'Compatible with: NaCl 0.9%, Gluc 5%\nIV: Infuse over 20–30 min'
      },
      {
        id: 'clindamycin',
        name: 'Clindamycin',
        categoryTag: 'Amp',
        dosageLine: '600 mg – 2.7 g/day divided into 2–4 doses',
        strengths: ['600 mg', '300 mg'],
        routeRows: [
          { route: 'IV', text: 'diluted in 100 mL N.S' },
          { route: 'IM', text: 'direct' }
        ],
        adminNote: 'Compatible with: NaCl 0.9%, Gluc 5%, Gluc-NaCl\nIV: Infuse 300 mg over 15 min and 600 mg over 30 min'
      },
      {
        id: 'moxifloxacin',
        name: 'Moxifloxacin',
        categoryTag: 'Vial · IV only',
        dosageLine: '3 months–2 years: 6 mg/kg/dose q12hr (max 200 mg/dose)\n2–6 years: 5 mg/kg/dose q12hr (max 200 mg/dose)\n6–12 years: 4 mg/kg/dose q12hr (max 200 mg/dose)\n12–18 years, <45 kg: 4 mg/kg/dose q12hr (max 200 mg/dose)\n12–18 years, >45 kg: 400 mg q24hr\n>18 years: 400 mg q24hr',
        strengths: ['400 mg / 250 mL'],
        routeRows: [
          { route: 'IV', text: 'direct — ready-to-use infusion bag, no reconstitution' }
        ],
        adminNote: 'IV: Infuse over 60 min'
      },
      {
        id: 'ciprofloxacin',
        name: 'Ciprofloxacin',
        categoryTag: 'Vial · IV only',
        dosageLine: '10 mg/kg/dose, q8–12hr',
        strengths: ['200 mg / 100 mL'],
        routeRows: [
          { route: 'IV', text: 'direct — ready-to-use infusion bag, no reconstitution' }
        ],
        adminNote: 'IV: Infuse over 60 min'
      },
      {
        id: 'levofloxacin',
        name: 'Levofloxacin',
        categoryTag: 'Vial · IV only',
        dosageLine: '>5 years: 10 mg/kg/dose q24hr',
        strengths: ['500 mg / 100 mL'],
        routeRows: [
          { route: 'IV', text: 'direct — ready-to-use infusion bag, no reconstitution' }
        ],
        adminNote: 'Compatible with: NaCl 0.9%, Gluc 5%, Gluc-NaCl\nIV: Infuse over at least 60 min'
      }
    ]
  }
];
