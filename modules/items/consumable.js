import { Item } from "./item.js";

class Consumable extends Item {
    constructor(point, tile) {
        super(point, tile);
    }

    init(option) {
        super.init(option);
    }

    consume() {

    }
}

export class Sword extends Consumable {
    #attackBuff;

    constructor(point) {
        super(point, 'tileSW');
        super.hasCollision = false;
        super.name = 'Sword';

        this.init(config.items.consumable.sword);
    }

    init(options) {
        super.init(options);
        
        this.#attackBuff = options.attackBuff;
    }
}