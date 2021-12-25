import { Button, Container, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import NavBarComponent from './NavBarComponent';
import { getToken } from '../services/authorize'

import axios from 'axios'
import swal from 'sweetalert2'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const EditComponent = () => {
  const { slug } = useParams();
  const  [state, setState] = useState({
    title: "",
    author: "",
    slug: ""
  })
  const { title, author } = state

  const [content, setContent] = useState('')

  // Event for state
  const inputValue = (e, name) => {
    setState({...state, [name]: e.target.value})
  }

  const submitContent = (e) => {
    setContent(e)
  }

  const fetchBlog = () => {
    axios.get(`${ process.env.REACT_APP_API_URL }/blog/${ slug }`).then((res) => {
      setState({...state, 
        title: res.data.title,
        author: res.data.author,
        slug: res.data.slug
      })
      setContent(res.data.content)
    }).catch((err) => {
      alert(err)
    })
  }

  useEffect(() => {
    fetchBlog();
    // eslint-disable-next-line
  }, [])

  const submitData = (e) => {
    e.preventDefault()

    const headers = {
      'Authorization': `Bearer ${ getToken() }`
    }

    axios.put(`${ process.env.REACT_APP_API_URL }/blog/${ slug }`, {
      title,
      content,
      author
    }, {
      headers
    }).then((res) => {
      swal.fire(
        'Congratulations!',
        'Update blog successfully!',
        'success'
      )
    }).catch((err) => {
      swal.fire(
        'Oops!',
        err.response.data.error,
        'error'
      )
    })
  }

  const showUpdateForm = () => {
    return (
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
          Update
        </Button>
      </Form>
    )
  }

  return (
    <>
      <NavBarComponent />
      
      <Container className='p-5'>
        <h1> Update Blog </h1>
        { showUpdateForm() }
      </Container>
    </>
  );
}

export default EditComponent