const compsWeights = [21, 22, 21, 20, 18, 18, 16, 12];

const cgpaData: Record<string, CgpaCalculatorStructureType[]> = {
  kjsce_comps: compsWeights.map((weight, i) => ({
    semesterId: (i + 1).toString(),
    semesterName: `Semester ${i + 1}`,
    maxCredits: weight,
  })),
};

export default cgpaData;
