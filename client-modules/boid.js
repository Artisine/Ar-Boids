import {Math_rad, Math_deg} from "./utility.js";
import {mainCanvas, mainCamera} from "../client.js";
import {instances, Instance, boids} from "./instance.js";
import Entity from "./entity.js";
import Actor from "./actor.js";
import { Vector2, zeroedVector2 } from "./vector2.js";

export default class Boid extends Entity {
	constructor() {
		super();

		this.className = "Boid";
		this.name = "Boid";

		this.setSize(25, 15);
		this.rotation = 50;

		this.maximumSpeed = 10;
		this.standardSpeed = 1;
		this.angleFieldOfView = 270;
		this.radiusForFieldOfView = this.getSize.getX * 4;
		this.shouldTeleportToOtherSideOfScreen = true;
		this.otherBoidsInViewfield = new Map();
		this.rulesEnabled = [true, true, true];
		this.showRadiusForFieldOfView = false;
		this.intervalBetweenSuddenVelocityIncrease = Math.min(10, Math.random() * 30);
		this.durationProgressSuddenVelocityIncrease = 0;
		this.boidGroup = Math.floor(Math.random() * 2);

		// console.log(`radiusForFieldOfView: ${this.radiusForFieldOfView}`);
		this.colors = ["#03045e","#023e8a","#0077b6","#0096c7","#00b4d8","#48cae4","#90e0ef","#ade8f4","#caf0f8"];
		this.determinedColor = this.colors[Math.floor(Math.random() * this.colors.length)];

		boids.push(this);
		// console.log(boids);
		this.init();
	}

	init() {
		this.setRotation(Math.random() * 360);
		this.velocity.set(
			Math.cos(Math_rad(this.getRotation)) * this.standardSpeed,
			Math.sin(Math_rad(this.getRotation)) * this.standardSpeed
		);
		// this.getVelocity.set(1, 2);
	}

	distanceFromOtherBoid(otherBoid) {
		if (otherBoid instanceof Boid) {
			return Math.sqrt(
				(this.position.getX - otherBoid.position.getX) * (this.position.getX - otherBoid.position.getX)
				+ (this.position.getY - otherBoid.position.getY) * (this.position.getY - otherBoid.position.getY)
			);
		}
	}
	checkIfBoidIsFromSameBoidGroup(otherBoid) {
		if (otherBoid instanceof Boid && otherBoid.id !== this.id && otherBoid.boidGroup === this.boidGroup) {
			return true;
		} else {
			return false;
		}
	}


	findOtherBoidsInViewingField() {
		for (let i = 0; i < boids.length; i += 1) {
			const otherBoid = boids[i];
			if (otherBoid.id === this.id) {
				continue;
			}

			const dist = Math.abs(otherBoid.getPosition.getMagnitude() - this.getPosition.getMagnitude());
			if (dist <= this.radiusForFieldOfView) {
				if (this.otherBoidsInViewfield.get(otherBoid.id) === undefined) {
					this.otherBoidsInViewfield.set(otherBoid.id, otherBoid);
				}
			} else {
				if (this.otherBoidsInViewfield.get(otherBoid.id)) {
					this.otherBoidsInViewfield.delete(otherBoid.id);
				}
			}
		}
	}

	rule1_coherrence() {
		const centeringFactor = 0.010;
		// adjust velocity by this %

		let centerX = 0;
		let centerY = 0;
		let numberOfNeighbours = 0;

		for (let otherBoid of boids) {
			if (this.checkIfBoidIsFromSameBoidGroup(otherBoid) && this.distanceFromOtherBoid(otherBoid) < this.radiusForFieldOfView) {
				centerX += otherBoid.position.getX;
				centerY += otherBoid.position.getY;
				numberOfNeighbours += 1;
			}
		}
		if (numberOfNeighbours) {
			centerX = centerX / numberOfNeighbours;
			centerY = centerY / numberOfNeighbours;

			this.velocity.add(
				(centerX - this.position.getX) * centeringFactor,
				(centerY - this.position.getY) * centeringFactor
			);
		}
	}
	rule2_separation() {
		const minDistance = 40; // The distance to stay away from others
		const avoidFactor = 0.25; //adjust velocity by this %
		let moveX = 0;
		let moveY = 0;
		for (let otherBoid of boids) {
			if (otherBoid.id !== this.id && this.checkIfBoidIsFromSameBoidGroup(otherBoid)) {
				if (this.distanceFromOtherBoid(otherBoid) < minDistance) {
					moveX += this.getPosition.getX - otherBoid.getPosition.getX;
					moveY += this.getPosition.getY - otherBoid.getPosition.getY;
				}
			}
		}

		this.velocity.add(
			moveX * avoidFactor,
			moveY * avoidFactor
		);
	}
	rule3_alignment() {
		const matchingFactor = 0.25;
		let averageDX = 0;
		let averageDY = 0;
		let numberOfNeighbours = 0;

		for (let otherBoid of boids) {
			if (this.checkIfBoidIsFromSameBoidGroup(otherBoid) && this.distanceFromOtherBoid(otherBoid) < this.radiusForFieldOfView) {
				averageDX += otherBoid.velocity.getX;
				averageDY += otherBoid.velocity.getY;
				numberOfNeighbours += 1;
			}
		}
		if (numberOfNeighbours) {
			averageDX = averageDX / numberOfNeighbours;
			averageDY = averageDY / numberOfNeighbours;

			this.velocity.add(
				(averageDX - this.velocity.getX) * matchingFactor,
				(averageDY - this.velocity.getY) * matchingFactor
			);
		}
	}
	keepWithinBounds() {
		if (this.shouldTeleportToOtherSideOfScreen) {
			return 1;
		}
		const margin = 20;
		const turnFactor = 10000;

		const left  = mainCamera.position.getX - mainCanvas.canvasElement.width * 0.5;
		const right = mainCamera.position.getX + mainCanvas.canvasElement.width * 0.5;
		const up   = mainCamera.position.getY - mainCanvas.canvasElement.height * 0.5;
		const down = mainCamera.position.getY + mainCanvas.canvasElement.height * 0.5;
	  
		if (this.position.getX < left + margin) {
			// this.dx += turnFactor;
			this.velocity.add(turnFactor, 0);
		}
		if (this.position.getX > right - margin) {
			// this.dx -= turnFactor
			this.velocity.add(-turnFactor, 0);
		}
		if (this.position.getY < up + margin) {
			// this.dy += turnFactor;
			this.velocity.add(0, turnFactor);
		}
		if (this.position.getY > down - margin) {
			// this.dy -= turnFactor;
			this.velocity.add(0, -turnFactor);
		}
	}
	introduceRandomVelocityIncrease() {
		if (Math.random() > 0.9999) {
			this.velocity.add((Math.random() - 0.5) * 100000, (Math.random() - 0.5) * 100000);
		}
	}
	suddenVelocityIncrease() {
		this.velocity.set(
			this.velocity.getX * 10,
			this.velocity.getY * 10
		);
	}

	introduceRandomVelocityMultiply() {
		if (Math.random() > 0.99) {
			this.suddenVelocityIncrease();
		}
	}

	simulateRules() {
		// let v = [];
		// if (this.rulesEnabled[0]) v.push(this.rule1());
		// if (this.rulesEnabled[1]) v.push(this.rule2());
		// if (this.rulesEnabled[2]) v.push(this.rule3());
		

		// for (let item of v) {
		// 	this.getVelocity.add(item);
		// }
		// // this.velocity = this.velocity.add(v1).add(v2).add(v3);
		// this.position = this.position.add(this.getVelocity);

		this.durationProgressSuddenVelocityIncrease += 1 / 60;
		if (this.durationProgressSuddenVelocityIncrease >= this.intervalBetweenSuddenVelocityIncrease) {
			this.suddenVelocityIncrease();
		}
		this.rule1_coherrence();
		this.rule2_separation();
		this.rule3_alignment();
		this.keepWithinBounds();
		this.introduceRandomVelocityIncrease();
		this.introduceRandomVelocityMultiply();
		this.limit_velocity();

		
		
	}
	limit_velocity() {
		const speedLimit = 100;
		const speed = Math.sqrt(this.velocity.getX * this.velocity.getX + this.velocity.getY * this.velocity.getY);
		if (speed > speedLimit) {
			this.velocity.setX((this.velocity.getX / speed) * speedLimit);
			this.velocity.setY((this.velocity.getY / speed) * speedLimit);
		}
	}

	
	get getRotationBasedOnVelocity() {
		return Math.atan2(this.velocity.getY, this.velocity.getX);
	}

	render() {
		mainCanvas.ctx.save();
		mainCanvas.ctx.translate(this.getPosition.getX, this.getPosition.getY);
		mainCanvas.ctx.rotate( this.getRotationBasedOnVelocity );
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

		// Step 2 - Render Circle for "radiusForFieldOfView"
		if (this.showRadiusForFieldOfView) {
			mainCanvas.circle(0, 0, this.radiusForFieldOfView);
			mainCanvas.strokeprevious("white");
		}

		mainCanvas.ctx.restore();
		mainCanvas.ctx.fillStyle = "white";
		mainCanvas.ctx.fillText(`${this.boidGroup}`, this.position.getX, this.position.getY + 20);
	}
};