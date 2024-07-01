import Cursor from './Cursor.js';
import Rulers from './Rulers.js';
import BrushTool from './tools/BrushTool.js';
import EditorTool from './tools/EditorTool.js';
import GenerationTool from './tools/GenerationTool.js';
import ProjectSettingsTool from './tools/ProjectSettingsTool.js';

class Editor {
	selectedTool;

	#tools;

	constructor() {
		this.#initElements();
		this.#initTools();
	}

	#initElements() {
		console.log('Initialization editor elements...');

		this.toolbar = document.getElementById('toolbar');
		this.sidebar = document.getElementById('sidebar');
		this.scene = document.getElementById('scene');
		this.canvas = document.getElementById('mapLayout');

		this.cursor = new Cursor(this.scene, this.canvas);
		this.rulers = new Rulers(this.scene, this.canvas);
	}

	#initTools() {
		console.log('Initialization editor tools...');

		this.#tools = {
			'settingsTools': new ProjectSettingsTool(this),
			'generationTools': new GenerationTool(this),
			'brushTools': new BrushTool(this),
			// 'editorTools': new EditorTool(this)
		}

		this.selectedTool = this.#tools['settingsTools'];
	}
}

const editor = new Editor();
