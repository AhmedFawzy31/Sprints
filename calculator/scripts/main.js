let lhs = "",
  rhs = "";
let num = "",
  operand = "";
const output = document.querySelector(".output");
const lhsEl = document.querySelector(".lhs"),
  rhsEl = document.querySelector(".rhs");
const keys = document.querySelectorAll(
  ".calc-container .flex:not(.display) li"
);
const display = document.querySelector(".display");
//flag to know when user is done with left side
let operandInput = false;
const compute = (a, b, operand) => {
  let result;
  if (operand === "+") result = a + b;
  else if (operand === "-") result = a - b;
  else if (operand === "x") result = a * b;
  else if (operand === "/") {
    if (b === 0) result = "Can't divide by 0";
    else result = a / b;
  }
  output.textContent = result;
};
const reset = () => {
  lhsEl.textContent = "";
  rhsEl.textContent = "";
  document.querySelector(".operand").textContent = "";
  output.textContent = "";
  num = "";
  operandInput = false;
};
const handleNumPadClick = (e) => {
  let input = e.target.textContent;
  //if there's output or AC button is clicked
  if (output.textContent !== "" || input === "AC") {
    reset();
    if (input === "AC") return;
  }
  //if an operation
  if (isNaN(input)) {
    //if input is '-', figure out if it's minus operation or negative number
    if (input === "-") {
      //if lhs and empty
      if (!operandInput && num === "") {
        lhsEl.textContent = "-";
        return;
      } else if (operandInput && num === "") {
        rhsEl.textContent = "-";
        return;
      }
    }
    //prevent changing operand
    if (operandInput && input !== "=") return;
    //if user enters operation before lhs is entered
    if (!operandInput && (num === "" || num === "-")) {
      output.textContent = "Enter LHS first";
      return;
    }
    if (input === "=") {
      rhs = num;
      compute(parseInt(lhs), parseInt(rhs), operand);
      operandInput = false;
      return;
    }
    //set flag to true and update lhs
    operandInput = true;
    operand = input;
    lhs = num;
    num = "";
    document.querySelector(".operand").textContent = input;
    return;
  }
  let container;
  if (operandInput) {
    num = rhsEl.textContent;
    container = rhsEl;
  } else {
    num = lhsEl.textContent;
    container = lhsEl;
  }
  num += input;
  container.textContent = num;
};
for (let i = 0; i < keys.length; i++) {
  keys[i].addEventListener("click", handleNumPadClick);
}
