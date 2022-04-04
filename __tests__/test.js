const assert = require('assert');
const { Coffee, CoffeeMachine } = require('../index');

describe('Coffee', () => {
  it('Корректно создает экземпляр', () => {
    const coffee = new Coffee('Arabic', 3000);
    assert.equal(coffee instanceof Coffee, true);
    assert.equal(coffee.name, 'Arabic');
    assert.equal(coffee.preparationTime, 3000);
  });
});

describe('CoffeeMachine', function () {
  it('Корректно создает экземпляр', () => {
    const coffeeMachine = new CoffeeMachine(3);
    assert.equal(coffeeMachine.maxCup, 3);
    assert.equal(typeof coffeeMachine.createCoffee, 'function');
  });
});

describe('[EXTRA] CoffeeMachine', () => {
  it('Корректно создает экземпляр', () => {
    const coffeeMachine = new CoffeeMachine(2);
    assert.equal(coffeeMachine.maxCup, 2);
    assert.equal(coffeeMachine.wearLevel, 4);
    assert.equal(typeof coffeeMachine.createCoffee, 'function');
  });
});