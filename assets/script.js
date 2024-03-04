document.addEventListener("DOMContentLoaded", function () {
    const startBtn = document.getElementById("btn");
    const quizContainer = document.querySelector(".quiz");
    const scoreContainer = document.querySelector(".scores");
    const questionElement = document.querySelector(".questions");
    const options = document.querySelectorAll(".options button");
    const timerElement = document.getElementById("seconds");
    const submitScoreBtn = document.getElementById("subscore");
    const goAgainBtn = document.getElementById("goAgain");
    const clearHistory = document.getElementById("clearHistory")
    let currentQuestionIndex = 0;
    let timeLeft = 60;
    let timerInterval;
    let score = 0;

    const userScores = JSON.parse(localStorage.getItem("userScores"))|| [];

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
        {
            question: "What famous TV gave hip hop a platform to become mainstream?",
            options: ["Bandstand", "Run's House", "House Party", "Soul Train"],
            answer: "Soul Train"
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
            timeLeft--;
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
            //correct
            score++;
            document.getElementById("points").textContent = score++;
        } else {
            //incorrect
            timeLeft -= 10;
            if (timeLeft < 0) timeLeft = 0;
            timerElement.textContent = timeLeft;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {

            displayQuestion();
        }

    };
    function endQuiz() {
        clearInterval(timerInterval);
        quizContainer.classList.add("hidden");
        scoreContainer.classList.remove("hidden");
    }

    startBtn.addEventListener("click", beginQuiz);

    options.forEach(option => {
        option.addEventListener("click", function () {
            if (currentQuestionIndex < questions.length) {
                checkAnswer(option.textContent);
            }
            else {
                endQuiz();
            }
        });
    });
    function scoreHistory() {
        let list = document.getElementById ("list")
        list.textContent = ""
        for (i=0; i<userScores.length; i ++) {
            var li = document.createElement ("li")
            li.textContent = userScores[i].initial+" "+userScores[i].score
            list.appendChild(li)
        }
    };

    scoreHistory()

    submitScoreBtn.addEventListener("click", function (event) {
        event.preventDefault();
        userScores.push({
            initial:document.getElementById("name").value,
            score:score
        })
        localStorage.setItem("userScores", JSON.stringify(userScores))
        scoreHistory()
    });

    goAgainBtn.addEventListener("click", function () {
        window.location.reload();
    });

    clearHistory.addEventListener("click", function () {
        localStorage.clear()
        let list = document.getElementById ("list")
        list.textContent = ""
    })


});
