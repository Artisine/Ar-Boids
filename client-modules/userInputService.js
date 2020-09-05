
import {mainPlayer} from "./../client.js";

export class UserInputService {
	
	static whenKeyboardDown(e) {
		const ev = e || event;
		console.log(`${ev.key} was pressed`);
		UserInputService.mainPlayerMovementStateUpdateWhenDown(ev.key);
	}
	static whenKeyboardUp(e) {
		const ev = e || event;
		console.log(`${ev.key} was depressed`);
		UserInputService.mainPlayerMovementStateUpdateWhenUp(ev.key);
	}
	static whenMouseDown(e) {
		const ev = e || event;
		console.log(`Mouse ${ev.button} was pressed`);
	}
	static whenMouseUp(e) {
		const ev = e || event;
		console.log(`Mouse ${ev.button} was depressed`);
	}
	static whenMouseClick(e) {
		const ev = e || event;
		console.log(`Mouse ${ev.button} was clicked`);
	}


	static mainPlayerMovementStateUpdateWhenDown(key) {
		if (mainPlayer) {
			switch(key) {
				case "w":
				case "ArrowUp":
					mainPlayer.movementKeysStates.w = true;
					break;
				case "a":
				case "ArrowLeft":
					mainPlayer.movementKeysStates.a = true;
					break;
				case "s":
				case "ArrowDown":
					mainPlayer.movementKeysStates.s = true;
					break;
				case "d":
				case "ArrowRight":
					mainPlayer.movementKeysStates.d = true;
					break;
			}
		}
	}
	static mainPlayerMovementStateUpdateWhenUp(key) {
		if (mainPlayer) {
			switch(key) {
				case "w":
				case "ArrowUp":
					mainPlayer.movementKeysStates.w = false;
					break;
				case "a":
				case "ArrowLeft":
					mainPlayer.movementKeysStates.a = false;
					break;
				case "s":
				case "ArrowDown":
					mainPlayer.movementKeysStates.s = false;
					break;
				case "d":
				case "ArrowRight":
					mainPlayer.movementKeysStates.d = false;
					break;
			}
		}
	}
	
}