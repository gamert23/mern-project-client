import { Button, Container, Form } from 'react-bootstrap';
import { useState } from 'react';
import NavBarComponent from './NavBarComponent';

import axios from 'axios'
import swal from 'sweetalert2'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { getUser, getToken } from '../services/authorize';

const FormComponent = () => {
  const  [state, setState] = useState({
    title: "",
    author: getUser()
  })
  const { title, author } = state

  // State for content
  const [content, setContent] = useState('')

  // Event for state
  const inputValue = (e, name) => {
    setState({...state, [name]: e.target.value})
  }

  const submitContent = (e) => {
    setContent(e)
  }

  const submitData = (e) => {
    e.preventDefault()

    const headers = {
      'Authorization': `Bearer ${ getToken() }`
    }
    

    axios.post(`${ process.env.REACT_APP_API_URL }/create`, {
      title,
      content,
      author
    }, {
      headers
    }).then((res) => {
      swal.fire(
        'Congratulations!',
        'Create blog successfully!',
        'success'
      )

      setState({ ...state,
        title: "",
        author: " "
      })
      setContent("")
    }).catch((err) => {
      console.log(err)
      swal.fire(
        'Oops!',
        err.response.data.error,
        'error'
      )
    })
  }

  return (
    <>
      <NavBarComponent />
      
      <Container className='p-5'>
        <h1> Create Blog </h1>
        <Form onSubmit={ submitData }>
          <Form.Group className="mb-3">
            <Form.Label> Title </Form.Label>
            <Form.Control type="text" name="title" value={title} placeholder="Enter Title" onChange={ (e) => inputValue(e, "title") } />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label> Content </Form.Label>
            <ReactQuill value={ content } onChange={ submitContent } theme='snow' placeholder='Enter Content' /> 
            {/* <Form.Control
              as="textarea"
              placeholder="Enter Content"
              style={{ height: '100px' }}
              value={content}
              onChange={ (e) => inputValue(e, "content") }
            /> */}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label> Author </Form.Label>
            <Form.Control type="text" name='author' value={author} placeholder="ex. Admin" onChange={ (e) => inputValue(e, "author") } />
          </Form.Group>

          <Button variant="success" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default FormComponent