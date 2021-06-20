/**
 *
 * @param {string} selector : CSS Selector
 * @returns {Element}
 */
const $ = (selector) => document.querySelector(selector);
/**
 *
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);

/**
 * @param {number} size : required array length;
 * @returns {number[]} numbers[] : array of random numbers
 */
const generateRandomArray = (size) => {
	const array = [];
	const min = 10;
	const max = 100;

	for (let i = 0; i < size; i++) {
		let num = randomInt(min, max);
		array.push(num);
	}

	return array;
};

/**
 *
 * @param {number[]} array
 * @param {string} selector : CSS Selector to rendered in
 */
const drawArray = (array, selector) => {
	const parentElement = $(selector);
	parentElement.innerHTML = "";
	const barsContainer = document.createElement("div");
	barsContainer.className = "bars-container";
	const length = array.length;

	for (let i = 0; i < length; i++) {
		const bar = document.createElement("div");
		if (length < 50) {
			const valueContainer = document.createElement("span");
			valueContainer.className = "bar-value";
			valueContainer.innerText = array[i];
			bar.append(valueContainer);
		}

		const valueVisual = document.createElement("div");
		valueVisual.className = "bar-height";
		bar.append(valueVisual);
		bar.className = "bar";
		bar.style.height = `${array[i]}%`;
		barsContainer.appendChild(bar);
	}
	parentElement.appendChild(barsContainer);
};

const highlightBar = (index, color) => {
	const parent = $("main.main .bars-container");
	const bar = parent.children[index];
	bar.children[0].style.background = `var(--${color})`;
};

let currentIndex = 0;
let compareIndex = 0;

/**
 *
 * @param {number[]} array
 * @param {number} time
 */

const sortArray = (array) => {
	if (array[currentIndex] > array[compareIndex]) {
		[array[currentIndex], array[compareIndex]] = [
			array[compareIndex],
			array[currentIndex],
		];
	}
	drawArray(array, "main.main");
	highlightBar(compareIndex, "red");
	highlightBar(currentIndex, "red");
};

const sortInit = (array, time) => {
	sortArray(array);
	currentIndex = 0;
	compareIndex = 1;

	const sorter = setInterval(() => {
		if (compareIndex >= array.length) {
			currentIndex++;
			compareIndex = currentIndex;
		}

		if (currentIndex >= array.length - 1) {
			started = false;
			clearInterval(sorter);
		}
		sortArray(array);
		compareIndex++;
	}, time);
};

let settingOpened = false;
let started = false;
let timeout = 100;
let count = 50;
let array = generateRandomArray(count);
drawArray(array, "main.main");

const menuButton = $("#menu-btn");
const settings = $(".settings");
const speedSelect = $("#speed");
const algoSelect = $("#algorithm");
const generateButton = $("#generate");
const startButton = $("#start");
const sizeInput = $("#size");

generateButton.addEventListener("click", () => {
	if (!started) {
		array = generateRandomArray(count);
		drawArray(array, "main.main");
	}
});

sizeInput.addEventListener("change", (event) => {
	if (!started) {
		count = parseInt(event.target.value);
	}
});

speedSelect.addEventListener("change", (event) => {
	const val = event.target.value;
	timeout = parseInt(val);
});

menuButton.addEventListener("click", () => {
	!settingOpened
		? settings.classList.add("active")
		: settings.classList.remove("active");

	settingOpened = !settingOpened;
});

startButton.addEventListener("click", () => {
	!started && sortInit(array, timeout);
	started = true;
});
