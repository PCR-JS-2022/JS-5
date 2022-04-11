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
    this.maxCup = maxCup;
    this.freeCaps = maxCup;
    this.queue = [];
    this.wearLevel = wearLevel;
  }

  /**
   * Запускает приготовление кофе
   * @param {Coffee} coffee - кофе, которое требуется приготовить
   * @returns {Promise<Coffee>} - промис, который выполнится после приготовления кофе
   */
  createCoffee(coffee) {
    const promise = new Promise((resolve, reject) => {
      if(this.wearLevel <= 0) {
        reject(coffee);
      }
      if(this.freeCaps > 0) {
        this.freeCaps--;
        this.wearLevel--;

        setTimeout(() => {
          this.freeCaps++;
          resolve(coffee);
        }, coffee.preparationTime);
      } else {
        this.queue.push({coffee, resolve, reject});
      }
    }).finally(() => {
      if(this.queue.length > 0) {
        if(this.wearLevel <= 0) {
          this.queue.forEach(i => i.reject(i.coffee));
        } else {
          if (this.freeCaps > 0) {
            const first = this.queue[0];
            this.queue = this.queue.slice(1);
            this.freeCaps--;
            this.wearLevel--;
            
            setTimeout(() => {
              this.freeCaps++;
              first.resolve(first.coffee);
            }, first.coffee.preparationTime);
          }
        }
      }
    })
    return promise;
  }
}

module.exports = { Coffee, CoffeeMachine };
