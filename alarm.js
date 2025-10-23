// Get elements
var clockDisplay = document.getElementById("clock-display");
var alarmTimeInput = document.getElementById("alarm-time");
var setAlarmBtn = document.getElementById("set-alarm");
const progressCircle = document.getElementById("progress-circle");

const totalLength = 690; // Circumference for strokeDashoffset animation

// Initialize variables
var alarmTime = null;
var alarmStartTime = null;
var alarmEndTime = null;

// Style setup for progress circle
progressCircle.style.stroke = "#e71c8fff";
progressCircle.style.strokeWidth = "6";
progressCircle.style.fill = "none";
progressCircle.style.strokeDasharray = totalLength;
progressCircle.style.strokeDashoffset = totalLength;
progressCircle.style.transition = "stroke-dashoffset 0.5s linear";

// Function to calculate the full alarm Date object
function getAlarmDate(alarmTimeStr) {
  const n = new Date();
  const [hours, minutes] = alarmTimeStr.split(":").map(Number);
  const alarmDate = new Date(n.getFullYear(), n.getMonth(), n.getDate(), hours, minutes, 0);
  if (alarmDate < n) alarmDate.setDate(alarmDate.getDate() + 1); // next day if past
  return alarmDate;
}

// Function to update clock every second
function updateClock() {
  const now = new Date();

  const rawHours = now.getHours() % 12;
  const hours = String(rawHours).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  // Update digital clock display
  clockDisplay.textContent = `${hours}:${minutes}:${seconds}`;

  // Rotate hands
  const hourDeg = (rawHours * 30) + (now.getMinutes() / 2);
  const minuteDeg = (now.getMinutes() * 6) + (now.getSeconds() / 10);
  const secondDeg = now.getSeconds() * 6;

  document.querySelector("#handH").style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
  document.querySelector("#handM").style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
  document.querySelector("#handS").style.transform = `translateX(-50%) rotate(${secondDeg}deg)`;

  // Alarm check
  if (alarmTime && now >= alarmEndTime) {
    alert("⏰ Alarm ringing!");
    alarmTime = null;
    alarmStartTime = null;
    alarmEndTime = null;
    progressCircle.style.strokeDashoffset = totalLength; // reset progress
  }

  // Progress ring update
  if (alarmStartTime && alarmEndTime) {
    const totalDuration = (alarmEndTime - alarmStartTime) / 1000;
    const elapsed = (now - alarmStartTime) / 1000;
    const progress = Math.min((elapsed / totalDuration) * totalLength, totalLength);
    progressCircle.style.strokeDashoffset = totalLength - progress;
  } else {
    progressCircle.style.strokeDashoffset = totalLength;
  }
}

// Event listener for setting alarm
setAlarmBtn.addEventListener("click", function () {
  if (alarmTimeInput.value) {
    alarmTime = alarmTimeInput.value;
    alarmStartTime = new Date();
    alarmEndTime = getAlarmDate(alarmTime);
    alert(`✅ Alarm set for ${alarmTime}`);
  } else {
    alert("⚠️ Please select a valid time!");
  }
});

// Start clock
setInterval(updateClock, 1000);
updateClock();
