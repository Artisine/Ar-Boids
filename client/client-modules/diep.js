import {Vector2} from "./vector2.js";
import {Math_rad, Math_deg} from "./utility.js";
import {mainCanvas, mainCamera} from "../client.js";
import Player from "./player.js";

export default class Diep extends Player {
	constructor() {
		super();
		this.className = "Diep";
		this.name = "Tank";
		this.diepColor = {
			body: "#0ba8e6",
			barrel: "#565959"
		};
		this.setSize(20, 20);
	}
	render() {
		if (this.getTransparency < 1) {
			mainCanvas.ctx.save();
			mainCanvas.ctx.translate(this.getPosition.getX, this.getPosition.getY);
			mainCanvas.ctx.rotate(Math_rad(this.getRotation));
			// Barrel
			mainCanvas.centerSquare(
				new Vector2(this.getSize.getX * 0.5, 0),
				new Vector2(this.getSize.getX, this.getSize.getY * (3/5))
			).strokeprevious("white").fillprevious(this.diepColor.barrel);
			// Body
			mainCanvas.circle(0, 0, (this.getSize.getX + this.getSize.getY) / 4);
			mainCanvas.strokeprevious("white");
			mainCanvas.fillprevious(this.diepColor.body);
			mainCanvas.ctx.restore();
		}
	}
};