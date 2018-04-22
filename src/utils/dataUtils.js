export const findById = (id) => (item) => id === item.id
export const filterById = (id) => (item) => id !== item.id
export const updateIfIdMatches = (data) => (item) => data.id === item.id ? data : item
