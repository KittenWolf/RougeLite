class Sword extends GameObject {
    #attackBuff;

    constructor(attackBuff, position) {
        super(position);
        super.hasCollision = false;

        this.#attackBuff = attackBuff;
    }

    getBuff() {
        return this.#attackBuff;
    }
}