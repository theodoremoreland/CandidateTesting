// Imports
const input = require('readline-sync');

console.clear();
const user_name = input.question("Enter your name:  ");
const correct_answers = ['true', '40', 'trajectory', 'sally ride', '3'];
const questions = [
  '1) True or false: 5000 meters = 5 kilometers.'
  , '2) (5 + 3)/2 * 10 = ?'
  , '3) Given the array [8, "Orbit", "Trajectory", 45], what entry is at index 2?'
  , '4) Who was the first American woman in space?'
  , '5) What is the minimum crew size for the International Space Station (ISS)?'
];


function askQuestions(questions) {
  let user_answers = [];
  for (let i = 0; i < questions.length; i++) {
    let user_answer = input.question(questions[i] + " ");
    user_answers.push(user_answer);
  }
  return user_answers;
}


function createReport(questions, correct_answers, user_answers, report=[]) {
  if (questions.length == 0) { return report; }

    question = questions.shift();
    user_answer = user_answers.shift();
    correct_answer = correct_answers.shift();
    QnA = {"question": question, "user_answer": user_answer.toLowerCase(), "correct_answer": correct_answer}
    report.push(QnA);

    return createReport(questions, correct_answers, user_answers, report);
}


function gradeReport(report, passing_grade) {
  let score = 100;
  let mark = 100 / report.length;
  let number_correct = 0;
   
  for (let i = 0; i < report.length; i++) {
    QnA = report[i];
    if (QnA["user_answer"] !== QnA["correct_answer"]) { score -= mark; }
    else { number_correct += 1; }
  }

  let pass = score >= passing_grade ? "PASSED" : "FAILED";

  return {"score": score, "number_correct": number_correct, "pass": pass};
}


function showReport(user_name, report, grade) {
  console.clear();
  console.log(`\n\tCandidate Name: ${user_name}`);

  for (let i = 0; i < report.length; i++) {
    QnA = report[i];
    question = QnA["question"]
    user_answer = QnA["user_answer"]
    correct_answer = QnA["correct_answer"]

    console.log(`
    ${question}
    Your Answer: ${user_answer}
    Correct Answer: ${correct_answer}`);
  }

  console.log(`
  >>> Overall Grade: ${grade.score}% (${grade.number_correct} of ${report.length} responses correct) <<<
  >>> Status: ${grade.pass} <<<`);
}


function main() {
  let user_answers = askQuestions(questions);
  let report = createReport(questions, correct_answers, user_answers);
  let grade = gradeReport(report, 80);

  showReport(user_name, report, grade);
}

main();