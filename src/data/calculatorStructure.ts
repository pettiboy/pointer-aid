import {
  kjsce_groupc_sem1,
  kjsce_groupc_sem2,
  kjsce_groupp_sem1,
  kjsce_groupp_sem2,
} from "./shared";

const calculatorStructure: Record<string, PointerCalculatorStructureType[]> = {
  // COMPS
  kjsce_comps_sem1: kjsce_groupc_sem1,
  kjsce_comps_sem2: kjsce_groupc_sem2,
  kjsce_comps_sem3: [
    {
      subjectName: "Integral Transform and Vector Calculus",
      subjectCode: "ITVC",
      creditDistribution: "301",
    },
    {
      subjectName: "Data Structures",
      subjectCode: "DS",
      creditDistribution: "300",
    },
    {
      subjectName: "Computrer Organization and Architecture",
      subjectCode: "COA",
      creditDistribution: "300",
    },
    {
      subjectName: "Object Oriented Programming Methodology",
      subjectCode: "OOPM",
      creditDistribution: "102",
    },
    {
      subjectName: "Discrete Mathematics",
      subjectCode: "DM",
      creditDistribution: "301",
    },
    {
      subjectName: "Digital Design Laboratory",
      subjectCode: "DDL",
      creditDistribution: "110",
      maxMarks: 75,
    },
    {
      subjectName: "Data Structures Laboratory",
      subjectCode: "DSL",
      creditDistribution: "010",
    },
    {
      subjectName: "Computer Organization & Architecture Laboratory",
      subjectCode: "COAL",
      creditDistribution: "010",
    },
    {
      subjectName: "Object Oriented Programming Methodology Laboratory",
      subjectCode: "OOPML",
      creditDistribution: "010",
    },
  ],
  kjsce_comps_sem4: [
    {
      subjectName: "Probability, Statistics and Optimization Techniques",
      subjectCode: "PSOT",
      creditDistribution: "301",
    },
    {
      subjectName: "Analysis of Algorithms",
      subjectCode: "AOA",
      creditDistribution: "300",
    },
    {
      subjectName: "Relational Database Management Systems",
      subjectCode: "RDBMS",
      creditDistribution: "300",
    },
    {
      subjectName: "Theory of Automata with Compiler Design",
      subjectCode: "TACD",
      creditDistribution: "301",
    },
    {
      subjectName: "Web Programming Laboratory",
      subjectCode: "WPL",
      creditDistribution: "020",
      maxMarks: 100,
    },
    {
      subjectName: "Analysis of Algorithms Laboratory ",
      subjectCode: "AOAL",
      creditDistribution: "010",
    },
    {
      subjectName: "Relational Database Management Systems Laboratory ",
      subjectCode: "RDBMSL",
      creditDistribution: "010",
    },
    {
      subjectName: "Mini Project ",
      subjectCode: "MP",
      creditDistribution: "030",
    },
  ],
  kjsce_comps_sem5: [
    // 300
    {
      subjectName: "Software Engineering",
      subjectCode: "SE",
      creditDistribution: "300",
    },
    {
      subjectName: "Computer Networks",
      subjectCode: "CN",
      creditDistribution: "300",
    },
    {
      subjectName: "Operating System",
      subjectCode: "OS",
      creditDistribution: "300",
    },
    {
      subjectName: "Departmental Elective-I",
      subjectCode: "DEI",
      creditDistribution: "300",
    },

    // 010
    {
      subjectName: "Software Engineering Lab",
      subjectCode: "SEL",
      creditDistribution: "010",
    },
    {
      subjectName: "Computer Networks Lab",
      subjectCode: "CNL",
      creditDistribution: "010",
    },
    {
      subjectName: "Operating System Lab",
      subjectCode: "OSL",
      creditDistribution: "010",
    },
    {
      subjectName: "Departmental Elective-I Lab",
      subjectCode: "DEIL",
      creditDistribution: "010",
    },

    // 200
    {
      subjectName: "OET",
      subjectCode: "OET",
      creditDistribution: "200",
    },
    {
      subjectName: "OEHM",
      subjectCode: "OEHM",
      creditDistribution: "200",
    },

    // 110
    {
      subjectName: "Full Stack Development Lab",
      subjectCode: "FSDL",
      creditDistribution: "110",
      maxMarks: 50,
    },
  ],

  // ETRX
  kjsce_etrx_sem3: [
    {
      subjectName: "Mathematics for Electronics Engineering-I",
      subjectCode: "DAM",
      creditDistribution: "301",
    },
    {
      subjectName: "Electrical Networks",
      subjectCode: "EN",
      creditDistribution: "301",
    },
    {
      subjectName: "Basic of Electronics Circuit",
      subjectCode: "BEC",
      creditDistribution: "300",
    },
    {
      subjectName: "Digital Electronics",
      subjectCode: "DE",
      creditDistribution: "300",
    },
    {
      subjectName: "Signals and Systems",
      subjectCode: "SAS",
      creditDistribution: "300",
    },
    {
      subjectName: "Programming Laboratory",
      subjectCode: "PL",
      creditDistribution: "011",
      //used 011 instead of 020 to match the 50+25 marks pattern
    },
    {
      subjectName: "Basic of Electronics Circuits Laboratory",
      subjectCode: "BECL",
      creditDistribution: "010",
    },
    {
      subjectName: "Digital Electronics Laboratory",
      subjectCode: "DEL",
      creditDistribution: "010",
    },
    {
      subjectName: "Signals and Systems Laboratory",
      subjectCode: "SASL",
      creditDistribution: "010",
    },
  ],
  kjsce_etrx_sem4: [
    {
      subjectName: "Mathematics for Electronics Engineering-II",
      subjectCode: "MEE",
      creditDistribution: "301",
    },
    {
      subjectName: "Analog Electronics Circuits",
      subjectCode: "AEC",
      creditDistribution: "300",
    },
    {
      subjectName: "Control System Engineering ",
      subjectCode: "CSE",
      creditDistribution: "300",
    },
    {
      subjectName: "Analog and Digital Communication",
      subjectCode: "ADC",
      creditDistribution: "300",
    },
    {
      subjectName: "Microcontroller and Applications",
      subjectCode: "MAC",
      creditDistribution: "300",
    },
    {
      subjectName: "Designing with Programmable Logic Lab Course",
      subjectCode: "DEPLL",
      creditDistribution: "011",
    },
    {
      subjectName: "Analog Electronics Circuits Laboratory",
      subjectCode: "AECL",
      creditDistribution: "010",
    },
    {
      subjectName: "Control System Engineering Laboratory",
      subjectCode: "CSEL",
      creditDistribution: "010",
    },
    {
      subjectName: "Analog and Digital Communication Laboratory",
      subjectCode: "ADCL",
      creditDistribution: "010",
    },
    {
      subjectName: "Microcontroller and Applications Laboratory",
      subjectCode: "MAL",
      creditDistribution: "010",
    },
  ],

  // EXCP
  kjsce_excp_sem1: kjsce_groupp_sem1,
  kjsce_excp_sem2: kjsce_groupp_sem2,

  // EXTC
  kjsce_extc_sem1: kjsce_groupp_sem1,
  kjsce_extc_sem2: kjsce_groupp_sem2,

  // IT
  kjsce_it_sem1: kjsce_groupc_sem1,
  kjsce_it_sem2: kjsce_groupc_sem2,
  kjsce_it_sem3: [
    // 301
    {
      subjectName: "Discrete and Applied Mathematics",
      subjectCode: "DAM",
      creditDistribution: "301",
    },

    // 300
    {
      subjectName: "Data Structures",
      subjectCode: "DS",
      creditDistribution: "300",
    },
    {
      subjectName: "Database Management Systems",
      subjectCode: "DMS",
      creditDistribution: "300",
    },
    {
      subjectName: "Digital Systems",
      subjectCode: "DiS",
      creditDistribution: "300",
    },
    {
      subjectName: "Data Communication and Networking",
      subjectCode: "DCN",
      creditDistribution: "300",
    },

    // 011
    {
      subjectName: "Progamming Laboratory",
      subjectCode: "PL",
      creditDistribution: "011",
    },

    // 010
    {
      subjectName: "Data Structures Laboratory",
      subjectCode: "DSL",
      creditDistribution: "010",
    },
    {
      subjectName: "Database Management Systems Laboratory",
      subjectCode: "DMSL",
      creditDistribution: "010",
    },
    {
      subjectName: "Digital Systems Laboratory",
      subjectCode: "DiSL",
      creditDistribution: "010",
    },
    {
      subjectName: "Data Communication and Networking Laboratory",
      subjectCode: "DCNL",
      creditDistribution: "010",
    },
  ],
  kjsce_it_sem4: [
    {
      subjectName: "Probability, Statistics and Optimization Techniques",
      subjectCode: "PSOT",
      creditDistribution: "301",
    },
    {
      subjectName: "Information Theory and Coding",
      subjectCode: "ITC",
      creditDistribution: "301",
    },
    {
      subjectName: "Analysis of Algorithms",
      subjectCode: "AOA",
      creditDistribution: "300",
    },
    {
      subjectName: "Advanced Databases",
      subjectCode: "AD",
      creditDistribution: "300",
    },
    {
      subjectName: "Competitive Programming Laboratory",
      subjectCode: "CPL",
      creditDistribution: "012",
    },
    {
      subjectName: "Web Programming  I Laboratory",
      subjectCode: "WPL",
      creditDistribution: "012",
    },
    {
      subjectName: "Analysis of Algorithms Laboratory",
      subjectCode: "AOAL",
      creditDistribution: "010",
    },
    {
      subjectName: "Advanced Databases Laboratory",
      subjectCode: "ADL",
      creditDistribution: "010",
    },
  ],
  kjsce_it_sem5: [
    // 301
    {
      subjectName: "Theory Of Computation",
      subjectCode: "TOC",
      creditDistribution: "301",
    },

    // 300
    {
      subjectName: "Operation System",
      subjectCode: "OS",
      creditDistribution: "300",
    },
    {
      subjectName: "Information and Nework Security",
      subjectCode: "INS",
      creditDistribution: "300",
    },
    {
      subjectName: "Department Elective - I",
      subjectCode: "DEI",
      creditDistribution: "300",
    },

    // 020
    {
      subjectName: "Web Programming - II Lab",
      subjectCode: "WPIIL",
      creditDistribution: "020",
      maxMarks: 100,
    },

    // 010
    {
      subjectName: "Operating System Lab",
      subjectCode: "OSL",
      creditDistribution: "010",
    },
    {
      subjectName: "Information and Nework Security Lab",
      subjectCode: "INSL",
      creditDistribution: "010",
    },
    {
      subjectName: "Department Elective - I Lab",
      subjectCode: "DEIL",
      creditDistribution: "010",
    },

    // 200
    {
      subjectName: "OET",
      subjectCode: "OET",
      creditDistribution: "200",
    },
    {
      subjectName: "OEHM",
      subjectCode: "OEHM",
      creditDistribution: "200",
    },
  ],

  // MECH
  kjsce_mech_sem1: kjsce_groupp_sem1,
  kjsce_mech_sem2: kjsce_groupp_sem2,
};

export default calculatorStructure;
