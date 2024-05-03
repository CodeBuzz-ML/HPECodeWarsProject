var questions = [
  {
    question: "What is the chemical symbol for iron?",
    answer: "Fe", // Corresponds to "opt3"
    options: ["Ir", "Fe", "In", "I"],
  },
  {
    question: "Which of the following is a non-renewable energy source?",
    answer: "Coal", // Corresponds to "opt2"
    options: ["Wind", "Coal", "Solar", "Hydroelectric"],
  },
  {
    question: "What is the freezing point of water in Fahrenheit?",
    answer: "None of the above", // Corresponds to "opt1"
    options: ["32°F", "50°F", "None of the above", "100°F"],
  },
  {
    question: "Which planet is known as the 'Gas Giant'?",
    answer: "Jupiter", // Corresponds to "opt4"
    options: ["Mars", "Venus", "Earth", "Jupiter"],
  },
  {
    question:
      "What is the process by which rocks break down into smaller pieces?",
    answer: "Weathering", // Corresponds to "opt2"
    options: ["Sublimation", "Weathering", "Erosion", "Deposition"],
  },
  {
    question: "What is the chemical symbol for carbon?",
    answer: "C", // Corresponds to "opt3"
    options: ["C", "Co", "Cr", "Ca"],
  },
  {
    question: "What is the SI unit of force?",
    answer: "Newton", // Corresponds to "opt1"
    options: ["Newton", "Watt", "Joule", "Pascal"],
  },
  {
    question:
      "What is the process by which an animal takes in oxygen and releases carbon dioxide?",
    answer: "Respiration", // Corresponds to "opt2"
    options: ["Photosynthesis", "Respiration", "Transpiration", "Fermentation"],
  },
  {
    question: "Which of the following is an example of a chemical change?",
    answer: "Burning wood", // Corresponds to "opt4"
    options: [
      "Melting ice",
      "Boiling water",
      "Dissolving salt in water",
      "Burning wood",
    ],
  },
  {
    question:
      "What is the process by which liquid water turns into water vapor?",
    answer: "Evaporation", // Corresponds to "opt3"
    options: ["Condensation", "Evaporation", "Sublimation", "Deposition"],
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
