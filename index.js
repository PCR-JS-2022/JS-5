/** Класс кофе */
class Coffee {
  /**
   * Создаёт экзмепляр кофе
   * @param {string} name - название кофе
   * @param {number} preparationTime - время приготовления кофе
   */
  constructor(name, preparationTime) {
    if (typeof name !== "string" && typeof preparationTime !== "number") {
      throw new Error("Невалидные параметры")
    }
    this.name = name;
    this.preparationTime = preparationTime;
    this.createTime = new Date().getTime();
  }
}

/** Класс кофемашины */
class CoffeeMachine {
  /**
   * Создаёт экзмепляр кофемашины
   * @param {number} maxCup - кол-во чашек, в которые параллельно можно готовить кофе
   */
  constructor(maxCup,wearLevel = 4) {
      if (typeof maxCup !== "number" || typeof wearLevel !== "number") {
          throw new Error("Невалидные параметры")
      }
      this.maxCup = maxCup;
      this.wearLevel = wearLevel;
      this.queue = [];
      this.lastCup = null;
  }

  /**
   * Запускает приготовление кофе
   * @param {Coffee} coffee - кофе, которое требуется приготовить
   * @returns {Promise<Coffee>} - промис, который выполнится после приготовления кофе
   */
  createCoffee(coffee) {
    if (!coffee instanceof Coffee) {
      throw new Error("Это не кофе")
    }
    if (this.queue.length < this.maxCup) {
        this.queue.push(coffee);
        this.lastCup = coffee;
    }
    else {
        setTimeout(() => {},this.lastCup.preparationTime);
    }
    const promise = new Promise((resolve,reject) => {
        if (this.wearLevel > 0) {
        setTimeout(() => {
            resolve(coffee);
            this.queue.filter((elem => elem.createTime !== coffee.createTime));
            this.wearLevel -= 1;
            }, coffee.preparationTime);
        }
        else {
            reject(coffee);
            this.queue.filter((elem => elem.createTime !== coffee.createTime));
        }
    })
    return promise;
  }
}



module.exports = { Coffee, CoffeeMachine };
