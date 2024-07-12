import { config } from "../config.js";

export default class Rulers {
	#sceneContext;
	#layoutContext;

	#rulers;
	#horizontalRuler;
	#verticalRuler;

	constructor(scene, layout) {
		this.#sceneContext = scene;
		this.#layoutContext = layout;

		this.#createRulers();
	}

	update() {
		this.#updateHorizontalRulerMarks();
		this.#updateVerticalRulerMarks();
	}

	#updateHorizontalRulerMarks() {
		this.#horizontalRuler.innerHTML = '';

		const marksCount = this.#layoutContext.offsetWidth / config.tileSize;
		const marks = this.#createRulerMarks(marksCount);
		
		marks.forEach(mark => {
			this.#horizontalRuler.appendChild(mark);
		});
	}

	#updateVerticalRulerMarks() {
		this.#verticalRuler.innerHTML = '';
		
		const marksCount = this.#layoutContext.offsetHeight / config.tileSize;
		const marks = this.#createRulerMarks(marksCount);
		
		marks.forEach(mark => {
			this.#verticalRuler.appendChild(mark);
		});
	}

	//#region Creation
	#createRulers() {
		this.#rulers = document.createElement('div');
		this.#rulers.id = 'rulers';

		this.#createHorizontalRuler();
		this.#createVerticalRuler();

		this.#rulers.append(this.#horizontalRuler, this.#verticalRuler);
		this.#sceneContext.appendChild(this.#rulers);
	}

	#createHorizontalRuler() {
		this.#horizontalRuler = document.createElement('div');
		this.#horizontalRuler.id = 'horizontalRuler';
		this.#horizontalRuler.classList = 'ruler-h';

		this.#updateHorizontalRulerMarks();
	}

	#createVerticalRuler() {
		this.#verticalRuler = document.createElement('div');
		this.#verticalRuler.id = 'verticalRuler';
		this.#verticalRuler.classList = 'ruler-v';

		this.#updateVerticalRulerMarks();
	}

	#createMark(i) {
		var rulerMark = new RulerMark();

		var mark = (i % 4 == 0) 
			? rulerMark.createSpecialMark(i * config.tileSize)
			: rulerMark.createDefaultMark();

		return mark;
	}

	#createRulerMarks(count) {
		let marks = [];

		for (let i = 0; i < count; i++) {
			marks.push(this.#createMark(i));
		}

		return marks;
	}
	//#endregion
}

class RulerMark {
	constructor() {

	}

	createDefaultMark() {
		var mark = document.createElement('div');

		mark.classList = 'ruler-mark';

		return mark;
	}

	createSpecialMark(text) {
		var mark = document.createElement('div');
		var span = document.createElement('span');

		mark.classList = 'ruler-mark-special';
		span.classList = 'ruler-mark-text';

		span.innerHTML = text;

		mark.appendChild(span);

		return mark;
	}
}
