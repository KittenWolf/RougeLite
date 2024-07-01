import Tool from "./Tool.js";

export default class GenerationTool extends Tool {
	constructor(editor) {
		super(editor, 'generationTools');

		this.initToolElements();
		this.initToolEvents();
	}
}