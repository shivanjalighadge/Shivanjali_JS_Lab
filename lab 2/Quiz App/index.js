class Quiz {
    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.currentQuestionIndex = 0;
    }

    get currentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }

    answerQuestion(answer) {
        if (this.currentQuestion.isCorrect(answer)) {
            this.score++;
        }
        this.moveToNextQuestion();
    }

    moveToNextQuestion() {
        this.currentQuestionIndex++;
    }

    isEnded() {
        return this.currentQuestionIndex === this.questions.length;
    }

    getScore() {
        return this.score;
    }

    getPercentage() {
        return (this.score / this.questions.length) * 100;
    }
}

class Question {
    constructor(text, options, correctOptionIndex) {
        this.text = text;
        this.options = options;
        this.correctOptionIndex = correctOptionIndex;
    }

    isCorrect(answerIndex) {
        return answerIndex === this.correctOptionIndex;
    }
}

class QuizUI {
    constructor(quiz) {
        this.quiz = quiz;
        this.quizElem = document.getElementById("quiz");
        this.questionElem = document.getElementById("question");
        this.progressElem = document.getElementById("progress");
        this.attachButtonListeners();
        this.displayQuestion();
    }

    displayQuestion() {
        if (this.quiz.isEnded()) {
            this.showScores();
        } else {
            const question = this.quiz.currentQuestion;
            this.questionElem.innerText = question.text;
            this.displayOptions(question.options);
            this.showProgress();
        }
    }

    displayOptions(options) {
        const choices = Array.from(this.quizElem.querySelectorAll(".buttons button span"));
        choices.forEach((choiceElem, index) => {
            choiceElem.innerText = options[index];
        });
    }

    showProgress() {
        this.progressElem.innerText = `Question ${this.quiz.currentQuestionIndex + 1} of ${this.quiz.questions.length}`;
    }

    attachButtonListeners() {
        const buttons = Array.from(this.quizElem.querySelectorAll(".buttons button"));
        buttons.forEach((button, index) => {
            button.addEventListener("click", () => {
                this.quiz.answerQuestion(index);
                this.displayQuestion();
            });
        });
    }

    showScores() {
        const result = `
            <h1>Result</h1>
            <h2 id="score">Thank you! Here are your results: <br>
            Score: ${this.quiz.getScore()}/${this.quiz.questions.length} <br>
            Marks percentage: ${this.quiz.getPercentage()}%
            </h2>`;
        this.quizElem.innerHTML = result;
    }
}

const questions = [
    new Question("In CSS, which property is used to change the color of text?",
                ["background-colour", "text-colour", "colour", "font-colour"],
                2),
    new Question("Which keyword is used to define a class in Java?",
                ["class", "void", "int", "new"],
                0),
    new Question("What is the purpose of SQL 'INSERT INTO' statement?",
                ["To delete data from a table", "To update existing data", "To add new data into a table", "To select data from a table"],
                2),
    new Question("What is the result of 5 + 7 * 2 in most programming languages?",
                ["24", "19", "26", "21"],
                1),
    new Question("What does CSS stand for?",
                ["Cascading Style Sheets", "Creative Style Syntax", "Colorful Style System", "Computer Style Sheets"],
                0)
];

const quiz = new Quiz(questions);
const quizUI = new QuizUI(quiz);
