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
    this.orders = [];
  }

  /**
   * Запускает приготовление кофе
   * @param {Coffee} coffee - кофе, которое требуется приготовить
   * @returns {Promise<Coffee>} - промис, который выполнится после приготовления кофе
   */
  async createCoffee(coffee) {
    const promise = new Promise(async (resolve, reject) => {
      if (this.wearLevel <= 0) {
        reject(coffee);
        throw new Error('Кофе-машина пришла в негодность');
      }
      if (this.wearLevel > 0) {
        this.wearLevel--;
        if (this.orders.length >= this.maxCup) {
          await Promise.race(this.orders);
        }
        setTimeout(() => {
          this.orders.shift();
          resolve(coffee);
        }, coffee.preparationTime);
      }
    });
    this.orders.push(promise);
    return promise;
  }
}

module.exports = { Coffee, CoffeeMachine };