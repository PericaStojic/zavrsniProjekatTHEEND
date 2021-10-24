export const get = async (url, headers = {}) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  })
  const data = await response.json()
  console.log('fetch -> get', data)
  return data
}

export const post = async (url, requestData, headers = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestData)
  })
  const data = await response.json()
  console.log('fetch -> post', data)
  return data
}

export const del = async (url, headers = {}) => {
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  })
  const data = await response.json()
  console.log('fetch -> delete', data)
  return data
}

export const put = async (url, requestData, headers = {}) => {
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestData)
  })
  const data = await response.json()
  console.log('fetch -> put', data)
  return data
}
