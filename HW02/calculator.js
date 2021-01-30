(function () {
	"use strict";

	//every operator key (+ the decimal) has a unique id and no class, while number keys have a shared class.
	// Pulling values and assigning to variables for best practice (W3Schools).
	let clearKey = document.getElementById("clear"); // for clear key
	let addEqualKey = document.getElementById("plusEqual"); // for += key
	let subtractKey = document.getElementById("subtract"); // for subtract key
	let multiplyKey = document.getElementById("multiply"); // for multiply key
	let decimalPKey = document.getElementById("decimal"); // for decimal place key
	let divideKey = document.getElementById("divide"); // for divide key

	// "The Array.from() method returns an Array object from any object with a length
	// property or an iterable object." 
	// Source: --> W3Schools
	let numberKeys = Array.from(document.getElementsByClassName("number")); // for all number keys
	let key;
	let operand;

	// Variable declarations for numbers used in operations: initialize at 0.
	let num1 = "0";
	let num2 = "0";


	// Triggers all event listening. Each calculator key is told to do a unique action when clicked. 
	function eventListener() {
		decimalPKey.addEventListener("click", appendDecimal("."));
		subtractKey.addEventListener("click", calcAndSet(function (num1, num2) {
			return num1 - num2;
		}));
		multiplyKey.addEventListener("click", calcAndSet(function (num1, num2) {
			return num1 * num2;
		}));
		divideKey.addEventListener("click", calcAndSet(function (num1, num2) {
			return num1 / num2;
		}));
		addEqualKey.addEventListener("click", calcAndSet(function (num1, num2) {
			return num1 + num2;
		}));
		for (key of numberKeys) {
			key.addEventListener("click", createInputs(key.innerHTML));
		}
		clearKey.addEventListener("click", function () {
			clearAll();
		});
	}

	// Displays output in calc window. Design decision: one number displayed at a time.
	// Source for ParseFloat: https://stackoverflow.com/questions/6095795/convert-a-javascript-string-variable-to-decimal-money
	function displayNum(numEntry) {
		document.getElementById("display").innerHTML = parseFloat(numEntry);
	}

	// checks if operand has been set to either start a new dec number or append decimal to current number.
	// design decision: only shows decimal once a succeeding number has been inserted after it. (5.0 = shows as 5)
	function appendDecimal(dec) {
		return () => {
			if (!operand) {
				num1 = num1 + ".";
				displayNum(num1);
			} else {
				num2 = num2 + ".";
				displayNum(num2);
			}
		}
	}

	// checks if operand has been set to either start a new number or append to the current.
	function createInputs(key) {
		return () => {
			if (!operand) {
				num1 = num1 + key;
				displayNum(num1);
			} else {
				num2 = num2 + key;
				displayNum(num2);
			}
		}
	}

	// If operand has been set, parses two inputs and applies them to 
	// the chosen operand function. Sets num1 equal to the calculation.
	// calls disPlayNum to show the completed calcualtion. Then, sets the operand = to the 
	// math function (+ - / *) passed in and resets num2 to 0.
	function calcAndSet(mathFunc) {
		return () => {
			if (operand) {
				num1 = parseFloat(num1);
				num2 = parseFloat(num2);
				num1 = operand(num1, num2);
				displayNum(num1);

			}
			operand = mathFunc; //setting operand (prev null) to operator given.
			num2 = "0"; // resets num2 so we can apply a new function / input to num1
		};
	}

	// Clears any output in calculator, resets active inputs
	function clearAll() {
		displayNum("0");
		operand = null;
		num1 = "0";
		num2 = "0";
	}

	// Source: Class lecture
	window.addEventListener("load", eventListener, false);

})()
