class GameObject {
    tile;
    hasCollision = false;

    constructor(tile) {
        this.tile = tile;
    }

    destroy() {
        this.tile.type = "tileF";
    }
}