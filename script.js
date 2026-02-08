const questions = [
        {
            question: "What does HTML stand for?",
            options: [
                "High Text Machine Language",
                "Hyperlinks Text Mark Language",
                "Home Tool Markup Language",    
                "Hyper Text Markup Language"
            ],
            answer: 3
        },
        {
            question: "What does CSS stand for?",
            options: [
                "Creative Style Sheets",
                "Colorful Style Sheets",
                "Cascading Style Sheets",
                "Computer Style Sheets"
            ],
            answer: 2
        },
        {
            question: "Which HTML tag is used to deefine an internal style sheet?",
            options: ["<style>", "<script>", "<css>", "<link>"],
            answer: 0
        },
        {
            question: "What does === operater do in JavaScript?",
            options: ["Assign value", "Compares value", "Strict comparision", "Converts data types"],
            answer: 2
        },
        {
            question: "Which method prints output in the console?",
            options: ["print()", "log()", "console.log()", "show()"],
            answer: 2
        },
        {
            question: "Which HTML element is used to create a dropdown list?",
            options: ["<select>", "<input>", "<option>", "<list>"],
            answer: 0
        },
        {
            question: "Which language is used for styling web pages?",
            options: ["HTML", "CSS", "Java", "Python"],
            answer: 1
        },
        {
            question: "What does <meta charset='UTF-8'> specify?",
            options: ["Font type", "Boolean", "Character encodiing", "Language"],
            answer: 2
        },
        {
            question: "Which is the correct syntax to select all <p> elements?",
            options: ["p{}", ".p{}", "#p{}", "*p{}"],
            answer: 0
        },
        {
            question: "Which method adds an element at the end of an array?",
            options: ["push()", "pop()", "shift()", "unshift()"],
            answer: 0
        }
    ];

    let currentQuestion = 0;
    let score = 0;
    let correctCount = 0;
    let wrongCount = 0;
    let timeLeft = 15;
    let timer;

    const startScreen = document.getElementById("startScreen");
    const quizScreen = document.getElementById("quizScreen");
    const resultScreen = document.getElementById("resultScreen");

    const questionEl = document.getElementById("question");
    const optionsEl = document.getElementById("options");

    const scoreEl = document.getElementById("score");
    const correctEl = document.getElementById("correct");
    const wrongEl = document.getElementById("wrong");
    const timerEl = document.getElementById("timer");

    const finalScoreEl = document.getElementById("finalScore");
    const performanceEl = document.getElementById("performance");

    function startQuiz() {
        startScreen.classList.add("hide");
        quizScreen.classList.remove("hide");
        loadQuestion();
    }

    function loadQuestion() {
        clearInterval(timer);
        timeLeft = 15;
        timerEl.textContent = `Time: ${timeLeft}`;

        const q = questions[currentQuestion];
        questionEl.textContent = q.question;
        optionsEl.innerHTML = "";

        q.options.forEach((option, index) => {
            const btn = document.createElement("button");
            btn.textContent = option;
            btn.onclick = () => checkAnswer(index, btn);
            optionsEl.appendChild(btn);
        });

        startTimer();
    }

    function checkAnswer(selected, btn) {
        clearInterval(timer);
        const correct = questions[currentQuestion].answer;
        const buttons = optionsEl.querySelectorAll("button");

        buttons.forEach(b => b.disabled = true);

        if (selected === correct) {
            btn.classList.add("correct");
            score++;
            correctCount++;
        } else {
            btn.classList.add("wrong");
            buttons[correct].classList.add("correct");
            wrongCount++;
        }

        scoreEl.textContent = `Score: ${score}`;
        correctEl.textContent = `Correct: ${correctCount}`;
        wrongEl.textContent = `Wrong: ${wrongCount}`;

        setTimeout(nextQuestion, 1000);
    }

    function startTimer() {
        timer = setInterval(() => {
            timeLeft--;
            timerEl.textContent = `Time: ${timeLeft}`;

            if (timeLeft === 0) {
                clearInterval(timer);
                wrongCount++;
                wrongEl.textContent = `Wrong: ${wrongCount}`;
                nextQuestion();
            }
        }, 1000);
    }

    function nextQuestion() {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }

    function showResult() {
        quizScreen.classList.add("hide");
        resultScreen.classList.remove("hide");

        finalScoreEl.textContent = `${score} / ${questions.length}`;

        if (score === questions.length) {
            performanceEl.textContent = "Excellent";
        } else if (score >= questions.length / 2) {
            performanceEl.textContent = "Good";
        } else {
            performanceEl.textContent = "Try Again";
        }
    }

    function restartQuiz() {
        currentQuestion = 0;
        score = 0;
        correctCount = 0;
        wrongCount = 0;

        scoreEl.textContent = "Score: 0";
        correctEl.textContent = "Correct: 0";
        wrongEl.textContent = "Wrong: 0";

        resultScreen.classList.add("hide");
        startScreen.classList.remove("hide");
    }

// Attach click listener to start button as a robust fallback
const startBtn = document.getElementById('startBtn');
if (startBtn) startBtn.addEventListener('click', startQuiz);

// Expose functions to `window` for inline/onload safety
window.startQuiz = startQuiz;
window.restartQuiz = restartQuiz;