
import {mainCanvas, mainCamera} from "../client.js";
import {instances} from "./instance.js";
import Entity from "./entity.js";
import Effect from "./effect.js";
import Actor from "./actor.js";

const oneOverSixty = 1 / 60;
const tenOverSixty = 10 / 60;
const hundredOverSixty = 100 / 60;
const thousandOverSixty = 1000 / 60;

export default class Hellfire extends Actor {
	constructor() {
		super();
		this.className = "Hellfire";
		this.name = "Hellfire Orbital Laser";

		this.inited = false;
		this.setSize(500, 500);
		this.maxRadius = (this.getSize.getX + this.getSize.getY) / 4;
		this.radius = 0;
		this.midPrimeDurationWait = 1000;
		this.midPrimeDurationProgress = 0;
		this.durationOfHellfire = 0;
		this.maxDuration = 5000;
		this.firing = false;
		
		this.colours = ["#ff1100", "#ff4000", "#ff7b00", "#ffaa00", "#ffdd00"];
		this.effects = [];

		console.log(`Hellfire created.`);
	}

	initLaser() {
		console.log(`initLaser began on ${this.getClassName} ${this.getId}`);
		
		let effects = [];
		for (let i = 0; i < 5; i += 1) {
			const ef1 = new Effect();
			ef1.setPosition(this.getPosition);
			ef1.setRadius(10);
			ef1.setColor("stroke", this.colours[i]);
			ef1.setShape("circle");
			effects.push(ef1);
		}
		this.effects = effects;
		this.inited = true;
	}
	
	render() {
		// Outer boundary ring
		mainCanvas.circle(this.getPosition.getX, this.getPosition.getY, this.maxRadius);
		mainCanvas.strokeprevious("orange");
		// mainCanvas.fillprevious("red");

		for (let i = 0; i < this.effects.length; i += 1) {
			const ring = this.effects[i];

			if (ring.getRadius >= this.maxRadius) {
				ring.setTransparency(1);
				ring.destroy();
				this.effects.splice(i, 1);
			}
			ring.setRadius(ring.getRadius + i + 1);
		}
		// console.log(this.effects);

		if (this.inited && this.effects.length === 0) {
			this.midPrimeDurationProgress += thousandOverSixty;
		}
		if (this.midPrimeDurationProgress >= this.midPrimeDurationWait) {
			if (!this.firing) this.firing = true;
			this.durationOfHellfire += thousandOverSixty;
			if (this.durationOfHellfire > this.maxDuration) {
				this.firing = false;
				this.radius -= hundredOverSixty;
				this.setTransparency(1 - Math.abs(this.radius / this.maxRadius));
				if (this.radius <= 0) {
					this.destroy();
				}
			}
			mainCanvas.ctx.save();
			mainCanvas.ctx.globalAlpha = 1 - this.getTransparency;
			// Inner filling Ring
			mainCanvas.circle(this.getPosition.getX, this.getPosition.getY, this.radius);
			mainCanvas.strokeprevious("orange");
			mainCanvas.fillprevious("orange");

			mainCanvas.ctx.restore();
		} else {
			if (this.radius < this.maxRadius) {
				this.radius += hundredOverSixty;
			}
		}

	}
};