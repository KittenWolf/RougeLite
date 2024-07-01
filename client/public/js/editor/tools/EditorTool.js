import Tool from "./Tool.js";

export default class EditorTool extends Tool {
	constructor(editor) {
		super(editor, 'editorTools');

		this.initToolElements();
		this.initToolEvents();
	}
}