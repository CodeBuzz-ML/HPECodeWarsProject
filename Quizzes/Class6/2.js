var questions = [
  {
    question:
      "What is the result of the expression: (2 × 10^3) ÷ (5 × 10^(-2))?",
    answer: "4 × 10^5", // Corresponds to "opt1"
    options: ["4 × 10^5", "4 × 10^1", "4 × 10^(-1)", "4 × 10^3"],
  },
  {
    question:
      "If a rectangular prism has dimensions 5 cm, 12 cm, and 8 cm, what is its total surface area?",
    answer: "248 cm^2", // Corresponds to "opt1"
    options: ["248 cm^2", "352 cm^2", "328 cm^2", "284 cm^2"],
  },
  {
    question:
      "What is the perimeter of a regular hexagon with a side length of 9 cm?",
    answer: "72 cm", // Corresponds to "opt3"
    options: ["63 cm", "54 cm", "72 cm", "45 cm"],
  },
  {
    question: "If 2x + 5 = 17, what is the value of x?",
    answer: "6", // Corresponds to "opt1"
    options: ["6", "5", "8", "7"],
  },
  {
    question:
      "Which of the following is the closest approximation to the value of √80?",
    answer: "8.6", // Corresponds to "opt2"
    options: ["8.1", "8.6", "8.9", "9.2"],
  },
  {
    question: "What is the value of 3^4 × 3^2?",
    answer: "3^8", // Corresponds to "opt2"
    options: ["3^6", "3^8", "3^5", "3^10"],
  },
  {
    question:
      "A bag contains 4 red, 3 blue, and 2 green marbles. If a marble is drawn at random, what is the probability of drawing a blue marble?",
    answer: "1/3", // Corresponds to "opt3"
    options: ["1/3", "1/4", "3/9", "1/9"],
  },
  {
    question:
      "The temperature in a city increases by 5°C each hour. If the temperature was initially 20°C, what will be the temperature after 6 hours?",
    answer: "50°C", // Corresponds to "opt2"
    options: ["50°C", "45°C", "40°C", "35°C"],
  },
  {
    question:
      "If a square has an area of 196 square units, what is the length of one of its sides?",
    answer: "48 units", // Corresponds to "opt3"
    options: ["14 units", "12 units", "7 units", "48 units"],
  },
  {
    question: "What is the value of 2^5 ÷ 2^3?",
    answer: "2^2", // Corresponds to "opt3"
    options: ["2^8", "2^2", "2^3", "2^6"],
  },
];
questions_temp = {
  question: "",
  answer: "",
  options: "",
};

var quizHeader = document.getElementById("quizHeader");
var quizBody = document.getElementById("quizBody");
var qNum = 0;
var answers = []; //array to show the correct answers and false ones
var minutes = 0;
var seconds = 0;
var formattedMinutes = 0;
var formattedSeconds = 0;
var interval = 0;

function startQuiz() {
  document.getElementById("mainBody").style.display = "flex";
  document.getElementById("startBtn").style.display = "none";

  appendQuestion();
  interval = setInterval(function () {
    if (seconds < 59) seconds++;
    else {
      seconds = 0;
      if (minutes < 59) minutes++;
      else {
        minutes = 0;
        clearInterval(interval);
      }
    }
    formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    document.getElementById(
      "timer"
    ).innerHTML = `${formattedMinutes}:${formattedSeconds}`;
  }, 1000);
}
function appendQuestion() {
  quizHeader.innerHTML = `<h3 class='quizHeader'>Q${qNum + 1}/${
    questions.length
  }</h3><span id='timer'${minutes}:${seconds}</span>`;
  var divBody = `<h3 class='quizHeader'>Q: ${questions[qNum].question}</h3>`;
  divBody += "<ul class='option_group' id='option_group'>";
  for (var i = 0; i < questions[qNum].options.length; i++)
    divBody += `<li class='option' onclick='activeOpt(this)'>${questions[qNum].options[i]}</li>`;
  divBody += "</ul>";
  divBody +=
    "<button class='btn btn-primary nxtBtn' onclick='nxtQuestion()'>Next question</button>";
  quizBody.innerHTML = divBody;
}
function activeOpt(id) {
  var ul = document.getElementById("option_group");
  for (var i = 0; i < questions[qNum].options.length; i++) {
    if (ul.childNodes[i].className === "active")
      ul.childNodes[i].classList.remove("active");
    ul.childNodes[i].className = "option";
  }
  id.className = "active";
  if (id.innerHTML === questions[qNum].answer) answers[qNum] = true;
  else answers[qNum] = false;
}
function nxtQuestion() {
  if (!(typeof answers[qNum] === "undefined")) {
    if (qNum < questions.length - 1) {
      qNum++;
      appendQuestion();
    } else {
      qNum = 0;
      appendResult();
    }
  } else alert("please select an option");
}
function appendResult() {
  var correctQuestions = 0; // number of questions that were answered correctly
  document.getElementById("exitBtn").style.display = "none";
  clearInterval(interval);
  quizHeader.innerHTML = "<h3>Result</h3>";
  quizHeader.style.justifyContent = "center";
  var divBody = "";
  // for(var i=0; i<questions.length; i++) divBody += `<th>Q${i+1}</th>`
  divBody += "</thead><tbody>";
  for (var i = 0; i < questions.length; i++) {
    if (answers[i]) {
      divBody +=
        "<td><img style='width:20px; margin:5px; align-self: center;' src='Images/check.png'></td>";
      correctQuestions++;
    } else
      divBody +=
        "<td><img style='width:20px; margin:5px;'  src='Images/cancel.png'></td>";
  }

  divBody += "</tbody></table>";

  divBody += "<Table class='table table-bordered'><thead class='thead-dark'>";
  divBody += "<th>Points</th>";
  divBody += "<th>Percentage</th>";
  divBody += "<th>Time Taken (mm:ss)</th>";
  divBody += "</thead></tbody>";
  divBody += `<td>${correctQuestions}/${questions.length}</td>`;
  divBody += `<td>${(correctQuestions / questions.length) * 100}%</td>`;
  divBody += `<td>${formattedMinutes}:${formattedSeconds}</td>`;
  divBody += "</tbody></table>";

  divBody +=
    '<button class="btn btn-primary" onclick=history.go(-2)>Return Home</button>';
  quizBody.innerHTML = divBody;
}
