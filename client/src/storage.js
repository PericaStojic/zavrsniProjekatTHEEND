export const saveUser = user => {
  window.localStorage.setItem('_user', toString(JSON.stringify(user)))
}

export const getUser = () => {
  const user = window.localStorage.getItem('_user')
  if (user && user !== '') {
    return JSON.parse(toString(user))
  }
  return false
}

export const removeUser = () => {
  window.localStorage.removeItem('_user')
}

export const setCurrentPage = page => {
  window.localStorage.setItem('_currentPage', page)
}

export const getCurrentPage = () => {
  const page = window.localStorage.getItem('_currentPage')
  return page && page !== '' ? parseInt(page) : 1
}

export const setPerPage = perPage => {
  window.localStorage.setItem('_perPage', perPage)
}

export const getPerPage = () => {
  const perPage = window.localStorage.getItem('_perPage')
  return perPage && perPage !== '' ? parseInt(perPage) : 10
}

export const setPageFrom = from => {
  window.localStorage.setItem('_pageFrom', from)
}

export const setPageTo = to => {
  window.localStorage.setItem('_pageTo', to)
}

export const getPageFrom = () => {
  const from = window.localStorage.getItem('_pageFrom')
  return from && from !== '' ? parseInt(from) : 1
}

export const getPageTo = () => {
  const to = window.localStorage.getItem('_pageTo')
  return to && to !== '' ? parseInt(to) : 10
}
