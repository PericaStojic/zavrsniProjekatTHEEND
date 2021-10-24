import React from 'react'
import { useBooks } from './context'
import EditBook from './EditBook'
import BooksList from './BooksList'
import './SelectedBook.css'

const SelectedBook = () => {
  const { selected, editing } = useBooks()

  return (
    <div className="selected-book">
      <div className="selected-book-wrap">
        {editing ? (
          <EditBook />
        ) : (
          <>
            <div className="selected">
              <div>
                <p><b>Title</b></p>
                <p>{selected.title}</p>
              </div>
              <div>
                <p><b>Genre</b></p>
                <p>{selected.genre}</p>
              </div>
              <div>
                <p><b>Pages</b></p>
                <p>{selected.pages}</p>
              </div>
              <div>
                <p><b>Publish Date</b></p>
                <p>{selected.publishDate}</p>
              </div>
              <div>
                <p><b>ISBN</b></p>
                <p>{selected.isbn}</p>
              </div>
              <div>
                <p><b>Authors</b></p>
                <p>{selected.authors.join(', ')}</p>
              </div>
              <div>
                <p><b>Rating</b></p>
                <p>{parseFloat(selected.rating).toFixed(2)}</p>
              </div>
              <div>
                <p><b>Available?</b></p>
                <p>{selected.available ? 'Yes' : 'No'}</p>
              </div>
            </div>
            <div className="related">
              <h3>More from {selected.authors[0]}</h3>
              <BooksList />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default SelectedBook
