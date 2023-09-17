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
  kjsce_comps_sem6: [
    {
      subjectName: "Digital Signal & Image Processing",
      subjectCode: "DSIP",
      creditDistribution: "300",
    },
    {
      subjectName: "Information Security",
      subjectCode: "IS",
      creditDistribution: "300",
    },
    {
      subjectName: "Artifical Intelligence",
      subjectCode: "AI",
      creditDistribution: "300",
    },
    {
      subjectName: "Departmental Elective",
      subjectCode: "DE",
      creditDistribution: "300",
    },
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
    {
      subjectName: "Digital Signal & Image Processing Lab",
      subjectCode: "DSIPL",
      creditDistribution: "010",
    },
    {
      subjectName: "Information Security Lab",
      subjectCode: "ISL",
      creditDistribution: "010",
    },
    {
      subjectName: "Artificial Intelligence Lab",
      subjectCode: "AIL",
      creditDistribution: "010",
    },
    {
      subjectName: "Departmental Elective Lab",
      subjectCode: "DEL",
      creditDistribution: "010",
    },
    {
      subjectName: "Mini Project",
      subjectCode: "MP",
      creditDistribution: "030",
      maxMarks: 75,
    },
  ],
  kjsce_comps_sem7: [
    {
      subjectName: "Project Management",
      subjectCode: "PM",
      creditDistribution: "300",
    },
    {
      subjectName: "Departmental Elective-III",
      subjectCode: "DEIII",
      creditDistribution: "300",
    },
    {
      subjectName: "Departmental Elective-IV",
      subjectCode: "DE-IV",
      creditDistribution: "300",
    },
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
    {
      subjectName: "Project-I",
      subjectCode: "PI",
      creditDistribution: "030",
    },
    {
      subjectName: "Project Management Lab",
      subjectCode: "PML",
      creditDistribution: "010",
    },
    {
      subjectName: "Elective-III Lab",
      subjectCode: "EIIIL",
      creditDistribution: "010",
    },
    {
      subjectName: "Elective-IV Lab",
      subjectCode: "EIVL",
      creditDistribution: "010",
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
  kjsce_etrx_sem5: [
    {
      subjectName: "Electromagnetic Engineering",
      subjectCode: "EME",
      creditDistribution: "301",
    },
    {
      subjectName: "Digital Signal Processing",
      subjectCode: "DSP",
      creditDistribution: "300",
    },
    {
      subjectName: "Power Electronics",
      subjectCode: "PE",
      creditDistribution: "300",
    },
    {
      subjectName: "Department Elective-I",
      subjectCode: "DE",
      creditDistribution: "300",
    },
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
    {
      subjectName:
        "Virtual Instrumentation and Industrial Automation Lab Course",
      subjectCode: "VIIAL",
      creditDistribution: "020",
    },
    {
      subjectName: "Digital Signal Processing Laboratory",
      subjectCode: "DSPL",
      creditDistribution: "010",
    },
    {
      subjectName: "Power Electronics Laboratory",
      subjectCode: "PEL",
      creditDistribution: "010",
    },
    {
      subjectName: "Department Elective-I Laboratory",
      subjectCode: "DELIL",
      creditDistribution: "010",
    },
  ],
  kjsce_etrx_sem6: [
    {
      subjectName: "Basics of VLSI",
      subjectCode: "BVLSI",
      creditDistribution: "300",
    },
    {
      subjectName: "Analog Integrated Circuits and Applications",
      subjectCode: "AICA",
      creditDistribution: "300",
    },
    {
      subjectName: "Introduction to Automation and Mechatronics",
      subjectCode: "IAM",
      creditDistribution: "300",
    },
    {
      subjectName: "Department Elective-II",
      subjectCode: "DEII",
      creditDistribution: "300",
    },
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
    {
      subjectName: "Basics of VLSI Laboratory",
      subjectCode: "BVLSIL",
      creditDistribution: "010",
    },
    {
      subjectName: "Analog Integrated Circuits and Applications Laboratory",
      subjectCode: "AICAL",
      creditDistribution: "010",
    },
    {
      subjectName: "Introduction to Automation and Mechatronics Laboratory",
      subjectCode: "IAML",
      creditDistribution: "010",
    },
    {
      subjectName: "Department Elective-II Laboratory",
      subjectCode: "DELIIL",
      creditDistribution: "010",
    },
  ],

  // EXCP
  kjsce_excp_sem1: kjsce_groupp_sem1,
  kjsce_excp_sem2: kjsce_groupp_sem2,
  kjsce_excp_sem3: [
    {
      subjectName: "Integral Transform and Vector Calculus",
      subjectCode: "ITVC",
      creditDistribution: "301",
    },
    {
      subjectName: "Analog Electronic Circuits",
      subjectCode: "AEC",
      creditDistribution: "300",
    },
    {
      subjectName: "Digital Electronics",
      subjectCode: "DE",
      creditDistribution: "300",
    },
    {
      subjectName: "Data Structures",
      subjectCode: "DS",
      creditDistribution: "300",
    },
    {
      subjectName: "Networks, Signals and Systems",
      subjectCode: "NSS",
      creditDistribution: "300",
    },
    {
      subjectName: "Object Oriented Programming Laboratory",
      subjectCode: "OOPL",
      creditDistribution: "011",
    },
    {
      subjectName: "Analog Electronic Circuits Laboratory",
      subjectCode: "AECL",
      creditDistribution: "010",
    },
    {
      subjectName: "Digital Electronics Laboratory",
      subjectCode: "DEL",
      creditDistribution: "010",
    },
    {
      subjectName: "Data Structures Laboratory",
      subjectCode: "DSL",
      creditDistribution: "010",
    },
    {
      subjectName: "Networks, Signals & Systems Laboratory",
      subjectCode: "NSSL",
      creditDistribution: "010",
    },
  ],
  kjsce_excp_sem4: [
    {
      subjectName: "Complex Analysis, Statistics and Optimization Techniques",
      subjectCode: "CASTOT",
      creditDistribution: "301",
    },
    {
      subjectName: "Discrete Mathematics",
      subjectCode: "DMATH",
      creditDistribution: "301",
    },
    {
      subjectName: "Analog and Digital Communication",
      subjectCode: "ADCOM",
      creditDistribution: "300",
    },
    {
      subjectName: "Analysis of Algorithms",
      subjectCode: "ALGO",
      creditDistribution: "300",
    },
    {
      subjectName: "Database Management Systems",
      subjectCode: "DBMS",
      creditDistribution: "300",
    },
    {
      subjectName: "Microprocessors and Microcontrollers Laboratory",
      subjectCode: "MMLAB",
      creditDistribution: "011",
    },
    {
      subjectName: "Analog and Digital Communication Laboratory",
      subjectCode: "ADCOMLAB",
      creditDistribution: "010",
    },
    {
      subjectName: "Analysis of Algorithms Laboratory",
      subjectCode: "ALGOLAB",
      creditDistribution: "010",
    },
    {
      subjectName: "Database Management Systems Laboratory",
      subjectCode: "DBMSLAB",
      creditDistribution: "010",
    },
  ],

  // EXTC
  kjsce_extc_sem1: kjsce_groupp_sem1,
  kjsce_extc_sem2: kjsce_groupp_sem2,
  kjsce_extc_sem3: [
    {
      subjectName: "Mathematics for Communication Engineering I ",
      subjectCode: "MCEI",
      creditDistribution: "301",
    },
    {
      subjectName: "Basic Electronic Circuits  ",
      subjectCode: "BEC",
      creditDistribution: "300",
    },
    {
      subjectName: "Digital Logic Design  ",
      subjectCode: "DLD",
      creditDistribution: "300",
    },
    {
      subjectName: "Microprocessor and Microcontroller",
      subjectCode: "MAM",
      creditDistribution: "300",
    },
    {
      subjectName: "Electrical Network Theory",
      subjectCode: "ENT",
      creditDistribution: "301",
    },
    {
      subjectName: "Data Structures and Analysis of Algorithms Laboratory ",
      subjectCode: "HDLL",
      creditDistribution: "020",
      maxMarks: 75,
    },
    {
      subjectName: "Basic Electronic Circuits Laboratory ",
      subjectCode: "BECL",
      creditDistribution: "010",
    },
    {
      subjectName: "Digital Logic Design Laboratory ",
      subjectCode: "DLDL",
      creditDistribution: "010",
    },
    {
      subjectName: "Microprocessor and Microcontroller laboratory",
      subjectCode: "MAML",
      creditDistribution: "010",
    },
  ],
  kjsce_extc_sem4: [
    {
      subjectName: "Mathematics for Communication Engineering II ",
      subjectCode: "MCEII",
      creditDistribution: "301",
    },
    {
      subjectName: "Analog Electronics  ",
      subjectCode: "AE",
      creditDistribution: "300",
    },
    {
      subjectName: "Communication Systems  ",
      subjectCode: "CS",
      creditDistribution: "300",
    },
    {
      subjectName: "  Signals and Systems ",
      subjectCode: "SAS",
      creditDistribution: "300",
    },
    {
      subjectName: "Electromagnetic Field Theory",
      subjectCode: "EFT",
      creditDistribution: "301",
    },
    {
      subjectName: "Hardware Description Language Laboratory",
      subjectCode: "HDLL",
      creditDistribution: "020",
    },
    {
      subjectName: "Analog Electronics Laboratory",
      subjectCode: "AEL",
      creditDistribution: "010",
    },
    {
      subjectName: "Communication Systems Laboratory",
      subjectCode: "CSL",
      creditDistribution: "010",
    },
    {
      subjectName: "Signals and Systems Laboratory",
      subjectCode: "SAS",
      creditDistribution: "010",
    },
  ],
  kjsce_extc_sem5: [
    {
      subjectName: "Digital Communication ",
      subjectCode: "DC",
      creditDistribution: "300",
    },
    {
      subjectName: "RF Filters and Antennas ",
      subjectCode: "RFFA",
      creditDistribution: "300",
    },
    {
      subjectName: "Digital Signal Processing ",
      subjectCode: "DSP",
      creditDistribution: "300",
    },
    {
      subjectName: "Departmental Elective-I ",
      subjectCode: "DE",
      creditDistribution: "300",
    },
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
    {
      subjectName: "Digital Communication Laboratory",
      subjectCode: "DCL",
      creditDistribution: "010",
    },
    {
      subjectName: "RF Filters and Antennas laboratory ",
      subjectCode: "RFFAL",
      creditDistribution: "010",
    },
    {
      subjectName: "Digital Signal Processing Laboratory",
      subjectCode: "DSPL",
      creditDistribution: "010",
    },
    {
      subjectName: "Elective-I Laboratory",
      subjectCode: "DEL",
      creditDistribution: "010",
    },
    {
      subjectName: "Advanced Microcontroller Laboratory ",
      subjectCode: "AML",
      creditDistribution: "020",
      maxMarks: 75,
    },
  ],
  kjsce_extc_sem6: [
    {
      subjectName: "Wireless Communication",
      subjectCode: "WC",
      creditDistribution: "300",
    },
    {
      subjectName: "Computer Communication Networks ",
      subjectCode: "CCN",
      creditDistribution: "300",
    },
    {
      subjectName: "Optical fibre Communication ",
      subjectCode: "OFC",
      creditDistribution: "300",
    },
    {
      subjectName: "Departmental Elective-II ",
      subjectCode: "DE",
      creditDistribution: "300",
    },
    {
      subjectName: "OET ",
      subjectCode: "OET",
      creditDistribution: "200",
    },
    {
      subjectName: "OEHM ",
      subjectCode: "OEHM",
      creditDistribution: "200",
    },
    {
      subjectName: "Wireless Communication Laboratory ",
      subjectCode: "WCL",
      creditDistribution: "010",
    },
    {
      subjectName: "Computer Communication Networks Laboratory ",
      subjectCode: "CCNL",
      creditDistribution: "010",
    },
    {
      subjectName: "Optical Fibre Communication Laboratory ",
      subjectCode: "OFCL",
      creditDistribution: "010",
    },
    {
      subjectName: "Elective-II Laboratory",
      subjectCode: "DEII",
      creditDistribution: "010",
    },
    {
      subjectName: "Mini Project",
      subjectCode: "MP",
      creditDistribution: "020",
    },
  ],

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
      subjectName: "Department Elective-I",
      subjectCode: "DEI",
      creditDistribution: "300",
    },

    // 020
    {
      subjectName: "Web Programming-II Lab",
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
      subjectName: "Department Elective-I Lab",
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
  kjsce_it_sem6: [
    {
      subjectName: "Object Oriented Software Engineering",
      subjectCode: "OOSE",
      creditDistribution: "300",
    },
    {
      subjectName: "Modeling and Simulation",
      subjectCode: "MAS",
      creditDistribution: "300",
    },
    {
      subjectName: "Cloud Computing",
      subjectCode: "CC",
      creditDistribution: "300",
    },
    {
      subjectName: "Departmental Elective",
      subjectCode: "DE",
      creditDistribution: "300",
    },
    {
      subjectName: "OET ",
      subjectCode: "OET",
      creditDistribution: "200",
    },
    {
      subjectName: "OEHM ",
      subjectCode: "OEHM",
      creditDistribution: "200",
    },
    {
      subjectName: "Object Oriented Software Engineering Lab",
      subjectCode: "OOSEL",
      creditDistribution: "010",
    },
    {
      subjectName: "Modeling and Simulation Lab",
      subjectCode: "MASL",
      creditDistribution: "010",
    },
    {
      subjectName: "Cloud Computing Lab",
      subjectCode: "CCL",
      creditDistribution: "010",
      maxMarks: 75,
    },
    {
      subjectName: "Departmental Elective Lab",
      subjectCode: "DEL",
      creditDistribution: "010",
    },
    {
      subjectName: "Mini Project",
      subjectCode: "MP",
      creditDistribution: "020",
      maxMarks: 50,
      structureType: "b",
    },
  ],

  // MECH
  kjsce_mech_sem1: kjsce_groupp_sem1,
  kjsce_mech_sem2: kjsce_groupp_sem2,
  kjsce_mech_sem3: [
    {
      subjectName: "Mathematics for Mechanical Engineering-I",
      subjectCode: "MMEI",
      creditDistribution: "301",
    },
    {
      subjectName: "Strength of Materials",
      subjectCode: "SOM",
      creditDistribution: "300",
    },
    {
      subjectName: "Material science and metallurgy",
      subjectCode: "MSM",
      creditDistribution: "300",
    },
    {
      subjectName: "Thermodynamics",
      subjectCode: "THD",
      creditDistribution: "300",
    },
    {
      subjectName: "Production Engineering-I",
      subjectCode: "PEI",
      creditDistribution: "300",
    },
    {
      subjectName: "Computer Aided Machine Drawing Laboratory",
      subjectCode: "CAMDL",
      creditDistribution: "020",
    },

    {
      subjectName: "Strength of Materials Laboratory",
      subjectCode: "SOML",
      creditDistribution: "010",
    },
    {
      subjectName: "Material science and Metallurgy Laboratory",
      subjectCode: "MSML",
      creditDistribution: "010",
    },
    {
      subjectName: "Production Engineering-I Laboratory",
      subjectCode: "PEIL",
      creditDistribution: "010",
    },
    {
      subjectName: "Machine Shop Practice-I",
      subjectCode: "MSPI",
      creditDistribution: "010",
    },
  ],
  kjsce_mech_sem4: [
    {
      subjectName: "Mathematics for Mechanical Engineering-II",
      subjectCode: "MMEII",
      creditDistribution: "301",
    },
    {
      subjectName: "Theory of Machines-I",
      subjectCode: "TMI",
      creditDistribution: "300",
    },
    {
      subjectName: "Fluid Mechanics",
      subjectCode: "FM",
      creditDistribution: "300",
    },
    {
      subjectName: "Production Engineering-II",
      subjectCode: "PEII",
      creditDistribution: "300",
    },
    {
      subjectName: "Heat and Mass Transfer",
      subjectCode: "HMT",
      creditDistribution: "300",
    },
    {
      subjectName: "Theory of Machines-I Laboratory",
      subjectCode: "TMIL",
      creditDistribution: "010",
    },
    {
      subjectName: "FLuid Mechanics Laboratory",
      subjectCode: "FML",
      creditDistribution: "010",
    },
    {
      subjectName: "Production Engineering-II Laboratory",
      subjectCode: "PEIIL",
      creditDistribution: "010",
    },
    {
      subjectName: "Heat and Mass Transfer Laboratory",
      subjectCode: "HMTL",
      creditDistribution: "010",
    },
    {
      subjectName: "Machine Shop practice-II",
      subjectCode: "MSPII",
      creditDistribution: "020",
    },
  ],
  kjsce_mech_sem5: [
    {
      subjectName: "Theory of Machines-II",
      subjectCode: "TOM2",
      creditDistribution: "300",
    },
    {
      subjectName: "Energy Conversion-I",
      subjectCode: "EC1",
      creditDistribution: "300",
    },
    {
      subjectName: "Mechatronics",
      subjectCode: "MTRX",
      creditDistribution: "300",
    },
    {
      subjectName: "Departmental Elective-I",
      subjectCode: "DE1",
      creditDistribution: "300",
    },
    {
      subjectName: "Open Elective Technical",
      subjectCode: "OET",
      creditDistribution: "200",
    },
    {
      subjectName: "Open Elective Humanities",
      subjectCode: "OEHM",
      creditDistribution: "200",
    },
    {
      subjectName: "Theory of Machines-II Laboratory",
      subjectCode: "TOM2LAB",
      creditDistribution: "010",
    },
    {
      subjectName: "Energy Conversion-I Laboratory",
      subjectCode: "EC1LAB",
      creditDistribution: "010",
    },
    {
      subjectName: "Mechatronics Laboratory",
      subjectCode: "MTRXLAB",
      creditDistribution: "010",
    },
    {
      subjectName: "Industrial Electronics Laboratory",
      subjectCode: "IELAB",
      creditDistribution: "011",
    },
    {
      subjectName: "Departmental Elective-I Laboratory",
      subjectCode: "DE1LAB",
      creditDistribution: "010",
    },
  ],
  kjsce_mech_sem6: [
    {
      subjectName: "Elements of Machine Design",
      subjectCode: "EMD",
      creditDistribution: "300",
    },
    {
      subjectName: "Energy Conversion-II",
      subjectCode: "EC2",
      creditDistribution: "300",
    },
    {
      subjectName: "Computer Aided Engineering",
      subjectCode: "CAE",
      creditDistribution: "300",
    },
    {
      subjectName: "Departmental Elective-II",
      subjectCode: "DE2",
      creditDistribution: "300",
    },
    {
      subjectName: "Open Elective Technical",
      subjectCode: "OET",
      creditDistribution: "200",
    },
    {
      subjectName: "Open Elective Management",
      subjectCode: "OEHM",
      creditDistribution: "200",
    },
    {
      subjectName: "Elements of Machine Design Laboratory",
      subjectCode: "EMDLAB",
      creditDistribution: "010",
    },
    {
      subjectName: "Energy Conversion-II Laboratory",
      subjectCode: "EC2LAB",
      creditDistribution: "010",
    },
    {
      subjectName: "Computer Aided Engineering Laboratory",
      subjectCode: "CAELAB",
      creditDistribution: "010",
    },
    {
      subjectName: "Departmental Elective-II Laboratory",
      subjectCode: "DE2LAB",
      creditDistribution: "010",
    },
    {
      subjectName: "Mini Project",
      subjectCode: "MP",
      creditDistribution: "020",
      maxMarks: 50,
      structureType: "b",
    },
  ],
  kjsce_mech_sem7: [
    {
      subjectName: "Industrial Engineering and Management",
      subjectCode: "IEM",
      creditDistribution: "300",
    },
    {
      subjectName: "Departmental Elective-III",
      subjectCode: "DE3",
      creditDistribution: "300",
    },
    {
      subjectName: "Departmental Elective-IV",
      subjectCode: "DE4",
      creditDistribution: "300",
    },
    {
      subjectName: "Open Elective Technical",
      subjectCode: "OET",
      creditDistribution: "200",
    },
    {
      subjectName: "Project - I",
      subjectCode: "PI",
      creditDistribution: "040",
    },
    {
      subjectName: "Industrial Engineering and Management Laboratory",
      subjectCode: "IEMLAB",
      creditDistribution: "010",
    },
    {
      subjectName: "Departmental Elective-III Laboratory",
      subjectCode: "DE3LAB",
      creditDistribution: "010",
    },
    {
      subjectName: "Departmental Elective-IV Laboratory",
      subjectCode: "DE4LAB",
      creditDistribution: "010",
    },
  ],
};

export default calculatorStructure;
