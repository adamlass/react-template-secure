import React from 'react';
import { BrowserRouter as Router, NavLink } from "react-router-dom"
export default function NavBar(props) {
  var roles = localStorage.getItem("role")

  if (roles !== null) {
    roles = roles.split(",")
    var admin = roles.indexOf("admin") > -1
    var user = roles.indexOf("user") > -1
  }

  return (
    <div>
      <ul className="header">
        {
          roles == null ?
            <>
              <li>
                <NavLink exact to="/register">Register</NavLink>
              </li>
              <li style={{ float: "right" }}>
                <NavLink exact to="/">Login</NavLink>
              </li>
            </>
            :
            <>
              <li style={{ float: "right" }}>
                <NavLink to="/logout">Log Out</NavLink>
              </li>
            </>

        }

        {
          user || admin ?
            <>
              <li>
                <NavLink exact to="/home">Home</NavLink>
              </li>

            </>
            :
            null
        }
        {
          admin ?
            <>
              <li>
                <NavLink exact to="/useredit">User Edit</NavLink>
              </li>
            </>
            :
            null
        }

      </ul>
    </div>
  )
}