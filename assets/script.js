document.addEventListener("DOMContentLoaded", function () {
    const startBtn = document.getElementById("btn");
    const quizContainer = document.querySelector(".quiz");
    const scoreContainer = document.querySelector(".scores");
    const questionElement = document.querySelector(".questions");
    const options = document.querySelectorAll(".options button");
    const timerElement = document.getElementById("seconds");
    const submitScoreBtn = document.getElementById("subscore");
    const goAgainBtn = document.getElementById("goAgain");
    let currentQuestionIndex = 0;
    let timeLeft = 60;
    let timerInterval;

    //questions, options, and answers to quiz
    const questions = [
        {
            question: "Who was the DJ that hosted and created the Merry-Go-Round technique at Hip Hop's first party?",
            options: ["DJ Grandmaster Flash", "DJ Funk", "DJ Kool Herc", "DJ Khaled"],
            answer: "DJ Kool Herc"
        },
        {
            question: "What year did this take place?",
            options: ["1967", "1972", "1976", "1981"],
            answer: "1972"
        },
        {
            question: "What borough in New York did this party happen??",
            options: ["South Bronx", "Brooklyn", "Queens", "Manhattan"],
            answer: "South Bronx"
        },
        {
            question: "What style of hip hop dance was created in Chicago?",
            options: ["Waacking", "New Jack", "Locking", "House"],
            answer: "House"
        },

    ];

    function beginQuiz() {
        startBtn.style.display = "none";
        quizContainer.classList.remove("hidden");
        displayQuestion();
        startTimer();
    }

    function displayQuestion() {
        const currentQ = questions[currentQuestionIndex];
        questionElement.textContent = currentQ.question;
        options.forEach((options, index) => {
            options.textContent = currentQ.options[index];
        });

    }

    function startTimer() {
        timerInterval = setInterval(() => {
            timeLeft --;
            timerElement.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                endQuiz();
            }
        }, 1000);
    }

    function checkAnswer(selectedOption) {
        const currentQ = questions[currentQuestionIndex];
        if (selectedOption === currentQ.answer) {
            // correct
            //score ++;
            //document.getElementById("points").textContent = score++;
            //currentQuestionIndex++;
        } else {
            //incorrect
            timeLeft -= 10;
            if (timeLeft < 0) timeLeft = 0;
            timerElement.textContent = timeLeft;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            endQuiz();
        };
    };
    function endQuiz() {
        clearInterval(timerInterval);
        quizContainer.classList.add("hidden");
        scoreContainer.classList.remove("hidden");
    }

    startBtn.addEventListener("click", beginQuiz);

    options.forEach(option => {
        option.addEventListener("click", function() {
            checkAnswer(option.textContent);
        });
    });

    submitScoreBtn.addEventListener("click", function(event) {
        event.preventDefault();
    });

    goAgainBtn.addEventListener("click", function() {
        window.location.reload();
    });

});
