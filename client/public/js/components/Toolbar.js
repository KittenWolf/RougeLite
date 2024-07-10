import Component from "./Component.js";

/**
 * Represent Toolbar component
 * @augments Component
 */
export default class Toolbar extends Component {
	/**
	 * 
	 * @param {HTMLElement} context HTML element where created object will be appended
	 */
	constructor(context) {
		super(context, { classList: 'toolbar' });
	}
}