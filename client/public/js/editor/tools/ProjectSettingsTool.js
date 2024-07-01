import Tool from "./Tool.js";

export default class ProjectSettingsTool extends Tool {
	constructor(editor) {
		super(editor, 'settingsTools');

		this.canvas = editor.canvas;
		this.rulers = editor.rulers;

		this.initToolElements();
		this.initToolEvents();
	}

	initToolElements() {
		this.mapNameInput = document.getElementById('mapNameEditor');
		this.mapWidthInput = document.getElementById('mapWidthEditor');
		this.mapHeightInput = document.getElementById('mapHeightEditor');

		this.createSceneBtn = document.getElementById('createSceneBtn');
	}

	initToolEvents() {
		const createSceneEvent = this.#createSceneEvent.bind(this);	
		this.createSceneBtn.addEventListener('click', createSceneEvent);
	}

	#createSceneEvent() {
		console.log(`Creating scene '${this.mapNameInput.value}'...`);
		
		const name = this.mapNameInput.value;
		const width = +this.mapWidthInput.value;
		const height = +this.mapHeightInput.value;

		this.canvas.style.minWidth = `${width * 16}px`;
		this.canvas.style.maxWidth = `${width * 16}px`;
		
		this.canvas.style.minHeight = `${height * 16}px`;
		this.canvas.style.maxHeight = `${height * 16}px`;

		this.rulers.update();
	}
}