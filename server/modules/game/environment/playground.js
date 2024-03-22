import { Environment } from "./environment.js";

class Playground extends Environment {
    get obj() {
        return this.obj;
    }

    set obj(obj) {
        this.obj = obj;
    }

    constructor(point, tile) {
        super(point, tile);
    }

    init(option) {
        super.init(option);
    }
}

export class Floor extends Playground {
    constructor(point) {
        super(point, 'tileF');
        super.name = 'Floor';

        // super.init(config.environment.playground.floor);
        super.init({collision: false});
    }
}