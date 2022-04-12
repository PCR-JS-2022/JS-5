const validateName = (name) => {
    if (typeof name !== 'string') {
        throw new Error("Неверное имя")
    }
}


const validateCount = (count) => {
    if (typeof count !== 'number' || count < 0) {
        throw new Error("Неверное количество")
    }
}


const validateTime = (time) => {
    if (typeof time !== 'number' || time < 0) {
        throw new Error("Неверное время")
    }
}


module.exports = {
    validateName,
    validateCount,
    validateTime
}