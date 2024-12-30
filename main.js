function addNum(num1, num2) {
    return num1 + num2
}

function subtractNum(num1, num2) {
    return num1 - num2
}

function multiplyNum(num1, num2) {
    return Math.round(num1 * num2, 8)
}

function divideNum(num1, num2) {
    return Math.round(num1 / num2, 8)
}

function exponentNum(num1, num2) {
    return Math.round(num1 ** num2, 8)
}

let num1Current = 0
let num2Current = null
let operatorCurrent = null

function operate(num1, num2, operator) {
    if (operator === "+") {
        return addNum(num1, num2)
    } else if (operator === "-") {
        return subtractNum(num1, num2)
    } else if (operator === "x") {
        return multiplyNum(num1, num2)
    } else if (operator === "/") {
        return divideNum(num1, num2)
    } else if (operator === "^") {
        return exponentNum(num1, num2)
    }
}

let editableDisplay = document.querySelector("#displayCurrentEditable")
let equalBtn = document.querySelector("#btnEquals");
const operatorButtons = document.querySelectorAll(".operatorBtn")
const numButtons = document.querySelectorAll(".numBtn")

let operatorType = null

// declare variable for display value
editableDisplay.textContent = "0"

numButtons.forEach(button => {
    button.addEventListener("click", () => {

        const numValue = button.textContent
        if (!operatorButtons) {
            if (editableDisplay.textContent == "0") {
                editableDisplay.textContent = numValue;
            } else {
                editableDisplay.textContent += numValue;
            }

            // if hasn't picked operator (i.e. filling up num2), update num1
            num1Current = parseFloat(editableDisplay.textContent);
        }
    });
});

// event handler if operator button is clicked
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        operatorType = button.textContent
        
        
    });
});