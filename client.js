// Boids, boilerplate code taken from "Project Q2"

import * as Utility from "./client-modules/utility.js";
import {Vector2} from "./client-modules/vector2.js";
// import Tilemap from "./client-modules/tilemap.js";
import Canvas from "./client-modules/canvas.js";
import {instances, Instance, boids} from "./client-modules/instance.js";
import Entity from "./client-modules/entity.js";
import Actor from "./client-modules/actor.js";
import Camera from "./client-modules/camera.js";
import Player from "./client-modules/player.js";
import Boid from "./client-modules/boid.js";
import {UserInputService} from "./client-modules/userInputService.js";
// import TileMap from "./client-modules/tilemap.js";

export const deltaTimeMultiplier = 3;

const mainCanvas = new Canvas(Utility.getElement("#canvas"));
window.addEventListener("resize", mainCanvas.resize.bind(mainCanvas));
export {mainCanvas};

const mainPlayer = new Player();
window.addEventListener("keydown", UserInputService.whenKeyboardDown);
window.addEventListener("keyup", UserInputService.whenKeyboardUp);
window.addEventListener("mousedown", UserInputService.whenMouseDown);
window.addEventListener("mouseup", UserInputService.whenMouseUp);
window.addEventListener("click", UserInputService.whenMouseClick);
export {mainPlayer};

const mainCamera = new Camera();
mainCamera.setPosition(100, 100);
setInterval(()=>{
	mainCamera.setRotation(mainCamera.getRotation + 30);
}, 500);
mainCanvas.setCamera(mainCamera);
export {mainCamera};

// mainPlayer.setVelocity(0, 0);
// mainPlayer.addAcceleration(new Vector2(0, 0.1));
console.log(mainPlayer);

mainPlayer.setPosition(new Vector2(200, 200)).setTransparency(1).setCanCollide(false);



// for (let i=0; i<100; i+=1) {
// 	const boid = new Boid();
// 	boid.setPosition(
// 		(Math.random() - 0.5) * mainCanvas.canvasElement.width,
// 		(Math.random() - 0.5) * mainCanvas.canvasElement.height
// 	);
// 	boid.setVelocity(
// 		(Math.random() - 0.5) * 10000,
// 		(Math.random() - 0.5) * 10000
// 	);
// }
const bobTheBoid = new Boid();
bobTheBoid.determinedColor = "#ff0000";
bobTheBoid.showRadiusForFieldOfView = true;



const input_toggleBoidsFieldOfView = Utility.g("#toggleBoidsFieldOfView");
input_toggleBoidsFieldOfView.addEventListener("change", ()=>{
	const value = input_toggleBoidsFieldOfView.checked;
	console.log(`Value now ${value}`);
	for (let boid of boids) {
		boid.showRadiusForFieldOfView = (!! value);
	}
	bobTheBoid.showRadiusForFieldOfView = true;
});

const input_inputNumberOfBoids = Utility.g("#inputNumberOfBoids");
function init_boids() {
	const num = Number(input_inputNumberOfBoids.value);
	console.log(num);
	if (boids.length > num) {
		boids = boids.slice(0, num - 1);
	} else {
		const delta = num - boids.length;
		for (let i = 0; i < delta; i += 1) {
			const boid = new Boid();
			boid.setPosition(
				(Math.random() - 0.5) * mainCanvas.canvasElement.width,
				(Math.random() - 0.5) * mainCanvas.canvasElement.height
			);
			boid.setVelocity(
				(Math.random() - 0.5) * 10000,
				(Math.random() - 0.5) * 10000
			);
		}
	}
}
input_inputNumberOfBoids.addEventListener("input", init_boids);
init_boids();

// console.log(Utility.g("#image_tileAtlas"));

console.log(`[%cMAIN client.js%c] Loaded.`, "color: purple", "color: black");
window.requestAnimationFrame(mainCanvas.update.bind(mainCanvas));


// TileMap.generateRandomTileMap();

