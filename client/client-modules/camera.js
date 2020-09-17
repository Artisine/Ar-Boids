import {Vector2, zeroedVector2} from "./vector2.js";
import Entity from "./entity.js";
import Actor from "./actor.js";
import {mainCanvas, mainCamera} from "../client.js";
import {Math_rad, Math_deg} from "./utility.js";

export default class Camera extends Entity {
	constructor() {
		super();

		this.className = "Camera";
		this.name = "Camera";

		this.canCollide = true;
		this.collisionGroup = 0;
		this.anchored = false;
		this.transparency = 0; //0=visible, 1=invisible;
		this.maximumHealth = Infinity;
		this.health = this.maximumHealth;
		this.healthRegenerationRate = 999; //unit per every second;

		this.parent = null;
		this.scaling = null; // Scaling is shared with Canvas

		this.angleOfView = Math_rad(90);
		this.lengthOfViewLines = 50;

		this.setSize(20, 20);
	}

	setParent(thing) {
		this.parent = thing;
		thing.camera = this;
		console.log(`Bound Camera to thing: ${thing.getClassName} ${thing.getName} ${thing.id}`);
	}
	canSeeBoid(boid) {
		
	}

	render() {
		mainCanvas.ctx.save();
		mainCanvas.ctx.translate(this.getPosition.getX, this.getPosition.getY);
		mainCanvas.ctx.rotate( Math_rad(this.getRotation) );
		// mainCamera.ctx.globalAlpha = 1 - this.getTransparency;

		// Step 1 - Render Cube thing
		mainCanvas.centerSquare(
			zeroedVector2,
			this.getSize
		);
		mainCanvas.strokeprevious("white");
		mainCanvas.fillprevious("purple");

		// Step 2 - Render Trapezium thing... or sphere
		mainCanvas.circle(this.getSize.getX/2, 0, this.getSize.getY/3);
		mainCanvas.strokeprevious("white");
		mainCanvas.fillprevious("purple");

		const halfViewAngle = this.angleOfView * 0.5;
		// Step 3 - Visual lines?

		if (this.parent !== null && this.parent.lighthouseMode) {
			mainCanvas.ctx.rotate(-halfViewAngle);
			mainCanvas.lineBetween(
				new Vector2(0, 0),
				new Vector2(999, 0)
			).strokeprevious("white");
			mainCanvas.ctx.rotate(halfViewAngle);
			mainCanvas.ctx.rotate(halfViewAngle);
			mainCanvas.lineBetween(
				new Vector2(0, 0),
				new Vector2(999 ,0)
			).strokeprevious("white");
			mainCanvas.ctx.rotate(-halfViewAngle);
		}

		mainCanvas.ctx.restore();
	}
};
