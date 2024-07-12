import { Button } from "./Button.js";
import Component from "./Component.js";

/** 
 * Represent Pupup component 
 * @augments Component 
 * */
export default class Popup extends Component {
	/**
	 * 
	 * @param {HTMLElement} context HTML element where created object will be appended
	 */
	constructor(context) {
		super(context, { classList: 'popup' });
	
		this.initElementContent();
		this.initElementEvents();
	}

	initElementContent() {
		this.closePopupButton = new Button(this.HTMLElement, 
			{
				classList: 'btn _sm-icon-btn _close-btn',
				type: 'button',
				title: 'Popup close button',
				innerHTML: '<i class="fas fa-times"></i>'
			});
	}

	initElementEvents() {
		const closePopupEvent = this.#closePopup.bind(this);
		this.closePopupButton.setEvent('click', closePopupEvent);
	}

	#closePopup() {
		this.HTMLElement.hidden = true;
	}
}