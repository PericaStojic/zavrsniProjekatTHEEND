import React from 'react'
import { useBooks } from './context'

const BooksList = ({ books }) => {
  const { selectBook } = useBooks()

  return (
    <div className="books">
      {books.map(book => {
        const dateArr = book.publishDate.split('-')
        const year = dateArr[2]
        let rating = []
        for (let i = 0; i < Math.round(book.rating); i++) {
          rating.push(<span key={`star_${i}`}>☆</span>)
        }

        const handleSelect = () => selectBook(book.id)

        return (
          <div key={book.id} className="book">
            <p>{book.title}</p>
            <p>{book.authors.join(', ')}</p>
            <p>{year}</p>
            <br />
            <br />
            <br />
            <div className="footer">
              <div className="rating">{rating}</div>
              <button className="settings" onClick={handleSelect}>...</button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default BooksList
