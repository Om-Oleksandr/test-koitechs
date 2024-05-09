import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import cx from 'classnames'

const HomeForm = props => {
  const { className:[body, err] } = props
  const [username, setUsername] = useState('')
  const [isError, setIsError] = useState(false)
  const navigate = useNavigate()
  const regex = /^[a-zA-Z0-9\s]*$/
  const handleSubmit = e => {
    if (regex.test(username)) {
      const formatName = username.replace(' ', '-')
      navigate(`/${formatName}`)
    } else {
      setIsError(true)
    }
    e.preventDefault()
  }
  const handleChange = e => {
    setUsername(e.target.value)
  }
  return (
    <form onSubmit={handleSubmit} className={body}>
      <input
        className={cx({ [err]: isError })}
        type='text'
        name='username'
        value={username}
        onChange={handleChange}
      />
      <input type='submit' value='Find user' />
    </form>
  )
}

export default HomeForm
