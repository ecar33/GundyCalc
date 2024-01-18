const calcKeys = Array.from(document.querySelectorAll('button'))
const userInput = document.querySelector('.user-input')
const result = document.querySelector('.result')
const operatorInput = document.querySelector('.operator-input')
const allClearKey = document.querySelector('.allclear')
const clearKey = document.querySelector('.clear')
let previousUserInput = '';
let isEqualsPressed = false;
let isDecimalPressed = false;
const memoryRecallKey = document.querySelector('#memory-recall')
const memoryStoreKey = document.querySelector('#memory-store')
const memoryClearKey = document.querySelector('#memory-clear')

let memoryValue = ''


allClearKey.addEventListener("click", () => {
    reset()
})

clearKey.addEventListener("click", () => {
    backspace()
})

memoryStoreKey.addEventListener("click", () => {
    memoryStore()
})

memoryRecallKey.addEventListener("click", () => {
    memoryRecall()
})

memoryClearKey.addEventListener("click", () => {
    memoryClear()
})


// Add .shrink to each button
calcKeys.forEach((button) => {
    button.classList.add("shrink-on-hover");
    button.addEventListener("click", (event) => {
        updateDisplay(event)
    })
});

function updateDisplay(event) {
    let key = event.target;
    let keyValue = event.target.value;
    const { type } = key.dataset;

    if (!isEqualsPressed) {
        if (type === "number") {
            userInput.textContent += keyValue;
        }
        else if (type === "operator") {
            operatorInput.textContent = keyValue;
            previousUserInput = userInput.textContent;
            userInput.textContent = '';
        }
        else if (type === "equal") {
            result.textContent = roundToTwoDecimalPlaces(compute(Number(previousUserInput), Number(userInput.textContent), operatorInput.textContent));
            isEqualsPressed = true;
        }
        else if (type === "decimal") {
            if (!isDecimalPressed) {
                userInput.textContent += keyValue;
                isDecimalPressed = true;
            }
        }
    }
}

function memoryStore() {
    if (result.textContent !== '\xa0') {
        memoryValue = result.textContent
    }
}

function memoryRecall() {
    if (memoryValue) {
        userInput.textContent = memoryValue;
    }
}

function memoryClear() {
    if (memoryClear) {
        memoryValue = '';
    }
}


function compute(x, y, operator) {
    switch (operator) {
        case '+':
            return x + y
        case '/':
            return x / y
        case '-':
            return x - y
        case '*':
            return x * y
    }
}

function reset() {
    operatorInput.textContent = '';
    userInput.textContent = '\xa0';
    result.textContent = '\xa0';
    previousUserInput = '';
    isEqualsPressed = false;
    isDecimalPressed = false;

}

function backspace() {
    userInput.textContent = userInput.textContent.slice(0, userInput.textContent.length - 1)
}

function roundToTwoDecimalPlaces(num) {
    if (num % 1 != 0) return (Math.round(num * 100) / 100).toFixed(2)
    else return num

}