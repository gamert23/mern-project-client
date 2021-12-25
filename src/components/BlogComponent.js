import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import axios from 'axios'

import NavBarComponent from './NavBarComponent'

const BlogComponent = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState({});

  const fetchBlog = () => {
    axios.get(`${ process.env.REACT_APP_API_URL }/blog/${ slug }`).then((res) => {
      setBlog(res.data)
    }).catch((err) => {
      alert(err)
    })
  }
  
  useEffect(() => {
    fetchBlog();
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <NavBarComponent />
      <Container className='p-5'>
        {
          blog &&
          <>
            <h2 className='text-center'> { blog.title } </h2>
            <p dangerouslySetInnerHTML={{__html: blog.content}}></p>
            <p className='text-muted pt-3'> author: { blog.author }, created at: { new Date(blog.createdAt).toLocaleString('th-TH') } </p>
          </>
        }
      </Container>
    </>
  );
}

export default BlogComponent;