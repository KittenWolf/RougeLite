import { Scene } from './scene.js';
import { GameObjects } from './lib/gameObjects.js';

export class Game {
    #scene;

    constructor(scene) {
        this.#scene = scene ?? new Scene();
    }

    start() {
        this.#initPlayerControlEvents();
    }

    end() {
        this.#removePlayerControlsEvents();
    }

    #initPlayerControlEvents() {
        this.moveEvent = this.moveEvent.bind(this);
        document.addEventListener("keydown", this.moveEvent);
    }

    #removePlayerControlsEvents() {
        this.moveEvent = this.moveEvent.bind(this);
        document.removeEventListener("keydown", this.moveEvent);
    }

    moveEvent(e) {
        let stepX = 0;
        let stepY = 0;

        let player = GameObjects.list.characters.player;

        switch (e.code) {
            case "KeyW":
                stepY -= 1;
                this.moveCharacter(player, stepX, stepY);
                break;

            case "KeyA":
                stepX -= 1;
                this.moveCharacter(player, stepX, stepY);
                break;

            case "KeyS":
                stepY += 1;
                this.moveCharacter(player, stepX, stepY);
                break;

            case "KeyD":
                stepX += 1;
                this.moveCharacter(player, stepX, stepY);
                break;

            default:
                break;
        }
    }

    enemyMove() {

    }

    moveCharacter(character, stepX, stepY) {
        let x = character.tile.point.x;
        let y = character.tile.point.y;

        // Need to check array index.
        let object = GameObjects.matrix[y + stepY][x + stepX];

        if (object.collision || !object.tile.type) {
            return;
        }

        this.#scene.swapGameObjects(GameObjects.matrix[y][x], GameObjects.matrix[y + stepY][x + stepX]);
    }

    checkTilesAround(character, depth, type) {
        let tiles = [];
        let tile = character.tile;

        // Need to check array index out of bounds. 
        let startX = tile.point.x - depth;
        let startY = tile.point.y - depth;
        let endX = tile.point.x + depth;
        let endY = tile.point.y + depth;

        for (let y = startY; y <= endY; y++) {
            for (let x = startX; x <= endX; x++) {
                if (GameObjects.matrix[y][x].tile.type == type) {
                    tiles.push(GameObjects.matrix[y][x]);
                }
            }
        }

        return tiles;
    }
}
