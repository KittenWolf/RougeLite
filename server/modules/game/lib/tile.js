export default class Tile {
    static get size() {
        return 16;
    }

    constructor(point, type) {
        this.point = point;
        this.type = type;
    }
}