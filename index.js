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

  wearLevel;
  maxCup;
  #queue;
  #subscribers;

  /**
   * Создаёт экзмепляр кофемашины
   * @param {number} maxCup - кол-во чашек, в которые параллельно можно готовить кофе
   */
  constructor(maxCup, wearLevel = 4) {
    if (!maxCup || typeof maxCup !== 'number' || maxCup < 0) {
      throw new TypeError('maxCup must be a number');
    }

    if (!wearLevel || typeof wearLevel !== 'number' || wearLevel < 0) {
      throw new TypeError('wearLevel must be a number');
    }

    this.maxCup = maxCup;
    this.wearLevel = wearLevel;
    this.#queue = [];
    this.#subscribers = [];
  }

  /** Вызываются события подписчиков */
  #onQueueChange = () => {
    this.#subscribers.forEach(({coffee, callback}) => callback());
  }

  /** Подписаться на изменение очереди */
  #subscribeToQueueChange = ({coffee, callback}) => {
    this.#subscribers.push({coffee, callback});
  }

  /** Отписаться от изменения очереди */
  #unsubscribeFromQueueChange = (coffeeToUnsubscribe) => {
    this.#subscribers = this.#subscribers.filter(({coffee}) => coffee !== coffeeToUnsubscribe);
  }

  /**
   * Запускает приготовление кофе
   * @param {Coffee} coffee - кофе, которое требуется приготовить
   * @returns {Promise<Coffee>} - промис, который выполнится после приготовления кофе
   */
  
  createCoffee(coffee) {
    if (!(coffee instanceof Coffee)) {
      throw new TypeError('coffe must be typeof Coffee');
    }

    const promise = new Promise((resolve, reject) => {

      //Событие при изменении очереди на кофемашину
      const callback = () => {

        if (this.wearLevel <= 0) {
          reject(coffee);
          return;
        }

        const coffeeIndex = this.#queue.indexOf(coffee);
        if (coffeeIndex >= this.maxCup) {
          return;
        }
  
        this.wearLevel--;
        this.#unsubscribeFromQueueChange(coffee);
  
        setTimeout(() => {
          this.#queue = this.#queue.filter(queueCoffee => coffee !== queueCoffee);
          this.#onQueueChange();
          resolve(coffee);
        }, coffee.preparationTime);
      };

      this.#subscribeToQueueChange({coffee, callback});
      this.#queue.push(coffee);
      this.#onQueueChange();
    });

    return promise;
  }
}

module.exports = { Coffee, CoffeeMachine };
