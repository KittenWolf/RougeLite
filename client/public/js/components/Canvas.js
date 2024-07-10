import Component from "./Component.js";

/**
 * Represent Canvas component
 * @augments Component
 */
export default class Canvas extends Component {
	/**
	 * 
	 * @param {HTMLElement} context HTML element where created object will be appended
	 */
	constructor(context) {
		super(context, { classList: 'map-layout map-grid' }, 'canvas');
	}
}