// import Entity from "./entity.js";
import * as Utility from "./utility.js";
import Actor from "./actor.js";
import {Vector2} from "./vector2.js";
import {mainCanvas, mainPlayer} from "./../client.js";
export default class extends Actor {
	constructor() {
		super();
		this.className = "Player";
		this.name = "Player";
		
		// this.movementKeysStates = {
		// 	"w": false,
		// 	"a": false,
		// 	"s": false,
		// 	"d": false
		// };
		
		// this.setImage(Utility.g("#image_rickSanchez"));

		console.log(`${this.className} ${this.id} created.`);
	}

	

	render() {
		if (this.getImage.src !== null && this.getImage.dimensions !== null) {
			mainCanvas.ctx.drawImage(
				this.getImage.src,
				this.getPosition.getX - this.getSize.getX*0.5, this.getPosition.getY - this.getSize.getY*0.5,
				this.getSize.getX, this.getSize.getY

			);
		} else {
			if (this.getTransparency < 1) {
				mainCanvas.ctx.globalAlpha = 1 - this.getTransparency;
				mainCanvas.centerSquare(this.getPosition, this.getSize);
				mainCanvas.strokeprevious("black");
				mainCanvas.fillprevious("blue");
			}
		}
		
	}
};