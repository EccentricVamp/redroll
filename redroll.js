export const DICE_NOTATION = /^([1-9]\d*)?d([1-9]\d*)([+-][1-9]\d*)?$/

/**
 * Represents a formula in dice notation
 */
export class Formula {
    dice = 0
    sides = 0
    modifier = 0
}


/**
 * Represents the results of a roll
 */
export class Result {
    rolls = []
    modifier = 0
    total = 0

    /**
     * Returns a string representation of the result
     * @returns {string}
     */
    toString() {
        const rolls = this.rolls.join(' + ')
        const sign = this.modifier < 0 ? '-' : '+'
        return `${rolls} ${sign} ${this.modifier} = ${this.total}`
    }
}

/**
 * Parse a dice notation string into a formula
 * @param {string} diceNotation Dice to roll in dice notation
 * @returns Formula on success or false on failure
 */
export function parse(diceNotation) {
    const pieces = diceNotation.match(DICE_NOTATION)
    if (!pieces) return false

    const formula = new Formula()
    formula.dice = Number(pieces[1]) || 1
    formula.sides = Number(pieces[2])
    formula.modifier = Number(pieces[3]) || 0

    return formula
}

/**
 * Test the validity of the formula
 * @param {string} diceNotation Dice to roll in dice notation
 * @returns true on success or false on failure
 */
export function validate(diceNotation) {
    return diceNotation.match(DICE_NOTATION) ? true : false
}

/**
 * Roll the dice defined by the formula
 * @param {string} diceNotation 
 * @returns Result on success or false on failure
 */
export function roll(diceNotation) {
    const formula = parse(diceNotation)
    if (!formula) return false

    const result = new Result()
    for (const i = 0; i < formula.dice; i++) {
        result.rolls[i] = 1 + Math.floor(Math.random() * formula.sides)
        result.total += result.rolls[i]
    }

    result.modifier = formula.modifier
    result.total += result.modifier

    return result
}