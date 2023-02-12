import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types'

const ProtectedRouteElement = ({element}) => {

  const { user } = useSelector(store => store.user);

  return user ? element : <Navigate to="/login" replace/>;
};

ProtectedRouteElement.propTypes = {
  element: PropTypes.node.isRequired
}

export default ProtectedRouteElement;