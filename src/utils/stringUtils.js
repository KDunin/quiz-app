const EMPTY_STRING = ''

export const isEmpty = (string) => string === EMPTY_STRING
export const padLeft = (text, length = 2, padder = '0') =>
  `${Array(length).fill(padder).join('')}${text}`.slice(-length)

export const toPx = (number) => `${number}px`
