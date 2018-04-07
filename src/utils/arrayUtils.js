export const shuffleArray = (array) => array.slice().sort(() => 0.1*array.length - Math.random())

export const isEmpty = (array) => array.length === 0
