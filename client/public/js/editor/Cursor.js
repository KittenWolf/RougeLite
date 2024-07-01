export default class Cursor {
	#sceneContext;
	#layoutContext;

	#cursor;
	#horizontalThumb;
	#verticalThumb;

	constructor(scene, layout) {
		this.#sceneContext = scene;
		this.#layoutContext = layout;

		this.#createCursorThumbs();
		this.#initEvents();
	}

	#initEvents() {
		const mouseMoveEvent = this.#mouseMoveEvent.bind(this);

		this.#layoutContext.addEventListener('mousemove', mouseMoveEvent);
	}

	//#region Creation
	#createCursorThumbs() {
		this.#cursor = document.createElement('div');
		this.#cursor.id = 'cursor';

		this.#horizontalThumb = this.#createHorizontalThumb();
		this.#verticalThumb = this.#createVerticalThumb();

		this.#cursor.append(this.#horizontalThumb, this.#verticalThumb);
		this.#sceneContext.appendChild(this.#cursor);
	}

	#createHorizontalThumb() {		
		let horizontalThumb = document.createElement('div');
		horizontalThumb.id = 'horizontalThumb';
		horizontalThumb.classList = 'horizontal-thumb';

		return horizontalThumb;
	}

	#createVerticalThumb() {
		let verticalThumb = document.createElement('dic');
		verticalThumb.id = 'verticalThumb';
		verticalThumb.classList = 'vertical-thumb';

		return verticalThumb;
	}
	//#endregion

	//#region Events
	#mouseMoveEvent(e) {
		// set offsetX and offsetY limits to max maplayout width and height
		var left = this.#layoutContext.offsetLeft;
		var top = this.#layoutContext.offsetTop;

		this.#horizontalThumb.style.left = `${e.offsetX + left}px`;
		this.#verticalThumb.style.top = `${e.offsetY + top}px`;
	}
	//#endregion
}