import { Character } from "./character.js";

export class Player extends Character {
    constructor(point) {
        super(point, 'tileP');
        super.name = 'Player';

        // super.init(config.characters.player);
        super.init({defaultMaxHealth: 100, defaultDamage: 15});
    }
}