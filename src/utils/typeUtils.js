export const TYPE_FUNCTION = 'function'

export const isType     = (value, type) => typeof(value) === type
export const isDefined  = (value) => value !== undefined
export const isFunction = (value) => isType(value, TYPE_FUNCTION)
