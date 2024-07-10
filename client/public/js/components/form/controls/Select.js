import Component, { ComponentAttrs } from "../../Component.js";

const SelectAttrs = Object.assign(ComponentAttrs, {
	name: '',
	title: ''
});

/**
 * Represent Select component
 * @augments Component
 */
export class Select extends Component {
	#values;

	/**
	 * 
	 * @param {HTMLElement} context HTML element where created object will be appended
	 * @param {SelectAttrs} attrs Component attributes
	 * @param {Array<string>} values 
	 */
	constructor(context, attrs, values) {
		super(context, attrs, 'select');

		this.#values = values;

		this.initElementContent();
	}

	initElementContent() {
		this.#values.forEach(value => {
			new Option(this.HTMLElement, { value: value, innerText: value });
		});
	}
}

const OptionAttrs = Object.assign(ComponentAttrs, {
	value: ''
});

/**
 * Represent Option component
 * @augments Component
 */
class Option extends Component {
	/**
	 * 
	 * @param {HTMLElement} context HTML element where created object will be appended
	 * @param {OptionAttrs} attrs Component attributes
	 */
	constructor(context, attrs) {
		super(context, attrs, 'option');
	}
} 