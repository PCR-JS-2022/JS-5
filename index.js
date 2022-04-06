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
   * @param {number} wearLevel - уровень износа
   */
  constructor(maxCup, wearLevel = 4) {
    this.maxCup = maxCup;
    this.wearLevel = wearLevel;

    this.queue = [];
    this.availableCups = maxCup;
  }

  /**
   * Запускает приготовление кофе
   * @param {Coffee} coffee - кофе, которое требуется приготовить
   * @returns {Promise<Coffee>} - промис, который выполнится после приготовления кофе
   */
  createCoffee(coffee) {
    const coffeePromise = new Promise((resolve, reject) => {
      if (this.wearLevel <= 0) {
        reject(coffee);
      }

      if (this.availableCups > 0) {
        this.availableCups--;
        this.wearLevel--;

        setTimeout(() => {
          this.availableCups++;
          resolve(coffee);
        }, coffee.preparationTime);

      } else {
        this.queue.push({ coffee, resolve, reject });
      }
    });

    coffeePromise.finally(() => {
      if (this.queue.length) {
        if (this.wearLevel <= 0) {
          this.queue.forEach(queuedItem => queuedItem.reject(queuedItem.coffee));
          this.queue = [];

        } else {
          if (this.availableCups > 0) {
            const firstInQueue = this.queue.shift();

            this.availableCups--;
            this.wearLevel--;

            setTimeout(() => {
              this.availableCups++;
              firstInQueue.resolve(firstInQueue.coffee);
            }, firstInQueue.coffee.preparationTime);

          }
        }

      }
    }).catch(coffee => console.log(`No ${coffee.name}. The coffee machine is worn out, sorry!`));

    return coffeePromise;
  }
}

module.exports = { Coffee, CoffeeMachine };
