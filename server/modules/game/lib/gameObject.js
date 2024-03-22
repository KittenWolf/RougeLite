import Tile from "./tile.js";

export default class GameObject {
    name;
    tile;
    spreadMultiplier;

    constructor(point, tileType) {
        this.tile = new Tile(point, tileType);
    }

    init(options) {
        this.spreadMultiplier = options?.spreadMultiplier ?? 0;
        this.collision = options?.collision ?? false;
    }
};