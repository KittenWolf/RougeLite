class HealthPotion extends GameObject {
    #heal;

    constructor(heal, position) {
        super(position);
        super.hasCollision = false;

        this.#heal = heal;
    }

    getHeal() {
        return this.#heal;
    }
}