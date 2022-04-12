/** Класс кофе */
class Coffee {
    /**
     * Создаёт экзмепляр кофе
     * @param {string} name - название кофе
     * @param {number} preparationTime - время приготовления кофе
     */
    constructor(name, preparationTime) {
        this.name = name;
        this.preparationTime = preparationTime;
    }
}

/** Класс кофемашины */
class CoffeeMachine {
    /**
     * Создаёт экзмепляр кофемашины
     * @param {number} maxCup - кол-во чашек, в которые параллельно можно готовить кофе
     */
    constructor(maxCup, wearLevel = 4) {
        this.maxCup = maxCup;
        this.wearLevel = wearLevel;
        this.queue = [];
    }

    /**
     * Запускает приготовление кофе
     * @param {Coffee} coffee - кофе, которое требуется приготовить
     * @returns {Promise<Coffee>} - промис, который выполнится после приготовления кофе
     */
    createCoffee(coffee) {
        const promise = new Promise(async (resolve, reject) => {
            if (this.wearLevel > 0) {
                if (this.queue.length >= this.maxCup) {
                    await Promise.race(this.queue.map(p => p.promise))
                }

                setTimeout(() => {
                    this.queue.shift();
                    resolve(coffee);
                }, coffee.preparationTime);
            }
            else {
                reject(coffee);
                return;
            }
        })

        this.wearLevel -= 1;
        this.queue.push({ promise });
        return promise;
    }
}

module.exports = { Coffee, CoffeeMachine };
