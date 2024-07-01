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

		const marksCount = this.#layoutContext.offsetWidth / 16;
		const marks = this.#createRulerMarks(marksCount);
		
		marks.forEach(mark => {
			this.#horizontalRuler.appendChild(mark);
		});
	}

	#updateVerticalRulerMarks() {
		this.#verticalRuler.innerHTML = '';
		
		const marksCount = this.#layoutContext.offsetHeight / 16;
		const marks = this.#createRulerMarks(marksCount);
		
		marks.forEach(mark => {
			this.#verticalRuler.appendChild(mark);
		});
	}

	//#region Creation
	#createRulers() {
		this.#rulers = document.createElement('div');
		this.#rulers.id = 'rulers';

		this.#horizontalRuler = this.#createHorizontalRuler();
		this.#verticalRuler = this.#createVerticalRuler();

		this.#rulers.append(this.#horizontalRuler, this.#verticalRuler);
		this.#sceneContext.appendChild(this.#rulers);
	}

	#createMark(i) {
		var rulerMark = new RulerMark();

		var mark = (i % 4 == 0) 
			? rulerMark.createSpecialMark(i * 16)
			: rulerMark.createDefaultMark();

		return mark;
	}

	#createHorizontalRuler() {
		let horizontalRuler = document.createElement('div');
		horizontalRuler.id = 'horizontalRuler';
		horizontalRuler.classList = 'ruler-h';

		return horizontalRuler;
	}

	#createVerticalRuler() {
		let verticalRuler = document.createElement('div');
		verticalRuler.id = 'verticalRuler';
		verticalRuler.classList = 'ruler-v';
	
		return verticalRuler;
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
