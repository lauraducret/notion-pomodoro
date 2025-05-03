let timeLeft = 25 * 60;
let timer;
let isRunning = false;
let isWorkSession = true;

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById("timer").textContent =
        `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    // Update label text and color
    const sessionLabel = document.getElementById("session-label");
    sessionLabel.textContent = isWorkSession ? "Work Session" : "Break Time";
    sessionLabel.classList.toggle("break-mode", !isWorkSession);
}
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                clearInterval(timer);
                isRunning = false;

                // Switch session type
                isWorkSession = !isWorkSession;
                timeLeft = isWorkSession ? 25 * 60 : 5 * 60;
                updateDisplay();

                // Show message
                if (isWorkSession) {
                    alert("Break over! Back to work 💪");
                } else {
                    alert("Work session complete! Time for a 5-minute break 🧘‍♀️");
                }

                // Automatically start next session
                startTimer();
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    isWorkSession = true;
    timeLeft = 25 * 60;
    updateDisplay();
}

updateDisplay(); // Initialize
