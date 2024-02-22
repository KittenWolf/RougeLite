const inputWidth = document.getElementById("width");
const inputHeight = document.getElementById("height");
const inputRooms = document.getElementById("containsRooms");
const generateBtn = document.getElementById("generateBtn");

const mapName = document.getElementById("mapName");
const saveBtn = document.getElementById("saveBtn");
const tiles = document.querySelectorAll(".brush"); 
const field = document.getElementById("field"); 

class MapBuilder {    
    map;
    scene;
    activeTile;

    constructor() {     
        this.map = new Map("New map");
        this.scene = new Scene(document.getElementById("field"));

        let configuration = new MapConfiguration(Number(inputWidth.value), Number(inputHeight.value), containsRooms)

        this.map.setConfiguration(configuration);

        this.map.createLayout();
        this.scene.renderMap(this.map);
    }

    saveMap() {
        this.map.name = mapName.value;
        let json = JSON.stringify(mapBuilder.map);
        
        console.log(json);

        // Server required to write json data;
    }

    async getMaps() {
        let responce = await fetch("src/maps/maps.json", {
            method: "GET",
            headers: {
                'Content-Type': 'text/json'
            }
        });

        let content = await responce.json();

        // this.scene.renderScene(content.maps[1]);
        return content.maps;
    }

    buildMapConfiguration() {
        if (Number(inputWidth.value) < 5 || Number(inputHeight.value) < 5) {
            return;
        }
        
        let mapWidth = Number(inputWidth.value);
        let mapHeight = Number(inputHeight.value);
        let containsRooms = inputRooms.checked;

        // Other options

        let configuration = new MapConfiguration(mapWidth, mapHeight, containsRooms)

        this.map.setConfiguration(configuration);
    }

    generateMap() {
        this.map.createLayout();
        this.scene.renderMap(this.map);
    }
}

const mapBuilder = new MapBuilder();

inputWidth.addEventListener("change", () => {
    mapBuilder.buildMapConfiguration();
});

inputHeight.addEventListener("change", () => {
    mapBuilder.buildMapConfiguration();
});

inputRooms.addEventListener("change", () => {
    mapBuilder.buildMapConfiguration();
});

field.addEventListener("click", (e) => {
    let x = Number(e.target.attributes['data-col'].value);
    let y = Number(e.target.attributes['data-row'].value);

    let point = new Point(x, y);
    let tile = new Tile(point, mapBuilder.activeTile);
    
    mapBuilder.map.changeTile(x, y, tile.type);
    mapBuilder.scene.renderTile(mapBuilder.map, tile);
});

generateBtn.addEventListener("click", () => {
    mapBuilder.generateMap();
});

saveBtn.addEventListener("click", () => {
    mapBuilder.saveMap();
});

tiles.forEach(tile => {
    tile.addEventListener("click", e => {
        for (let i = 0; i < tiles.length; i++) {
            if (tiles[i].classList.contains("active")) {
                tiles[i].classList.remove("active");
            }        
        }
    
        tile.classList.add("active");
        mapBuilder.activeTile = tile.getAttribute("tyle-type");
    })
});

