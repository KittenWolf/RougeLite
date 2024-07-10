import Component, { ComponentAttrs } from "./Component.js";

const ButtonAttrs = Object.assign(ComponentAttrs, {
	type: '',
	title: ''
});

/**
 * Represent Button component
 * @augments Component
 */
export class Button extends Component {
	/**
	 * 
	 * @param {HTMLElement} context HTML element where created object will be appended
	 * @param {ButtonAttrs} attrs Component attributes
	 */
	constructor(context, attrs) {
		super(context, attrs, 'button');
	}
}