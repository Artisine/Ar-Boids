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
import Diep from "./client-modules/diep.js";
import {UserInputService, controlsApplyTo} from "./client-modules/userInputService.js";
// import TileMap from "./client-modules/tilemap.js";

export var mouse = {x: undefined, y: undefined};
export var deltaTimeMultiplier = 3;
const minimumCountBoids = 5;
const maximumCountBoids = 300;
var boidsViewFieldVisible = false;
export var hellfireEnabled = false;

const mainCanvas = new Canvas(Utility.getElement("#canvas"));
window.addEventListener("resize", mainCanvas.resize.bind(mainCanvas));
export {mainCanvas};

const mainPlayer = new Player();
controlsApplyTo.set(mainPlayer.id, mainPlayer);
window.addEventListener("keydown", UserInputService.whenKeyboardDown);
window.addEventListener("keyup", UserInputService.whenKeyboardUp);
mainCanvas.canvasElement.addEventListener("mousedown", UserInputService.whenMouseDown);
mainCanvas.canvasElement.addEventListener("mouseup", UserInputService.whenMouseUp);
mainCanvas.canvasElement.addEventListener("click", UserInputService.whenMouseClick);
mainCanvas.canvasElement.addEventListener("mousemove", UserInputService.whenMouseMove);
export {mainPlayer};


const mainCamera = new Camera();
mainCamera.setPosition(0, 0);
// setInterval(()=>{
// 	mainCamera.setRotation(mainCamera.getRotation + 0.3);
// }, 5);
mainCanvas.setCamera(mainCamera);
export {mainCamera};

// mainPlayer.setVelocity(0, 0);
// mainPlayer.addAcceleration(new Vector2(0, 0.1));
console.log(mainPlayer);

mainPlayer.setPosition(new Vector2(200, 200)).setTransparency(1).setCanCollide(false);

const mainDiep = new Diep();
mainDiep.setPosition(mainPlayer.getPosition.getX, mainPlayer.getPosition.getY);
mainPlayer.bindControlsTo(mainDiep);
mainPlayer.removeControlsFrom(mainDiep);
mainDiep.setTransparency(1).setCanCollide(false);


const bobTheBoid = new Boid();
bobTheBoid.determinedColor = "#ff0000";
bobTheBoid.showRadiusForFieldOfView = true;
bobTheBoid.setName("Bob The Boid");
bobTheBoid.setInvulnerable(true);


setInterval(()=>{
	updateBoidsCountText();
}, 1000);



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
	updateBoidsCountText();
}; init_boids();
export function updateBoidsCountText() {
	input_rangeNumberOfBoids_text.innerHTML = `${boids.length}x`;
}
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
	if (checked) {
		input_rangeLighthouseFOV.disabled = false;
	} else {
		input_rangeLighthouseFOV.disabled = true;
	}
}


const input_rangeLighthouseFOV = Utility.g("#rangeLighthouseFOV");
const input_rangeLighthouseFOV_text = Utility.g("#rangeLighthouseFOV-text");
input_rangeLighthouseFOV.addEventListener("input", lighthouseChangeFOV);
function lighthouseChangeFOV() {
	const value = Number(input_rangeLighthouseFOV.value);
	mainCamera.angleOfView = value;
	input_rangeLighthouseFOV_text.innerHTML = `${value}`;
}; lighthouseChangeFOV();


const input_toggleHellfire = Utility.g("#toggleHellfire");
input_toggleHellfire.addEventListener("input", togglehellfire);
function togglehellfire() {
	const checked = input_toggleHellfire.checked;
	hellfireEnabled = checked;
	if (checked) {
		document.body.classList.add("cursor-crosshair");
	} else {
		document.body.classList.remove("cursor-crosshair");
	}
}


export function changeMouseCursorIfMouseOverBoid() {
	var valid = false;
	let closest_dist = Infinity;
	let closest = null;
	for (let i = 0; i < boids.length; i += 1) {
		const boid = boids[i];
		const dist = Utility.distanceBetweenPoints(new Vector2(mouse.x, mouse.y), boid.getPosition);
		
		if (dist <= 50) {
			console.log(`${boid.id}  to  mouse: ${dist}`);
			valid = true;
		}
	}
	// console.log({a: closest_dist, b: closest});
	if (valid) {
		document.body.classList.add("cursor-pointer");
	} else {
		document.body.classList.remove("cursor-pointer");
	}
}


// console.log(Utility.g("#image_tileAtlas"));

console.log(`[%cMAIN client.js%c] Loaded.`, "color: purple", "color: black");
window.requestAnimationFrame(mainCanvas.update.bind(mainCanvas));


// TileMap.generateRandomTileMap();

