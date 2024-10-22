let counter = 0;
const maxLimit = 10; 

const counterDisplay = document.getElementById('counter');
const increaseBtn = document.getElementById('increase-btn');
const decreaseBtn = document.getElementById("decrease-btn");
const resetBtn = document.getElementById("reset-btn");
resetBtn.addEventListener("click", resertCounter);

function increaseCounter() {
    if (counter <maxLimit) {
        counter++;
        updateCounterDisplay();
  } else {
    alert("You have reached your limit");
  }
}

function decreaseCounter() {
    if (counter > 0) {
        counter--;
        updateCounterDisplay();
    } else {
        alert("Cannot go below zero")
    }
}
function updateCounterDisplay() {
    document.getElementById("counter").textContent = counter;
}
function updateCounter(){
    updateDisplay.textContent = counter;
}

function resertCounter() {
    counter = 0;
    updateCounterDisplay();
}

document.getElementById("increase-btn").addEventListener("click", increaseCounter);
document.getElementById("decrease-btn").addEventListener("click", decreaseCounter);

document.addEventListener("keydown", function(Event) {
    if (Event.key === "+") {
        increaseCounter();
    } else if (Event.key === "-") {
        decreaseCounter();
    }
    });

increaseBtn.addEventListener("click", function (){
    if (counter < maxLimite) {
        counter++;
        updateCounter();
    } else {
        alert('You have reached your limit');
    }
});

decreaseBtn.addEventListener("click", function (){
    if (counter > 0) {
        counter--;
        updateCounter();
    }
});

resetBtn.addEventListener("click", function (){
    counter = 0;
    updateCounter();
});



    

