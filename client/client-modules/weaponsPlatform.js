
import Hellfire from "./hellfire.js";
import {mainCanvas, mainCamera, mouse, hellfireEnabled} from "../client.js";

export default class WeaponsPlatform {
	static hellfire() {
		if (hellfireEnabled) {
			const hf = new Hellfire();
			const px = mouse.x - mainCanvas.canvasElement.halfWidth;
			const py = mouse.y - mainCanvas.canvasElement.halfHeight;
			hf.setPosition(px, py);
			//this.canvasElement.halfWidth - this.camera.getPosition.getX, this.canvasElement.halfHeight - this.camera.getPosition.getY
			hf.initLaser();
			console.log(`Hellfire at ${px}, ${py}`);
		}
	}
}