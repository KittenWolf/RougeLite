import { Button } from "./Button.js";
import Component from "./Component.js";

/**
 * Represent Sidebar component
 * @augments Component
 */
export default class Sidebar extends Component {
	/**
	 * 
	 * @param {HTMLElement} context HTML element where created object will be appended
	 */
	constructor(context) {
		super(context, { classList: 'sidebar closed-sidebar' });

		this.initElementContent();
		this.initElementEvents();
	}

	initElementContent() {
		this.closeButton = new Button(
			this.HTMLElement, 
			{ 
				classList: 'btn _sm-icon-btn _close-btn',
				title: 'Sidebar close button',
				type: 'button',
				innerHTML: '<i class="fas fa-times"></i>'
			});
	}
	
	initElementEvents() {
		const closeEvent = this.#closeSidebarToolEvent.bind(this);
		this.closeButton.setEvent('click', closeEvent);
	}

	#closeSidebarToolEvent() {
		this.HTMLElement.classList.replace('opened-sidebar', 'closed-sidebar');
	}
}