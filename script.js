
// ==============================
// 1️⃣ Quiz Data
// ==============================
const questions = [
    {
        question: "Which sentence is grammatically correct?",
        answers: [
            { text: "She don't like apples", correct: false },
            { text: "She not likes apples", correct: false },
            { text: "She doesn't likes apples", correct: false },
            { text: "She doesn't like apples", correct: true },
        ]
    },
    {
        question: "If I _____ enough money, I would buy a new car.",
        answers: [
            { text: "have", correct: false },
            { text: "had", correct: true },
            { text: "will have", correct: false },
            { text: "having", correct: false },
        ]
    },
    {
        question: "What is the synonym of 'Extremely'?",
        answers: [
            { text: "Slightly", correct: false },
            { text: "Very", correct: true },
            { text: "Barely", correct: false },
            { text: "Rarely", correct: false },
        ]
    },
    {
        question: "She is very good _____ playing the piano.",
        answers: [
            { text: "in", correct: false },
            { text: "at", correct: true },
            { text: "on", correct: false },
            { text: "with", correct: false },
        ]
    },
    {
        question: "Which of the following is a noun?",
        answers: [
            { text: "Quickly", correct: false },
            { text: "Beautiful", correct: false },
            { text: "Happiness", correct: true },
            { text: "Under", correct: false },
        ]
    },
];

// ==============================
// 2️⃣ DOM Elements
// ==============================
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");
const counterEl = document.getElementById("question-counter");
const progressBar = document.getElementById("progress-bar");

// ==============================
// 3️⃣ State Variables
// ==============================
let currentQuestionIndex = 0;
let score = 0;

// ==============================
// 4️⃣ Start Quiz
// ==============================
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.textContent = "Next";
    showQuestion();
}

// ==============================
// 5️⃣ Show Question
// ==============================
function showQuestion() {
    resetState();

    const currentQuestion = questions[currentQuestionIndex];

    counterEl.textContent =
        `Question ${currentQuestionIndex + 1} of ${questions.length}`;

    questionEl.textContent = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("btn");

        if (answer.correct) {
            button.dataset.correct = "true";
        }

        button.addEventListener("click", selectAnswer);
        answersEl.appendChild(button);
    });

    // Update progress bar correctly
    progressBar.style.width =
        `${((currentQuestionIndex + 1) / questions.length) * 100}%`;
}

// ==============================
// 6️⃣ Reset UI
// ==============================
function resetState() {
    nextBtn.style.display = "none";
    answersEl.innerHTML = "";
}

// ==============================
// 7️⃣ Select Answer
// ==============================
function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    if (isCorrect) score++;

    Array.from(answersEl.children).forEach(button => {
        const correct = button.dataset.correct === "true";
        button.classList.add(correct ? "correct" : "incorrect");
        button.disabled = true;
    });

    nextBtn.style.display = "block";
}

// ==============================
// 8️⃣ Show Final Score
// ==============================
function showScore() {
    resetState();
    questionEl.textContent =
        `🎉 You scored ${score} out of ${questions.length}`;
    counterEl.textContent = "";
    nextBtn.textContent = "Play Again";
    nextBtn.style.display = "block";
    progressBar.style.width = "100%";
}

// ==============================
// 9️⃣ Next Button Logic
// ==============================
nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    currentQuestionIndex < questions.length
        ? showQuestion()
        : showScore();
});

// ==============================
// 🔟 Initialize
// ==============================
startQuiz();