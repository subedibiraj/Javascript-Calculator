import React, { useState } from 'react';
import './App.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [formula, setFormula] = useState('');
  const [evaluated, setEvaluated] = useState(false);

  const handleClick = (value) => {
    if (evaluated) {
      if (/[0-9.]/.test(value)) {
        setDisplay(value);
        setFormula(value);
      } else {
        setDisplay('0' + value);
        setFormula('0' + value);
      }
      setEvaluated(false);
    } else {
      if (value === '.' && display.includes('.')) return;
      if (display === '0' && value !== '.') {
        setDisplay(value);
        setFormula(value);
      } else {
        setDisplay(prev => prev + value);
        setFormula(prev => prev + value);
      }
    }
  };

  const handleOperator = (operator) => {
    if (evaluated) {
      setFormula(display + operator);
      setDisplay(operator);
      setEvaluated(false);
    } else {
      const lastChar = formula.slice(-1);
      if (/[\+\-\*\/]/.test(lastChar)) {
        if (operator === '-' && lastChar !== '-') {
          setFormula(prev => prev + operator);
          setDisplay(operator);
        } else if (operator !== '-') {
          let updatedFormula = formula;
          while (/[\+\-\*\/]/.test(updatedFormula.slice(-1))) {
            updatedFormula = updatedFormula.slice(0, -1);
          }
          setFormula(updatedFormula + operator);
          setDisplay(operator);
        }
      } else {
        setFormula(prev => prev + operator);
        setDisplay(operator);
      }
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setFormula('');
    setEvaluated(false);
  };

  const handleEvaluate = () => {
    try {
      const result = eval(formula.replace(/x/g, '*'));
      setDisplay(result.toString());
      setFormula(result.toString());
      setEvaluated(true);
    } catch (error) {
      setDisplay('Error');
      setEvaluated(true);
    }
  };

  return (
    <div className="calculator">
      <div id="display" className="display">{display}</div>
      <button id="clear" onClick={handleClear}>AC</button>
      <button id="divide" onClick={() => handleOperator('/')}>/</button>
      <button id="multiply" onClick={() => handleOperator('*')}>*</button>
      <button id="subtract" onClick={() => handleOperator('-')}>-</button>
      <button id="add" onClick={() => handleOperator('+')}>+</button>
      <button id="equals" onClick={handleEvaluate}>=</button>
      <button id="decimal" onClick={() => handleClick('.')}>.</button>
      <button id="zero" onClick={() => handleClick('0')}>0</button>
      <button id="one" onClick={() => handleClick('1')}>1</button>
      <button id="two" onClick={() => handleClick('2')}>2</button>
      <button id="three" onClick={() => handleClick('3')}>3</button>
      <button id="four" onClick={() => handleClick('4')}>4</button>
      <button id="five" onClick={() => handleClick('5')}>5</button>
      <button id="six" onClick={() => handleClick('6')}>6</button>
      <button id="seven" onClick={() => handleClick('7')}>7</button>
      <button id="eight" onClick={() => handleClick('8')}>8</button>
      <button id="nine" onClick={() => handleClick('9')}>9</button>
    </div>
  );
};

export default Calculator;
