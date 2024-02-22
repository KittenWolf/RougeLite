class Scene {
    #scale;    
    #scene;

    /**
     * 
     * @param {HTMLElement} scene 
     */
    constructor(scene) {
        this.#scene = scene;
    }

    renderMap(map) {
        console.time("Render time");

        field.innerHTML = ""; 

        this.checkScale(map);

        this.#scene.style.width = map.configuration.width * tileWidth * this.#scale + "px";
        this.#scene.style.height = map.configuration.height * tileHeight * this.#scale + "px"; 

        for (let i = 0; i < map.configuration.height; i++) {
            for (let j = 0; j < map.configuration.width; j++) {
                let tileNode = this.buildTileNode(map.tiles[i][j]);
                this.#scene.appendChild(tileNode);
            }            
        }

        console.timeEnd("Render time");
    }

    /**
     * 
     * @param {Map} map 
     * @param {Tile} tile 
     * @param {Character} character 
     */
    renderTile(map, tile, character = null) {
        let index = tile.point.y * map.configuration.width + tile.point.x;
        let tileNode = this.#scene.childNodes[index];
        
        tileNode.innerHTML = "";
        tileNode.setAttribute("class", "tile " + tile.type);

        if (character) {
            let health = document.createElement("div");

            health.classList.add("health");
            health.style.width = `${character.getHealth()}%`;

            tileNode.appendChild(health);
        }
    }

    buildTileNode(tile) {
        let tileNode = document.createElement("div");
        tileNode.classList.add("tile", tile.type);

        tileNode.style.width = tileWidth * this.#scale + "px";
        tileNode.style.height = tileHeight * this.#scale + "px";        

        tileNode.setAttribute('data-row', tile.point.y);
        tileNode.setAttribute('data-col', tile.point.x);

        if (tile.type == "tileE" || tile.type == "tileP") {
            let health = document.createElement("div");

            health.classList.add("health");
            health.style.width = "100%";
            tileNode.appendChild(health);
        }

        return tileNode;
    }

    checkScale(map) {
        let totalWidth = map.configuration.width * tileWidth;
        let totalHeight = map.configuration.height * tileHeight;

        let maxFieldWidth = window.innerWidth;
        let maxFieldHeight = window.innerHeight;

        if (totalWidth > maxFieldWidth || totalHeight > maxFieldHeight) {
            this.#scale = 0.5;
        } else {
            this.#scale = 1;
        }
    }
}