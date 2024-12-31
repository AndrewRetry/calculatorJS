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

// declare variable for display value
editableDisplay.textContent = "0"

let isResultDisplayed = false

numButtons.forEach(button => {
    button.addEventListener("click", () => {

        const numValue = button.textContent
        
        if (isResultDisplayed && !operatorCurrent) {
            editableDisplay.textContent = numValue; // Start fresh after operator
            num1Current = parseFloat(numValue)
            isResultDisplayed = false
        } else if (editableDisplay.textContent === "0" || isSecondNumberInput){
            editableDisplay.textContent += numValue; // Append digits
            isSecondNumberInput = false
        } else {
            editableDisplay.textContent += numValue
        }

        // Update num1 or num2 based on operator state
        if (!operatorCurrent) {
            num1Current = parseFloat(editableDisplay.textContent);
        } else {
            num2Current = parseFloat(editableDisplay.textContent);
        }
    });
});

let result = null
// event handler if equal button is clicked

equalBtn.addEventListener("click", () => {
    if (num1Current !== null && num2Current !== null && operatorCurrent) {
        result = operate(num1Current, num2Current, operatorCurrent);
        if (isNaN(result) || result === Infinity) {
            editableDisplay.textContent = "Error";
            num1Current = null
        } else {
            editableDisplay.textContent = result
            num1Current = result};
        
        num2Current = null
        operatorCurrent = null
        
    } else if (num1Current !== null && num2Current === null && !operatorCurrent) {
        result = num1Current
        editableDisplay.textContent = result
    }
    isResultDisplayed = true
});

operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (operatorCurrent && num2Current !== null) {
            result = operate(num1Current, num2Current, operatorCurrent)
            if (isNaN(result) || result == Infinity) {
                editableDisplay.textContent = "Error"
                num1Current = null;
                num2Current = null;
                operatorCurrent = null;
                return;
            }
            editableDisplay.textContent = result
            num1Current = result
        } 
        operatorCurrent = button.textContent
        num2Current = null
        isSecondNumberInput = true
    })
})

