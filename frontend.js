// FastAPI Calculator Frontend Functions
const API_BASE_URL = 'http://localhost:8000';

// Generic API fetch function
async function fetchAPI(endpoint) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('API fetch error:', error);
        throw error;
    }
}



// Addition function
async function addNumbers(num1, num2) {
    try {
        const data = await fetchAPI(`/add/${num1}/${num2}`);
        console.log('Addition result:', data);
        return data;
    } catch (error) {
        console.error('Addition failed:', error);
        return { error: 'Addition failed', details: error.message };
    }
}

// Multiplication function
async function multiplyNumbers(num1, num2) {
    try {
        const data = await fetchAPI(`/multiply/${num1}/${num2}`);
        console.log('Multiplication result:', data);
        return data;
    } catch (error) {
        console.error('Multiplication failed:', error);
        return { error: 'Multiplication failed', details: error.message };
    }
}

// Division function
async function divideNumbers(num1, num2) {
    try {
        const data = await fetchAPI(`/divide/${num1}/${num2}`);
        console.log('Division result:', data);
        return data;
    } catch (error) {
        console.error('Division failed:', error);
        return { error: 'Division failed', details: error.message };
    }
}

// Subtraction function
async function subtractNumbers(num1, num2) {
    try {
        const data = await fetchAPI(`/subtract/${num1}/${num2}`);
        console.log('Subtraction result:', data);
        return data;
    } catch (error) {
        console.error('Subtraction failed:', error);
        return { error: 'Subtraction failed', details: error.message };
    }
}

// Universal calculator function
async function calculate(operation, num1, num2) {
    const operations = {
        'add': addNumbers,
        'multiply': multiplyNumbers,
        'divide': divideNumbers,
        'subtract': subtractNumbers
    };

    const operationMap = {
        'add': 'add',
        '+': 'add',
        'sum': 'add',
        'multiply': 'multiply',
        '*': 'multiply',
        'product': 'multiply',
        'divide': 'divide',
        '/': 'divide',
        'division': 'divide',
        'subtract': 'subtract',
        '-': 'subtract',
        'minus': 'subtract'
    };

    const normalizedOp = operationMap[operation.toLowerCase()];
    if (!normalizedOp || !operations[normalizedOp]) {
        return { error: 'Invalid operation', supported: Object.keys(operationMap) };
    }

    return await operations[normalizedOp](num1, num2);
}

function displayResult(result, elementId = 'result') {
    const element = document.getElementById(elementId);
    if (element) {
        if (result.error) {
            element.innerHTML = `<span style="color: red;">Error: ${result.error}</span>`;
            if (result.details) {
                element.innerHTML += `<br><small>${result.details}</small>`;
            }
        } else {
            element.innerHTML = `
                <div style="background: #f0f8ff; padding: 10px; border-radius: 5px; margin: 5px 0;">
                    <strong>${result.operation}</strong><br>
                    ${result.num1} ${getOperationSymbol(result.operation)} ${result.num2} = 
                    <strong>${result.result}</strong>
                </div>
            `;
        }
    }
}

function getOperationSymbol(operation) {
    const symbols = {
        'addition': '+',
        'multiplication': '×',
        'division': '÷',
        'subtraction': '-'
    };
    return symbols[operation] || operation;
}


async function performCalculation() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const operation = document.getElementById('operation').value;

    if (isNaN(num1) || isNaN(num2)) {
        displayResult({ error: 'Please enter valid numbers' });
        return;
    }

    const result = await calculate(operation, num1, num2);
    displayResult(result);
}

