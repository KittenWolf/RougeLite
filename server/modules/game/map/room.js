import Point from "../lib/point.js";
import { getRandomNumber } from "../lib/functions.js";

export class Room {
    constructor(point, width, height) {
        this.point = point;
        this.width = width;
        this.height = height;
    }
}

export class Room2 {
    #minSide = config.scene.room.minRoomSideLength;
    #maxSide = config.scene.room.maxRoomSideLength;

    constructor() {
        this.buildRoom();
    }

    // calculate empty space areas (polygons with EmptyTiles) and check if room entries posible
    // and check amount of playable tiles
    // if true return point
    getOptimalPosition(width, height) {
        return new Point(0, 0);
    }

    // return true if build successfull otherwise return false
    buildRoom() {        
        let width = getRandomNumber(this.#maxSide, this.#minSide);
        let height = getRandomNumber(this.#maxSide, this.#minSide);
        let point = this.getOptimalPosition(width, height);

        if (!point) return false;

        this.tiles = [];

        for (let y = 0; y < height; y++) {
            let line = [];

            for (let x = 0; x < width; x++) {
                // line.push(new Tile(point));
            }

            this.tiles.push(line);
        }
        
        return true;
    }
}