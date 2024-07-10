import Component, { ComponentAttrs } from "../../Component.js";

const InputAttrs = Object.assign(ComponentAttrs, {
	name: '',
	value: '',
	type: ''
});

/**
 * Represent Input component
 * @augments Component
 */
export class Input extends Component {
	/**
	 * 
	 * @param {HTMLElement} context HTML element where created object will be appended
	 * @param {InputAttrs} attrs Component attributes
	 */
	constructor(context, attrs) {
		super(context, attrs, 'input');
	}
}