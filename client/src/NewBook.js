import React from 'react'
import { useBooks } from './context'
import Input from './form/Input'
import Authors from './form/Authors'
import Checkbox from './form/Checkbox'
import Select from './form/Select'
import { CATEGORIES } from './constants'
import './NewBook.css'

const NewBook = () => {
  const [data, setData] = React.useState({
    id: 0,
    title: '',
    authors: [],
    genre: '',
    rating: 0,
    isbn: '',
    available: false,
    publishDate: '',
    pages: 0
  })

  const { addBook, setAdding, setCategory } = useBooks()

  const handleChange = e => {
    const { name, value } = e.target
    setData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCheckChange = e => {
    const { name, checked } = e.target
    setData(prev => ({
      ...prev,
      [name]: checked
    }))
  }

  const handleAddAuthor = name => {
    if (name === '') return

    setData(prev => ({
      ...prev,
      authors: prev.authors.concat([name])
    }))
  }

  const handleRemoveAuthor = name => {
    setData(prev => ({
      ...prev,
      authors: prev.authors.filter(a => a !== name)
    }))
  }

  const handleAdd = async e => {
    e.preventDefault()
    await addBook(data)
    setAdding(false)
    setCategory('All')
  }

  return (
    <div className="new-book">
      <form onSubmit={handleAdd}>
        <Input
          label="Title"
          name="title"
          value={data.title}
          onChange={handleChange}
        />
        <Select
          label="Genre"
          name="genre"
          value={data.genre}
          onChange={handleChange}
          options={CATEGORIES.map(cat => ({
            value: cat,
            label: cat
          }))}
        />
        <Input
          label="Pages"
          name="pages"
          type="number"
          value={data.pages}
          onChange={handleChange}
        />
        <Input
          label="Publish Date"
          name="publishDate"
          value={data.publishDate}
          onChange={handleChange}
        />
        <Input
          label="ISBN"
          name="isbn"
          value={data.isbn}
          onChange={handleChange}
        />
        <Authors
          label="Authors"
          name="authors"
          value={data.authors}
          onAdd={handleAddAuthor}
          onRemove={handleRemoveAuthor}
        />
        <Input
          label="Rating"
          name="rating"
          type="number"
          value={data.rating}
          onChange={handleChange}
          props={{ step: '0.1' }}
        />
        <Checkbox
          label="Available?"
          name="available"
          value={data.available}
          onChange={handleCheckChange}
        />
        <Input
          type="submit"
          value="Save"
        />
      </form>
    </div>
  )
}

export default NewBook
