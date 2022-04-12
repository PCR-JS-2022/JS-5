function isStr(str) {
  if (typeof str !== "string") {
    throw new Error('Некорректные данные');
  }
}

function isNum(num) {
  if (typeof num !== "number") {
    throw new Error('Некорректные данные');
  }
}

function isCoffee(coffee) {
  if (!coffee instanceof Coffee) {
    throw new Error('Некорректные данные');
  }
}

/** Класс кофе */
class Coffee {
  /**
   * Создаёт экзмепляр кофе
   * @param {string} name - название кофе
   * @param {number} preparationTime - время приготовления кофе
   */
  constructor(name, preparationTime) {
    isNum(preparationTime);
    isStr(name);
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
    isNum(maxCup);
    this.maxCup = maxCup;
    this.beingCoffee = [];
    this.wearLevel = wearLevel;
  }

  /**
   * Запускает приготовление кофе
   * @param {Coffee} coffee - кофе, которое требуется приготовить
   * @returns {Promise<Coffee>} - промис, который выполнится после приготовления кофе
   */
  createCoffee(coffee) {
    isCoffee(coffee);
    const promise = new Promise(async (resolve, reject) => {
      if (this.wearLevel <= 0) {
        reject(coffee);
      }
      
      if (this.beingCoffee.length >= this.maxCup) {
        const preparedCoffee = await Promise.race(this.beingCoffee);
        const indexPreparedCoffee = this.beingCoffee.indexOf(preparedCoffee);
        this.beingCoffee.splice(indexPreparedCoffee, 1);
      }
      setTimeout(() => {
        resolve(coffee);
      }, coffee.preparationTime);
    });

    this.wearLevel--;
    this.beingCoffee.push(promise);
    return promise;
  }
}

module.exports = { Coffee, CoffeeMachine };
