import React from 'react'
import Register from './Register'
import Login from './Login'
import { useAuth } from './context'
import './LoginWrap.css'

const LoginWrap = () => {
  const { registering, setRegistering } = useAuth()

  return (
    <div className="login-wrap">
      <div className="content">
        {registering ? <Register /> : <Login />}
      </div>
      <div className="toggle">
        <button onClick={() => setRegistering(!registering)}>
          {registering ? 'Go to login..' : 'Register?'}
        </button>
      </div>
    </div>
  )
}

export default LoginWrap
