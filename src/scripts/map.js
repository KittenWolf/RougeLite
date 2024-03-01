class Point {
    x;
    y;

    /**
     * @param {Number} x
     * @param {Number} y
     */ 
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Tile {
    point;
    type;

    /**
     * @param {Point} point
     * @param {tileType} type
     */        
    constructor(point, type) {
        this.point = point;
        this.type = type;
    }

    update(x, y, type) {
        this.point = new Point(x, y);
        this.type = type;
    }
}

class Room {
    point;
    width; 
    height;

    constructor(point, width, height) {
        this.point = point;
        this.width = width;
        this.height = height;
    }
}

class Corridor {
    start;
    end;

    /**
     * @param {Point} startPoint 
     * @param {Point} endPoint
     */ 
    constructor(startPoint, endPoint) {
        this.start = startPoint;
        this.end = endPoint;
        
        this.generate();
    }

    generate() {        
        let x = this.end.x;
        let y = this.end.y;

        let diffX = Math.abs(this.end.x - this.start.x);
        let diffY = Math.abs(this.end.y - this.start.y);

        let xIncrement = (this.end.x - this.start.x > 0) ? -1 : 1;
        let yIncrement = (this.end.y - this.start.y > 0) ? -1 : 1;

        while (diffX > 0) {
            this.changeTile(x, y, tileLib.playZones.floor.tile);
            x += xIncrement;
            diffX--;
        }

        while (diffY > 0) {
            this.changeTile(x, y, tileLib.playZones.floor.tile);
            y += yIncrement;
            diffY--;
        }
    } 
}

// May be better make a JSON file.
class MapConfiguration {
    #multipliers;
    
    width;
    height;

    hasRooms;
    autoRoomsGeneration;
    #minRoomSide = 3;
    #maxRoomSide = 8;

    playZonesMulitplier;
    enemiesMulitplier;
    itemsMulitplier;

    /**
     * @param {Number} width 
     * @param {Number} height 
     * @param {Boolean} containsRooms if you want to generate rooms on map use true
     */ 
    constructor(width, height, containsRoom = null) {
        this.#multipliers = Object.freeze({
            "Low": 0.5,
            "Normal": 1,
            "Many": 2
        });

        this.width = width;
        this.height = height;

        this.hasRooms = containsRoom ? true : false;

        this.playZonesMulitplier = this.#multipliers.Normal;
        this.enemiesMulitplier = this.#multipliers.Normal;
        this.itemsMulitplier = this.#multipliers.Normal;
    }

    getMinRoomSide() {
        return this.#minRoomSide;
    }

    getMaxRoomSide() {
        return this.#maxRoomSide;
    }
}

class Map {
    #defaultTile;

    configuration;
    name;
    tiles;    

    constructor(name) {
        this.name = name;
        this.#defaultTile = tileLib.collisions.wall.tile;
    }
        
    /**
     * @param {MapConfiguration} configuration 
     */ 
    setConfiguration(configuration) {
        this.configuration = configuration;
    }

    createLayout() {
        console.time("Create map layout time");

        this.tiles = [];   

        let width = this.configuration.width;
        let height = this.configuration.height;        
        
        for (let y = 0; y < height; y++) {
            let line = [];
            
            for (let x = 0; x < width; x++) {
                let point = new Point(x, y);
                let tile = new Tile(point, this.#defaultTile);
                
                line.push(tile);                
            }            
            
            this.tiles.push(line);
        }
        
        this.generate();

        console.timeEnd("Create map layout time");
    }

    //#region Generation
    generate() {        
        if (this.configuration.hasRooms) {
            let rooms = this.generateRooms();
            this.spreadRooms(rooms);
            this.linkRooms(rooms);

            rooms.forEach(room => {
                for (let y = 0; y < room.height; y++) {
                    for (let x = 0; x < room.width; x++) {                         
                        this.changeTile(room.point.x + x, room.point.y + y, tileLib.playZones.floor.tile);                       
                    }                    
                }
            });
        } else {
            // generate corridors system
        }

        let playZones = this.getPlayZones();

        this.generateGameObjects(playZones, 10, tileLib.characters.rouge.tile);
        this.generateGameObjects(playZones, 10, tileLib.items.healthPoison.tile);
        this.generateGameObjects(playZones, 5, tileLib.items.sword.tile);
        this.generateGameObjects(playZones, 1, tileLib.characters.player.tile);
    }

    /**
     * @param {Array<Tile>} playZones 
     * @param {Number} count 
     * @param {tileLib} tileType
     */
    generateGameObjects(playZones, count, tileType) {
        let objectsCount = count;

        while (objectsCount > 0 && playZones.length > 0) {
            let randomTileIndex = getRandomNumber(playZones.length, 0);
            let tile = playZones[randomTileIndex];

            this.changeTile(tile.point.x, tile.point.y, tileType);
            playZones.splice(randomTileIndex, 1);
            
            objectsCount--;
        }
    }

    generateRooms() {
        let rooms = [];
        let playArea = this.configuration.width * this.configuration.height / 4;

        this.generateRoom(rooms, playArea);

        return rooms;
    }

    spreadRooms(rooms) {
        let totalTiles = this.configuration.width * this.configuration.height;
        let count = rooms.length;
        let area = totalTiles / count; 

        let sideLength = Math.floor(Math.sqrt(area));
        let rows = Math.round(this.configuration.height / sideLength);
        let columns = Math.round(this.configuration.width / sideLength);

        if (rows * columns < count) {
            columns += 1;
        }

        let columnWidth = Math.round(this.configuration.width / columns); 
        let rowHeght = Math.round(this.configuration.height / rows); 

        let startX = 0;
        let startY = 0;
        let endX = columnWidth;
        let endY = rowHeght;

        let columnCounter = 0;

        for (let i = 0; i < count; i++) {
            if (columnCounter >= columns) {
                columnCounter = 0;
                startY += rowHeght;
                endY = startY + rowHeght;
            }
            
            startX = columnWidth * columnCounter;
            endX = columnWidth * (columnCounter + 1);

            let x = getRandomNumber(endX - rooms[i].width, startX); 
            let y = getRandomNumber(endY - rooms[i].height, startY); 

            rooms[i].point.x = x;
            rooms[i].point.y = y;

            columnCounter++;
        }
    }

    generateRoom(rooms, playArea) {
        let min = this.configuration.getMinRoomSide();
        let max = this.configuration.getMaxRoomSide();

        let width = getRandomNumber(max, min);
        let height = getRandomNumber(max, min);

        let area = width * height;

        if (area > playArea) {
            return;
        }

        let room = new Room(new Point(0, 0), width, height);
        playArea -= area;

        rooms.push(room);

        return this.generateRoom(rooms, playArea);
    }

    linkRooms(rooms) {
        rooms.forEach(room => {
            this.linkWithClosestRoom(rooms, room);
        });
    }

    // Cringe :)
    generateCorridor(start, end) {        
        let x = end.x;
        let y = end.y;

        let diffX = Math.abs(end.x - start.x);
        let diffY = Math.abs(end.y - start.y);

        let xIncrement = (end.x - start.x > 0) ? -1 : 1;
        let yIncrement = (end.y - start.y > 0) ? -1 : 1;

        while (diffX > 0) {
            this.changeTile(x, y, tileLib.playZones.floor.tile);
            x += xIncrement;
            diffX--;
        }

        while (diffY > 0) {
            this.changeTile(x, y, tileLib.playZones.floor.tile);
            y += yIncrement;
            diffY--;
        }
    } 
    //#endregion Generation

    // Not optimal algorithm. It has some issues with long rooms. 
    // This method finds the closest rooms by their start points, not the closest sides. 
    linkWithClosestRoom(rooms, target) {
        let closest;
        let minDistance = 1000;
        let index = rooms.findIndex(r => r == target);

        if (rooms.length == 0 || index == 0) {
            return;
        }

        for(let i = 0; i < index; i++) {
            if (rooms[i] == target) {
                continue;
            }

            let distance = this.getDistance(rooms[i].point, target.point);
            
            if (minDistance > distance) {
                minDistance = distance;
                closest = rooms[i];
            }
        }

        this.generateCorridor(target.point, closest.point);
    }

    getDistance(point1, point2) {
        let diffX = point2.x - point1.x;
        let diffY = point2.y - point1.y;

        let distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));

        return distance;
    }

    getPlayZones() {
        let playZones = [];

        for (let y = 0; y < this.configuration.height; y++) {
            for (let x = 0; x < this.configuration.width; x++) {
                if (this.tiles[y][x].type == "tileF") {
                    playZones.push(this.tiles[y][x]);
                }                
            }            
        }

        return playZones;
    }

    changeTile(x, y, type) {
        this.tiles[y][x].update(x, y, type);
    }

    ConvertToJson() {

    }

    ReadFromJson() {

    }

}