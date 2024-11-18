// Select the elements that will toggle mode
const themeToggleBtn = document.getElementById("theme-toggle");
const body = document.body;
const appTitle = document.getElementById("app-title");
let timerInterval; // Interval reference
let totalFocusTime = 0; // Total focus time in seconds
let focusSessions = 0; // Number of completed focus sessions

// Add event listener for mode switching
themeToggleBtn.addEventListener("click", () => {
  if (body.classList.contains("minimalist")) {
    // Switch to engaging mode
    body.classList.remove("minimalist");
    body.classList.add("engaging");

    // Update button text
    themeToggleBtn.textContent = "Switch to Minimalist Mode";
  } else {
    // Switch to minimalist mode
    body.classList.remove("engaging");
    body.classList.add("minimalist");

    // Update button text
    themeToggleBtn.textContent = "Switch to Engaging Mode";
  }
});

// Timer functionality
document.getElementById("start-timer").addEventListener("click", () => {
  const timeDisplay = document.getElementById("time-display");
  let time = 0;

  // Clear any existing timer
  clearInterval(timerInterval);

  // Start the timer
  timerInterval = setInterval(() => {
    time++;
    timeDisplay.textContent = formatTime(time);
  }, 1000);
});

document.getElementById("reset-timer").addEventListener("click", () => {
  clearInterval(timerInterval);
  const timeDisplay = document.getElementById("time-display");
  const focusSessionsEl = document.getElementById("focus-sessions");
  const focusTimeEl = document.getElementById("focus-time");

  // Update session and total focus time only if the timer ran
  if (timeDisplay.textContent !== "00:00") {
    focusSessions++;
    totalFocusTime += parseTime(timeDisplay.textContent);

    // Update displayed focus session and time
    focusSessionsEl.textContent = focusSessions;
    focusTimeEl.textContent = formatTime(totalFocusTime);
  }

  // Reset the timer display
  timeDisplay.textContent = "00:00";
  addPoints(10); // Add points for completing the session
});

// Helper to format time in HH:MM:SS
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const remainingSeconds = seconds % 60;

  return `${String(hours).padStart(2, "0")}:${String(remainingMinutes).padStart(
    2,
    "0"
  )}:${String(remainingSeconds).padStart(2, "0")}`;
}

// Helper to parse time from HH:MM:SS
function parseTime(timeString) {
  const [hours, minutes, seconds] = timeString.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

// Points functionality (Gamification)
let points = 0; // User's points

// Function to add points and update the points display
function addPoints(pointsToAdd) {
  points += pointsToAdd;
  document.getElementById("points").textContent = `Points: ${points}`;
}

// Confetti Animation
function startConfetti() {
  const confettiContainer = document.getElementById("confetti-container");
  confettiContainer.style.display = "block";

  for (let i = 0; i < 100; i++) {
    const confettiPiece = document.createElement("div");
    confettiPiece.classList.add("confetti-piece");
    confettiPiece.style.left = `${Math.random() * 100}%`;
    confettiPiece.style.animationDuration = `${Math.random() * 3 + 2}s`; // Random animation time
    confettiContainer.appendChild(confettiPiece);
  }

  setTimeout(() => {
    confettiContainer.style.display = "none";
    confettiContainer.innerHTML = "";
  }, 5000); // Remove confetti after 5 seconds
}

// Achievements System (Unlocking achievements)
let achievements = [];
function unlockAchievement(achievement) {
  if (!achievements.includes(achievement)) {
    achievements.push(achievement);
    const achievementList = document.getElementById("achievements-list");
    const listItem = document.createElement("li");
    listItem.textContent = achievement;
    achievementList.appendChild(listItem);
  }
}

// Example: Unlock achievement when completing 5 focus sessions
document.getElementById("reset-timer").addEventListener("click", () => {
  if (focusSessions === 5) {
    unlockAchievement("Completed 5 focus sessions!");
  }
});

// Task List Functionality
const taskInput = document.getElementById("new-task");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

// Function to add a new task
function addTask() {
  const task = taskInput.value.trim();

  // Ensure the task is not empty
  if (task !== "") {
    const taskItem = document.createElement("li");
    taskItem.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );

    taskItem.textContent = task;

    // Create a delete button for each task
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-danger", "btn-sm");
    deleteButton.textContent = "Delete";

    // Append delete button to the task item
    taskItem.appendChild(deleteButton);

    // Append the new task to the task list
    taskList.appendChild(taskItem);

    // Clear the input field
    taskInput.value = "";

    // Add event listener to delete the task when the delete button is clicked
    deleteButton.addEventListener("click", () => {
      taskItem.remove();
    });
  } else {
    taskInput.placeholder = "Please enter a task!";
  }
}

// Add event listener to the "Add Task" button
addTaskButton.addEventListener("click", addTask);

// Allow pressing Enter to add the task
taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});
