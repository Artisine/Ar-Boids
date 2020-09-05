import * as Utility from "./utility.js";

export const instances = new Map();

export class Instance {
	constructor() {
		this.className = "Instance";
		this.name = "Instance";
		this.id = Utility.createSnowflake();
		this.parent = null;

		if (!!! instances.get(this.id)) {
			instances.set(this.id, this);
		}
		// console.log(instances.get(this.id));
		console.log(`${this.className} ${this.id} created.`);

		return instances.get(this.id);
	}
	get getClassName() {
		return this.className;
	}
	get getName() {
		return this.name;
	}
	get getId() {
		return this.id;
	}
	setName(name) {
		this.name = name;
		return this;
	}
	setParent(parent) {
		this.parent = parent;
		return this;
	}
	
};