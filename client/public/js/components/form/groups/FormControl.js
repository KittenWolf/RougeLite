import Component, { ComponentAttrs } from "../../Component.js";
import { Input } from "../controls/Input.js";
import { Label } from "../controls/Label.js";
import { Select } from "../controls/Select.js";

/**
 * Represent Form control component with custom form element (input, select and etc.)
 * @augments Component
 */
class FormControl extends Component {
	label;
	formElement;

	/**
	 * 
	 * @param {HTMLElement} context HTML element where created object will be appended
	 * @param {ComponentAttrs} attrs Component attributes
	 */
	constructor(context, attrs) {
		super(context, attrs);
	}

	/**
	 * Get value from form element
	 * @abstract
	 * @returns {any}
	 */
	getValue() {}
}

/**
 * Represent Input form control component
 * @augments FormControl
 */
export class InputFormControl extends FormControl {
	type;
	name;
	labelText;

	constructor(context, type, name, labelText) {
		super(context, { classList: 'form-control _h' });

		this.type = type;
		this.name = name;
		this.labelText = labelText;

		this.initElementContent();
	}

	initElementContent() {
		this.label = new Label(this.HTMLElement, 
			{ 
				classList: 'form__label',
				innerHTML: this.labelText 
			});

		this.formElement = new Input(this.HTMLElement, 
			{ 
				classList: 'form-control__field', 
				type: this.type, 
				name: this.name 
			});
	}

	getValue() {
		return this.formElement.HTMLElement.value;
	}
}

/**
 * Represent Select form control component
 * @augments FormControl
 */
export class SelectFormControl extends FormControl {
	name;
	values = [];
	labelText;

	constructor(context, name, labelText, values, allValues) {
		super(context, { classList: 'form-control _h' });

		if (allValues) {
			this.values = ['all'];
		}

		this.name = name;
		this.labelText = labelText;

		values.map(v => this.values.push(v));

		this.initElementContent();
	}

	initElementContent() {
		this.label = new Label(this.HTMLElement, 
			{ 
				classList: 'form__label',
				innerHTML: this.labelText 
			});

		this.formElement = new Select(this.HTMLElement, 
			{ 
				classList: 'form-control__select', 
				name: this.name 
			}, this.values);
	}

	getValue() {
		return this.formElement.HTMLElement.value;
	}
}