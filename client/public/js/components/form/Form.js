import Component from "../Component.js";

/** 
 * Represent Form component 
 * @augments Component 
 * */
export default class Form extends Component {
	/**
	 * 
	 * @param {HTMLElement} context HTML element where created object will be appended
	 */
	constructor(context) {
		super(context, { classList: 'form solid-form' }, 'form');
	}
}