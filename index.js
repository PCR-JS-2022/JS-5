/** Класс кофе */
class Coffee {
  /**
   * Создаёт экзмепляр кофе
   * @param {string} name - название кофе
   * @param {number} preparationTime - время приготовления кофе
   */
  constructor(name, preparationTime) {
    if (typeof name != "string")
      throw new Error('Некорректное название для кофе')

    if (typeof preparationTime != "number" ||
      !Number.isInteger(preparationTime))
      throw new Error("Неккоректное время приготовления");

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

     if (typeof wearLevel != "number")
       throw new Error("Некорректный уровень износа");

     this.maxCup = maxCup;
     this.wearLevel = wearLevel;
     this.queue = [];
   }

   hasQueue() {
     return this.queue.length >= this.maxCup;
   }

   isBroken() {
     return this.wearLevel <= 0;
   }

   isCoffee(coffee) {
     if (!coffee instanceof Coffee)
       throw new Error("Не задан объект кофе");
  }

  /**
   * Запускает приготовление кофе
   * @param {Coffee} coffee - кофе, которое требуется приготовить
   * @returns {Promise<Coffee>} - промис, который выполнится после приготовления кофе
   */
  createCoffee(coffee) {
    this.isCoffee(coffee);

     const promise = new Promise((resolve, reject) => {
       if (this.isBroken()) {
         reject(coffee);
         return;
       }

       if (this.hasQueue()) {
        await Promise.race(this.queue);
        this.queue.shift();
      }

      setTimeout(() => {
        resolve(coffee);
      }, coffee.preparationTime);
    });

    this.wearLevel -= 1;
    this.queue.push(promise);
    return promise;
  }
}

module.exports = { Coffee, CoffeeMachine };
