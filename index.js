/** Класс кофе */
class Coffee {
  /**
   * Создаёт экзмепляр кофе
   * @param {string} name - название кофе
   * @param {number} preparationTime - время приготовления кофе
   */
  constructor(name, preparationTime) {
    if (typeof name != "string" || typeof preparationTime !== "number"){
      throw new Error("Переданы некорректные данные.");
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
    if (typeof maxCup !== "number"){
      throw new Error("Переданы некорректные данные.");
    }
    this.maxCup = maxCup;
    this.queue = [];
    this.wearLevel = wearLevel;
  }

  /**
   * Запускает приготовление кофе
   * @param {Coffee} coffee - кофе, которое требуется приготовить
   * @returns {Promise<Coffee>} - промис, который выполнится после приготовления кофе
   */
  createCoffee(coffee) {
    if (!(coffee instanceof Coffee)){
      throw new Error("Переданы некорректные данные.");
    }
    const promise = new Promise(async (resolve, reject) => {
      if (this.wearLevel <= 0){
        reject("coffee");
      }
      if (this.maxCup > 0) {
        this.maxCup--;
        setTimeout(() => {
          this.maxCup++;
          this.wearLevel--;
          resolve(coffee);
        }, coffee.preparationTime);
      } else {
        this.queue.push({coffee, resolve, reject});
      }
    }).finally(() => {
      if (this.maxCup > 0 && this.queue.length > 0 && this.wearLevel > 0){
        this.maxCup--;
        const firstInQueue = this.queue.shift();;
        setTimeout(() => {
          this.maxCup++;
          this.wearLevel--;
          firstInQueue.resolve(firstInQueue.coffee)
        }, firstInQueue.coffee.preparationTime);
      }
      if (this.wearLevel <= 0) {
        this.queue.forEach(e => e.reject(e.coffee));
      }
    });

    return promise;
  }
}

module.exports = { Coffee, CoffeeMachine };
