const compsWeightsSVU2020 = [21, 22, 21, 20, 18, 18, 16, 12];
const itWeightsSVU2020 = [21, 22, 21, 20, 18, 18, 16, 12];

const cgpaData: Record<string, CgpaCalculatorStructureType[]> = {
  // comps
  kjsce_comps_2024: compsWeightsSVU2020.map((weight, i) => ({
    semesterId: (i + 1).toString(),
    semesterName: `Semester ${i + 1}`,
    maxCredits: weight,
  })),
  kjsce_comps_2025: compsWeightsSVU2020.map((weight, i) => ({
    semesterId: (i + 1).toString(),
    semesterName: `Semester ${i + 1}`,
    maxCredits: weight,
  })),
  kjsce_comps_2026: compsWeightsSVU2020.map((weight, i) => ({
    semesterId: (i + 1).toString(),
    semesterName: `Semester ${i + 1}`,
    maxCredits: weight,
  })),

  // it
  kjsce_it_2024: itWeightsSVU2020.map((weight, i) => ({
    semesterId: (i + 1).toString(),
    semesterName: `Semester ${i + 1}`,
    maxCredits: weight,
  })),
  kjsce_it_2025: itWeightsSVU2020.map((weight, i) => ({
    semesterId: (i + 1).toString(),
    semesterName: `Semester ${i + 1}`,
    maxCredits: weight,
  })),
  kjsce_it_2026: itWeightsSVU2020.map((weight, i) => ({
    semesterId: (i + 1).toString(),
    semesterName: `Semester ${i + 1}`,
    maxCredits: weight,
  })),
};

export default cgpaData;
