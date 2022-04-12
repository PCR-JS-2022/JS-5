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
    if (typeof maxCup !== 'number' || maxCup < 0)
      throw new Error('Неверное число чашек для кофе');

    if (typeof wearLevel !== 'number')
      throw new Error('Неверный износ кофемашины');
    this.maxCup = maxCup;
    this.beingCoffee = [];
    this.wearLevel = wearLevel;
  }
  isBroken() {
    return this.wearLevel <= 0;
  }
  accessibleSlots() {
    return this.beingCoffee.length >= this.maxCup;
  }
  isCoffee(coffee) {
    if (!(coffee instanceof Coffee))
      throw new Error('Неверный объект кофе');
  }
  /**
   * Запускает приготовление кофе
   * @param {Coffee} coffee - кофе, которое требуется приготовить
   * @returns {Promise<Coffee>} - промис, который выполнится после приготовления кофе
   */
  createCoffee(coffee) {
    this.isCoffee(coffee);
    const promise = new Promise(async (resolve, reject) => {
      if (this.isBroken()) {
        reject(coffee);
        console.log(`Не получилось приготовить ${coffee.name}. Кофемашина сломалась`);
      }

      if (this.accessibleSlots()) {
        await Promise.race(this.beingCoffee);
        this.beingCoffee.shift();
      }
      setTimeout(() => {
        resolve(coffee);
      }, coffee.preparationTime);
    });

    this.wearLevel -= 1;
    this.beingCoffee.push(promise);
    return promise;
  }
}

module.exports = { Coffee, CoffeeMachine };
