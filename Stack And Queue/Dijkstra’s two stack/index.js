const numberStack = [];
const operatorStack = [];

function calculator(input, debug = false) {
  for (let i = 0; i < input.length; i++) {
    const el = input.charAt(i);
    const num = parseInt(el);

    if (debug) {
      console.log(numberStack);
      console.log(operatorStack);
    }

    if (Number.isNaN(num)) {
      if (el !== ")" && el !== "(") {
        operatorStack.push(el);
      }

      if (el === ")") {
        const num1 = numberStack.pop();
        const num2 = numberStack.pop();

        const op = operatorStack.pop();

        if (op === "+") numberStack.push(num1 + num2);
        if (op === "-") numberStack.push(num1 - num2);
        if (op === "*") numberStack.push(num1 * num2);
        if (op === "/") numberStack.push(num1 / num2);
      }
    } else {
      numberStack.push(num);
    }
  }

  if (numberStack.length === 1) {
    return numberStack[0];
  }

  throw new Error(`${numberStack}: ${input} input is not valid`);
}

console.log(calculator("(((1+2)+4)*9)"));

// for better performance, barckets need to be checked using stack.
