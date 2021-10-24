import React from 'react'
import {
  authReducer,
  initialAuthState,
  booksReducer,
  initialBooksState,
} from './reducer'
import { API_ROOT } from '../constants'
import { post, get, del, put } from '../fetch'
import {
  SET_ERROR,
  USER_LOGIN,
  USER_LOGOUT,
  SET_BOOKS,
  SELECT_BOOK,
  REMOVE_BOOK,
  ADD_BOOK,
  UPDATE_BOOK,
  TOGGLE_ADDING,
  SET_CATEGORY,
  TOGGLE_EDITING,
  TOGGLE_REGISTERING,
} from './constants'
import * as storage from '../storage'

export const AuthContext = React.createContext({
  state: initialAuthState,
  dispatch: () => null,
})

export const BooksContext = React.createContext({
  state: initialBooksState,
  dispatch: () => null,
})

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(authReducer, initialAuthState)

  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {children}
    </AuthContext.Provider>
  )
}

export const BooksProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(booksReducer, initialBooksState)

  return (
    <BooksContext.Provider value={[state, dispatch]}>
      {children}
    </BooksContext.Provider>
  )
}

export const useAuth = () => {
  const [state, dispatch] = React.useContext(AuthContext)

  const login = async (username, password) => {
    try {
      const response = await post(`${API_ROOT}/login`, {
        username,
        password,
      })

      if (response.status === 'err') {
        throw new Error(response.body)
      }

      const user = response.body
      storage.saveUser(user)
      dispatch({ type: USER_LOGIN, payload: user })

      return user

    } catch (e) {
      dispatch({ type: SET_ERROR, payload: e.message })
      return false
    }
  }

  const logout = () => {
    storage.removeUser()
    dispatch({ type: USER_LOGOUT })
    return true
  }

  const usernameExists = async username => {
    try {
      const response = await get(`${API_ROOT}/checkUsername/${username}`)

      if (response.status === 'err') {
        throw new Error(response.body)
      }

      return response.body

    } catch (e) {
      dispatch({ type: SET_ERROR, payload: e.message })
      return false
    }
  }

  const register = async (username, password) => {
    try {
      const response = await post(`${API_ROOT}/register`, {
        username,
        password,
      })

      if (response.status === 'err') {
        throw new Error(response.body)
      }

      return true

    } catch (e) {
      dispatch({ type: SET_ERROR, payload: e.message })
      return false
    }
  }

  const getToken = () => {
    if (!state.user) return false
    return `Bearer ${state.user.jwt}`
  }

  const setRegistering = is => dispatch({ type: TOGGLE_REGISTERING, payload: is })

  return {
    ...state,
    login,
    logout,
    register,
    usernameExists,
    getToken,
    setRegistering
  }
}

export const useBooks = () => {
  const [state, dispatch] = React.useContext(BooksContext)
  const { getToken } = useAuth()

  const fetchBooks = async (from = 1, to = 10) => {
    try {
      const response = await get(`${API_ROOT}/books/${from}/${to}`, {
        'Authorization': getToken(),
      })

      if (response.status === 'err') {
        dispatch({ type: SET_ERROR, payload: response.body })
        return false
      }

      dispatch({ type: SET_BOOKS, payload: response.body })
      return response.body.results

    } catch (e) {
      dispatch({ type: SET_ERROR, payload: e.message })
      return false
    }
  }

  const searchBooks = async (q, from = 1, to = 10) => {
    try {
      const response = await get(`${API_ROOT}/books/search/${q}/${from}/${to}`, {
        'Authorization': getToken(),
      })

      if (response.status === 'err') {
        dispatch({ type: SET_ERROR, payload: response.body })
        return false
      }

      dispatch({ type: SET_BOOKS, payload: response.body })
      return response.body.results

    } catch (e) {
      dispatch({ type: SET_ERROR, payload: e.message })
      return false
    }
  }

  const fetchAuthorBooks = async (author, from = 1, to = 500) => {
    try {
      const response = await get(
        `${API_ROOT}/books/searchByAuthor/${author}/${from}/${to}`, {
          'Authorization': getToken(),
        })

      if (response.status === 'err') {
        dispatch({ type: SET_ERROR, payload: response.body })
        return false
      }

      dispatch({ type: SET_BOOKS, payload: response.body })
      return response.body.results

    } catch (e) {
      dispatch({ type: SET_ERROR, payload: e.message })
      return false
    }
  }

  const selectBook = id => dispatch({ type: SELECT_BOOK, payload: id })

  const removeBook = async id => {
    try {
      const response = await del(`${API_ROOT}/books/${id}`, {
        'Authorization': getToken(),
      })

      if (response.status === 'err') {
        dispatch({ type: SET_ERROR, payload: response.body })
        return false
      }

      dispatch({ type: REMOVE_BOOK, payload: id })
      window.alert('Book removed successfully')
      return true

    } catch (e) {
      dispatch({ type: SET_ERROR, payload: e.message })
      return false
    }
  }

  const updateBook = async data => {
    try {
      const response = await put(`${API_ROOT}/books/${data.id}`, data, {
        'Authorization': getToken(),
      })

      if (response.status === 'err') {
        dispatch({ type: SET_ERROR, payload: response.body })
        return false
      }

      dispatch({ type: UPDATE_BOOK, payload: data })
      window.alert('Book saved successfully')
      return true

    } catch (e) {
      dispatch({ type: SET_ERROR, payload: e.message })
      return false
    }
  }

  const addBook = async data => {
    try {
      const response = await post(`${API_ROOT}/books/new`, data, {
        'Authorization': getToken(),
      })

      if (response.status === 'err') {
        dispatch({ type: SET_ERROR, payload: response.body })
        return false
      }

      dispatch({ type: ADD_BOOK, payload: response.body })
      window.alert('Book added successfully')
      return response.body

    } catch (e) {
      dispatch({ type: SET_ERROR, payload: e.message })
      return false
    }
  }

  const setAdding = is => dispatch({ type: TOGGLE_ADDING, payload: is })

  const setEditing = is => dispatch({ type: TOGGLE_EDITING, payload: is })

  const setCategory = cat => dispatch({ type: SET_CATEGORY, payload: cat })

  return {
    ...state,
    fetchBooks,
    fetchAuthorBooks,
    searchBooks,
    selectBook,
    removeBook,
    updateBook,
    addBook,
    setAdding,
    setEditing,
    setCategory
  }
}
