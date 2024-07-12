import { InputFormControl } from "../components/form/groups/FormControl.js";
import { Button } from "../components/Button.js";

import Component from "../components/Component.js";
import Form from "../components/form/Form.js";
import Popup from "../components/Popup.js";
import Workspace from "./Workspace.js";
import { config } from "../config.js";

class Editor {
	#workspace;

	constructor() {
		this.#initElements();
		this.#initEvents();
	}

	#initElements() {
		const pageWrapper = document.querySelector('.page-wrapper');

		this.popup = new Popup(pageWrapper).HTMLElement;
		
		const title = new Component(this.popup, 
			{ 
				innerHTML: 'Basic project settings' 
			}, 'h2');

		this.form = new Form(this.popup);

		this.mapNameFormControl = new InputFormControl(this.form.HTMLElement, 'text', 'mapName', 'Map name');
		this.mapWidthFormControl = new InputFormControl(this.form.HTMLElement, 'text', 'mapWidth', 'Width');
		this.mapHeightFormControl = new InputFormControl(this.form.HTMLElement, 'text', 'mapHeight', 'Height');

		this.submitButton = new Button(this.form.HTMLElement, 
			{
				classList: 'btn _sm-btn _primary-btn',
				type: 'submit',
				title: 'Submit map config button',
				innerHTML: `Let's go!`
			});
	}

	#initEvents() {
		const setProjectSettingsEvent = this.#setProjectSettings.bind(this);
		this.form.setEvent('submit', setProjectSettingsEvent);
	}

	#setProjectSettings(e) {
		e.preventDefault();
		
		const target = e.currentTarget;

		this.projectSettings = {
			name: target['mapName'].value,
			width: +target['mapWidth'].value * config.tileSize,
			height: +target['mapHeight'].value * config.tileSize
		}

		if (this.#workspace) {
			this.#workspace.update(this.projectSettings);
		} 
		else {
			this.#workspace = new Workspace(this.projectSettings);
		}
	}
}

const editor = new Editor();