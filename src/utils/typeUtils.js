export const TYPE_STRING   = 'string'
export const TYPE_FUNCTION = 'function'

export const isType     = (value, type) => typeof(value) === type
export const isDefined  = (value) => value !== undefined
export const isFunction = (value) => isType(value, TYPE_FUNCTION)
export const isString   = (value) => isType(value, TYPE_STRING)
export const isNumber   = (value) => !isNaN(parseInt(value)) && value !== null
export const isObject   = (value) => value instanceof Object && value.constructor === Object
export const isArray    = (value) => Array.isArray(value)
