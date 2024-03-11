import { Character } from "./character.js";

class Enemy extends Character {
    constructor(point, tile) {
        super(point, tile);
    }
}

export class Rouge extends Enemy {
    constructor(point) {
        super(point, 'tileE');
        super.name = 'Rouge';

        super.init(config.characters.enemies.rouge);
    }
}