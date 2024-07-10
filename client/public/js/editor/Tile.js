import { config } from "../config.js";

export const CollisionTypes = Object.freeze({
	0: 'none',
	1: 'water',
	2: 'playground',
	3: 'collision'
});

/**
 * Represents a Tile - the main map constructor element
 */
export default class Tile {
	/** Represents full path to image source */
	#fullPath;
	/** Array of all collision parts @type {Array<CollisionTypes>} */
	#array;

	/**
	 * @param {string} theme Tile theme
	 * @param {string} type Tile type 
	 * @param {string} size Tile size classification
	 * @param {string} name Tile image file name 
	 * @param {number} width Tile width in pixels
	 * @param {number} height Tile height in pixels 
	 */
	constructor(theme, type, size, name, width, height) {
		this.theme = theme;
		this.type = type;
		this.size = size;
		this.name = name;
		this.width = width;
		this.height = height;

		this.#fullPath = `${config.assetsPath}${this.theme}/${this.type}/${this.name}`;
		
		this.setCollisionArray();
	}

	setCollisionArray() {
		this.#array = Array.from(Array(this.height / config.tileSize), () => new Array(this.width / config.tileSize)).fill(CollisionTypes[0]);
	}

	getFullPath() {
		return this.#fullPath;
	}

	getHTMLElement() {
		let div = document.createElement('div');

		if (this.size == 'others') {
			div.style.width = `${this.width}px`;
			div.style.height = `${this.height}px`;
		}

		div.classList = `${this.size}Tile`;
		div.style.backgroundImage = `url(${this.getFullPath()})`;

		return div;
	}
}