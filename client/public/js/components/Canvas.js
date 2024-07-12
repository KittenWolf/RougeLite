import Component, { ComponentAttrs } from "./Component.js";

const CanvasAttrs = Object.assign(ComponentAttrs, {
	width: 0,
	height: 0
});

/**
 * Represent Canvas component
 * @augments Component
 */
export default class Canvas extends Component {
	/**
	 * 
	 * @param {HTMLElement} context HTML element where created object will be appended
	 * @param {CanvasAttrs} attrs Component attributes 
	 */
	constructor(context, attrs) {
		super(context, attrs, 'canvas');
	}
}