import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink, Redirect } from "react-router-dom"
import { Form, FormGroup, ControlLabel, FormControl, Col, Button } from 'react-bootstrap'
import '../index.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import facade from '../facade/Facade'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { login: { email: "user@gmail.com", password: "test" }, loginError: '' }
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    //Handle login here
    var err = await facade.login(this.state.login.email, this.state.login.password)


    console.log("error: " + err)
    if (err === undefined) {
      this.setState({ loginError: '' })
      this.props.history.push("/home")
    } else {
      throw err
      this.setState({ loginError: err.fullError })
    }

  }

  handleChange = (e) => {
    const id = e.target.id
    const value = e.target.value
    this.state.login[id] = value
    this.setState({ login: this.state.login })
    console.log(this.state.login)
    // console.log(this.state.email)
  }

  render() {
    console.log(this.state.loginError)
    return (
      <div>

        <h2>Login</h2>

        <p style={{ color: 'red' }}>{this.state.loginError}</p>
        <Form horizontal onSubmit={this.handleSubmit}>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Email
      </Col>
            <Col sm={10}>
              <FormControl required type="email" id="email" value={this.state.login.email} placeholder="Enter password here" onChange={this.handleChange} />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Password
      </Col>
            <Col sm={10}>
              <FormControl required type="password" id="password" value={this.state.login.password} placeholder="Enter password here" onChange={this.handleChange} />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button bsStyle="primary" type="submit">Sign in</Button>
            </Col>
          </FormGroup>
        </Form>

      </div>
    );
  }
}

export default Login;  