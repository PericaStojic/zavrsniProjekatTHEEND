import React from 'react'

const Input = ({
  name,
  value,
  label = false,
  onChange = e => null,
  type = 'text',
  onBlur = e => null,
  className = '',
  props = {}
}) => {
  return (
    <div className={`input ${className}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        {...props}
      />
    </div>
  )
}

export default Input
