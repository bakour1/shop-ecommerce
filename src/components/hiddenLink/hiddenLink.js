import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/slice/authSlice';

const ShowOnLogin = ( { children } ) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const isLoggedIn = useSelector( selectIsLoggedIn );

  if ( isLoggedIn ) {
    return children;
  }
  return null;


};
export const ShowOnLogout = ( { children } ) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const isLoggedIn = useSelector( selectIsLoggedIn );

  if ( !isLoggedIn ) {
    return children;
  }
  return null;


};

export default ShowOnLogin;
