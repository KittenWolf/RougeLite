// May be better make a JSON file. 
class GameConfiguration {
    characterMaxHealth;
    characterWeaponDamage;
    HealthPotionsHeal;
    swordAttackBuff;

    constructor(maxHealth, weaponDamage, heal, attackBuff) {
        this.characterMaxHealth = maxHealth;
        this.characterWeaponDamage = weaponDamage;
        this.HealthPotionsHeal = heal;
        this.swordAttackBuff = attackBuff;
    }
}

class Game {
    #map;
    #scene;
    #configuration;

    #players;
    #enemies;
    #healthPotions;
    #swords;

    #gameObjects;

    constructor() {        
        this.#configuration = new GameConfiguration(100, 35, 50, 7.5);

        this.#map = new Map("Start map");
        this.#scene = new Scene(document.getElementById("field"));
        
        this.#players = [];
        this.#enemies = [];
        this.#healthPotions = [];
        this.#swords = [];
        this.#gameObjects = [];
    }
    
    init() {
        let configuration = new MapConfiguration(40, 24, true);
        
        this.#map.setConfiguration(configuration);
        this.#map.createLayout();

        this.#scene.renderMap(this.#map);

        this.initGameObjects();
        this.initPlayerControlEvents();
    }

    initGameObjects() {
        let health = this.#configuration.characterMaxHealth;
        let weaponDamage = this.#configuration.characterWeaponDamage;
        let weaponBuff = this.#configuration.swordAttackBuff;
        let heal = this.#configuration.HealthPotionsHeal;

        for (let y = 0; y < this.#map.configuration.height; y++) {  
            let line = [];          

            for (let x = 0; x < this.#map.configuration.width; x++) {
                let tile = this.#map.tiles[y][x];

                switch (tile.type) {
                    case "tileW":
                        line.push(new Wall(tile));                        
                        break;

                    case "tileF":
                        line.push(new Floor(tile));                      
                        break;
                    
                    case "tileP":
                        line.push(new Player(health, weaponDamage, tile, "Player"));
                        break;
                    
                    case "tileE":
                        line.push(new Rouge(health, weaponDamage, tile, "Rouge"));
                        break;
    
                    case "tileHP":
                        line.push(new HealthPotion(heal, tile));
                        break;
    
                    case "tileSW":
                        line.push(new Sword(weaponBuff, tile));
                        break;
                
                    default:
                        break;
                }
            }    
            
            this.#gameObjects.push(line);
        }        

        this.#players = this.getObjectsByTileType("tileP");
        this.#enemies = this.getObjectsByTileType("tileE");
        this.#healthPotions = this.getObjectsByTileType("tileHP");
        this.#swords = this.getObjectsByTileType("tileSW");
    }

    getObjectsByTileType(type) {
        let objects = [];
        
        for (let y = 0; y < this.#map.configuration.height; y++) {
            for (let x = 0; x < this.#map.configuration.width; x++) {
                if (this.#gameObjects[y][x].tile.type == type) {
                    objects.push(this.#gameObjects[y][x]);
                }
            }            
        }

        return objects;
    }

    initPlayerControlEvents() {
        window.addEventListener("keydown", (e) => {
            let stepX = 0;
            let stepY = 0;

            switch (e.code) {
                case "KeyW":
                    stepY -= 1; 
                    this.#players.forEach(player => {
                        this.moveCharacter(player, stepX, stepY);                        
                    });

                    this.enemyMove();
                    break;
                    
                case "KeyA":  
                    stepX -= 1;
                    this.#players.forEach(player => {
                        this.moveCharacter(player, stepX, stepY);                        
                    });

                    this.enemyMove();
                    break;
                        
                case "KeyS":    
                    stepY += 1; 
                    this.#players.forEach(player => {
                        this.moveCharacter(player, stepX, stepY);                        
                    });

                    this.enemyMove();
                    break;
                
                case "KeyD":   
                    stepX += 1;
                    this.#players.forEach(player => {
                        this.moveCharacter(player, stepX, stepY);                        
                    });

                    this.enemyMove();
                    break;
                    
                case "Space":
                    this.#players.forEach(player => {
                        let enemies = this.checkTilesAround(player, 1, tileLib.characters.rouge.tile);
                        player.dealDamage(enemies); 
                        
                        enemies.forEach(enemy => {
                            if (enemy.isDead()) {
                                let x = enemy.tile.point.x; 
                                let y = enemy.tile.point.y;
                                
                                this.deleteFromGame(enemy);
                            } else {
                                this.#scene.renderTile(this.#map, enemy.tile, enemy);
                            }

                        });                        
                    });                    
                    
                    this.enemyMove();
                    break;
            
                default:
                    break;
            }

            console.log(this.#players);
        })        
    }

    enemyMove() {
        this.#enemies.forEach(enemy => {
            let direction = getRandomNumber(7, 1);

            switch (direction) {
                case 1:                    
                    this.moveCharacter(enemy, 0, -1);
                    break;
                case 2:
                    this.moveCharacter(enemy, -1, 0);                    
                    break;
                case 3:                    
                    this.moveCharacter(enemy, 0, 1);
                    break;
                case 4:
                    this.moveCharacter(enemy, 1, 0);                    
                    break;
            
                default:
                    let player = this.checkTilesAround(enemy, 1, "tileP");

                    if (player.length > 0) {
                        enemy.dealDamage(player); 
                    
                        console.log(player);
    
                        if (player[0].isDead()) {
                            let x = enemy.tile.point.x; 
                            let y = enemy.tile.point.y;
                            
                            this.deleteFromGame(player[0]);
                        } else {
                            this.#scene.renderTile(this.#map, player[0].tile, player[0]);
                        }
                    }                    
                    
                    break;
            }
        });
    }

    /**
     * 
     * @param {Character} character 
     * @param {number} stepX 
     * @param {number} stepY 
     */
    moveCharacter(character, stepX, stepY) {
        let x = character.tile.point.x;
        let y = character.tile.point.y;

        // Need to check array index.
        let object = this.#gameObjects[y + stepY][x + stepX];
        
        if (object.hasCollision) {
            return;
        }
        
        let tile = object.tile;

        // Just a garbage code
        if (character instanceof Player) {
            if (tile.type == "tileSW") {
                let sword;

                this.#swords.forEach(item => {
                    if (item.tile == tile) {
                        sword = item;
                    }    
                });

                character.increaseAttack(sword.getBuff());
                this.deleteFromGame(sword);           
            }
    
            if (tile.type == "tileHP") {
                let healPoison;

                this.#healthPotions.forEach(item => {
                    if (item.tile == tile) {
                        healPoison = item;
                    }    
                });

                character.takeHeal(healPoison.getHeal());
                this.deleteFromGame(healPoison);            
            }
        }           
        
        this.swapGameObjects(this.#gameObjects[y][x], this.#gameObjects[y + stepY][x + stepX]);
        this.#scene.renderTile(this.#map, character.tile, character);
        this.#scene.renderTile(this.#map, this.#gameObjects[y][x].tile);      
    }

    // Another garbage code
    deleteFromGame(object) {
        let x = object.tile.point.x;
        let y = object.tile.point.y;

        if (object instanceof Player) {
            this.deleteFromCollection(object, this.#players);
        }

        if (object instanceof Enemy) {            
            this.deleteFromCollection(object, this.#enemies);
        }

        if (object instanceof HealthPotion) {
            this.deleteFromCollection(object, this.#healthPotions);
        }

        if (object instanceof Sword) {
            this.deleteFromCollection(object, this.#swords);
        }

        this.#gameObjects[y][x] = new Floor(new Tile(new Point(x, y), "tileF"));
        this.#scene.renderTile(this.#map, this.#gameObjects[y][x].tile); 
    }

    deleteFromCollection(object, collection) {
        let target = (e) => e.tile.point == object.tile.point;

        let index = collection.findIndex(target);
        collection.splice(index, 1);
    }

    swapGameObjects(from, to) {
        let buffer = to.tile.point;

        this.#gameObjects[from.tile.point.y][from.tile.point.x] = to;
        this.#gameObjects[to.tile.point.y][to.tile.point.x] = from;

        to.tile.point = from.tile.point;
        from.tile.point = buffer;
    }

    checkTilesAround(character, depth, type) {
        let tiles = [];
        let tile = character.tile;

        // Need to check array index out of bounds. 
        let startX = tile.point.x - depth;
        let startY = tile.point.y - depth;
        let endX = tile.point.x + depth;
        let endY = tile.point.y + depth;

        for (let y = startY; y <= endY; y++) {
            for (let x = startX; x <= endX; x++) {
                if (this.#gameObjects[y][x].tile.type == type) {
                    tiles.push(this.#gameObjects[y][x]);
                }                    
            }                
        }

        return tiles;
    }
}

const game = new Game();
game.init();