class Coffee {
	/**
	 * @param {string} name
	 * @param {number} preparationTime
	 */
	constructor(name, preparationTime) {
		if (!(typeof name === 'string' && name && typeof preparationTime === 'number' && preparationTime >= 0)) {
			throw new Error("Invalid input data");
		}

		this.name = name;
		this.preparationTime = preparationTime;
	}
}

class CoffeeMachine {
	/**
	 * @param {number} maxCup
	 * @param {number} wearLevel
	 */
	constructor(maxCup, wearLevel = 4) {
		if (!(typeof maxCup === 'number' && maxCup >= 0 && typeof wearLevel === 'number')) {
			throw new Error("Invalid input data");
		}

		this.maxCup = maxCup;
		this.wearLevel = wearLevel;
		this._promiseQueue = [];
		this._ids = 0;
	}

	/**
	 * @param {Coffee} coffee
	 * @returns {Promise<Coffee>}
	 */
	async createCoffee(coffee) {
		if (!(coffee instanceof Coffee)) {
			throw new Error("Invalid input data");
		}

		const id = this._ids;
		const promise = new Promise(async (resolve, reject) => {
			if (this.wearLevel <= 0) {
				reject(coffee);
				return;
			}

			if (this._promiseQueue.length >= this.maxCup) {
				await Promise.race(this._promiseQueue.map(p => p.promise));
			}
			setTimeout(() => {
				this._promiseQueue = this._promiseQueue.filter(p => p.id !== id);
				resolve(coffee);
			}, coffee.preparationTime);
		})

		this.wearLevel--;
		this._ids++;
		this._promiseQueue.push({ id, promise });
		return promise;
	}
}

module.exports = { Coffee, CoffeeMachine };
