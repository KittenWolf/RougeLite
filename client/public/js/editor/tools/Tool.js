export default class Tool {
	#editor;
	
	#sidebarTool;
	#toolbarButton;
	#sidebarCloseButton;

	#name;

	constructor(editor, name) {		
		console.log(`Initialization '${name}' tool...`);
		
		this.#name = name;
		this.#editor = editor;
	
		this.#initGeneralElements();
		this.#initGeneralEvents();
	}

	initToolElements() {}
	initToolEvents() {}

	#initGeneralElements() {
		this.#toolbarButton = this.#editor.toolbar.querySelector(`button[data-tool=${this.#name}]`);
		this.#sidebarTool = this.#editor.sidebar.querySelector(`div[data-tool=${this.#name}]`);
		
		this.#sidebarCloseButton = this.#editor.sidebar.querySelector('#close-sidebar-btn');
	}

	#initGeneralEvents() {
		const openSidebarToolEvent = this.#openSidebarToolEvent.bind(this);
		const closeSidebarToolEvent = this.#closeSidebarToolEvent.bind(this);

		this.#toolbarButton.addEventListener('click', openSidebarToolEvent);
		this.#sidebarCloseButton.addEventListener('click', closeSidebarToolEvent);
	}

	//#region Events
	#openSidebarToolEvent() {
		this.#editor.sidebar.classList.replace('closed-sidebar', 'opened-sidebar');
		this.setActive();
	}

	#closeSidebarToolEvent() {
		this.#editor.sidebar.classList.replace('opened-sidebar', 'closed-sidebar');
		this.removeActive();
	}

	setActive() {
		if (this.#editor.selectedTool) {
			this.#editor.selectedTool.removeActive();
		}

		this.#sidebarTool.hidden = false;		
		this.#editor.selectedTool = this;
	}

	removeActive() {
		this.#sidebarTool.hidden = true;
	}
	//#endregion
}