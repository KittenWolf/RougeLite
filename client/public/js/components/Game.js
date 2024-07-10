import Scene from "./Scene.js";
import Component from "./Component.js";

/**
 * Represent Game component
 * @augments Component
 */
export default class Game extends Component {
	/**
	 * 
	 * @param {HTMLElement} context HTML element where created object will be appended
	 */
	constructor(context) {
		super(context, { classList: 'game' });

		this.initElementContent();
	}

	initElementContent() {
		this.scene = new Scene(this.HTMLElement);
	}
}