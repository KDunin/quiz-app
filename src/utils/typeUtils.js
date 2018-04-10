const TYPE_FUNCTION = 'function'
const TYPE_NUMBER = 'number'

export const isType     = (value, type) => typeof(value) === type
export const isDefined  = (value) => value !== undefined
export const isFunction = (value) => isType(value, TYPE_FUNCTION)
export const isNumber   = (value) => isType(value, TYPE_NUMBER) && !isNaN(value)
