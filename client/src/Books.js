import React from 'react'
import { useBooks } from './context'
import SelectedBook from './SelectedBook'
import BooksList from './BooksList'
import NewBook from './NewBook'
import Sidebar from './Sidebar'
import Header from './Header'
import './Books.css'

const Books = () => {
  const { selected, adding } = useBooks()

  return (
    <div className="books-wrap">
      <Header />
      <Sidebar />
      <div className="content">
        {adding ? <NewBook /> : selected ? <SelectedBook /> : <BooksList />}
      </div>
    </div>
  )
}

export default Books
