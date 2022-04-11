/** Класс кофе */
class Coffee {
  /**
   * Создаёт экзмепляр кофе
   * @param {string} name - название кофе
   * @param {number} preparationTime - время приготовления кофе
   */
  constructor(name, preparationTime) {
    this.name = name
    this.preparationTime = preparationTime
  }
}

/** Класс кофемашины */
class CoffeeMachine {
  /**
   * Создаёт экзмепляр кофемашины
   * @param {number} maxCup - кол-во чашек, в которые параллельно можно готовить кофе
   */
  constructor(maxCup, wearLevel = 4) {
    this.maxCup = maxCup
    this.wearLevel = wearLevel
    this.coffeeFuture = []
  }

  uppdateCoffeeMachine(coffee) {
    this.maxCup--;
    setTimeout(() => {
      this.maxCup += 1;
      this.wearLevel -= 1;
    }, coffee.preparationTime);
  }

  doesTheMachineWork() {
    if (this.wearLevel <= 1 && this.coffeeFuture.length) {
      setTimeout(() => {
        throw new Error('Не получилось поставить кофе в очередь машинка сломалась');
      }, this.coffeeFuture.pop().coffee.preparationTime);
    }
  }
  /**
   * Запускает приготовление кофе
   * @param {Coffee} coffee - кофе, которое требуется приготовить
   * @returns {Promise<Coffee>} - промис, который выполнится после приготовления кофе
   */
  createCoffee(coffee) {
    return new Promise((resolve, reject) => {
      if (this.wearLevel <= 0) {
        reject(coffee);
      }

      if (this.maxCup == 0) {
        this.coffeeFuture.push({ coffee, resolve, reject })
      }

      if (this.maxCup > 0) {
        this.uppdateCoffeeMachine(coffee)

        setTimeout(() => {
          resolve(coffee)
        }, coffee.preparationTime)
      }
    }).finally(() => {
      this.doesTheMachineWork()

      if (this.maxCup > 0 && this.coffeeFuture.length) {
        const next = this.coffeeFuture.shift();
        this.uppdateCoffeeMachine(next.coffee)

        setTimeout(() => {
          next.resolve(next.coffee);
        }, next.coffee.preparationTime);
      }
    })
  }
}

module.exports = { Coffee, CoffeeMachine };
