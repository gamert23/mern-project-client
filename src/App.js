import './App.css';
import '../src/scss/main.scss';
import { useState, useEffect } from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getUser, getToken } from './services/authorize';
import { withRouter } from './services/withRouter'; // HOC Component
import NavBarComponent from './components/NavBarComponent';
import axios from 'axios'
import swal from 'sweetalert2'

function App(props) {
  const [blogs, setBlogs] = useState([]);

  const fetchData = () => {
    axios.get(`${ process.env.REACT_APP_API_URL }/blogs`).then((res) => {
      setBlogs(res.data)
    }).catch((err) => {
      alert(err)
    })
  }

  const deleteBlog = (slug) => {
    const headers = {
      'Authorization': `Bearer ${ getToken() }`
    }

    axios.delete(`${ process.env.REACT_APP_API_URL }/blog/${ slug }`, {
      headers
    }).then((res) => {
      swal.fire({
        title: "Delete successfully",
        icon: "success"
      })
      
      fetchData()

    }).catch((err) => {
      alert(err)
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const confirmDelete = (slug) => {
    swal.fire({
      title: "Delete this blog?",
      icon: "warning",
      showCancelButton: true
    }).then((result) => {
      if(result.isConfirmed) {
        deleteBlog(slug)
      }
    });
  }

  return (
    <>
      <NavBarComponent />
      <Container className='p-5'>
        {
          blogs.map((blog, index) => {
            return (
              <Row key={index} style={{ borderBottom: "1px solid #ccc" }}>
                <Col>
                  <Link to={`/blog/${ blog.slug }`}> <h2 className='pt-3'> { blog.title } </h2> </Link>
                  <p className='content-text' dangerouslySetInnerHTML={{__html: blog.content}}></p>
                  <p className='text-muted'> author: { blog.author }, created at: { new Date(blog.createdAt).toLocaleString('th-TH') } </p>

                  {
                    getUser() && (
                      <>
                        <Link className='btn btn-success mr-3' to={`blog/edit/${ blog.slug }`}> Update Blog </Link>
                        <Button className='btn btn-danger' onClick={ () => confirmDelete(blog.slug) }> Remove Blog </Button>
                      </>
                    )
                  }
                </Col>
              </Row>
            )
          })
        }
      </Container>
    </>
  );
}

export default withRouter(App);
