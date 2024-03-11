import { Scene } from './scene.js';

import Point from './lib/point.js';

import { GameObjects, gameObjectsList } from "./lib/gameObjects.js";
import { Wall } from "./environment/obstacles.js";
import { Floor } from "./environment/playground.js";
import { Player } from "./characters/player.js";
import { Rouge } from "./characters/enemies.js";
import { HealthPotion } from "./items/collectable.js";
import { Sword } from "./items/consumable.js";
import { Game } from './game.js';

class Constructor {
    constructor() {
        this.initControls();
        this.initEvents();

        this.scene = new Scene();
        this.game = new Game(this.scene);
    }

    updateSceneConfiguration() {
        
    }

    generateScene() {     
        this.scene.generate();
    }

    initControls() {
        this.inputWidth = document.getElementById("width");
        this.inputHeight = document.getElementById("height");
        this.inputRooms = document.getElementById("containsRooms");
        this.generateBtn = document.getElementById("generateBtn");
        this.mapName = document.getElementById("mapName");
        this.saveBtn = document.getElementById("saveBtn");
        this.clearBtn = document.getElementById("clearBtn");
        this.playBtn = document.getElementById("playBtn");
        this.tiles = document.querySelectorAll(".brush");
        this.field = document.getElementById("field");
    }

    addObjToScene(obj) {
        this.scene.addGameObject(obj);
    }

    removeObjFromScene(point) {
        this.scene.removeGameObject(point);
    }

    initEvents() {
        let self = this;

        this.field.addEventListener("click", (e) => {
            let x = +e.target.attributes['data-col'].value;
            let y = +e.target.attributes['data-row'].value;

            let point = new Point(x, y);
            let obj;

            switch (self.activeTile) {
                case 'tileW':
                    obj = new Wall(point);
                    break;
                case 'tileF':
                    obj = new Floor(point);
                    break;
                case 'tileP':
                    obj = new Player(point);
                    break;
                case 'tileE':
                    obj = new Rouge(point);
                    break;
                case 'tileHP':
                    obj = new HealthPotion(point);
                    break;
                case 'tileSW':
                    obj = new Sword(point);
                    break;
                default:
                    break;
            }

            if (obj) {
                this.addObjToScene(obj);
            } else {
                this.removeObjFromScene(point);
            } 
        });

        this.generateBtn.addEventListener("click", () => {
            self.generateScene();
        });

        this.saveBtn.addEventListener("click", () => {
            self.saveMap();
        });

        this.clearBtn.addEventListener("click", () => {
            self.scene.reset();
        });

        this.playBtn.addEventListener("click", () => {
            if (this.gameStarted) {
                this.game.end();

                this.gameStarted = false;
                this.playBtn.innerText = "Play";
            } else {
                this.game.start();

                this.gameStarted = true;
                this.playBtn.innerText = "Stop";
            }
        });

        this.tiles.forEach(tile => {
            tile.addEventListener("click", () => {
                tile.classList.add("active");
                self.activeTile = tile.getAttribute("tile-type");
            })
        });
    }
}

const constructor = new Constructor();
