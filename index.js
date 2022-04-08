/** Класс кофе */
class Coffee {
	/**
	 * Создаёт экзмепляр кофе
	 * @param {string} name - название кофе
	 * @param {number} preparationTime - время приготовления кофе
	 */
	constructor(name, preparationTime) {
		if (typeof name !== 'string' || !name)
			throw new Error('Некорректное имя для кофе')

		if (typeof preparationTime !== 'number' || preparationTime < 0)
			throw new Error('Некорректное время приготовления')

		this.name = name
		this.preparationTime = preparationTime
	}
}

/** Класс кофемашины */
class CoffeeMachine {
	#queue = []
	#count = 0

	/**
	 * Создаёт экзмепляр кофемашины
	 * @param {number} maxCup - кол-во чашек, в которые параллельно можно готовить кофе
	 * @param {number} wearLevel - уровень износа кофемашины
	 */
	constructor(maxCup, wearLevel = 4) {
		if (typeof maxCup !== 'number' || maxCup < 0)
			throw new Error('Некорректное кол-во чашек')

		if (typeof wearLevel !== 'number')
			throw new Error('Некорректный уровень износа кофемашины')

		this.maxCup = maxCup
		this.wearLevel = wearLevel
	}

	/**
	 * Запускает приготовление кофе
	 * @param {Coffee} coffee - кофе, которое требуется приготовить
	 * @returns {Promise<Coffee>} - промис, который выполнится после приготовления кофе
	 */
	async createCoffee(coffee) {
		if (!(coffee instanceof Coffee))
			throw new Error('Некорректный объект кофе')

		const id = this.#count
		this.#count++

		const promise = new Promise(async (resolve, reject) => {
			if (this.wearLevel > 0) {
				this.wearLevel--
				if (this.#queue.length >= this.maxCup) {
					await Promise.race(this.#queue.map(p => p.promise))
				}
				setTimeout(() => {
					this.#queue = this.#queue.filter(p => p.id !== id)
					resolve(coffee)
				}, coffee.preparationTime)
			} else {
				reject(coffee)
			}
		})

		this.#queue.push({id, promise})

		return promise
	}
}

module.exports = {Coffee, CoffeeMachine};
