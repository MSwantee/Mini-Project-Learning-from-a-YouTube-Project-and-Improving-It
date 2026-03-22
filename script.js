// Selecting elements
const start_btn = document.querySelector(".start_btn button");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const next_btn = document.querySelector(".next_btn");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

let que_count = 0;
let userScore = 0;

// Clicking Start Quiz
start_btn.onclick = () => {
    quiz_box.classList.add("activeQuiz");
    showQuestions(0);
}

// Restart Quiz logic
restart_quiz.onclick = () => {
    window.location.reload(); 
}

// Quit Quiz logic
quit_quiz.onclick = () => {
    window.location.reload();
}

// Logic to show questions and options
function showQuestions(index) {
    const que_text = document.querySelector(".que_text");
    let que_tag = `<span>${questions[index].numb}. ${questions[index].question}</span>`;
    let option_tag = "";
    
    // Loop through options
    questions[index].options.forEach(opt => {
        option_tag += `<div class="option"><span>${opt}</span></div>`;
    });

    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const options = option_list.querySelectorAll(".option");
    options.forEach(opt => opt.setAttribute("onclick", "optionSelected(this)"));
}

// Checking answer
function optionSelected(answer) {
    let userAns = answer.textContent;
    let corAns = questions[que_count].answer;
    
    if (userAns == corAns) {
        userScore += 1;
        answer.style.background = "#d4edda"; // Success green
    } else {
        answer.style.background = "#f8d7da"; // Error red
    }

    // Disable all options after selecting one
    const allOptions = option_list.children.length;
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].style.pointerEvents = "none";
    }
}

// Next Question button
next_btn.onclick = () => {
    if (que_count < questions.length - 1) {
        que_count++;
        showQuestions(que_count);
    } else {
        showResult();
    }
}

// IMPROVEMENT: Result screen with High Score (localStorage)
function showResult() {
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector(".score_text");
    scoreText.innerHTML = `<span>Final Score: <p>${userScore}</p> out of <p>${questions.length}</p></span>`;

    // LocalStorage Improvement Logic
    let savedHighScore = localStorage.getItem("QuizHighScore") || 0;
    if (userScore > savedHighScore) {
        localStorage.setItem("QuizHighScore", userScore);
        savedHighScore = userScore;
    }

    const highScoreDisplay = result_box.querySelector(".high_score_text");
    highScoreDisplay.innerHTML = `Your High Score: ${savedHighScore}`;
}
