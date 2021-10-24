import React from 'react'
import { useAuth } from './context'
import Input from './form/Input'

const Register = () => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmed, setConfirmed] = React.useState('')
  const [exists, setExists] = React.useState(true)
  const [valid, setValid] = React.useState(false)

  const { register, error, usernameExists } = useAuth()

  React.useEffect(() => {
    let check = true
    if (username === '') check = false
    if (password === '') check = false
    if (confirmed !== password) check = false
    if (exists) check = false
    setValid(check)
    // eslint-disable-next-line
  }, [username, password, confirmed])

  const { setRegistering } = useAuth()

  const handleRegister = async e => {
    e.preventDefault()
    if (valid) {
      await register(username, password)
      setRegistering(false)
    }
  }

  const checkUsername = async () => {
    if (username !== '') {
      setExists(await usernameExists(username))
      setValid((!exists && username !== '' && password !== '' && password === confirmed))
    }
  }

  return (
    <form
      className="user-form register"
      onSubmit={handleRegister}
    >
      <div className="inputs">
        <Input
          label="Username:"
          name="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          onBlur={checkUsername}
        />
        <Input
          type="password"
          label="Password:"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Input
          type="password"
          label="Confirm:"
          name="confirmed"
          value={confirmed}
          onChange={e => setConfirmed(e.target.value)}
        />
      </div>
      <div className="action">
        <Input
          type="submit"
          name="register"
          value="Register"
          props={{ disabled: !valid }}
          />
      </div>
      {error && <div className="error"><p>{error}</p></div>}
    </form>
  )
}

export default Register
