
// environments
import { Wall } from "../environment/obstacles.js";
import { Floor } from "../environment/playground.js";

// characters
import { Rouge } from "../characters/enemies.js";
import { Player } from "../characters/player.js";

// items
import { HealthPotion } from "../items/collectable.js";
import { Sword } from "../items/consumable.js";

export const gameObjectsList = [
    new Wall(),
    new Floor(),

    new Player(),
    new Rouge(),

    new HealthPotion(),
    new Sword(),
];

export class GameObjects {
    constructor() {
        GameObjects.reset();
    }

    static reset() {
        this.list = {
            environment: {
                obstacles: [],
                playground: [],
            },
            characters: {
                player: undefined,
                enemies: [],
            },
            items: {
                collectable: [],
                consumable: [],
            }
        }

        this.matrix = this.#buildMatrix();
    }

    static add(obj) {
        this.#addIntoObject(obj);
        this.#addIntoMatrix(obj);
    }

    static delete(point) {
        this.#deleteObjByPoint(this.list, point);
        this.matrix[point.y][point.x] = undefined;
    }

    static getAll() {
        const { environment, characters, items } = this.list;

        return {
            objects: {
                environment,
                characters,
                items,
            },
            matrix: this.matrix
        }
    }

    static #buildMatrix() {
        const { width, height } = config.scene;
        const objs = [];

        for (let y = 0; y < height; y++) {
            const row = [];

            for (let x = 0; x < width; x++) {
                row.push(undefined);
            }

            objs.push(row);
        }

        return objs;
    }

    static #addIntoObject(obj) {
        this.#deleteObjByPoint(this.list, obj.tile.point);

        if (obj instanceof Wall) {
            this.list.environment.obstacles.push(obj);
        }

        if (obj instanceof Floor) {
            this.list.environment.playground.push(obj);
        }

        if (obj instanceof Player) {
            this.list.characters.player = obj;
        }

        if (obj instanceof Rouge) {
            this.list.characters.enemies.push(obj);
        }

        if (obj instanceof HealthPotion) {
            this.list.items.collectable.push(obj);
        }

        if (obj instanceof Sword) {
            this.list.items.consumable.push(obj);
        }
    }

    static #addIntoMatrix(obj) {
        const { x, y } = obj.tile.point
        this.matrix[y][x] = obj;
    }

    static #deleteObjByPoint(obj, point) {
        for (const key in obj) {
            if (typeof obj[key] === "object") {
                let nestedObj = obj[key];

                if (nestedObj instanceof Player && nestedObj.tile.point.equals(point)) {
                    // delete player
                    nestedObj = undefined;
                    return;
                }

                if (Array.isArray(nestedObj)) {
                    const index = nestedObj.findIndex(item => item && item.tile.point.equals(point));
                    
                    if (index !== -1) {
                        nestedObj.splice(index, 1);
                        return;
                    }
                }

                this.#deleteObjByPoint(nestedObj, point);                
            }
        }
    }
}