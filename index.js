const { 
  validateName, 
  validateCount,
  validateTime 
} = require("./validate")



/** Класс кофе */
class Coffee {
  /**
   * Создаёт экзмепляр кофе
   * @param {string} name - название кофе
   * @param {number} preparationTime - время приготовления кофе
   */
  constructor(name, preparationTime) {
    validateName(name)
    validateTime(preparationTime)
    this.name = name
    this.preparationTime = preparationTime
  }
}


const validateCoffee = (coffee) => {
  if (!coffee instanceof Coffee){
      throw new Error()
  }
}


/** Класс кофемашины */
class CoffeeMachine {
  /**
   * Создаёт экзмепляр кофемашины
   * @param {number} maxCup - кол-во чашек, в которые параллельно можно готовить кофе
   */
  constructor(maxCup, wearLevel = 4) {
    validateCount(maxCup)
    validateCount(wearLevel)
    this.maxCup = maxCup
    this.wearLevel = wearLevel
    this.queue = []
  }

  /**
   * Запускает приготовление кофе
   * @param {Coffee} coffee - кофе, которое требуется приготовить
   * @returns {Promise<Coffee>} - промис, который выполнится после приготовления кофе
   */
  createCoffee(coffee) {
    validateCoffee(coffee)

    let coffeePromise = new Promise(async (resolve, reject) => {
      if (this.wearLevel <= 0) {
        reject(coffee)
      }
      if (this.maxCup <= this.queue.length) {
        await Promise.race(this.queue.map((cf) => cf.promise))
      }
      setTimeout(() => {
        this.queue = this.queue.filter((cf) => cf !== coffee)
        resolve(coffee)
      }, coffee.preparationTime)
    })

    this.wearLevel -= 1
    this.queue.push(coffee)
    
    return coffeePromise
  }
}

module.exports = { Coffee, CoffeeMachine };