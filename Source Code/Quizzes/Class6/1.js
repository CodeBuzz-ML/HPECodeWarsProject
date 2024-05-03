var questions = [
  {
    question: "1. In which process does a solid change into gas directly?",
    answer: "C) Sublimation", // this has to be one of the options
    options: [
      "A) Melting",
      "B) Evaporation",
      "C) Sublimation",
      "D) Condensation",
    ],
  },
  {
    question: "2. What is the study of fossils called?",
    answer: "A) Paleontology", // this has to be one of the options
    options: [
      "A) Paleontology",
      "B) Archeology",
      "C) Geology",
      "D) Anthropology",
    ],
  },
  {
    question: "3. Which planet is known as the red planet?",
    answer: "B) Mars", // this has to be one of the options
    options: ["A) Venus", "B) Mars", "C) Jupiter", "D) Saturn"],
  },
  {
    question: "4. What is the smallest unit of an element?",
    answer: "A) Atom", // this has to be one of the options
    options: ["A) Atom", "B) Molecule", "C) Cell", "D) Proton"],
  },
  {
    question: "5. What is the largest organ in the human body?",
    answer: "C) Skin", // this has to be one of the options
    options: [
      "A) Heart",
      "B) Large Intestine",
      "C) Skin",
      "D) Small intestine",
    ],
  },
  {
    question:
      "6. What is the name of the process by which plants make their own food?",
    answer: "A) Photosynthesis", // this has to be one of the options
    options: [
      "A) Photosynthesis",
      "B) Respiration",
      "C) Digestion",
      "D) Transpiration",
    ],
  },
  {
    question: "7. What is the main function of the respiratory system?",
    answer: "C) Exchange of oxygen and carbon dioxide", // this has to be one of the options
    options: [
      "A) Pump blood throughout the body",
      "B) Filter waste from the blood",
      "C) Exchange oxygen and carbon dioxide",
      "D) Produce hormones",
    ],
  },
  {
    question: "8. Which type of energy is stored in food?",
    answer: "C) Chemical energy", // this has to be one of the options
    options: [
      "A) Potential energy",
      "B) Kinetic energy",
      "C) Chemical energy",
      "D) Thermal energy",
    ],
  },
  {
    question: "9. What is the process of water turning into vapour called?",
    answer: "D) Evaporation", // this has to be one of the options
    options: [
      "A) Melting",
      "B) Deposition",
      "C) Condensation",
      "D) Evaporation",
    ],
  },
  {
    question:
      "10. What is the force that pulls objects towards the centre of the earth?",
    answer: "B) Gravity", // this has to be one of the options
    options: ["A) Magnetism", "B) Gravity", "C) Friction", "D) Inertia"],
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
