var startButton = document.getElementById("startButton");
var quiz = document.getElementById("quiz");
var result = document.getElementById("result");
var questionText = document.getElementById("questionText");
var choicesContainer = document.getElementById("choices");
var scoreDisplay = document.getElementById("score");
var initialsInput = document.getElementById("initials");
var saveButton = document.getElementById("saveButton");
var timerDisplay = document.getElementById("timerDisplay");

var currentQuestionIndex = 0;
var timeLeft = 60;
var score = 0;
var timer;

var questions = [
    {
        question: "What is HTML?",
        choices: [
            "Hypertext Markup Language",
            "Hyperlink and Text Markup Language",
            "High Tech Markup Language",
            "Hypertext Transfer Language"
        ],
        correct: 0
    },
    {
        question: "What is CSS?",
        choices: [
            "Cascading Style Sheet",
            "Computer Style Sheet",
            "Colorful Style Sheet",
            "Cascading Source Sheet"
        ],
        correct: 0
    },
    {
        question: "What is JavaScript?",
        choices: [
            "A coffee brand",
            "A programming language",
            "A type of dessert",
            "A movie title"
        ],
        correct: 1
    },
    {
        question: "Which programming language is known as the 'mother of all languages'?",
        choices: [
            "Python",
            "Java",
            "COBOL",
            "Assembly"
        ],
        correct: 2
    },
    {
        question: "What does CSS stand for?",
        choices: [
            "Cascading Style Sheet",
            "Computer Style Sheet",
            "Colorful Style Sheet",
            "Cascading Sheet Style"
        ],
        correct: 0
    },
    {
        question: "Which of the following is not a JavaScript framework or library?",
        choices: [
            "React",
            "Angular",
            "Vue",
            "JavaFX"
        ],
        correct: 3
    },
    {
        question: "What does the 'WWW' in a website URL stand for?",
        choices: [
            "World Wide Web",
            "Web World Wide",
            "Wide World Web",
            "World Web Wide"
        ],
        correct: 0
    },
    {
        question: "Which HTML element is used to define an unordered list?",
        choices: [
            "<ul>",
            "<ol>",
            "<li>",
            "<dl>"
        ],
        correct: 0
    },
    {
        question: "In CSS, what property is used to control the spacing between lines of text?",
        choices: [
            "margin",
            "padding",
            "line-height",
            "font-spacing"
        ],
        correct: 2
    },
    {
        question: "What does 'DOM' stand for in the context of web development?",
        choices: [
            "Document Object Model",
            "Data Object Model",
            "Dynamic Object Model",
            "Digital Object Model"
        ],
        correct: 0
    },
    {
        question: "Which of the following is not a valid JavaScript variable name?",
        choices: [
            "myVariable",
            "123variable",
            "_variable",
            "$variable"
        ],
        correct: 1
    },
    {
        question: "What is the purpose of the 'alt' attribute in an HTML <img> tag?",
        choices: [
            "It specifies the image's width",
            "It provides alternative text for the image",
            "It specifies the image's alignment",
            "It defines the image's source URL"
        ],
        correct: 1
    },
    {
        question: "Which of the following is a correct way to comment out multiple lines in JavaScript?",
        choices: [
            "// This is a comment",
            "/* This is a comment */",
            "# This is a comment",
            "' This is a comment"
        ],
        correct: 1
    },
    {
        question: "What is the largest heading tag in HTML?",
        choices: [
            "<h1>",
            "<h2>",
            "<h3>",
            "<h4>"
        ],
        correct: 0
    },
    {
        question: "What does the 'href' attribute in an HTML <a> tag specify?",
        choices: [
            "The link's text",
            "The link's target location",
            "The link's color",
            "The link's font size"
        ],
        correct: 1
    },
    {
        question: "Which CSS property is used to add shadow to elements?",
        choices: [
            "box-shadow",
            "element-shadow",
            "shadow-effect",
            "text-shadow"
        ],
        correct: 0
    },
    {
        question: "What is the primary purpose of a function in JavaScript?",
        choices: [
            "To display images",
            "To define CSS styles",
            "To perform a specific task or calculation",
            "To create HTML elements"
        ],
        correct: 2
    },
    {
        question: "Which symbol is used for single-line comments in JavaScript?",
        choices: [
            "//",
            "/*",
            "#",
            "--"
        ],
        correct: 0
    },
    {
        question: "In CSS, what property is used to change the color of text?",
        choices: [
            "text-color",
            "color",
            "text-style",
            "font-color"
        ],
        correct: 1
    }
];

function updateTimerDisplay() {
    timerDisplay.textContent = timeLeft;
}

function startQuiz() {
    startButton.style.display = "none";
    quiz.style.display = "block";
    displayQuestion();
    startTimer();
}

function displayQuestion() {
    if (currentQuestionIndex < questions.length) {
        var question = questions[currentQuestionIndex];
        questionText.textContent = question.question;
        choicesContainer.innerHTML = "";
        
        question.choices.forEach(function (choice, index) {
            var choiceButton = document.createElement("button");
            choiceButton.textContent = choice;
            choiceButton.addEventListener("click", function () {
                checkAnswer(index);
            });
            choicesContainer.appendChild(choiceButton);
        });
    } else {
        endQuiz();
    }
}

function checkAnswer(selectedIndex) {
    var currentQuestion = questions[currentQuestionIndex];

    if (selectedIndex === currentQuestion.correct) {
        score += 10;
    } else {
        timeLeft -= 10;
    }

    currentQuestionIndex++;
    displayQuestion();
}

function startTimer() {
    timer = setInterval(function () {
        timeLeft--;
        if (timeLeft <= 0) {
            endQuiz();
        }
        updateTimerDisplay();
    }, 1000);
}

function endQuiz() {
    clearInterval(timer);
    quiz.style.display = "none";
    result.style.display = "block";
    scoreDisplay.textContent = score;
}

saveButton.addEventListener("click", function () {
    var initials = initialsInput.value;
    // Save the initials and score in local storage
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push({ initials: initials, score: score });
    localStorage.setItem("highScores", JSON.stringify(highScores));

    alert("Score saved!");
});

startButton.addEventListener("click", startQuiz);