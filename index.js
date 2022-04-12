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

  constructor(maxCup, wearLevel = 10) {

    this.maxCup = maxCup;
    this.wearLevel = wearLevel;
    this.cupStack = []
  }

  createCoffee(coffee) {

    if (!(coffee instanceof Coffee)) {
        throw new Error('Передан не объект кофе!');
    };

    const promise = new Promise(async (resolve, reject) => {

        if (this.wearLevel > 0) {
            this.wearLevel--;

            if (this.cupStack.length > this.maxCup) {
              Promise.race(this.cupStack.map((promis) => promis))
            }

            setTimeout(() => {
                this.cupStack.shift()
                resolve(coffee);
            }, coffee.preparationTime);

        } else {
            reject(coffee);
        };

    });
    this.cupStack.push(promise);
    return promise;
  }   
}

module.exports = { Coffee, CoffeeMachine };
