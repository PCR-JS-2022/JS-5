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

class CoffeeMachine {
	/**
	 * Создаёт экзмепляр кофемашины
	 * @param {number} maxCup - кол-во чашек, в которые параллельно можно готовить кофе
	 * @param {number} wearLevel - уровень износа кофемашины
	 */
	constructor(maxCup, wearLevel = 4) {
		this.maxCup = maxCup;
		this.wearLevel = wearLevel;
		this.coffeeQueue = [];
		this.cupsCount = 0;
	}

	/**
	 * Запускает приготовление кофе
	 * @param {Coffee} coffee - кофе, которое требуется приготовить
	 * @returns {Promise<Coffee>} - промис, который выполнится после приготовления кофе
	 */
	async createCoffee(coffee) {
		if (!(coffee instanceof Coffee))
			throw new Error("Невалидные входные данные!");

		const id = this.cupsCount;
		const coffeePromise = new Promise(async (resolve, reject) => {
			if (this.wearLevel !== 0) {
				this.wearLevel--;
				if (this.maxCup < this.coffeeQueue.length + 1) {
					await Promise.race(this.coffeeQueue.map(coffee => coffee.promise));
				}
				setTimeout(() => {
					this.coffeeQueue = this.coffeeQueue.filter(coffee => coffee.id !== id);
					resolve(coffee);
				}, coffee.preparationTime);
			} else {
				reject(coffee);
			}
		})
		this.coffeeQueue.push({ id, promise: coffeePromise });
		this.cupsCount++;
		return coffeePromise;
	}
}

module.exports = { Coffee, CoffeeMachine };