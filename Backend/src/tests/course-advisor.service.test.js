const advisor = require("../services/course-advisor.service");

async function test() {
  await courseAdvisor.initialize();

  const generalAnswer = await advisor.answerQuestion(
    "What courses are offered in the Computer Science department?"
  );

  console.log(generalAnswer);
}

test();
