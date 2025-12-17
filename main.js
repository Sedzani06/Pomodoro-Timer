// Get references to the HTML elements we need to manipulate
const timerLabel = document.getElementById('timer-label');//Heading showing "work Timer" or "Break Time"
const minutesDisplay = document.getElementById('minutes');//Minutes part of timer
const secondsDisplay = document.getElementById('seconds');//Seconds part of the timer
const progressBar = document.querySelector('.progress-bar');//Progress bar element
const startButton = document.getElementById('start');//"Start/Pause" buttton
const resetButton = document.getElementById('reset');//"Reset" button

// Define the work and break durations in minutes
const workDuration = 25;//25 minutes of work
const breakDuration = 5;//5 minutes of break

//Timer variables
let currentDuration = workDuration * 60; // Convert to seconds
let isWorkTime = true; // Boolean Flag to track if it's work or break time(true = work, false =break)
let timerInterval; // Variable to hold the interval for the timer
let isRunning = false; // Flag to check if the timer is currently running

// Function to update the timer display on screen
function updateDisplay() {
    const minutes = Math.floor(currentDuration / 60); // Calculate remaining minutes
    const seconds = currentDuration % 60; // Calculate remaining seconds

    //Update the screen with formatted time(always 2 digits)
    minutesDisplay.textContent = String(minutes).padStart(2, '0'); // Display minutes with leading zero if needed
    secondsDisplay.textContent = String(seconds).padStart(2, '0'); // Display seconds with leading zero if needed

    // calculate and Update the progress bar
    const totalDuration = isWorkTime ? workDuration * 60 : breakDuration * 60;
    const progress = ((totalDuration - currentDuration) / totalDuration) * 100;
    progressBar.style.width = `${progress}%`;//set width based on progress
}

// Function to start or pause the timer
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startButton.textContent = 'Pause'; // Change button text to "Pause"

        //Start interval to count down every second
        timerInterval = setInterval(() => {
            currentDuration--; // Decrement the timer (subtract 1 second)

            if (currentDuration < 0) {
                //Time's up - switch between work and break session
                clearInterval(timerInterval);
                isWorkTime = !isWorkTime;//toggle session
                currentDuration = (isWorkTime ? workDuration : breakDuration) * 60;
                timerLabel.textContent = isWorkTime ? 'Work Time' : 'Break Time';
                updateDisplay(); // Update display for the new session (refresh the timer)
                startTimer(); // Automatically start the next session
            } else {
                updateDisplay(); // Update the display every second
            }
        }, 1000); // Run the update every 1000 milliseconds (1 second)
    } else {
        // Pause the timer if already running
        clearInterval(timerInterval);
        isRunning = false;
        startButton.textContent = 'Start'; // Change button text back to "Start"
    }
}

// Function to reset everything to default work time 
function resetTimer() {
    clearInterval(timerInterval); // Clear any running interval ( stop timer)
    isRunning = false; // Set the running state to false ( mark as not running)
    startButton.textContent = 'Start'; // Reset button text
    isWorkTime = true; // Reset to work time
    currentDuration = workDuration * 60; // Reset the time to full 25 minutes
    timerLabel.textContent = 'Work Time'; // Reset the label
    updateDisplay(); // Update the display to the initial work time
    progressBar.style.width = '0%'; // Reset the progress bar
}

// Connect buttons to their functions
startButton.addEventListener('click', startTimer);//Start or pause
resetButton.addEventListener('click', resetTimer);//Reset

// Initial display update when the page loads
updateDisplay();