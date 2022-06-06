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
        this.workingPromiseArray = [];
    }

    /**
     * Запускает приготовление кофе
     * @param {Coffee} coffee - кофе, которое требуется приготовить
     * @returns {Promise<Coffee>} - промис, который выполнится после приготовления кофе
     */
    createCoffee(coffee) {
        if (this.workingPromiseArray.length === this.maxCup)
          Promise.any(this.workingPromiseArray);

        const promise = new Promise(() => {
            setTimeout(() => {
                return coffee;
            }, coffee.preparationTime);
        });

        const promiseIndex = this.workingPromiseArray.length;
        this.workingPromiseArray.push(promise);

        Promise.any([promise]);

        this.workingPromiseArray = this.workingPromiseArray.splice(promiseIndex, 1);

        return promise;
    }
}

module.exports = { Coffee, CoffeeMachine };
