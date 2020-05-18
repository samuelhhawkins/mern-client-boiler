import React, {useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'


const Profile = props => {
  let [secretMessage, setSecretMessage] = useState('')

  useEffect(() => {
    //get the token from local storage
    let token = localStorage.getItem('boilerToken')

    // Make a call to protect the route
    fetch('http://localhost:3000/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      console.log("Response", response);

      //make sure that we got a good response
      if (!response.ok){
        setSecretMessage('Nice try!')
        return
      }

      //we did get a good response
      response.json()
      .then(result => {
        console.log(result)
        setSecretMessage(result.message)
      })

    })
    .catch(err => {
      console.log(err)
      setSecretMessage('No message for u')
    })
  })
  // make sure there is a user before trying to show their info
  if(!props.user) {
        return <Redirect to='/login' />
      }
  return (
    <div>
      <h2>
        {props.user.firstname}
      </h2>
      <img src={props.user.pic} alt={props.user.firstname}/>
      <h2>{secretMessage}</h2>
    </div>
  )
}

export default Profile
