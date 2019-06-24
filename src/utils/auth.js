const localStorage = window.localStorage
const userKey = 'user_info'

export function getUser () {
  return JSON.parse(localStorage.getItem(userKey))
}

export function saveUser (data) {
  localStorage.setItem(userKey, JSON.stringify(data))
}

export function removeUser () {
  localStorage.removeItem(userKey)
}
