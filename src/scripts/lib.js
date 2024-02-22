const tileLib = Object.freeze({
    "default": "Default",    
    "collisions": {
        "wall": {
            "count": 0,
            "tile": "tileW"
        }
    },
    "playZones": {
        "floor": {
            "count": 0,
            "tile": "tileF"
        }
    },
    "characters": {
        "player": {
            "count": 0,
            "tile": "tileP"
        },
        "rouge": {
            "count": 0,
            "tile": "tileE"
        }
    } ,
    "items": {
        "healthPoison": {
            "count": 0,
            "tile": "tileHP"
        },
        "sword": {
            "count": 0,
            "tile": "tileSW"
        },
    } 
});

const tileWidth = 50; 
const tileHeight = 50;

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}   