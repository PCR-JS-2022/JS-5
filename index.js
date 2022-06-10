/** Класс кофе */
class Coffee {
  /**
   * Создаёт экзмепляр кофе
   * @param {string} name - название кофе
   * @param {number} preparationTime - время приготовления кофе
   */
  constructor(name, preparationTime) {
    // if (typeof this.name !== "string" || typeof this.preparationTime !== "number") {
    //   throw new Error();
    // }

    this.name = name;
    this.preparationTime = preparationTime;
  }
}

/** Класс кофемашины */
class CoffeeMachine {
  /**
   * Создаёт экзмепляр кофемашины
   * @param {number} maxCup - кол-во чашек, в которые параллельно можно готовить кофе
   * @param {number} wearLevel - уровень износа
   * @param {queue} queue - очередь
   */
  constructor(maxCup, wearLevel = 4) {
    this.maxCup = maxCup;
    this.exsistCups = maxCup;
    this.wearLevel = wearLevel;
    this.queue = [];
  }

  /**
   * Запускает приготовление кофе
   * @param {Coffee} coffee - кофе, которое требуется приготовить
   * @returns {Promise<Coffee>} - промис, который выполнится после приготовления кофе
   */
  createCoffee(coffee) {
    const newCofee = new Promise(async (resolve, reject) => {
      if (this.wearLevel <= 0) {
        reject(coffee);
      }
      if (this.exsistCups > 0) {
        this.exsistCups--;
        this.wearLevel--;

        setTimeout(() => {
          this.exsistCups++;
          resolve(coffee);
        }, coffee.preparationTime);
      } else {
        this.queue.push({ coffee, resolve, reject });
      }
    }).then(() => {
      if (this.queue.length) {
        if (this.wearLevel < 0) {
          this.queue.forEach((item) => item.reject(item.coffee));
          this.queue = [];
        } else {
          if (this.exsistCups > 0) {
            const firstNum = this.queue[0];
            this.queue = this.queue.slice(1);
            this.exsistCups--;
            this.wearLevel--;

            setTimeout(() => {
              this.exsistCups++;
              first.resolve(firstNum.coffee);
            }, first.coffee.preparationTime);
          }
        }
      }
    });
    return newCofee;
  }
}

module.exports = { Coffee, CoffeeMachine };
