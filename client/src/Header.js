import React from 'react'
import { useBooks } from './context'
import './Header.css'

const Header = () => {
  const { setAdding, adding, setEditing, editing, selected, selectBook } = useBooks()

  return (
    <header className="header">
      <div className="brand">
        <h1>Library</h1>
      </div>

      <div className="action">
        {!adding && <button onClick={() => setAdding(true)}>New Book</button>}
        {adding && <button onClick={() => setAdding(false)}>Back</button>}
        {selected && <button onClick={() => setEditing(!editing)}>{editing ? 'Discard' : 'Edit'}</button>}
        {selected && <button onClick={() => selectBook(false)}>Back</button>}
      </div>
    </header>
  )
}

export default Header
