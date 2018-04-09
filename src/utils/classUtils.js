export const joinClasses = (...classNames) => classNames.filter(filterEmpty).join(' ')
export const conditionClass = (condition, firstClassName, secondClassName = '') => condition ? firstClassName : secondClassName

const filterEmpty = (value) => value !== undefined && value !== ''
