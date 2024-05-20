var questions = [
  {
    question: "Which of the following is NOT a type of rock?",
    answer: "Water",
    options: ["Sedimentary", "Igneous", "Metamorphic", "Water"],
  },
  {
    question: "What is the chemical symbol for oxygen?",
    answer: "O2",
    options: ["O", "O2", "OH", "H2O"],
  },
  {
    question:
      "What is the process by which water vapor turns into liquid water?",
    answer: "Condensation",
    options: ["Evaporation", "Condensation", "Precipitation", "Sublimation"],
  },
  {
    question: "Which of the following is NOT a type of simple machine?",
    answer: "Battery",
    options: ["Lever", "Wheel and axle", "Pulley", "Battery"],
  },
  {
    question: "Which planet is known as the 'Blue Planet'?",
    answer: "Earth",
    options: ["Mars", "Venus", "Jupiter", "Earth"],
  },
  {
    question: "What is the unit of measurement for electric current?",
    answer: "Ampere",
    options: ["Volt", "Ampere", "Ohm", "Watt"],
  },
  {
    question: "Which of the following is NOT a state of matter?",
    answer: "Energy",
    options: ["Solid", "Liquid", "Gas", "Energy"],
  },
  {
    question:
      "What is the process by which plants lose water vapor through their leaves?",
    answer: "Transpiration",
    options: ["Photosynthesis", "Respiration", "Transpiration", "Evaporation"],
  },
  {
    question: "Which of the following is the largest organ in the human body?",
    answer: "Liver",
    options: ["Skin", "Heart", "Brain", "Liver"],
  },
  {
    question: "What is the chemical formula for table salt?",
    answer: "NaCl",
    options: ["NaCl", "H2O", "C6H12O6", "CO2"],
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
