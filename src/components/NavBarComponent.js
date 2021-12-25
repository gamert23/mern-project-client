import { Button, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { withRouter } from '../services/withRouter'
import { getUser, logout } from '../services/authorize';

const NavBarComponent = (props) => {
  const goToHome = () => {
    props.navigate('/')
  }

  return (
    <Container className='pt-5 pt-0'>
      <Nav>
        <Nav.Item>
          <Link className='nav-link' to="/"> Home </Link>
        </Nav.Item>

        {
          !getUser() ? (
            <Nav.Item>
              <Link className='nav-link' to="/login"> Login </Link>
            </Nav.Item>
          ) : (
            <>
              <Nav.Item>
                <Link className='nav-link' to="/create"> Create Blog </Link>
              </Nav.Item>

              <Nav.Item>
                <Button variant='danger' onClick={ () => logout(goToHome) }> Logout </Button>
              </Nav.Item>
            </>
          )
        }
      </Nav>
    </Container>
  )
}

export default withRouter(NavBarComponent);