import {Math_rad, Math_deg} from "./utility.js";
import {mainCanvas, mainCamera} from "../client.js";
import {instances, Instance} from "./instance.js";
import Entity from "./entity.js";
import Actor from "./actor.js";
import { Vector2 } from "./vector2.js";

export default class Boid extends Entity {
	constructor() {
		super();

		this.className = "Boid";
		this.name = "Boid";

		this.setSize(25, 15);
		this.rotation = 50;

		this.standardSpeed = 100;
		this.shouldTeleportToOtherSideOfScreen = false;

		this.colors = ["#03045e","#023e8a","#0077b6","#0096c7","#00b4d8","#48cae4","#90e0ef","#ade8f4","#caf0f8"];
		this.determinedColor = this.colors[Math.floor(Math.random() * this.colors.length)];

		this.init();
	}

	init() {
		this.rotation = Math.random() * 360;
		this.velocity.set(
			Math.cos(Math_rad(this.getRotation)) * this.standardSpeed,
			Math.sin(Math_rad(this.getRotation)) * this.standardSpeed
		);
	}

	render() {
		mainCanvas.ctx.save();
		mainCanvas.ctx.translate(this.getPosition.getX, this.getPosition.getY);
		mainCanvas.ctx.rotate( Math_rad(this.getRotation) );
		// mainCamera.ctx.globalAlpha = 1 - this.getTransparency;

		mainCanvas.changeLineWidth(0);

		// Step 1 - Render a big fat triangle and call it a day.
		mainCanvas.beginNewPath();
		mainCanvas.ctx.moveTo(
			-this.getSize.getX/2,
			-this.getSize.getY/2
		);
		mainCanvas.ctx.lineTo(
			this.getSize.getX/2, 0
		);
		mainCanvas.ctx.lineTo(
			-this.getSize.getX/2,
			this.getSize.getY/2
		);
		mainCanvas.ctx.lineTo(
			-this.getSize.getX/2,
			-this.getSize.getY/2
		);
		mainCanvas.closeNewPath();
		mainCanvas.strokeprevious("black");
		mainCanvas.fillprevious(this.determinedColor);

		mainCanvas.ctx.restore();
	}
};