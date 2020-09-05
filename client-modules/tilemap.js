import {Vector2} from "./vector2.js";
const tilemapIndex = {
	0: null,
	// ^ large dirt and grassy patch

	1: [new Vector2(0, 192), new Vector2(64, 256)],
	// ^ Stone Block 1

	2: [new Vector2(64, 192), new Vector2(128, 256)],
	// ^ Stone Block 2

	3: [new Vector2(128, 192), new Vector2(192, 256)],
	// ^ Stone Block 3

	4: [new Vector2(192, 192), new Vector2(256, 256)],
	// ^ Stone Block 4

	5: [new Vector2(0, 0), new Vector2(192, 192)],
	// ^ Large dirt square with grass patch

};

// 1st dimension array  = X axis
// 2nd dimension arrays = Y axis
let tilemapRepresentation = null;

export default class TileMap {
	static generateTilemap(x_length, y_length) {
		const tilemapIndexKeyArray = Object.keys(tilemapIndex);
		tilemapRepresentation = [];
		for (let x = 0; x < x_length; x += 1) {
			tilemapRepresentation.push([]);
			for (let y = 0; y < y_length; y += 1) {
				tilemapRepresentation[x][y] = tilemapIndexKeyArray[Math.floor(Math.random() * tilemapIndexKeyArray.length)];
			}
		}
		return tilemapRepresentation;
	}
	static generateRandomTileMap(optionsObject=null) {
		if (optionsObject === null) {
			TileMap.generateTilemap(10, 10);
		} else if (typeof optionsObject === "object" && (optionsObject.width !== undefined && optionsObject.height !== undefined)) {
			TileMap.generateTilemap(
				Math.floor(optionsObject.width),
				Math.floor(optionsObject.height)
			);
		}
		console.log(tilemapRepresentation);
	}

	
}
