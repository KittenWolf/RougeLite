import Component, { ComponentAttrs } from "../../Component.js";

const LabelAttrs = Object.assign(ComponentAttrs, {
	for: '',
});

/**
 * Represent Label component
 * @augments Component
 */
export class Label extends Component {
	/**
	 * 
	 * @param {HTMLElement} context HTML element where created object will be appended
	 * @param {LabelAttrs} attrs Component attributes
	 */
	constructor(context, attrs) {
		super(context, attrs, 'label');
	}
}