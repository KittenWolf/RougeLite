import Canvas from "./Canvas.js";
import Component from "./Component.js";

/**
 * Represent Scene component
 * @augments Component
 */
export default class Scene extends Component {
	/**
	 * 
	 * @param {HTMLElement} context HTML element where created object will be appended
	 */
	constructor(context) {
		super(context, { classList: 'scene' });

		this.initElementContent();
	}

	initElementContent() {
		this.canvas = new Canvas(this.HTMLElement);
	}
}