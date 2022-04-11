class Coffee {

  constructor(name, preparationTime) {

    if (!name === 'string' || !name)
     throw new Error ('Не верный формат имени');

    if (!preparationTime === 'number' || preparationTime < 0)
     throw new Error (`Не верный формат времени`);

     this.name = name;
     this.preparationTime = preparationTime;
  }
}


class CoffeeMachine {

  constructor(maxCup, wearLevel = 4) {

    this.maxCup = maxCup;
    this.wearLevel = wearLevel;
    this.timeouts = [];
  }

  createCoffee(coffee) {
    
    if (!coffee instanceof Coffee)
			throw new Error('Входные данные не корректны');

      if (this.maxCup > 0){
        this.timeouts.push(coffee.preparationTime);
        this.timeouts.sort();
        this.maxCup--;
        this.wearLevel--;
  
        var promise1 = new Promise ((resolve, reject) => {
  
          if (this.wearLevel === 0){
            reject(coffee);
          }
  
          setTimeout(()=>{
            resolve(coffee);
          },coffee.preparationTime);
        })
  
        promise1.then((value) => {
          this.maxCup++;
          this.timeouts.splice(0, 1);
          return promise1;
        })
  
        promise1.catch((value) => {
          return promise1;
  
        })
      }
      else {
        setTimeout(() => {
          this.createCoffee(coffee)}, this.timeouts[0]
        );
      };
    };
}

module.exports = { Coffee, CoffeeMachine };


const machine = new CoffeeMachine(250);

const cappuccino = new Coffee('Капучино', 6000);
const latte = new Coffee('Латте', 1000);
const americano = new Coffee('Американо', 3000);
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
machine.createCoffee(americano)
