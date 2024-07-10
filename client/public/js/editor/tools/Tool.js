/**
 * Represents a parent class of each tool on workspace 
 */
export class Tool {
	#workspace;
	
	toolbar;
	sidebar;

	toolbarButton;
	sidebarBlock;
	
	/**
	 * @param {Workspace} workspace 
	 */
	constructor(workspace) {
		this.#workspace = workspace;

		this.toolbar = workspace.toolbar.HTMLElement;
		this.sidebar = workspace.sidebar.HTMLElement;
	}

	/**
	 * Initialize tool HTML elements
	 * @abstract
	 */
	initToolElements() {}

	initToolEvents() {
		const openSidebarToolEvent = this.#openSidebarToolEvent.bind(this);
		this.toolbarButton.setEvent('click', openSidebarToolEvent);
	}

	#openSidebarToolEvent() {
		this.sidebar.classList.replace('closed-sidebar', 'opened-sidebar');
	}
}