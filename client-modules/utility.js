
export let log_verbose = true;

export const alphabet = "abcdefghijklmnopqrstuvwxyz";
export const numbers = "0123456789";
export function createSnowflake() {
	let snowflake = "";

	const now = Date.now();
	const binaryNow = (now >>> 0).toString(2);
	const numberOfPreceedingZeroes = 42 - binaryNow.length;
	let zeroString = "";
	for (let i = 0; i < numberOfPreceedingZeroes; i += 1) {
		zeroString += "0";
	}
	const nowString = zeroString + binaryNow;

	const alphanumeric = alphabet + numbers;
	const alphanumericLength = alphanumeric.length;
	let alphanumericString = "";
	for (let i = 0; i < 22; i += 1) {
		alphanumericString += alphanumeric[Math.floor(alphanumericLength * Math.random())];
	}

	snowflake = nowString + alphanumericString;
	// console.log(snowflake);
	return snowflake;
}

export function getElement(query) {
	return document.querySelector(query);
};

export function g(query) {
	return getElement(query);
};


export function forceFloat(number) {
	return Number(number);
};

export function forceInteger(number) {
	return Math.round(number);
};

export function forceBoolean(val) {
	return (!! val);
};

export function Math_rad(deg) {
	return deg * (Math.PI / 180);
};
export function Math_deg(rad) {
	return rad * (180 / Math.PI);
};