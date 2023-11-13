const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operator]')
const allClearButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')
const equalButton = document.querySelector('[data-equals]')
const previusOperandTextElement = document.querySelector('[data-previus-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

class Calculator {
    constructor(previusOperandTextElement, currentOperandTextElement) {
        this.previusOperandTextElement = previusOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    formatDisplayNumber(number){
        const stringNumber = number.toString()

        const integerDigits = parseFloat(stringNumber.split('.')[0])
        
        const decimalDigits = stringNumber.split('.')[1]

        let integerDisplay;

        if(isNaN(integerDigits)) {
            integerDisplay = ''
        } else{
            integerDisplay = integerDigits.toLocaleString('en' , {
                maximumFractionDigits: 0
            })
        }
        if(decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else{
            return `${integerDisplay}`
        }
    }

    calculate() {
        let result;

        const previusOperandFloat = parseFloat(this.previusOperand)
        const currentOperandFloat = parseFloat(this.currentOperand)

        if (isNaN(previusOperandFloat) || isNaN(currentOperandFloat)) {
            return;
        }


        switch (this.operation) {
            case '+':
                result = previusOperandFloat + currentOperandFloat
                break;

            case '-':
                result = previusOperandFloat - currentOperandFloat;
                break;

            case '÷':
                result = previusOperandFloat / currentOperandFloat
                break;

            case '*':
                result = previusOperandFloat * currentOperandFloat
                break;
            default:
                return;

        }

        this.currentOperand = result
        this.operation = undefined
        this.previusOperand = ''
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') {
            return;
        }

        if (this.previusOperand !== '') {
            this.calculate()
        }

        this.operation = operation

        this.previusOperand = this.currentOperand
        this.currentOperand = ''
    }

    // colocar os numeros selecionados
    appendNumber(number) {
        if (this.currentOperand.includes('.') && number === '.') return;
        this.currentOperand = `${this.currentOperand}${number.toString()}`
    }

    // Deixar o valor vazio / e dar valor
    clear() {
        this.currentOperand = ''
        this.previusOperand = ''
        this.operation = undefined
    }

    // Atualizar os valores da classe
    updateDisplay() {
        this.previusOperandTextElement.innerText = `${this.formatDisplayNumber(this.previusOperand)} ${this.operation || ''}`;
        this.currentOperandTextElement.innerText = this.formatDisplayNumber(this.currentOperand);
    }
}

const calculator = new Calculator(
    previusOperandTextElement, currentOperandTextElement
)


// FUNÇÃO PARA APARECER OS NUMEROS
for (const numberButton of numberButtons) {
    numberButton.addEventListener('click', () => {
        calculator.appendNumber(numberButton.innerText)
        calculator.updateDisplay()
    })
}

for (const operatorButton of operatorButtons) {
    operatorButton.addEventListener('click', () => {
        calculator.chooseOperation(operatorButton.innerText)
        calculator.updateDisplay()
    })
}

// FUNÇÃO PARA APAGAR TUDO
allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

equalButton.addEventListener('click', () => {
    calculator.calculate()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})