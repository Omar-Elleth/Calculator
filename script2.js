// Dark/Light Theme ✅
const toggleElement = document.querySelector(".themes__toggle");

const darkThemeToggle = () => {
  toggleElement.classList.toggle("themes__toggle--isActive");
};
const enterThemeToggle = (event) => {
  event.key === "Enter" && darkThemeToggle();
};
toggleElement.addEventListener("keydown", enterThemeToggle);
toggleElement.addEventListener("click", darkThemeToggle);

// Logic Of Calulator ✅

let storedNumber = "";
let currentNumber = "";
let operation = "";

const resultElement = document.querySelector(".calc__result");
const keyButtons = document.querySelectorAll("[data-type]");

const numberButtonHandler = (value) => {
  if (value === "." && currentNumber.includes(".")) return;
  if (value === "0" && !currentNumber) return;

  currentNumber += value;
  updateUI(currentNumber);
};
const updateUI = (value) => {
  resultElement.textContent = !value ? "0" : value;
};

const resetButtonHandler = () => {
  storedNumber = "";
  currentNumber = "";
  operation = "";
  updateUI(currentNumber);
};
const deleteButtonHandler = () => {
  if (!currentNumber && !storedNumber) return;

  if (currentNumber.length === 1) {
    currentNumber = "";
  } else {
    currentNumber = currentNumber.substring(0, currentNumber.length - 1);
  }
  updateUI(currentNumber);
};
const executeOperation = () => {
  if (currentNumber && storedNumber && operation) {
    switch (operation) {
      case "+":
        storedNumber = parseFloat(storedNumber) + parseFloat(currentNumber);
        break;
      case "-":
        storedNumber = parseFloat(storedNumber) - parseFloat(currentNumber);
        break;
      case "*":
        storedNumber = parseFloat(storedNumber) * parseFloat(currentNumber);
        break;
      case "/":
        storedNumber = parseFloat(storedNumber) / parseFloat(currentNumber);
        break;
    }
    currentNumber = "";
    updateUI(storedNumber);
  }
};
const operationKeyHandler = (operationValue) => {
  if (!currentNumber && !storedNumber) return;

  if (currentNumber && !storedNumber) {
    storedNumber = currentNumber;
    currentNumber = "";
    operation = operationValue;
  } else if (storedNumber) {
    operation = operationValue;

    if (currentNumber) executeOperation();
  }
};

const elemntsKeyHandler = (element) => {
  element.addEventListener("click", () => {
    const type = element.dataset.type;
    const value = element.dataset.value;
    if (type === "number") {
      numberButtonHandler(value);
    } else if (type === "operation") {
      switch (value) {
        case "c":
          resetButtonHandler();
          break;
        case "Backspace":
          deleteButtonHandler();
          break;
        case "Enter":
          executeOperation();
          break;
        default:
          operationKeyHandler(value);
          break;
      }
    }
  });
};

keyButtons.forEach(elemntsKeyHandler);

// Use Keyboard as Input Source

const availableNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const availableOperations = ["+", "-", "*", "/"];

window.addEventListener("keydown", (event) => {
  const key = event.key;
  if (availableNumbers.includes(key)) {
    numberButtonHandler(key);
  } else if (availableOperations.includes(key)) {
    operationKeyHandler(key);
  } else if (key === "Enter") {
    executeOperation();
  } else if (key === "Backspace") {
    deleteButtonHandler();
  }
});
