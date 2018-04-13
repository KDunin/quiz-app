export const SERVER_ADDRESS = 'https://quiz-app-backend.herokuapp.com/'

export const METHOD_GET     = 'GET'
export const METHOD_POST    = 'POST'

export const MODE_CORS = 'cors'

export const CONTENT_TYPE_JSON = 'application/json'

export const fetchGet = (url) => fetch(getFullUrl(url), {
  method:  METHOD_GET,
  mode:    MODE_CORS,
  headers: {
    'Content-Type': CONTENT_TYPE_JSON,
  },
})

export const fetchPost = (url, data) => fetch(getFullUrl(url), {
  method:  METHOD_POST,
  body:    JSON.stringify(data),
  headers: {
    'Content-Type': CONTENT_TYPE_JSON,
  },
})

const getFullUrl = (url) => {
  return SERVER_ADDRESS + url
}
