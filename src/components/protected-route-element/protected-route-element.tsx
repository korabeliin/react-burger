import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

type TProtectedRouteElement = {
  element: React.ReactElement;
}

const ProtectedRouteElement:FC<TProtectedRouteElement> = ({element}) => {

  const location = useLocation();

  const { user } = useSelector((store: any) => store.user);

  return user ? element as React.ReactElement : <Navigate to="/login" state={{ from: location}} />;
};

export default ProtectedRouteElement;