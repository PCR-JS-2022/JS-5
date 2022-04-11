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
    this.wearLevel = wearLevel;
    this.queue = [];
    this.count = 0;
  }

  /**
   * Запускает приготовление кофе
   * @param {Coffee} coffee - кофе, которое требуется приготовить
   * @returns {Promise<Coffee>} - промис, который выполнится после приготовления кофе
   */
  createCoffee(coffee) {
    const coffeePromise = new Promise((resolve, reject) =>{
      if(this.wearLevel <= 0){
        reject(coffee);
        return;
      }

      if(!(this.count < this.maxCup)){
        this.queue.push({ resolve, reject, coffee });
        return;
      }

      this.count += 1;
      this.wearLevel -= 1;

      setTimeout(() =>{
        this.count -= 1;
        resolve(coffee);
      }, coffee.preparationTime);
      });

    coffeePromise.finally(()=>{
      if(!(this.queue.length > 0) || !(this.count < this.maxCup)){
        return;
      }

      const nextCup = this.queue.at(0);
      this.queue.splice(0, 1);

      if(this.wearLevel <= 0){
        nextCup.reject(nextCup.coffee);
        return;
      }

      this.count += 1;
      this.wearLevel -= 1;

      setTimeout(() => {
        this.count -= 1;
        nextCup.resolve(nextCup.coffee);
      }, nextCup.coffee.preparationTime);
    });   

    return coffeePromise;
  }
}

module.exports = { Coffee, CoffeeMachine };

const log = (coffee) => console.log(coffee.name);

const machine = new CoffeeMachine(2);

const cappuccino = new Coffee('Капучино', 6000);
const latte = new Coffee('Латте', 1000);
const americano = new Coffee('Американо', 3000);
