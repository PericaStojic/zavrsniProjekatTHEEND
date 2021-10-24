import React from 'react'
import { CATEGORIES } from './constants'
import { useAuth, useBooks } from './context'
import './Sidebar.css'

const Sidebar = () => {
  const { category, setCategory, selected } = useBooks()
  const { logout } = useAuth()

  const renderItem = (name, current, props = {}) => {
    return (
      <li
        className={name === current ? 'active': ''}
        onClick={() => {
          if (!selected) setCategory(name)
        }}
        {...props}
      >
        {name}
      </li>
    )
  }

  return (
    <div className="sidebar">
      <div className="top">
        <h2>Categories</h2>
        <ul>
          {renderItem('All', category)}
          {CATEGORIES.map(cat => renderItem(cat, category, { key: cat }))}
        </ul>
      </div>
      <div className="bottom">
        <button onClick={logout}>Log out</button>
      </div>
    </div>
  )
}

export default Sidebar
