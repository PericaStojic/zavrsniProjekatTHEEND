import React from 'react'
import { useBooks } from './context'
import * as storage from './storage'
import BookCard from './BookCard'
import Select from './form/Select'
import Input from './form/Input'
import './BooksList.css'

const BooksList = () => {
  const [from, setFrom] = React.useState(1)
  const [to, setTo] = React.useState(10)
  const [currentPage, setCurrentPage] = React.useState(1)
  const [maxPage, setMaxPage] = React.useState(1)
  const [perPage, setPerPage] = React.useState(10)
  const [search, setSearch] = React.useState('')
  const {
    books,
    booksCount,
    fetchBooks,
    fetchAuthorBooks,
    selectBook,
    removeBook,
    searchBooks,
    category,
    selected
  } = useBooks()

  const searchTimeout = React.useRef(null)

  // eslint-disable-next-line
  React.useEffect(() => getBooks(), [from, to])

  React.useEffect(() => {
    setMaxPage(Math.ceil(booksCount / perPage))
    // eslint-disable-next-line
  }, [booksCount])

  React.useEffect(() => {
    if (!selected) {
      if (category === 'All') {
        clearSearch()
      } else {
        setCurrentPage(1)
        setFrom(1)
        setTo(perPage)
        setSearch(category)
        searchBooks(category, from, to)
      }
    }
    // eslint-disable-next-line
  }, [category])

  React.useEffect(() => {
    if (selected) {
      setPerPage(4)
      setFrom(1)
      setTo(4)
      setCurrentPage(1)
      setMaxPage(Math.ceil(booksCount / 4))
    } else {
      setPerPage(10)
      setFrom(1)
      setTo(10)
      setCurrentPage(1)
      setMaxPage(Math.ceil(booksCount / 10))
    }
    getBooks()
    // eslint-disable-next-line
  }, [])

  const getBooks = () => {
    if (selected !== false) {
      fetchAuthorBooks(selected.authors[0], from, to)
    } else {
      if (search === '') {
        fetchBooks(from, to)
      } else {
        searchBooks(search, from, to)
      }
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const nextFrom = from - perPage
      const nextTo = to - perPage
      const nextPage = currentPage - 1
      setFrom(nextFrom)
      setTo(nextTo)
      setCurrentPage(nextPage)
      storage.setPageFrom(nextFrom)
      storage.setPageTo(nextTo)
      storage.setCurrentPage(nextPage)
    }
  }

  const handleNextPage = () => {
    if (currentPage < maxPage) {
      const nextFrom = from + perPage
      const nextTo = to + perPage
      const nextPage = currentPage + 1
      setFrom(from + perPage)
      setTo(to + perPage)
      setCurrentPage(currentPage + 1)
      storage.setPageFrom(nextFrom)
      storage.setPageTo(nextTo)
      storage.setCurrentPage(nextPage)
    }
  }

  const handlePerPage = (e) => {
    const newValue = parseInt(e.target.value)
    setCurrentPage(1)
    setPerPage(newValue)
    setFrom(1)
    setTo(newValue)
    setMaxPage(Math.ceil(booksCount / newValue))
    storage.setPageFrom(1)
    storage.setPageTo(newValue)
    storage.setCurrentPage(1)
    storage.setPerPage(newValue)
  }

  const handleSearch = e => {
    const { value } = e.target
    clearTimeout(searchTimeout.current)
    setSearch(value)
    setFrom(1)
    setTo(perPage)
    setCurrentPage(1)
    searchTimeout.current = setTimeout(() => getBooks(), 1000)
  }

  const clearSearch = () => {
    setSearch('')
    setCurrentPage(1)
    setFrom(1)
    setTo(perPage)
    fetchBooks(from, to)
  }

  return (
    <>
      <div className="books-pagination">
        <div className="pagination">
          <button
            disabled={from === 1}
            onClick={handlePrevPage}
            className="prev"
          >
            Prev
          </button>
          Page: {currentPage} from {maxPage}
          <button
            disabled={books.length === 0}
            onClick={handleNextPage}
            className="next"
          >
            Next
          </button>
        </div>
        {!selected && (
          <Select
            name="per_page"
            value={perPage}
            onChange={handlePerPage}
            className="per-page"
            options={[
              { label: 10, value: 10 },
              { label: 25, value: 25 },
              { label: 50, value: 50 },
              { label: 100, value: 100 },
            ]}
          />
        )}
        {!selected && category === 'All' && (
          <div className="search-wrap">
            <Input
              value={search}
              onChange={handleSearch}
              props={{ placeholder: 'Search...' }}
            />
            <span onClick={clearSearch}>Clear</span>
          </div>
        )}
      </div>
      <div className="books-list">
        {books.map(book =>
          <BookCard
            key={book.id}
            book={book}
            onSelect={selectBook}
            onRemove={removeBook}
          />)}
      </div>
    </>
  )
}

export default BooksList
