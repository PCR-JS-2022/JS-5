class Coffee {
	/**
	 * @param {string} name
	 * @param {number} preparationTime
	 */
	constructor(name, preparationTime) {
		if (!(typeof name === 'string' && name && typeof preparationTime === 'number' && preparationTime > 0)) {
			throw new Error("Invalid input data");
		}

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
  constructor(maxCup) {
  }

  /**
   * Запускает приготовление кофе
   * @param {Coffee} coffee - кофе, которое требуется приготовить
   * @returns {Promise<Coffee>} - промис, который выполнится после приготовления кофе
   */
  createCoffee(coffee) {
  }
}

module.exports = { Coffee, CoffeeMachine };
