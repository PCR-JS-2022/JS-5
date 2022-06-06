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
    constructor(maxCup) {
        this.maxCup = maxCup;
        this.coffeeQueue = [];
        this.idCounter = 0;
    }

    /**
     * Запускает приготовление кофе
     * @param {Coffee} coffee - кофе, которое требуется приготовить
     * @returns {Promise<Coffee>} - промис, который выполнится после приготовления кофе
     */
    createCoffee(coffee) {
        const id = this.idCounter++;

        const promise = new Promise(async () => {
            if (this.maxCup <= this.coffeeQueue.length) {
                await Promise.any(this.coffeeQueue.map((x) => x.promise));
                while (
                    this.coffeeQueue.findIndex((x) => x.id === id) > this.maxCup
                ) {
                    await Promise.any(this.coffeeQueue.map((x) => x.promise));
                }
            }

            setTimeout(() => {
                this.coffeeQueue = this.coffeeQueue.filter((x) => x.id != id);
                return coffee;
            }, coffee.preparationTime);
        });

        this.coffeeQueue.push({ id, promise: promise });

        return promise;
    }
}

module.exports = { Coffee, CoffeeMachine };
