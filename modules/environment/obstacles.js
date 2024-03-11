import { Environment } from "./environment.js";

class Obstacles extends Environment {
    constructor(point, tile) {
        super(point, tile);
    }

    init(option) {
        super.init(option);
    }
}

export class Wall extends Obstacles {
    constructor(point) {
        super(point, 'tileW');
        super.name = 'Wall';

        super.init(config.environment.obstacles.wall);
    }
}