// element selecting


let controls = document.querySelector(".controls");
let time = document.querySelector(".time");
let focusedSessionsDisplay = document.querySelector("#focusSessions");

// states
let timeLeft = 25*60;
let currentMode = "focus";
let currentStatus = "stopped";
let timerId = null;
let focusedSessions = Number(localStorage.getItem('focusSessions')) || 0;

// logic
controls.addEventListener("click", (e)=>{
    let target = e.target;

    if(target.classList.contains("btn-start")){
        startTimer();
    }

    if(target.classList.contains("btn-reset")){
       resetTimer();
    }

    if(target.classList.contains("btn-pause")){
       pauseTimer();
    }

    if(target.classList.contains("btn-resume")){
       resumeTimer();
    }
})

function startTimer(){
    clearInterval(timerId);
    updateDisplay(timeLeft);
    currentStatus = "running";
    timerId = setInterval(() => {
        timeLeft--;
        if(timeLeft === 0){
            pauseTimer();
            if(currentMode === "focus"){
                focusedSessions++;
                localStorage.setItem("focusSessions", focusedSessions);
               updateFocusSessions();
                timeLeft = 5*60;
                currentMode = "break";
            }else if(currentMode === "break"){
                timeLeft = 25*60;
                currentMode = "focus";
            }
        }
       updateDisplay(timeLeft);
    }, 1000);
}

function resetTimer(){
    clearInterval(timerId);
    timerId = null;
    timeLeft = 25*60;
    currentMode = "focus";
    currentStatus = "stopped"
    updateDisplay(timeLeft)
}

function pauseTimer(){
    currentStatus = "paused"
    clearInterval(timerId);
}

function resumeTimer(){
    if(currentStatus === "paused"){
        startTimer();
    }
}

function updateDisplay(timeLeft){
     let min = timeLeft/60;
let sec = timeLeft % 60;
        time.textContent = `${Math.floor(min)} : ${String(sec).padStart(2, "0")}`
        console.log(timeLeft, min, sec);
}

function updateFocusSessions(){
    if(focusedSessionsDisplay){
        focusedSessionsDisplay.textContent = focusedSessions;
    }
}





