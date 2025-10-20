document.addEventListener('DOMContentLoaded', function () {
    let display = document.getElementById('display');
    let currentOperation = '';
    let firstOperand = '';
    let secondOperand = '';

    document.querySelectorAll('.number').forEach(button => {
        button.addEventListener('click', () => {
            appendNumber(button.getAttribute('data-number'));
        });
    });

    document.querySelectorAll('.operation').forEach(button => {
        button.addEventListener('click', () => {
            const operation = button.getAttribute('data-operation');
            if (operation) {
                chooseOperation(operation);
            }
        });
    });
document.getElementById('equals').addEventListener('click', calculateResult);
    document.getElementById('clear').addEventListener('click', clearDisplay);

    function appendNumber(number) {
        if (currentOperation === '') {
            firstOperand += number;
            display.value = firstOperand;
        } else {
            secondOperand += number;
            display.value = `${firstOperand} ${currentOperation} ${secondOperand}`;
        }
    }

    function chooseOperation(operation) {
        if (operation === 'log') {
            if (firstOperand === '') return;
            display.value = `log(${firstOperand})`;
            calculateLog();
            return;
        }
        if (operation === 'e') {
            display.value = Math.E;
            firstOperand = Math.E.toString();
            return;
        }
        if (firstOperand === '') return;
        if (secondOperand !== '') {
            calculateResult();
        }
        currentOperation = operation;
        display.value = `${firstOperand} ${currentOperation}`;
    }

    function calculateResult() {
        let result;
        const first = parseFloat(firstOperand);
        const second = parseFloat(secondOperand);
        if (isNaN(first) || isNaN(second)) return;
        switch (currentOperation) {
            case '+':
                result = first + second;
                break;
            case '-':
                result = first - second;
                break;
            case '*':
                result = first * second;
                break;
            case '/':
                result = first / second;
                break;
            case '^':
                result = Math.pow(first, second);
                break;
            default:
                return;
        }
        display.value = result;
        firstOperand = result.toString();
        secondOperand = '';
        currentOperation = '';
    }

    function calculateLog() {
        const operand = parseFloat(firstOperand);
        if (isNaN(operand) || operand <= 0) {
            display.value = 'Error';
            return;
        }
        const result = Math.log10(operand);
        display.value = result;
        firstOperand = result.toString();
        secondOperand = '';
        currentOperation = '';
    }

    function clearDisplay() {
        firstOperand = '';
        secondOperand = '';
        currentOperation = '';
        display.value = '';
    }
});
