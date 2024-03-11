export default class Tile {
    static get size() {
        return 50;
    }

    constructor(point, type) {
        this.point = point;
        this.type = type;
    }
}