// Packages
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

const Login = props => {
  // Declare and initialize state variables
  let [email, setEmail] = useState('')
  let [message, setMessage] = useState('')
  let [password, setPassword] = useState('')

  // Event handlers
  const handleSubmit = e => {
    e.preventDefault()
    console.log('submit', email, password, process.env.REACT_APP_SERVER_URL);
    // Fetch call to POST data
    fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log('RESPONSE', response)
      if (!response.ok) {
        setMessage(`${response.status}: ${response.statusText}`)
        return
      }

      //We got a good (200) response, get the token
      response.json()
      .then(result => {
        console.log('Result:', result);
        // giving the token back up to app.js
        props.updateToken(result.token)
      })
    })
    .catch(err => {
      console.log('ERROR ON SUBMIT:', err);
    })
  }

  if(props.user) {
    return <Redirect to='/profile' />
  }

  return (
    <div>
      <h2>Login</h2>
      <span className="red">{message}</span>
      <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input type="email" name="email" onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit">Beam Me Up!</button>
        </form>
    </div>
  )
}

export default Login
