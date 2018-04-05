import { deepMerge, removeEmptyKeys } from './objectUtils'
import { isObject, isDefined } from './typeUtils'

export const SERVER_ADDRESS = 'https://quiz-app-duninwasowiczk332687.codeanyapp.com/'


export const METHOD_POST    = 'POST'
export const METHOD_GET     = 'GET'
export const METHOD_PATCH   = 'PATCH'
export const METHOD_DELETE  = 'DELETE'

export const MODE_CORS = 'cors'

export const ACCEPT_JSON = 'application/json'

export const CONTENT_TYPE_FORM = 'application/x-www-form-urlencoded'
export const CONTENT_TYPE_JSON = 'application/json'

export const STATUS_UNAUTHORIZED = 401
export const STATUS_NOT_FOUND    = 404
export const STATUS_INTERNAL     = 500

const ARGS_DEF  = {
  mode: MODE_CORS,
}
const ARGS_GET  = Object.assign({}, ARGS_DEF, {
  method: METHOD_GET,
})
const ARGS_POST = Object.assign({}, ARGS_DEF, {
  method:  METHOD_POST,
  headers: {
    'Accept':       ACCEPT_JSON,
    'Content-Type': CONTENT_TYPE_JSON,
  },
})
const ARGS_PATCH = Object.assign({}, ARGS_DEF, {
  method:  METHOD_PATCH,
  headers: {
    'Accept':       ACCEPT_JSON,
    'Content-Type': CONTENT_TYPE_JSON,
  },
})
const ARGS_DELETE = Object.assign({}, ARGS_DEF, {
  method: METHOD_DELETE,
})
const ARGS_FORM = deepMerge(ARGS_POST, {
  headers: {
    'Content-Type': CONTENT_TYPE_FORM,
  },
})
const ARGS_FORM_PATCH = deepMerge(ARGS_POST, {
  method:  METHOD_PATCH,
  headers: {
    'Content-Type': CONTENT_TYPE_FORM,
  },
})

export const fetchGet = (url, params) =>
  fetch(getFullUrl(url, params), getFullArgs(ARGS_GET))
    .then(logResponse)

export const fetchPost = (url, data, args = ARGS_POST) => {
  const body = isObject(data) ? JSON.stringify(removeEmptyKeys(data)) : data

  return fetch(getFullUrl(url), getFullArgs(Object.assign({ body }, args)))
    .then(logResponse)
}

export const fetchPatch = (url, data, args) =>
  fetchPost(url, data, Object.assign({}, ARGS_PATCH, args))

export const fetchDelete = (url) =>
  fetch(getFullUrl(url), getFullArgs(ARGS_DELETE))
    .then(logResponse)

export const postForm = (url, data, args = ARGS_FORM) => {
  const body = new URLSearchParams()

  Object.keys(data).forEach((key) => isDefined(data[key]) ?  body.set(key, data[key]) : '')

  return fetchPost(url, body, args)
}

export const patchForm = (url, body) => postForm(url, body, ARGS_FORM_PATCH)

/* data helpers */
const getFullUrl = (url = '', params) => `${SERVER_ADDRESS}${url}${serialize(params)}`
const getFullArgs = (args) => deepMerge({}, args)

const serialize = (object = {}) => {
  let params = Object.keys(object)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`)
    .join('&')

  if (params) {
    params = `?${params}`
  }

  return params
}

const logResponse = (response) => {
  // eslint-disable-next-line no-console
  // console.log('FETCH RESPONSE: ', response)

  return response
}
