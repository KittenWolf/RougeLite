import Tile from "./lib/tile.js";
import { Character } from "./characters/character.js";
import { GameObjects } from "./lib/gameObjects.js";

export default class Layout {
    #layout;

    constructor() {
        this.#layout = document.getElementById("field");
        this.width = config.scene.width;
        this.height = config.scene.heigth;

        this.#buildLayout();
    }

    #buildLayout() {
        field.innerHTML = "";

        let scale = this.getScale();
        let tileSize = Tile.size * scale;

        this.#layout.style.width = this.width * tileSize + "px";
        this.#layout.style.height = this.height * tileSize + "px";

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                let tileNode = document.createElement("div");

                tileNode.classList.add("tile");
                tileNode.style.width = tileSize + "px";
                tileNode.style.height = tileSize + "px";

                tileNode.setAttribute('data-row', y);
                tileNode.setAttribute('data-col', x);

                this.#layout.appendChild(tileNode);
            }
        }
    }

    renderScene() {
        this.updateNodes(GameObjects.matrix);
    }

    updateNode(obj) {
        if (!obj) return;

        let x = obj.tile.point.x;
        let y = obj.tile.point.y;

        let index = y * this.width + x;
        let tileNode = this.#layout.childNodes[index];

        tileNode.innerHTML = "";
        tileNode.setAttribute("class", "tile " + obj.tile.type);

        if (obj instanceof Character) {
            let health = document.createElement("div");

            health.classList.add("health");
            health.style.width = `${obj.getHealth()}%`;

            tileNode.appendChild(health);
        }
    }

    updateNodes(objs) {
        for (let y = 0; y < objs.length; y++) {
            for (let x = 0; x < objs[0].length; x++) {
                this.updateNode(objs[y][x]);        
            }            
        }
    }

    resetNode(point) {
        let x = point.x;
        let y = point.y;

        let index = y * this.width + x;
        let tileNode = this.#layout.childNodes[index];

        tileNode.innerHTML = "";
        tileNode.setAttribute("class", "tile");
    }

    resetNodes() {
        this.#layout.childNodes.forEach(tileNode => {            
            tileNode.innerHTML = "";
            tileNode.setAttribute("class", "tile");
        });
    }

    getScale() {
        let totalWidth = this.width * Tile.size;
        let totalHeight = this.height * Tile.size;

        let maxFieldWidth = window.innerWidth;
        let maxFieldHeight = window.innerHeight;

        return (totalWidth > maxFieldWidth || totalHeight > maxFieldHeight)
            ? 0.5
            : 1;
    }

    debugMode() {
        this.#layout.addEventListener("click", (e) => {
            let x = +e.target.attributes['data-col'].value;
            let y = +e.target.attributes['data-row'].value;

            console.log(GameObjects.matrix[y][x]);
        });
    }
}