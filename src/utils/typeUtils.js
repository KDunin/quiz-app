const TYPE_FUNCTION = 'function'

export const isFunction = (value) => isType(value, TYPE_FUNCTION)
export const isType     = (value, type) => typeof(value) === type
