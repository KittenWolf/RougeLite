import Tile from "./lib/tile.js";
import { Character } from "./characters/character.js";
import { GameObjects } from "./lib/gameObjects.js";

export default class Layout {
    #layout = document.getElementById("mapLayout");
    #width = config.scene.width;
    #height = config.scene.height;

    constructor() {
        this.#buildLayout();
    }

    #buildLayout() {
        const tileSize = Tile.size;
        this.#layout.innerHTML = "";

        this.#layout.style.width = this.#width * tileSize + "px";
        this.#layout.style.height = this.#height * tileSize + "px";

        for (let y = 0; y < this.#height; y++) {
            for (let x = 0; x < this.#width; x++) {
                const tileNode = document.createElement("div");

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

        const { x, y } = obj.tile.point;
        const index = y * this.#width + x;
        const tileNode = this.#layout.childNodes[index];

        tileNode.innerHTML = "";
        tileNode.setAttribute("class", "tile " + obj.tile.type);

        if (obj instanceof Character) {
            const health = document.createElement("div");

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

    resetNode({ x, y }) {
        const index = y * this.#width + x;
        const tileNode = this.#layout.childNodes[index];

        tileNode.innerHTML = "";
        tileNode.className = "tile";
    }

    resetNodes() {
        this.#layout.childNodes.forEach(tileNode => {            
            tileNode.innerHTML = "";
            tileNode.className = "tile";
        });
    }
}