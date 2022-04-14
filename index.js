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
   * @param {number} wearLevel - уровень износа кофемашины, по умолчанию значение 4
   */
  constructor(maxCup, wearLevel = 4) {
    this.maxCup = maxCup;
    this.wearLevel = wearLevel;
    this.preparingNowQueue = [];
  }

  /**
   * Запускает приготовление кофе
   * @param {Coffee} coffee - кофе, которое требуется приготовить
   * @returns {Promise<Coffee>} - промис, который выполнится после приготовления кофе
   */
  createCoffee(coffee) {

    const promise = new Promise(async (resolve, reject) => {
      if (this.wearLevel <= 0) {
        reject(coffee);
      }

      this.wearLevel--;

      if (this.preparingNowQueue.length >= this.maxCup) {
        const finishedCoffee = await Promise.race(this.preparingNowQueue);
        this.preparingNowQueue.splice(this.preparingNowQueue.indexOf(finishedCoffee), 1);
      }

      setTimeout(() => {
        resolve(coffee);
      }, coffee.preparationTime);
    });

    this.preparingNowQueue.push(promise);
    
    return promise;
  }
}

module.exports = { Coffee, CoffeeMachine };