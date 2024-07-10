import { BrushTool } from './tools/brush/BrushTool.js';
import { config } from '../config.js';

import Component from '../components/Component.js';
import Toolbar from '../components/ToolBar.js';
import Sidebar from '../components/Sidebar.js';
import Game from '../components/Game.js';

class Workspace {
	#tools;
	#assets;

	constructor() {
		this.#assets = config.assets;

		this.#initElements();
		this.#initTools();
	}

	#initElements() {
		const pageWrapper = document.querySelector('.page-wrapper');

		this.toolbar = new Toolbar(pageWrapper);
		this.sidebar = new Sidebar(pageWrapper);

		const pageContent = new Component(pageWrapper, { classList: 'page-content' }, 'main').HTMLElement;

		this.game = new Game(pageContent);
	}

	#initTools() {
		this.#tools = {
			'brushTool': new BrushTool(this, this.#assets),
		}
	}
}

const workspace = new Workspace();
