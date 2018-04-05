export const joinClasses = (...classNames) => classNames.filter(filterEmpty).join(' ')
export const conditionClass = (condition, className) => condition ? className : ''

const filterEmpty = (value) => value !== undefined && value !== ''
