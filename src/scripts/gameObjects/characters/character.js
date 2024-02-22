class Character extends GameObject {
    #maxHealth;
    #health;
    #attack;
    #name;    

    constructor(health, attack, tile, name) {
        super(tile);
        super.hasCollision = true;

        this.#maxHealth = health;
        this.#health = health;
        this.#attack = attack;
        this.#name = name;
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

        console.log(`${this.#name} take ${value} damage`);
    }

    takeHeal(value) {
        this.#health += value;

        if (this.#health > this.#maxHealth) {
            this.#health = this.#maxHealth
        }

        console.log(`${this.#name} healed ${value} HP, total HP ${this.#health}`);
    }

    increaseAttack(value) {
        this.#attack += value;
        
        console.log(`${this.#name} increase attack by ${value} points. Total attack ${this.#attack}`);
    }

    isDead() {   
        if (this.#health > 0) {
            return false;
        }    

        console.log(`${this.#name} died`);
        
        return true;
    }
}
