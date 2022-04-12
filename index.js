const { rejects } = require("assert");

/** Класс кофе */
class Coffee {
  /**
   * Создаёт экзмепляр кофе
   * @param {string} name - название кофе
   * @param {number} preparationTime - время приготовления кофе
   */
  constructor(name, preparationTime) {
    if(typeof name !== 'string' || typeof preparationTime !== 'number'){
      throw new Error('Некорректные данные');
    }

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
    if(typeof maxCup !== 'number' || typeof wearLevel !== 'number'){
      throw new Error('Некорректные данные');
    }

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
    if(!(coffee instanceof Coffee)){
      throw new Error('Некорректные данные');
    }

    const makeCoffee = (resolve, coffee) => {
      setTimeout(() => {
        this.wearLevel--;
        this.maxCup++;
        resolve(coffee);
      }, coffee.preparationTime);
    }

    return new Promise((resolve, reject) => {
      if(this.wearLevel <= 0) reject('(((');

      if(this.maxCup > 0){
        this.maxCup--;

        makeCoffee(resolve, coffee);
      } else {
        this.queue.push({coffee, reject, resolve});
      }
      
    }).finally(() => {
      if(this.wearLevel <= 0){
        this.queue.forEach(e => e.reject('((('));
      }

      if(this.queue.length > 0 && this.maxCup > 0){
        const firstCoffe = this.queue.shift();
        this.maxCup--;

        makeCoffee(firstCoffe.resolve, firstCoffe.coffee);
      }
    });
  }
}

module.exports = { Coffee, CoffeeMachine };
