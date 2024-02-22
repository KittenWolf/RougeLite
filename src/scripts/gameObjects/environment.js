class Wall extends GameObject {
    constructor(tile) {
        super(tile);
        super.hasCollision = true;
    }
}

class Floor extends GameObject {
    constructor(tile) {
        super(tile);
        super.hasCollision = false;
    }
}