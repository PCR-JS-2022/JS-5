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
     * @param {number} wearLevel - уровень износа кофемашины
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
        if (!coffee instanceof Coffee) throw new Error();

        let cupOfCoffee = new Promise(async (resolve, reject) => {
            if (this.wearLevel <= 0) {
                reject(coffee);
            }
            if (this.queue.length < this.maxCup) {
                setTimeout(() => {
                        let deleteIndex = this.queue.findIndex(p => p === this);
                        this.queue.slice(deleteIndex, 1);
                        resolve(coffee);
                    },
                    coffee.preparationTime)
            } else {
                let preparingCoffee = [];
                for (let i = 0; i < this.maxCup; i++) {
                    preparingCoffee.push(this.queue[i]);
                }
                await Promise.race(preparingCoffee);
                setTimeout(() => {
                        let deleteIndex = this.queue.findIndex(p => p === this);
                        this.queue.slice(deleteIndex, 1);
                        resolve(coffee);
                    },
                    coffee.preparationTime)
            }
        });

        this.queue.push(cupOfCoffee);
        this.wearLevel -= 1;
        return cupOfCoffee;
    }
}

module.exports = {Coffee, CoffeeMachine};
