function addNum(num1, num2) {
    return Math.round((num1 + num2) * 1e8 ) / 1e8;
}

function subtractNum(num1, num2) {
    return Math.round((num1 - num2) * 1e8 ) / 1e8;
}

function multiplyNum(num1, num2) {
    return Math.round((num1 * num2) * 1e8 ) / 1e8;
}

function divideNum(num1, num2) {
    return Math.round((num1 / num2) * 1e8 ) / 1e8;
}

function exponentNum(num1, num2) {
    return Math.round((num1 ** num2) * 1e8 ) / 1e8;
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

function updateClearBtn() {
    if (editableDisplay.textContent === "0") {
        clearBtn.textContent = "C" // Full Reset
    } else {
        clearBtn.textContent = "CE" // Clear Current Entry (clear currentEditable)
    }
}
let editableDisplay = document.querySelector("#displayCurrentEditable")
let displayCurrent = document.querySelector("#displayCurrent")

let equalBtn = document.querySelector("#btnEquals");
let clearBtn = document.querySelector("#btnClear")
const operatorButtons = document.querySelectorAll(".operatorBtn")
const numButtons = document.querySelectorAll(".numBtn")

// declare variable for display value
editableDisplay.textContent = "0"

let isResultDisplayed = false
function hasDecimal(string) {
    return string.includes(".")
}

numButtons.forEach(button => {
    button.addEventListener("click", () => {

        const numValue = button.textContent
        
        if (isResultDisplayed && !operatorCurrent) {
            editableDisplay.textContent = numValue; // Start fresh after operator
            num1Current = parseFloat(numValue)
            isResultDisplayed = false
        } else if (editableDisplay.textContent === "0" || isSecondNumberInput){
            editableDisplay.textContent = numValue; // Append digits
            isSecondNumberInput = false
        } else {
            if ((hasDecimal(editableDisplay.textContent) && numValue !== ".") || (!hasDecimal(editableDisplay.textContent))) {
                editableDisplay.textContent += numValue
            }
            if (!isResultDisplayed) {
                displayCurrent.textContent = ``
            }
        }

        // Update num1 or num2 based on operator state
        if (!operatorCurrent) {
            num1Current = parseFloat(editableDisplay.textContent);
        } else {
            num2Current = parseFloat(editableDisplay.textContent);
        }


        updateClearBtn();
    });
});

let result = null
// event handler if equal button is clicked

equalBtn.addEventListener("click", () => {
    if (num1Current !== null && num2Current !== null && operatorCurrent) {
        // Perform the operation when all values are present
        result = operate(num1Current, num2Current, operatorCurrent);
        displayCurrent.textContent = `${num1Current} ${operatorCurrent} ${num2Current} = `;
        if (isNaN(result) || result === Infinity) {
            editableDisplay.textContent = "Error";
            num1Current = null;
            num2Current = null;
            operatorCurrent = null;
            isSecondNumberInput = false;
            isResultDisplayed = false;
            return;
        } else {
            editableDisplay.textContent = result
            num1Current = result
        };
        

    } else if (num1Current !== null && num2Current === null){
        if (!operatorCurrent) {
            // No operator selected, display num1Current
            result = num1Current
            editableDisplay.textContent = result
            displayCurrent.textContent = `${result} = `
        } else {
            // If operator exists but num2Current is null, assume num2Current = num1Current
            num2Current = num1Current
            result = operate(num1Current, num2Current, operatorCurrent)
            displayCurrent.textContent = `${num1Current} ${operatorCurrent} ${num2Current} = `;
            editableDisplay.textContent = result
            num1Current = result;
        }
    }
    num2Current = null;
    operatorCurrent = null;
    isResultDisplayed = true;
    updateClearBtn();
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
        displayCurrent.textContent = `${num1Current} ${operatorCurrent}`
        updateClearBtn();
    })
})

clearBtn.addEventListener("click", () => {
    if (displayCurrent.textContent.includes("=") || editableDisplay.textContent === "0") {
        // Full Clear (C): Clear all states and displays
        displayCurrent.textContent = ``
        editableDisplay.textContent = "0"
        num1Current = null
        num2Current = null
        operatorCurrent = null
        isSecondNumberInput = false
        isResultDisplayed = false
    } else {
        // Clear Entry (CE): Only clear the current editable display
        editableDisplay.textContent = "0"
        if (isSecondNumberInput) {
            num2Current = null
        } else {
            num1Current = null
        }
    }

    updateClearBtn();
})

const undoBtn = document.querySelector("#btnUndo")

function removeLastLetter(string) {
    if (string.length > 1) return string.slice(0,-1);
    else return "0";
}

undoBtn.addEventListener("click", () => {
    if (isResultDisplayed) {
        displayCurrent.textContent = ``
        num1Current = result
    } else {
        //
        if (num1Current && operatorCurrent) {
            if(num2Current) {
                editableDisplay.textContent = removeLastLetter(editableDisplay.textContent)
                num2Current = parseFloat(editableDisplay.textContent)
            } else editableDisplay.textContent = "0"
        } else{
            if(num1Current === parseFloat(editableDisplay.textContent)) {
                editableDisplay.textContent = removeLastLetter(editableDisplay.textContent)
                num1Current = parseFloat(editableDisplay.textContent)
            } else editableDisplay.textContent = "0"
        }
    }
})

const keyMap = {
    "0" : "btn0",
    "1": "btn1",
    "2": "btn2",
    "3": "btn3",
    "4": "btn4",
    "5": "btn5",
    "6": "btn6",
    "7": "btn7",
    "8": "btn8",
    "9": "btn9",
    ".": "btnDecimal",
    "+": "btnAdd",
    "-": "btnSubtract",
    "*": "btnMultiply",
    "x": "btnMultiply", // Allow "x" as multiplication
    "/": "btnDivide",
    "^": "btnExponent",
    "Enter": "btnEquals",
    "=": "btnEquals",
    "Backspace": "btnUndo",
    "Escape": "btnClear",
}

document.addEventListener("keypress", (event) => {
    const key = event.key
    const buttonId = keyMap[key]

    if (buttonId) {
        const button = document.querySelector(buttonId)
        if (button) button.click(); // simulate click
    }
    if (["Enter", "Backspace"].includes(key)) {
        event.preventDefault(); // prevent default behavior
    }
})