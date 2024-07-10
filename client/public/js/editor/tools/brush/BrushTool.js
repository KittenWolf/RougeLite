import { Tool } from "../Tool.js";
import { Button } from "../../../components/Button.js";
import BrushToolSidebarBlock from "./BrushToolSidebarBlock.js";

/**
 * Brush tool helps to create tiles, modify them and add to map layout
 * @augments Tool
 */
export class BrushTool extends Tool {
	/**
	 * 
	 * @param {Workspace} workspace 
	 * @param {*} assets Assests of the game
	 */
	constructor(workspace, assets) {
		super(workspace);

		this.assets = assets;

		this.initToolElements();
		this.initToolEvents();
	}

	initToolElements() {
		this.toolbarButton = new Button(
			this.toolbar,
			{
				classList: 'btn _sm-icon-btn _dark-btn',
				title: 'BrushTool',
				type: 'button',
				innerHTML: '<i class="fas fa-brush"></i>'
			});

		this.sidebarBlock = new BrushToolSidebarBlock(this.sidebar, this.assets);
	}
}
