/**
  name    - name of cookie
  value   - value of cookie
  expires - expire time in minutes
*/
export const setCookie = (name, value, expiration) => {
  const date = new Date()
  date.setTime(date.getTime() + (expiration * 60 * 1000))

  const expires = `${expires}=${date.toUTCString()}`

  document.cookie = `${name}=${value};expires=${expires};path=/`
}

export const getCookie = (name) => {
  const cookieName = `${name}=`
  const allCookies = document.cookie.split(';')
  let cookieValue  = ''

  allCookies.some((cookie) => {
    const trimmedCookie = trimCookie(cookie)

    if (!trimmedCookie.indexOf(cookieName)) {
      cookieValue = trimmedCookie.substring(cookieName.length, trimmedCookie.length)
    }

    return !!cookieValue
  })

  return cookieValue
}

const trimCookie = (cookie) => {
  let trimmed = cookie

  while (trimmed.charAt(0) == ' ') {
    trimmed = trimmed.substring(1)
  }

  return trimmed
}

export const deleteCookie = (name) => {
  setCookie(name, '', -1)
}
