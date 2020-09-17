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

export var deltaTimeMultiplier = 3;
const minimumCountBoids = 5;
const maximumCountBoids = 300;
var boidsViewFieldVisible = false;

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
// setInterval(()=>{
// 	mainCamera.setRotation(mainCamera.getRotation + 0.3);
// }, 5);
mainCanvas.setCamera(mainCamera);
export {mainCamera};

// mainPlayer.setVelocity(0, 0);
// mainPlayer.addAcceleration(new Vector2(0, 0.1));
console.log(mainPlayer);

mainPlayer.setPosition(new Vector2(200, 200)).setTransparency(1).setCanCollide(false);




const bobTheBoid = new Boid();
bobTheBoid.determinedColor = "#ff0000";
bobTheBoid.showRadiusForFieldOfView = true;
bobTheBoid.setName("Bob The Boid");



const input_toggleBoidsFieldOfView = Utility.g("#toggleBoidsFieldOfView");
input_toggleBoidsFieldOfView.addEventListener("change", ()=>{
	const value = input_toggleBoidsFieldOfView.checked;
	boidsViewFieldVisible = value;
	// console.log(`BoidsViewFieldVisible now ${value}`);
	for (let boid of boids) {
		boid.showRadiusForFieldOfView = boidsViewFieldVisible;
	}
	bobTheBoid.showRadiusForFieldOfView = true;
});

const input_rangeNumberOfBoids = Utility.g("#rangeNumberOfBoids");
const input_rangeNumberOfBoids_text = Utility.g("#rangeNumberOfBoids-text");
function init_boids() {
	let num = Number(input_rangeNumberOfBoids.value);
	if (num < minimumCountBoids) num = minimumCountBoids;
	else if (num > maximumCountBoids) num = maximumCountBoids;
	if (boids.length > num) {
		const delta = boids.length - num;
		try {
			for (let i = 0; i < delta; i += 1) {
				const k = (boids.length - delta) + i;
				boids[k].destroy();
			}
		} catch(err) {
			console.error(err);
		}
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
			boid.showRadiusForFieldOfView = boidsViewFieldVisible;
		}
	}
	input_rangeNumberOfBoids_text.innerHTML = `${boids.length}x`;
}; init_boids();
input_rangeNumberOfBoids.addEventListener("input", init_boids);


const input_rangeBoidsSpeed = Utility.g("#rangeBoidsSpeed");
const input_rangeBoidsSpeed_text = Utility.g("#rangeBoidsSpeed-text");
input_rangeBoidsSpeed.addEventListener("input", boids_speed);
function boids_speed() {
	try {
		const value = Number(input_rangeBoidsSpeed.value);
		input_rangeBoidsSpeed_text.innerHTML = `${value}x`;
		deltaTimeMultiplier = value;
	} catch(err) {
		console.error(err);
		// alert(err);
	}
}; boids_speed();


const input_toggleLighthouseMode = Utility.g("#toggleLighthouseMode");
input_toggleLighthouseMode.addEventListener("change", lighthouse_mode);
function lighthouse_mode() {
	const checked = input_toggleLighthouseMode.checked;
	mainCanvas.lighthouseMode = checked;
	console.log(`Lighthouse Mode ${(checked) ? "ON" : "Off"}.`);
}


// console.log(Utility.g("#image_tileAtlas"));

console.log(`[%cMAIN client.js%c] Loaded.`, "color: purple", "color: black");
window.requestAnimationFrame(mainCanvas.update.bind(mainCanvas));


// TileMap.generateRandomTileMap();

