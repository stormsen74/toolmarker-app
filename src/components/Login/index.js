import React from 'react';
import axios from 'axios';

// https://strapi.io/blog/a-beginners-guide-to-authentication-and-authorization-in-strapi

export default function Login() {
  const test = () => {
    axios
      .post('http://localhost:1337/auth/local', {
        identifier: 'tester@test.de',
        password: 'test123',
      })
      .then(response => {
        console.log('User profile', response.data.user);
        console.log('User token', response.data.jwt);
      })
      .catch(error => {
        console.log('An error occurred:', error.response);
      });
  };

  return <button onClick={test}>TEST</button>;
}
