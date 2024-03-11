import Point from "./point.js";

// environments
import { Wall } from "../environment/obstacles.js";
import { Floor } from "../environment/playground.js";

// characters
import { Player } from "../characters/player.js";
import { Rouge } from "../characters/enemies.js";

// items
import { HealthPotion } from "../items/collectable.js";
import { Sword } from "../items/consumable.js";
import GameObject from "./gameObject.js";

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
        return {
            objects: {
                environment: this.list.environment,
                characters: this.list.characters,
                items: this.list.items
            },
            matrix: this.matrix
        }
    }

    static #buildMatrix() {
        let width = config.scene.width;
        let height = config.scene.heigth;
        let objs = [];

        for (let y = 0; y < height; y++) {
            let row = [];

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
        let x = obj.tile.point.x;
        let y = obj.tile.point.y;

        this.matrix[y][x] = obj;
    }

    static #deleteObjByPoint(obj, point) {
        for (const key in obj) {
            if (typeof obj[key] === "object") {
                let nestedObj = obj[key];

                if (nestedObj instanceof Player) {
                    if (nestedObj.tile.point.equals(point)) {
                        nestedObj = undefined;
                        return;
                    }
                } else if (Array.isArray(nestedObj)) {
                    for (let i = 0; i < nestedObj.length; i++) {
                        if (nestedObj[i] && nestedObj[i].tile.point.equals(point)) {
                            nestedObj.splice(i, 1);
                            return;
                        };
                    }
                } else {
                    this.#deleteObjByPoint(nestedObj, point);
                }
            }
        }
    }
}