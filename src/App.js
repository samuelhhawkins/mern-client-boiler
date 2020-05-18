// Import packages
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

// Resources and custom components
import './App.css';
import Content from './content/Content'
import Footer from './nav/Footer'
import Header from './nav/Header'
import Nav from './nav/Nav'

const App = props => {
  // Declare state variables
  let [user, setUser] = useState(null)

  // useEffect hook
  useEffect(() => {
    decodeToken()
  }, []) //empty array meaning it only runs on page load

  const decodeToken = () => {
    let token = localStorage.getItem('boilerToken')

    if (token) {
      // Decrypt the user data from the boilerToken
        let decodedUser = jwtDecode(token)

        // If the token in not valid or expired, user stays logged out
        if (!decodedUser || Date.now() > decodedUser.exp * 1000){
          console.log('expired or bad token');
          setUser(null)
        }
        else {
          //The user is valid user is good
          console.log('User and token are goood');
          setUser(decodedUser)
        }
    }
    else {
      console.log('There was no token')
      //No user is logger in
      setUser(null)
    }
  }

  const updateToken = (newToken) => {
    // Set the new Token into localStorage
    localStorage.setItem('boilerToken', newToken || '')

    //Update the state (basically the user info)
    decodeToken()
  }


  return (
    <Router>
      <div className="App">
        <Nav user={user} updateToken={updateToken} />
        <Header />
        <main>
          <Content user={user} updateToken={updateToken} />
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
