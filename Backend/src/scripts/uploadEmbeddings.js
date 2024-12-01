const requirementsService = require("../services/requirements.service");

const requirements = [
  {
    courses: [
      {
        id: "CS 3305L",
        creditHours: 4,
        prerequisites: ["CSE 1322L", "MATH 2345"],
        name: "Data Structures",
      },
      {
        id: "CS 3410",
        prerequisites: ["CSE 1322L"],
        creditHours: 3,
        name: "Introduction to Database Systems",
      },
      {
        id: "CS 3502",
        name: "Operating Systems",
        prerequisites: ["CS 3503L", "CS 3305L"],
        creditHours: 3,
      },
      {
        id: "CS 3503L",
        name: "Computer Organization & Architecture",
        creditHours: 4,
        prerequisites: ["CSE 1322L"],
      },
      {
        id: "CS 4306",
        creditHours: 3,
        name: "Algorithm Analysis",
        prerequisites: ["CS 3305L"],
      },
      {
        id: "CS 4308",
        creditHours: 3,
        prerequisites: ["CS 3503L", "CS 3305L"],
        name: "Programming Languages",
      },
      {
        id: "CS 4850",
        name: "Senior Project",
        creditHours: 3,
        prerequisites: ["CS 3502", "SWE 3313"],
      },
      {
        id: "CSE 3801",
        creditHours: 2,
        prerequisites: ["CSE 1322L"],
        name: "Professional Practices and Ethics",
      },
      {
        id: "MATH 2345",
        prerequisites: ["MATH 1112", "MATH 1113", "MATH 1190"],
        creditHours: 3,
        name: "Discrete Mathematics",
      },
      {
        id: "MATH 3332",
        prerequisites: ["MATH 2202"],
        name: "Probability and Inference",
        creditHours: 3,
      },
      {
        id: "SWE 3313",
        creditHours: 3,
        name: "Intro to Software Engineering",
        prerequisites: ["CSE 1322L"],
      },
      {
        id: "TCOM 2010",
        name: "Technical Writing",
        prerequisites: ["ENGL 1102"],
        creditHours: 3,
      },
    ],
    description:
      "All major courses must have a minimum grade of ‘C,’ except for CSE 1321/L and CSE 1322/L, which must have a minimum grade of ‘B.’ *Alternative can be used as a Major Elective Potential other Upper-Level Math courses with coordinator approval.",
    name: "Upper Division Major Courses",
  },
  {
    courses: [
      {
        id: "CS 4242",
        creditHours: 3,
        name: "Artificial Intelligence",
        prerequisites: ["CS 3305L"],
      },
      {
        id: "CS 4265",
        prerequisites: ["CS 3305L", "CS 3410"],
        name: "Big Data Analytics",
        creditHours: 3,
      },
      {
        id: "CS 4267",
        prerequisites: ["CS 3305L", "CS 3410"],
        name: "Machine Learning",
        creditHours: 3,
      },
      {
        id: "CS 4270",
        prerequisites: ["CS 3305L", "CS 3410"],
        creditHours: 3,
        name: "Intelligent Systems in Bioinformatics",
      },
      {
        id: "CS 4322",
        creditHours: 3,
        name: "Mobile Software Development",
        prerequisites: ["CS 3305L", "SWE 3313", "CS 3410"],
      },
      {
        id: "CS 4512",
        prerequisites: ["CS 3502"],
        name: "Systems Programming",
        creditHours: 3,
      },
      {
        id: "CS 4514",
        creditHours: 3,
        name: "Real-Time Systems",
        prerequisites: ["CS 3502"],
      },
      {
        id: "CS 4522",
        creditHours: 3,
        name: "HPC & Parallel Programming",
        prerequisites: ["CS 3502"],
      },
      {
        id: "CS 4612",
        prerequisites: ["CS 3503L"],
        creditHours: 3,
        name: "Secure Software Development",
      },
      {
        id: "CS 4622",
        name: "Computer Networks",
        creditHours: 3,
        prerequisites: ["CS 3503L"],
      },
    ],
    name: "Major Electives",
    description:
      "All major courses must have a minimum grade of ‘C,’ except for CSE 1321/L and CSE 1322/L, which must have a minimum grade of ‘B.’",
  },
  {
    description:
      "CSE 1321/L and CSE 1322/L must have a minimum grade of ‘B.’ Upon completing CSE 1322/L with a minimum grade of ‘B,’ students should request to have their major changed to the fully admitted Computer Science major.",
    name: "Area F Lower Division Major Requirements",
    courses: [
      {
        id: "CSE 1321L",
        name: "Programming & Problem Solving I",
        prerequisites: ["MATH 1112", "MATH 1113", "MATH 1190"],
        creditHours: 4,
      },
      {
        id: "CSE 1322L",
        creditHours: 4,
        name: "Programming & Problem Solving II",
        prerequisites: ["CSE 1321/L"],
      },
      {
        id: "MATH 2202",
        prerequisites: ["MATH 1190"],
        name: "Calculus II",
        creditHours: 4,
      },
    ],
  },
  {
    description:
      "Those are the general education requirements. Don't pay too mush attention on those except for composition II and calculus I that must be passed with an A grade",
    name: "General Education Requirements",
    courses: [
      {
        id: "COM 1100",
        prerequisites: [],
        creditHours: 3,
        name: "Human Communication",
      },
      {
        id: "ECON 1000",
        creditHours: 2,
        prerequisites: [],
        name: "Contemporary Economic Issues",
      },
      {
        id: "ENGL 1101",
        name: "Composition I",
        creditHours: 3,
        prerequisites: [],
      },
      {
        id: "ENGL 1102",
        creditHours: 3,
        prerequisites: [],
        name: "Composition II",
      },
      {
        id: "HIST 1111",
        prerequisites: [],
        name: "World History",
        creditHours: 3,
      },
      {
        id: "HIST 2111",
        prerequisites: [],
        name: "Survey of World History I",
        creditHours: 3,
      },
      {
        id: "HIST 2112",
        creditHours: 3,
        prerequisites: ["HIST 2111"],
        name: "Survey of World History II",
      },
      {
        id: "MATH 1112",
        prerequisites: [],
        name: "College Trigonometry",
        creditHours: 3,
      },
      {
        id: "MATH 1113",
        name: "Precalculus",
        prerequisites: [],
        creditHours: 3,
      },
      {
        id: "MATH 1190",
        name: "Calculus I",
        prerequisites: [],
        creditHours: 4,
      },
      {
        id: "POLS 1101",
        creditHours: 3,
        name: "American Government",
        prerequisites: [],
      },
    ],
  },
];

async function uploadRequirements(requirements) {
  try {
    await requirementsService.upsertCourseRequirements(requirements);
    console.log("Requirements uploaded successfully");
  } catch (error) {
    console.error("Error uploading requirements:", error);
  }
}

uploadRequirements(requirements);
