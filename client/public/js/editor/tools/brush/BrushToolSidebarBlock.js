import Tile from "../../Tile.js";
import Component, { ComponentAttrs } from "../../../components/Component.js";
import { SelectFormControl } from "../../../components/form/groups/FormControl.js";

/**
 * Represent Brush tool sidebar block component
 * @augments Component
 */
export default class BrushToolSidebarBlock extends Component {
	#themes = [];
	#types = [];
	#sizes = [];
	#tiles = [];

	selectedTheme = 'all';
	selectedType = 'all';
	selectedSize = 'all';
	selectedTile;

	/**
	 * 
	 * @param {HTMLElement} context HTML element where created object will be appended
	 * @param {any} assets Assests of the game
	 */
	constructor(context, assets) {
		super(context, { innerHTML: '<h2><i class="fas fa-brush"></i> Brush tool</h2>' });

		this.#parseAssets(assets);

		this.initElementContent();
		this.initElementEvents();

		this.updateTileCollection();
	}

	initElementContent() {
		this.themeSelectFormControl = new SelectFormControl(
			this.HTMLElement,
			'theme-selector',
			'Theme',
			this.#themes,
			true);

		this.typeSelectFormControl = new SelectFormControl(
			this.HTMLElement,
			'tileType-selector',
			'Type',
			this.#types,
			true);

		this.sizeSelectFormControl = new SelectFormControl(
			this.HTMLElement,
			'tileSize-selector',
			'Size',
			this.#sizes,
			true);

		this.tileCollection = new Component(
			this.HTMLElement,
			{
				classList: 'tile-collection'
			});
	}

	initElementEvents() {
		const selectThemeEvent = this.setSelectedTheme.bind(this);
		const selectTypeEvent = this.setSelectedType.bind(this);
		const selectSizeEvent = this.setSeletedSize.bind(this);

		this.themeSelectFormControl.formElement.setEvent('change', selectThemeEvent);
		this.typeSelectFormControl.formElement.setEvent('change', selectTypeEvent);
		this.sizeSelectFormControl.formElement.setEvent('change', selectSizeEvent);
	}

	setSelectedTheme() {
		this.selectedTheme = this.themeSelectFormControl.getValue();
		this.updateTileCollection();
	}

	setSelectedType() {
		this.selectedType = this.typeSelectFormControl.getValue();
		this.updateTileCollection();
	}

	setSeletedSize() {
		this.selectedSize = this.sizeSelectFormControl.getValue();
		this.updateTileCollection();
	}

	updateTileCollection() {
		const tiles = this.#getTilesByOptions();
		this.tileCollection.HTMLElement.innerHTML = '';

		const fragment = document.createDocumentFragment();

		tiles.forEach(tile => {
			const obj = tile.getHTMLElement();
			fragment.appendChild(obj);
		});

		this.tileCollection.HTMLElement.appendChild(fragment);
	}

	#parseAssets(assets) {
		this.assets = assets;

		for (const theme in this.assets) {
			if (!this.#themes.includes(theme)) {
				this.#themes.push(theme);
			}

			for (const type in this.assets[theme]) {
				if (!this.#types.includes(type)) {
					this.#types.push(type);
				}

				for (const size in this.assets[theme][type]) {
					if (!this.#sizes.includes(size)) {
						this.#sizes.push(size);
					}

					this.assets[theme][type][size].forEach(tile => {
						const _ = new Tile(theme, type, size, tile.Name, tile.Width, tile.Height);
						this.#tiles.push(_);
					});
				}
			}
		}
	}

	#getTilesByOptions() {
		const tiles = [];

		this.#tiles.forEach(t => {
			if ((t.theme == this.selectedTheme || this.selectedTheme == 'all') &&
				(t.type == this.selectedType || this.selectedType == 'all') &&
				(t.size == this.selectedSize || this.selectedSize == 'all')) {
				tiles.push(t);
			}
		});

		return tiles;
	}
}