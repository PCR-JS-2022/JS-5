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
          return coffee;
        }
 
        setTimeout(()=>{
          this.maxCup++;
          this.timeouts.splice(0, 1);
          resolve(coffee);
        },coffee.preparationTime);
      })
    }
    else {
      setTimeout(() => {
        this.createCoffee(coffee)}, this.timeouts[0]
      );
    };
    return promise1
  };
}

module.exports = { Coffee, CoffeeMachine };