import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import PropTypes from 'prop-types'

const defaultValue = {
  user: null
}
export const contextAuth = createContext(defaultValue)

export const Auth = ({ children }) => {
  const [value, setValue] = useState(null)

  const setItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
    setValue(value)
  }

  const getItem = (key) => {
    const value = localStorage.getItem(key)
    setValue(value)
    return value
  }

  const removeItem = (key) => {
    localStorage.removeItem(key)
    setValue(null)
  }

  return (
    <contextAuth.Provider value={{ value, setItem, getItem, removeItem }}>
      {children}
    </contextAuth.Provider>
  )
}

Auth.propTypes = {
  children: PropTypes.element
}
