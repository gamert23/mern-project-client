import { Button, Container, Col, Form, Row } from 'react-bootstrap'
import NavBarComponent from './NavBarComponent';
import { useState, useEffect } from 'react'

import axios from 'axios'
import swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { authenticate, getUser } from '../services/authorize'

const LoginComponent = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState({
    username: "",
    password: ""
  })
  const {username, password} = auth

  useEffect(() => {
    getUser() && navigate('/')
    // eslint-disable-next-line
  }, [getUser()])

  const inputValue = (e, name) => {
    setAuth({...auth, [name]: e.target.value})
  }

  const goToCreate = () => {
    navigate('/create')
  }

  const submitForm = (e) => {
    e.preventDefault()

    axios.post(`${process.env.REACT_APP_API_URL}/login`, {
      username,
      password
    }).then((res) => {
      authenticate(res, goToCreate)
    }).catch((err) => {
      if(err?.response?.data?.error) {
        swal.fire(
          "Oops!",
          err.response.data.error,
          "error"
        )
      }
    })
  }

  return (
    <>
      <NavBarComponent />

      <Container className='p-5'>
        <h1 className='text-center'> Login </h1>

        <Row className='justify-content-center'>
          <Col md={6}>
            <Form onSubmit={submitForm}>
              <Form.Group className="mb-3">
                <Form.Label> Username </Form.Label>
                <Form.Control type="text" name="username" value={username} placeholder="Enter Username" onChange={ (e) => inputValue(e, 'username') } />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label> Password </Form.Label>
                <Form.Control type="password" name='password' value={password} placeholder="Enter Password" onChange={ (e) => inputValue(e, 'password') } />
              </Form.Group>

              <Col className='text-center'>
                <Button variant="success" type="submit">
                  Login
                </Button>
              </Col>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default LoginComponent