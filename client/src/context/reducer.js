import {
  ADD_BOOK,
  REMOVE_BOOK,
  SELECT_BOOK,
  SET_BOOKS,
  SET_CATEGORY,
  SET_ERROR,
  TOGGLE_ADDING,
  TOGGLE_EDITING,
  UPDATE_BOOK,
  USER_LOGIN,
  USER_LOGOUT,
  TOGGLE_REGISTERING
} from './constants'
import * as storage from '../storage'

export const initialAuthState = {
  user: storage.getUser(),
  error: false,
  registering: false
}

export const initialBooksState = {
  books: [],
  booksCount: 0,
  selected: false,
  error: false,
  adding: false,
  editing: false,
  category: 'All'
}

export const authReducer = (state, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        user: action.payload,
        error: false
      }
    case USER_LOGOUT:
      return {
        ...state,
        user: false,
        error: false
      }
    case TOGGLE_REGISTERING:
      return {
        ...state,
        registering: action.payload
      }
    case SET_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}

export const booksReducer = (state, action) => {
  switch (action.type) {
    case SET_BOOKS:
      return {
        ...state,
        books: action.payload.results,
        booksCount: action.payload.length
      }
    case ADD_BOOK:
      return {
        ...state,
        books: state.books.concat([action.payload]),
        booksCount: state.booksCount + 1
      }
    case REMOVE_BOOK:
      return {
        ...state,
        books: state.books.filter(b => b.id !== action.payload),
        booksCount: state.booksCount - 1
      }
    case UPDATE_BOOK:
      return {
        ...state,
        books: state.books.map(b => b.id === action.payload.id ? action.payload : b),
        selected: action.payload
      }
    case SELECT_BOOK:
      return {
        ...state,
        selected: action.payload === false ? false :
          state.books.filter(b => b.id === action.payload)[0],
        editing: false
      }
    case SET_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case TOGGLE_ADDING:
      return {
        ...state,
        adding: action.payload,
        selected: false
      }
    case TOGGLE_EDITING:
      return {
        ...state,
        editing: action.payload
      }
    case SET_CATEGORY:
      return {
        ...state,
        category: action.payload
      }
    default:
      return state
  }
}
