const compsWeightsSVU2020 = [21, 20, 22, 21, 22, 23, 18, 14];
const itWeightsSVU2020 = [21, 20, 22, 22, 22, 22];

const defaultWarningText = `Awaiting updated syllabus.`;

const kjsce_comps_svu = [
  ...compsWeightsSVU2020.map((weight, i) => ({
    semesterId: (i + 1).toString(),
    semesterName: `Semester ${i + 1}`,
    maxCredits: weight,
  })),
];

const kjsce_it_svu = [
  ...itWeightsSVU2020.map((weight, i) => ({
    semesterId: (i + 1).toString(),
    semesterName: `Semester ${i + 1}`,
    maxCredits: weight,
  })),
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
    supportsOet: true,
    supportsOehm: false,
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
};

export default cgpaData;
