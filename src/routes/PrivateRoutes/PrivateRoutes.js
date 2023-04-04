import PropTypes from 'prop-types'
import { useContext } from 'react'
import { contextAuth } from '../../context/contextAuth'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const { getItem } = useContext(contextAuth)
  return getItem('jwt') ? children : <Navigate to="/login" />
}

PrivateRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
}

export default PrivateRoute
