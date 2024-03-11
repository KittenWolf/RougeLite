import { Item } from "./item.js";

class Collectable extends Item {
    constructor(point, tile) {
        super(point, tile);
    }

    init(option) {
        super.init(option);
    }

    collect() {

    }
}

export class HealthPotion extends Collectable {
    #heal;

    constructor(point) {
        super(point, 'tileHP');
        super.hasCollision = false;
        super.name = 'HealthPotion';

        this.init(config.items.collectable.healthPotion);
    }

    init(options) {
        super.init(options);
        
        this.#heal = options.heal;
    }
}