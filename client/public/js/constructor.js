class Constructor {
	constructor() {
		this.#initGameConfiguration();
		this.#initConstructorElements();
		this.#initControls();
		this.#initEvents();
	}

	#initGameConfiguration() {
		this.configuration = {};

		// get request to server to get configuration data
		// fetch server response
	}

	#createNewScene() {

	}

	#initConstructorElements() {
		this.toolbar = document.getElementById("toolbar");
		this.sidebar = document.getElementById("sidebar");
		this.mapLayout = document.getElementById("mapLayout");
		this.constructorLayer = document.getElementById("constructorLayer");
		this.mapResolution = document.getElementById("mapResolution");
		this.mapName = document.getElementById("mapName");
	}

	#initControls() {
		this.closeSidebarBtn = this.sidebar.querySelector('#close-sidebar-btn');

		this.toolButtons = this.toolbar.querySelectorAll("button[data-tool]");

		this.nameEditor = document.getElementById("mapNameEditor");
		this.widthEditor = document.getElementById("mapWidthEditor");
		this.heightEditor = document.getElementById("mapHeightEditor");

		this.settingsForm = document.getElementById("settingsForm");
		this.settingsBtn = document.getElementById("settingsBtn");
	}

	#initEvents() {
		this.closeSidebarBtn.addEventListener("click", () => {
			this.sidebar.classList.replace("opened-sidebar", "closed-sidebar");
		});

		this.toolButtons.forEach(button => {
			button.addEventListener("click", () => this.#setActiveTool(button));
		});

		const calculateMapResolution = this.#calculateMapResolution.bind(this);
		const setMapName = this.#setMapName.bind(this);

		this.nameEditor.addEventListener("change", setMapName);
		this.widthEditor.addEventListener("change", calculateMapResolution);
		this.heightEditor.addEventListener("change", calculateMapResolution);
		// this.settingsBtn.addEventListener("click", (e) => {
		// 	this.settingsForm.submit();
		// });
	}

	#setMapName() {
		this.mapName.textContent = this.nameEditor.value;
	}

	#calculateMapResolution() {
		const width = +this.widthEditor.value;
		const height = +this.heightEditor.value;

		// change 16 to config tile scale;
		this.mapResolution.textContent = width * 16 + " x " + height * 16 + " px";
	}

	#setActiveTool(element) {
		if (this.sidebar.classList.contains("closed-sidebar")) {
			this.sidebar.classList.replace("closed-sidebar", "opened-sidebar");
		}

		const { tool, toolExtention } = element.dataset;

		if (this.activeTool) {
			this.activeTool.hidden = true;
		}

		const toolContent = document.querySelector(`div[data-tool=${tool}]`);
		toolContent.hidden = false;

		this.activeTool = toolContent;
	}
}

const constructor = new Constructor();
