import React, { Component } from 'react';
import NavBar from '../NavBar'
export default function RouterToOptions() {
  
    var email = localStorage.getItem("email")
    var roles = localStorage.getItem("role")
  
    return (
      <div>
        <h1>Home</h1>
        <h4>Logged in as {email}</h4>
        <h5>Role(s): {roles}</h5>
      </div>
    );
  }
  