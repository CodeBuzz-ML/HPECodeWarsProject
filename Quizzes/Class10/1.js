var questions = [
    {
        question: "What is the value of (2 + 2)^3?",
        answer: "64",
        options: [
            "64",
            "48",
            "56",
            "32"
        ]
    },
    {
        question: "What is the value of 5 * 6?",
        answer: "30",
        options: [
            "25",
            "30",
            "35",
            "40"
        ]
    },
    {
        question: "What is the square root of 49?",
        answer: "7",
        options: [
            "4",
            "5",
            "6",
            "7"
        ]
    },
    {
        question: "What is the value of π (pi) to the nearest hundredth?",
        answer: "3.14",
        options: [
            "3.12",
            "3.13",
            "3.14",
            "3.15"
        ]
    },
    {
        question: "What is the area of a rectangle with length 5 units and width 7 units?",
        answer: "35",
        options: [
            "20",
            "25",
            "30",
            "35"
        ]
    },
    {
        question: "If a triangle has angles of 45°, 45°, and 90°, what type of triangle is it?",
        answer: "Right angled",
        options: [
            "Equilateral",
            "Isosceles",
            "Scalene",
            "Right angled"
        ]
    },
    {
        question: "What is the value of sin(30°)?",
        answer: "0.5",
        options: [
            "0.25",
            "0.5",
            "0.75",
            "1.0"
        ]
    },
    {
        question: "What is the value of cos(60°)?",
        answer: "0.5",
        options: [
            "0.25",
            "0.5",
            "0.75",
            "1.0"
        ]
    },
    {
        question: "What is the value of tan(45°)?",
        answer: "1",
        options: [
            "0.5",
            "1",
            "1.5",
            "2"
        ]
    },
    {
        question: "What is the sum of the interior angles of a hexagon?",
        answer: "720°",
        options: [
            "540°",
            "600°",
            "660°",
            "720°"
        ]
    }    
]

questions_temp =
    {
        question: "",
        answer: "",
        options: ""
    }

var quizHeader = document.getElementById("quizHeader")
var quizBody = document.getElementById("quizBody")
var qNum = 0
var answers = []//array to show the correct answers and false ones
var minutes = 0
var seconds = 0
var formattedMinutes = 0
var formattedSeconds = 0
var interval = 0

function startQuiz(){
    document.getElementById("mainBody").style.display = "flex"
    document.getElementById("startBtn").style.display = "none"    

    appendQuestion()
    interval = setInterval(function(){
        if(seconds<59) seconds++
        else{
            seconds=0
            if(minutes<59) minutes++
            else{
                minutes=0
                clearInterval(interval)
            }
        }
        formattedSeconds = seconds<10 ? `0${seconds}` : seconds
        formattedMinutes = minutes<10 ? `0${minutes}` : minutes
        document.getElementById("timer").innerHTML = `${formattedMinutes}:${formattedSeconds}`
    }, 1000)
}
function appendQuestion(){
    quizHeader.innerHTML = `<h3 class='quizHeader'>Q${qNum+1}/${questions.length}</h3><span id='timer'${minutes}:${seconds}</span>`
    var divBody = `<h3 class='quizHeader'>Q: ${questions[qNum].question}</h3>`
    divBody += "<ul class='option_group' id='option_group'>"
    for(var i=0; i<questions[qNum].options.length; i++)
        divBody += `<li class='option' onclick='activeOpt(this)'>${questions[qNum].options[i]}</li>`
    divBody += "</ul>"
    divBody += "<button class='btn btn-primary nxtBtn' onclick='nxtQuestion()'>Next question</button>"
    quizBody.innerHTML = divBody
}
function activeOpt(id){
    var ul = document.getElementById("option_group")
    for(var i=0; i<questions[qNum].options.length; i++){
        if(ul.childNodes[i].className === 'active')
            ul.childNodes[i].classList.remove('active')
        ul.childNodes[i].className = 'option'
    }   
    id.className = 'active'
    if(id.innerHTML === questions[qNum].answer) answers[qNum] = true
    else answers[qNum] = false
}
function nxtQuestion(){
    if(!(typeof answers[qNum] === 'undefined')){
        if(qNum < questions.length-1){
            qNum++
            appendQuestion()
        }
        else{
            qNum=0
            appendResult()
        }
    }
    else alert("please select an option")
}
function appendResult(){
    var correctQuestions = 0 // number of questions that were answered correctly
    document.getElementById("exitBtn").style.display = "none"
    clearInterval(interval)
    quizHeader.innerHTML = "<h3>Result</h3>"
    quizHeader.style.justifyContent = "center"
    var divBody = "";;;
    // for(var i=0; i<questions.length; i++) divBody += `<th>Q${i+1}</th>`
    divBody += "</thead><tbody>"
    for(var i=0; i<questions.length; i++){
        if(answers[i]){
            divBody += "<td><img style='width:20px; margin:5px; align-self: center;' src='Images/check.png'></td>"
            correctQuestions++
        }
        else divBody += "<td><img style='width:20px; margin:5px;'  src='Images/cancel.png'></td>"
    }

    divBody += "</tbody></table>"

    divBody += "<Table class='table table-bordered'><thead class='thead-dark'>"
    divBody += "<th>Points</th>"
    divBody += "<th>Percentage</th>"    
    divBody += "<th>Time Taken (mm:ss)</th>"
    divBody += "</thead></tbody>"
    divBody += `<td>${correctQuestions}/${questions.length}</td>`
    divBody += `<td>${(correctQuestions/questions.length)*100}%</td>`
    divBody += `<td>${formattedMinutes}:${formattedSeconds}</td>`
    divBody += "</tbody></table>"

    divBody += '<button class="btn btn-primary" onclick=history.go(-2)>Return Home</button>'
    quizBody.innerHTML = divBody
}