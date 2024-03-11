import GameObject from "../lib/gameObject.js";

export class Character extends GameObject {
    #armor;
    #maxHealth;
    #health;
    #attack;

    constructor(point, tile) {
        super(point, tile);
        super.hasCollision = true;
    }

    init(options) {
        super.init(options);

        this.#armor = options.defaultArmor;
        this.#health = this.#maxHealth = options.defaultMaxHealth;
        this.#attack = options.defaultDamage;
    }

    getHealth() {
        return this.#health / this.#maxHealth * 100;
    }
    
    dealDamage(enemies) {
        enemies.forEach(enemy => {
            enemy.takeDamage(this.#attack);
        });
    }
    
    takeDamage(value) {
        this.#health -= value;
    
        console.log(`${this.name} take ${value} damage`);
    }
    
    takeHeal(value) {
        this.#health += value;
    
        if (this.#health > this.#maxHealth) {
            this.#health = this.#maxHealth
        }
    
        console.log(`${this.name} healed ${value} HP, total HP ${this.#health}`);
    }
    
    increaseAttack(value) {
        this.#attack += value;
    
        console.log(`${this.name} increase attack by ${value} points. Total attack ${this.#attack}`);
    }
    
    isDead() {
        if (this.#health > 0) {
            return false;
        }
    
        console.log(`${this.name} died`);
    
        return true;
    }
}