import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, NavLink, Redirect, Link } from "react-router-dom"
// import { } from 'react-bootstrap'
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import facade from './facade/Facade'
import NavBar from './NavBar'
import Home from './components/Home'
import Useredit from './components/UserEdit'
import Register from './components/Register'
import Login from './components/Login'
import Table from "./components/Table"
import Create from './components/Create';

class App extends Component {
  render() {
    return (
      <Router>
        <>
          <Route path="/" render={role => <NavBar />} />
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />

            {/* Private routes */}
            <PrivateRoute exact path="/table" component={() => <Table facade={facade} />} />
            <PrivateRoute exact path="/create" component={() => <Create facade={facade} />} />
            <PrivateRoute exact path="/home" component={Home} />
            <PrivateRoute exact path="/useredit" component={Useredit} />


            <Route path="/logout" component={Logout} />
            <Route path="/notloggedin" component={LoginAlert} />
            <Route component={NotFound} />
          </Switch>
        </>
      </Router>
    );
  }
}



function NotFound() {
  return (
    <>
      <h1>Page not found</h1>
      <Link to={"/"}>Go to homepage</Link>
    </>
  )
}

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        facade.loggedIn() ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: "/notloggedin",
                state: { from: props.location }
              }}
            />
          )
      }
    />
  );
}

class LoginAlert extends React.Component {
  state = { redirectToReferrer: false };
  render() {
    let { from } = this.props.location.state || { from: { pathname: "/" } };
    let { redirectToReferrer } = this.state;

    if (redirectToReferrer) return <Redirect to={from} />;

    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <Link to="/">Login</Link>
      </div>
    );
  }
}

class Logout extends Component {
  constructor(props) {
    super(props)
    facade.logout();
    this.props.history.push('/');
  }
  render() {
    return (
      <div>
      </div>
    );
  }
}

export default App;
