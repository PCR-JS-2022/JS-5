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
        this.queue = [];
        this.wearLevel = wearLevel;
    }

    /**
     * Запускает приготовление кофе
     * @param {Coffee} coffee - кофе, которое требуется приготовить
     * @returns {Promise<Coffee>} - промис, который выполнится после приготовления кофе
     */
    createCoffee(coffee) {
        const promise = new Promise(async(resolve, reject) => {
            if (this.wearLevel <= 0)
                reject("coffee");

            if (this.maxCup > 0) {
                this.maxCup--;
                this.wearLevel--;

                setTimeout(() => {
                        this.maxCup++;
                        resolve(coffee);
                    },
                    coffee.preparationTime);
            } else {
                this.queue.push({ coffee, resolve, reject });
            }
        }).finally(() => {
            if (this.maxCup > 0 && this.queue.length > 0 && this.wearLevel > 0) {
                const first = this.queue.shift();
                this.maxCup--;
                this.wearLevel--;

                setTimeout(() => {
                    this.maxCup++;
                    first.resolve(first.coffee)
                }, first.coffee.preparationTime);
            }
            if (this.wearLevel <= 0)
                this.queue.forEach(e => e.reject(e.coffee));
        });
        return promise;
    }
}

module.exports = { Coffee, CoffeeMachine };