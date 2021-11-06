import logo from './logo.svg';
import './App.css';
import { baseUrl } from "./core"
import axios from 'axios';
import { useState, useEffect, useRef } from "react"

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  Redirect
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';



import Splash from "./components/splashscreen"
import Login from "./components/login"
import Signup from "./components/signup"
import Dashboard from "./components/dashboard"

import { GlobalContext } from './context/Context';
import { useContext } from "react";

function App() {

  let history = useNavigate();
  let { state, dispatch } = useContext(GlobalContext);

  useEffect(() => {

    axios.get(`${baseUrl}/api/v1/profile`, {
      withCredentials: true
    })
      .then((res) => {
        console.log("res: ", res.data);

        if (res.data.email) {

          dispatch({
            type: "USER_LOGIN",
            payload: {
              name: res.data.name,
              email: res.data.email,
              _id: res.data._id
            }
          })
        } else {
          dispatch({ type: "USER_LOGOUT" })
        }
      }).catch((e) => {
        dispatch({ type: "USER_LOGOUT" })
      })

    return () => {
    };
  }, []);


  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">React Login project</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link ><Link to='/'>Dashboard</Link></Nav.Link>
              <Nav.Link ><Link to='/login'>Login</Link></Nav.Link>
              <Nav.Link ><Link to='/signup'>Signup</Link></Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>




      {(state.user === undefined) ?
        <Routes>
          <Route exact path="/">
            <Splash />
          </Route>
          {/* <Redirect to="/" /> */}
        </Routes>
        : null}

      {(state.user === null) ?
        <Routes>
          <Route exact path="/login" element={Login} />
          <Route path="/signup" element={Signup} />

          {/* <Redirect to="/" /> */}
        </Routes> : null
      }

      {(state.user) ?
        <Routes>
          <Route exact path="/">
            <Dashboard />
          </Route>

          {/* <Redirect to="/" /> */}
        </Routes>
        : null}

    </>
  );
}

export default App;