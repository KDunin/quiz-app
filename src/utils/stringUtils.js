import { randomNumber } from './numberUtils'

const EMPTY_STRING = ''

export const isEmpty = (string) => string === EMPTY_STRING

export const toPx = (number) => `${number}px`

export const randomString = (length = 5) => {
  let text = EMPTY_STRING
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  for (let i = 0; i<length; i++) {
    text += possible[randomNumber(possible.length)]
  }
  return text
}
