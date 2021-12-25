import { getUser } from './services/authorize'
import { Route, Navigate } from 'react-router-dom'

const AdminRoute = ({ component: RouteComponent }) => {
  console.log(RouteComponent)

  return (
    getUser() ? <RouteComponent /> : <Navigate to="/login" />
  )
}

export default AdminRoute