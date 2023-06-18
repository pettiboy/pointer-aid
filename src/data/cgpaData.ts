const compsWeightsSVU2020 = [21, 20, 22, 21];
const itWeightsSVU2020 = [21, 20, 22, 22];
const etrxWeightsSVU2020 = [21, 20, 22, 22];
const extcWeightsSVU2020 = [21, 20, 22, 22];
const mechWeightsSVU2020 = [21, 20, 22, 22];

const defaultWarningText = `Awaiting updated syllabus.`;

const kjsce_comps_svu = [
  ...compsWeightsSVU2020.map((weight, i) => ({
    semesterId: (i + 1).toString(),
    semesterName: `Semester ${i + 1}`,
    maxCredits: weight,
  })),
  {
    semesterId: "5",
    semesterName: "Semester 5",
    maxCredits: 22,
    supportsOet: true,
    supportsOehm: true,
  },
  {
    semesterId: "6",
    semesterName: "Semester 6",
    maxCredits: 23,
    supportsOet: true,
    supportsOehm: true,
  },
  {
    semesterId: "7",
    semesterName: "Semester 7",
    maxCredits: 18,
    supportsOet: true,
    supportsOehm: false,
  },
  {
    semesterId: "8",
    semesterName: "Semester 8",
    maxCredits: 14,
    supportsOet: false,
    supportsOehm: false,
  },
];

const kjsce_it_svu = [
  ...itWeightsSVU2020.map((weight, i) => ({
    semesterId: (i + 1).toString(),
    semesterName: `Semester ${i + 1}`,
    maxCredits: weight,
  })),
  {
    semesterId: "5",
    semesterName: "Semester 5",
    maxCredits: 22,
    supportsOet: true,
    supportsOehm: true,
  },
  {
    semesterId: "6",
    semesterName: "Semester 6",
    maxCredits: 22,
    supportsOet: true,
    supportsOehm: true,
  },
  {
    semesterId: "7",
    semesterName: "Semester 7",
    maxCredits: 19,
    warningText: defaultWarningText,
    supportsOet: true,
    supportsOehm: false,
  },
  {
    semesterId: "8",
    semesterName: "Semester 8",
    maxCredits: 13,
    warningText: defaultWarningText,
    supportsOet: false,
    supportsOehm: false,
  },
];

const kjsce_etrx_svu = [
  ...etrxWeightsSVU2020.map((weight, i) => ({
    semesterId: (i + 1).toString(),
    semesterName: `Semester ${i + 1}`,
    maxCredits: weight,
  })),
  {
    semesterId: "5",
    semesterName: "Semester 5",
    maxCredits: 22,
    supportsOet: true,
    supportsOehm: true,
  },
  {
    semesterId: "6",
    semesterName: "Semester 6",
    maxCredits: 22,
    supportsOet: true,
    supportsOehm: true,
  },
  {
    semesterId: "7",
    semesterName: "Semester 7",
    maxCredits: 18,
    supportsOet: true,
    supportsOehm: false,
  },
  {
    semesterId: "8",
    semesterName: "Semester 8",
    maxCredits: 14,
    supportsOet: false,
    supportsOehm: false,
  },
];

const kjsce_extc_svu = [
  ...extcWeightsSVU2020.map((weight, i) => ({
    semesterId: (i + 1).toString(),
    semesterName: `Semester ${i + 1}`,
    maxCredits: weight,
  })),
  {
    semesterId: "5",
    semesterName: "Semester 5",
    maxCredits: 22,
    supportsOet: true,
    supportsOehm: true,
  },
  {
    semesterId: "6",
    semesterName: "Semester 6",
    maxCredits: 22,
    supportsOet: true,
    supportsOehm: true,
  },
  {
    semesterId: "7",
    semesterName: "Semester 7",
    maxCredits: 18,
    supportsOet: true,
    supportsOehm: false,
  },
  {
    semesterId: "8",
    semesterName: "Semester 8",
    maxCredits: 14,
    supportsOet: false,
    supportsOehm: false,
  },
];

const kjsce_mech_svu = [
  ...mechWeightsSVU2020.map((weight, i) => ({
    semesterId: (i + 1).toString(),
    semesterName: `Semester ${i + 1}`,
    maxCredits: weight,
  })),
  {
    semesterId: "5",
    semesterName: "Semester 5",
    maxCredits: 22,
    supportsOet: true,
    supportsOehm: true,
  },
  {
    semesterId: "6",
    semesterName: "Semester 6",
    maxCredits: 22,
    supportsOet: true,
    supportsOehm: true,
  },
  {
    semesterId: "7",
    semesterName: "Semester 7",
    maxCredits: 19,
    supportsOet: true,
    supportsOehm: false,
    warningText: defaultWarningText,
  },
  {
    semesterId: "8",
    semesterName: "Semester 8",
    maxCredits: 13,
    supportsOet: false,
    supportsOehm: false,
    warningText: defaultWarningText,
  },
];

const cgpaData: Record<string, CgpaCalculatorStructureType[]> = {
  // comps
  kjsce_comps_2024: kjsce_comps_svu,
  kjsce_comps_2025: kjsce_comps_svu,
  kjsce_comps_2026: kjsce_comps_svu,

  // it
  kjsce_it_2024: kjsce_it_svu,
  kjsce_it_2025: kjsce_it_svu,
  kjsce_it_2026: kjsce_it_svu,

  // etrx
  kjsce_etrx_2024: kjsce_etrx_svu,
  kjsce_etrx_2025: kjsce_etrx_svu,
  kjsce_etrx_2026: kjsce_etrx_svu,

  // extc
  kjsce_extc_2024: kjsce_extc_svu,
  kjsce_extc_2025: kjsce_extc_svu,
  kjsce_extc_2026: kjsce_extc_svu,

  // mech
  kjsce_mech_2024: kjsce_mech_svu,
  kjsce_mech_2025: kjsce_mech_svu,
  kjsce_mech_2026: kjsce_mech_svu,
};

export default cgpaData;
