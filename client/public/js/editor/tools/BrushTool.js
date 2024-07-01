import Tool from "./Tool.js";

export default class BrushTool extends Tool {
	constructor(editor) {
		super(editor, 'brushTools');

		this.initToolElements();
		this.initToolEvents();
	}
}