
export class Vector2 {
	constructor(x, y, parent) {
		this.className = "Vector2";
		this.name = "Vector2";
		this.x = x;
		this.y = y;
		this.parent = parent || null;
	}

	get getClassName() {
		return this.className;
	}
	get getName() {
		return this.name;
	}
	setName(name) {
		this.name = name;
		return this;
	}

	get getX() {
		return this.x;
	}
	get getY() {
		return this.y;
	}
	get getXY() {
		return {x:this.x, y:this.y};
	}

	steal(vec2) {
		this.x = vec2.getX;
		this.y = vec2.getY;
	}
	setX(x) {
		this.x = x;
		return this;
	}
	setY(y) {
		this.y = y;
		return this;
	}
	set(...args) {
		// console.log(args);
		if ((args.length === 1) && args[0] && (args[0].getX !== undefined && args[0].getY !== undefined)) {
			this.x = args[0].getX;
			this.y = args[0].getY;
		} else if ((args.length === 2) && typeof args[0] === "number" && typeof args[1] === "number") {
			this.x = args[0];
			this.y = args[1];
		} else {
			console.warn("no arguments provided to Vector2::set()");
		}
		// console.log(`${this.getName} set to (${this.getX}, ${this.getY})`);
		return this;
	}
	add(...args) {
		if ((args.length === 1) && args[0] && (args[0].getX !== undefined && args[0].getY !== undefined)) {
			this.x += args[0].getX;
			this.y += args[0].getY;
		} else if ((args.length === 2) && typeof args[0] === "number" && typeof args[1] === "number") {
			this.x += args[0];
			this.y += args[1];
		} else {
			// console.warn("no arguments provided to Vector2::add()");
			throw new Error(`Null or None arguments provided to Vector2::add()`);
		}
		return this;
	}
	minus(...args) {
		if ((args.length === 1) && args[0] && (args[0].getX !== undefined && args[0].getY !== undefined)) {
			this.x -= args[0].getX;
			this.y -= args[0].getY;
		} else if ((args.length === 2) && typeof args[0] === "number" && typeof args[1] === "number") {
			this.x -= args[0];
			this.y -= args[1];
		} else {
			console.warn("no arguments provided to Vector2::minus()");
		}
		return this;
	}
}

export const zeroedVector2 = new Vector2(0, 0);