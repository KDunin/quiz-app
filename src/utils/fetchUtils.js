import { isDefined } from './typeUtils'

const SERVER_ADDRESS = 'https://quiz-app-backend.herokuapp.com/'

const METHOD_GET    = 'GET'
const METHOD_POST   = 'POST'
const METHOD_PATCH  = 'PATCH'
const METHOD_DELETE = 'DELETE'

const MODE_CORS = 'cors'

const CONTENT_TYPE_JSON = 'application/json'
const CONTENT_TYPE_FORM = 'application/x-www-form-urlencoded'

export const fetchGet = (url) => fetch(getFullUrl(url), {
  method:  METHOD_GET,
  mode:    MODE_CORS,
  headers: {
    'Content-Type': CONTENT_TYPE_JSON,
  },
}).then((response) => response.json())

export const fetchPost = (url, data) => fetch(getFullUrl(url), {
  method:  METHOD_POST,
  body:    JSON.stringify(data),
  headers: {
    'Content-Type': CONTENT_TYPE_JSON,
  },
}).then((response) => response.json())

export const fetchPatch = (url, data) => fetch(getFullUrl(url), {
  method:  METHOD_PATCH,
  body:    JSON.stringify(data),
  headers: {
    'Content-Type': CONTENT_TYPE_JSON,
  },
}).then((response) => response.json())

export const fetchDelete = (url) => fetch(getFullUrl(url), {
  method: METHOD_DELETE,
}).then((response) => response.json())

const getFullUrl = (url) => {
  return SERVER_ADDRESS + url
}

export const postForm = (url, data) => {
  const body = new FormData()
  
  Object.keys(data).forEach((key) => isDefined(data[key]) ?  body.append(key, data[key]) : '')

  return fetch(getFullUrl(url), {
    method:  METHOD_POST,
    headers: {
      'Content-Type': CONTENT_TYPE_FORM,
    },
    body,
  }).then((response) => response.json())
}
