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
    this.wearLevel = wearLevel;
  }
  isBroken() {
    return this.wearLevel <= 1;
  }
  accessibleSlots() {
    return this.maxCup >= 1;
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
    const callback = (resolve, reject) => {
      const timeout = setInterval(() => {
        if (this.isBroken()) {
          reject(coffee);
          console.log('Кофемашина сломалась');
          return;
        }
        if (this.accessibleSlots()) {
          this.maxCup -= 1;
          setTimeout(() => {
            resolve(coffee);
            this.maxCup += 1;
            this.wearLevel -= 1;
          }, coffee.preparationTime);
          clearInterval(timeout);
        }
      }, 4);
    }
    return new Promise(callback);
  }
}


module.exports = { Coffee, CoffeeMachine };
