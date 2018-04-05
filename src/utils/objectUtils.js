import { isDefined } from './typeUtils'
import { isEmpty } from './stringUtils'

export const propertiesDiffer = (properties = []) => (next, curr) =>
  properties.some((prop) => next[prop] !== curr[prop])

export const propertiesEqual = (properties) => {
  const differ = propertiesDiffer(properties)

  return (next, curr) => !differ(next, curr)
}

export const extractProp = (prop) => (object) => object[prop]

export const hasEmptyKeys = (object) => Object.keys(object).some((key) => {
  const value = object[key]

  return !isDefined(value) || isEmpty(value)
})

export const areEntriesEmpty = (object, entries) => entries.every((entry) => {
  const value = object[entry]

  return isDefined(value) && !isEmpty(value)
})

export const removeEmptyKeys = (object) => Object.keys(object).reduce((result, key) => {
  const entry = object[key]

  if (isDefined(entry)) {
    result[key] = entry
  }

  return result
}, {})

export const deepMerge = (...sources) => {
  const result = {}

  sources.forEach((source) => {
    if (!(source instanceof Object)) {
      return
    }

    const keys = Object.keys(source)

    keys.forEach((key) => {
      const value = source[key]
      let entry   = result[key]

      if (entry instanceof Array) {
        entry = value
      } else if (entry instanceof Object) {
        entry = deepMerge(entry, value)
      } else if (isDefined(value) && !(value === null && isDefined(entry))) {
        entry = value
      }

      result[key] = entry
    })
  })

  return result
}

export const isEmptyObject = (obj) => !Object.keys(obj).length
