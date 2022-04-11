/** Класс кофе */
class Coffee {
    /**
     * Создаёт экзмепляр кофе
     * @param {string} name - название кофе
     * @param {number} preparationTime - время приготовления кофе
     */
    constructor(name, preparationTime) {
        if (typeof name !== 'string') {
            throw new Error('Передано неверное имя!');
        }
        if (typeof preparationTime !== 'number') {
            throw new Error('Передано неверное время приготовления!');
        }
        this.name = name;
        this.preparationTime = preparationTime;
    }
}

/** Класс кофемашины */
class CoffeeMachine {
    /**
     * Создаёт экземпляр кофемашины
     * @param {number} maxCup - кол-во чашек, в которые параллельно можно готовить кофе
     */
    constructor(maxCup, wearLevel = 4) {
        if (typeof maxCup !== 'number') {
            throw new Error('Передано неверное количество чашек!');
        }
        if (typeof wearLevel !== 'number') {
            throw new Error('Передано неверное состояние износа!');
        }
        this.maxCup = maxCup;
        this.queueOrders = [];
        this.wearLevel = wearLevel;
    }

    /**
     * Запускает приготовление кофе
     * @param {Coffee} coffee - кофе, которое требуется приготовить
     * @returns {Promise<Coffee>} - промис, который выполнится после приготовления кофе
     */
    async createCoffee(coffee) {
        if (!(coffee instanceof Coffee)) {
            throw new Error('Передан не объект кофе!');
        }
        const promise = await new Promise(async (resolve, reject) => {
            if (this.wearLevel > 0) {
                this.wearLevel--;
                if (this.queueOrders.length > this.maxCup) {
                    await Promise.race(this.queueOrders.map((order) => order))
                }
                setTimeout(() => {
                    this.queueOrders.shift()
                    resolve(coffee);
                }, coffee.preparationTime);
            } else {
                reject(coffee);
            }
        });
        this.queueOrders.push(promise);
        return promise;
    }
}

module.exports = {Coffee, CoffeeMachine};
