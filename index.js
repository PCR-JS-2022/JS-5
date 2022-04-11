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
    this.currentCupCount = 0;
    this.wearLevel = wearLevel;
  }

  /**
   * Запускает приготовление кофе
   * @param {Coffee} coffee - кофе, которое требуется приготовить
   * @returns {Promise<Coffee>} - промис, который выполнится после приготовления кофе
   */
  createCoffee(coffee) {
    const callback = (resolve, reject) => {
      const timeout = setInterval(() => {
        if (this.currentCupCount < this.maxCup) {
          if (this.wearLevel <= 0) {
            reject(coffee);
          }
          this.currentCupCount++;
          setTimeout(() => {
            resolve(coffee);
            this.currentCupCount--;
            this.wearLevel--;
          }, coffee.preparationTime);
          clearInterval(timeout);
        }
      }, 100)
    }

    return new Promise(function (resolve, reject) {
      callback(resolve, reject);
    });
  }
}

module.exports = { Coffee, CoffeeMachine };
