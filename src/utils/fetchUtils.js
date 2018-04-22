import { isDefined } from './typeUtils'
import { getCookie } from '../features/Cookies'

const SERVER_ADDRESS = 'https://quiz-app-backend.herokuapp.com/api/'

const METHOD_GET    = 'GET'
const METHOD_POST   = 'POST'
const METHOD_PATCH  = 'PATCH'
const METHOD_DELETE = 'DELETE'

const MODE_CORS = 'cors'
// const AUTHORIZATION = `Bearer ${getCookie('token')}`

const CONTENT_TYPE_JSON = 'application/json'
const CONTENT_TYPE_FORM = 'application/x-www-form-urlencoded'

export const STATUS_UNAUTHORIZED  = 401
export const STATUS_NOT_FOUND     = 404
export const STATUS_UNPROCESSABLE = 422
export const STATUS_INTERNAL      = 500

export const fetchGet = (url) => fetch(getFullUrl(url), {
  method:  METHOD_GET,
  mode:    MODE_CORS,
  headers: {
    'Content-Type':  CONTENT_TYPE_JSON,
    'Authorization': `Bearer ${getCookie('token')}`,
  },
}).then((response) => handleResponse(response))

export const fetchPost = (url, data) => fetch(getFullUrl(url), {
  method:  METHOD_POST,
  body:    JSON.stringify(data),
  headers: {
    'Content-Type':  CONTENT_TYPE_JSON,
    'Authorization': `Bearer ${getCookie('token')}`,    
  },
}).then((response) => handleResponse(response))

export const fetchPatch = (url, data) => fetch(getFullUrl(url), {
  method:  METHOD_PATCH,
  body:    JSON.stringify(data),
  headers: {
    'Content-Type':  CONTENT_TYPE_JSON,
    'Authorization': `Bearer ${getCookie('token')}`,    
  },
}).then((response) => handleResponse(response))

export const fetchDelete = (url) => fetch(getFullUrl(url), {
  method:  METHOD_DELETE,
  headers: {
    'Authorization': `Bearer ${getCookie('token')}`,    
  },
}).then((response) => handleResponse(response))

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
  }).then((response) => handleResponse(response))

}

export const handleResponse = (response) => {
  const error = switchErrorMessage(response.status)

  if (error) {
    throw Error(error)
  }

  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response.json()
}

const switchErrorMessage = (status) => {
  switch (status) {
    case STATUS_UNPROCESSABLE: return 'Błąd serwera!'
    case STATUS_UNAUTHORIZED: return 'Brak autoryzacji.'
    case STATUS_NOT_FOUND: return 'Błedny adres zapytania.'
    case STATUS_INTERNAL: return 'Błąd serwera.'
  }
} 
