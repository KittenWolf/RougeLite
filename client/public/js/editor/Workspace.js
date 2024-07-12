import { BrushTool } from './tools/brush/BrushTool.js';
import { config } from '../config.js';

import Component from '../components/Component.js';
import Toolbar from '../components/ToolBar.js';
import Sidebar from '../components/Sidebar.js';
import Game from '../components/Game.js';
import Scene from '../components/Scene.js';
import Canvas from '../components/Canvas.js';
import Rulers from './Rulers.js';
import Cursor from './Cursor.js';

export default class Workspace {
	#tools;
	#assets;

	constructor(projectSettings) {
		this.#assets = config.assets;

		this.projectSettings = projectSettings;

		this.#initElements();
		this.#initTools();
	}

	#initElements() {
		const pageWrapper = document.querySelector('.page-wrapper');

		this.toolbar = new Toolbar(pageWrapper);
		this.sidebar = new Sidebar(pageWrapper);

		const pageContent = new Component(pageWrapper, { classList: 'page-content' }, 'main').HTMLElement;

		this.game = new Game(pageContent);
		this.scene = new Scene(this.game.HTMLElement);
		this.canvas = new Canvas(this.scene.HTMLElement, 
			{
				classList: 'map-layout',
				width: this.projectSettings.width,
				height: this.projectSettings.height
			});

		this.rulers = new Rulers(this.scene.HTMLElement, this.canvas.HTMLElement);
		this.cursor = new Cursor(this.scene.HTMLElement, this.canvas.HTMLElement);
	}

	#initTools() {
		this.#tools = {
			'brushTool': new BrushTool(this, this.#assets),
		}
	}

	update(projectSettings) {
		this.projectSettings = projectSettings;

		this.scene.HTMLElement.innerHTML = '';
		this.canvas = new Canvas(this.scene.HTMLElement, 
			{
				classList: 'map-layout',
				width: this.projectSettings.width,
				height: this.projectSettings.height
			});

		this.rulers.update();
	}
}
