// ===================================
// ELEMENT QUIZ JAVASCRIPT
// ===================================

// Get all the elements we need from the page
const questionEl = document.getElementById('question');
const optionButtons = document.querySelectorAll('.option-btn');
const feedbackEl = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const scoreEl = document.getElementById('score');
const totalEl = document.getElementById('total');
const currentQuestionEl = document.getElementById('current-question');

// Quiz state
let elements = [];
let currentQuestion = 0;
let score = 0;
let totalQuestions = 10;
let usedElements = [];
let correctAnswer = '';

// Load elements data
fetch('elements-data.json')
    .then(response => response.json())
    .then(data => {
        elements = data;
        startQuiz();
    })
    .catch(error => {
        questionEl.textContent = 'Error loading quiz. Please refresh the page.';
        console.error('Error:', error);
    });

// Start the quiz
function startQuiz() {
    currentQuestion = 0;
    score = 0;
    usedElements = [];
    updateScore();
    loadQuestion();
}

// Load a new question
function loadQuestion() {
    // Clear feedback
    feedbackEl.className = 'feedback hidden';
    feedbackEl.textContent = '';
    
    // Hide next button
    nextBtn.classList.add('hidden');
    
    // Update question number
    currentQuestionEl.textContent = currentQuestion + 1;
    
    // Get a random element that hasn't been used
    let randomElement;
    do {
        randomElement = elements[Math.floor(Math.random() * elements.length)];
    } while (usedElements.includes(randomElement.atomicNumber) && usedElements.length < elements.length);
    
    usedElements.push(randomElement.atomicNumber);
    
    // Set the question
    questionEl.textContent = `What is the symbol for ${randomElement.name}?`;
    correctAnswer = randomElement.symbol;
    
    // Generate answer options (1 correct + 3 wrong)
    const options = generateOptions(randomElement);

    // Get the current buttons from the page
    const currentButtons = document.querySelectorAll('.option-btn');
    
    // Assign options to buttons
    currentButtons.forEach((button, index) => {
        button.textContent = options[index];
        button.disabled = false;
        button.className = 'option-btn';
        
        // Remove old event listeners by cloning
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
    });
    
    // Add new event listeners
    document.querySelectorAll('.option-btn').forEach(button => {
        button.addEventListener('click', checkAnswer);
    });
}

// Generate answer options
function generateOptions(correctElement) {
    const options = [correctElement.symbol];
    
    // Get 3 random wrong answers
    while (options.length < 4) {
        const randomEl = elements[Math.floor(Math.random() * elements.length)];
        if (!options.includes(randomEl.symbol)) {
            options.push(randomEl.symbol);
        }
    }
    
    // Shuffle the options
    return options.sort(() => Math.random() - 0.5);
}

// Check the answer
function checkAnswer(e) {
    const selectedAnswer = e.target.textContent;
    
    // Disable all buttons
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.disabled = true;
        
        // Highlight correct answer
        if (btn.textContent === correctAnswer) {
            btn.classList.add('correct');
        }
        
        // Highlight wrong answer if selected
        if (btn === e.target && selectedAnswer !== correctAnswer) {
            btn.classList.add('incorrect');
        }
    });
    
    // Show feedback
    if (selectedAnswer === correctAnswer) {
        score++;
        updateScore();
        feedbackEl.textContent = '✅ Correct!';
        feedbackEl.className = 'feedback correct';
    } else {
        feedbackEl.textContent = `❌ Wrong! The correct answer is ${correctAnswer}`;
        feedbackEl.className = 'feedback incorrect';
    }
    
    // Show next button or restart button
    currentQuestion++;
    if (currentQuestion < totalQuestions) {
        nextBtn.classList.remove('hidden');
    } else {
        showFinalScore();
    }
}

// Update score display
function updateScore() {
    scoreEl.textContent = score;
    totalEl.textContent = totalQuestions;
}

// Show final score
function showFinalScore() {
    questionEl.textContent = `Quiz Complete! 🎉`;
    
    const percentage = Math.round((score / totalQuestions) * 100);
    let message = '';
    
    if (percentage === 100) {
        message = 'Perfect score! You\'re an element expert! 🏆';
    } else if (percentage >= 80) {
        message = 'Excellent work! 🌟';
    } else if (percentage >= 60) {
        message = 'Good job! Keep learning! 💪';
    } else {
        message = 'Keep practicing! You\'ll get better! 📚';
    }
    
    feedbackEl.textContent = `You scored ${score} out of ${totalQuestions}! ${message}`;
    feedbackEl.className = 'feedback correct';
    
    restartBtn.classList.remove('hidden');
}

// Next button event
nextBtn.addEventListener('click', loadQuestion);

// Restart button event
restartBtn.addEventListener('click', () => {
    restartBtn.classList.add('hidden');
    startQuiz();
});