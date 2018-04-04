export const joinClasses = (...classNames) => classNames.filter(filterEmpty).join(' ')

const filterEmpty = (value) => value !== undefined && value !== ''
