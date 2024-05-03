var questions = [
  {
    question: "What is the value of 5 * (3 + 7) - 4?",
    answer: "46", // Corresponds to "opt3"
    options: ["42", "51", "46", "37"],
  },
  {
    question: "Solve for x: 3x - 7 = 20",
    answer: "9", // Corresponds to "opt1"
    options: ["9", "7", "13", "27"],
  },
  {
    question: "Find the square root of 169.",
    answer: "13", // Corresponds to "opt2"
    options: ["11", "13", "17", "15"],
  },
  {
    question:
      "What is the area of a rectangle with length 12 units and width 8 units?",
    answer: "96 sq. units", // Corresponds to "opt4"
    options: ["80 sq. units", "96 sq. units", "64 sq. units", "96 sq. units"],
  },
  {
    question:
      "If a car travels at a speed of 60 miles per hour, how far will it travel in 3 hours?",
    answer: "180 miles", // Corresponds to "opt3"
    options: ["120 miles", "180 miles", "180 miles", "200 miles"],
  },
  {
    question: "What is the next number in the sequence: 2, 5, 10, 17, 26, ...?",
    answer: "37", // Corresponds to "opt4"
    options: ["35", "30", "27", "37"],
  },
  {
    question: "If 3x + 5 = 20, what is the value of x?",
    answer: "5", // Corresponds to "opt2"
    options: ["3", "5", "7", "9"],
  },
  {
    question: "What is the perimeter of a square with side length 9 cm?",
    answer: "36 cm", // Corresponds to "opt1"
    options: ["36 cm", "45 cm", "54 cm", "72 cm"],
  },
  {
    question: "Simplify: 3/4 + 1/3",
    answer: "13/12", // Corresponds to "opt4"
    options: ["7/12", "5/7", "17/12", "13/12"],
  },
  {
    question: "What is the value of 4^3?",
    answer: "4^3", // Corresponds to "opt3"
    options: ["12", "64", "64", "81"],
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
