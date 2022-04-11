/** Класс кофе */
class Coffee {
  /**
   * Создаёт экзмепляр кофе
   * @param {string} name - название кофе
   * @param {number} preparationTime - время приготовления кофе
   */
  constructor(name, preparationTime) {
    if (
      typeof name != "string" ||
      typeof preparationTime != "number" ||
      !Number.isInteger(preparationTime)
    )
      throw new Error("Неккоректные параметры кофе");
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
    if (typeof maxCup != "number" || !Number.isInteger(maxCup))
      throw new Error("Некорректное количество чашек");
    if (typeof wearLevel != "number" || !Number.isInteger(wearLevel))
      throw new Error("Некорректный уровень износа");

    this.maxCup = maxCup;
    this.queue = [];
    this.brewing = 0;
    this.wearLevel = wearLevel;
  }

  canBrew() {
    return this.brewing < this.maxCup;
  }

  hasQueue() {
    return this.queue.length > 0;
  }

  isBroken() {
    return this.wearLevel <= 0;
  }

  checkCoffee(coffee) {
    if (coffee == null) throw new Error("Не задан объект кофе");
    if (!coffee instanceof Coffee)
      throw new Error("Перед объект неверного типа. Ожидался объект кофе.");
  }

  /**
   * Запускает приготовление кофе
   * @param {Coffee} coffee - кофе, которое требуется приготовить
   * @returns {Promise<Coffee>} - промис, который выполнится после приготовления кофе
   */
  createCoffee(coffee) {
    this.checkCoffee(coffee);

    const promise = new Promise((resolve, reject) => {

      if (this.isBroken()) {
        reject(coffee);
        return;
      }

      if (!this.canBrew()) {
        this.queue.push({ resolve, reject, coffee });
        return;
      }

      this.brewing += 1;
      this.wearLevel -= 1;

      setTimeout(() => {
        this.brewing -= 1;
        resolve(coffee);
      }, coffee.preparationTime);
    });

    promise.finally(() => {
      if (!this.hasQueue() || !this.canBrew()) return;

      const next = this.queue.at(0);
      this.queue.splice(0, 1);

      if (this.isBroken()) {
        next.reject(next.coffee);
        return;
      }

      this.brewing += 1;
      this.wearLevel -= 1;

      setTimeout(() => {
        this.brewing -= 1;
        next.resolve(next.coffee);
      }, next.coffee.preparationTime);
    });

    return promise;
  }
}

module.exports = { Coffee, CoffeeMachine };

/*
const log = (coffee) => console.log(coffee.name);
const rejectCoffee = (coffee) =>
  console.log("Out of order. Cannot brew " + coffee.name);

const machine = new CoffeeMachine(2);

const cappuccino = new Coffee("Капучино", 6000);
const latte = new Coffee("Латте", 1000);
const americano = new Coffee("Американо", 3000);
//const error1 = new Coffee('Coffee', 'Coffee');
//const error2 = new Coffee(1, 1000);
//const error3 = new Coffee('Coffee', 1000.5);

machine.createCoffee(cappuccino).then(log, rejectCoffee);
machine.createCoffee(americano).then(log, rejectCoffee);
machine.createCoffee(latte).then(log, rejectCoffee);
machine.createCoffee(americano).then(log, rejectCoffee);
//machine.createCoffee(cappuccino).then(log, rejectCoffee);
*/

/*
  Американо
  Латте
  Капучино
  Американо
*/
