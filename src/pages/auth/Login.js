import React, { useState } from 'react';
import styles from './auth.module.scss';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import loginImg from '../../assets/login.png';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import Card from '../../components/card/Card';
import Loader from '../../components/loader/Loader';
import { auth } from '../../firebase/config';
import { toast } from 'react-toastify';

const Login = () => {

  const [ email, setEmail ] = useState( "" );
  const [ password, setPassword ] = useState( "" );
  const [ isLoading, setIsLoading ] = useState( false );

  const navigate = useNavigate();

  const loginUser = ( event ) => {
    event.preventDefault();
    setIsLoading( true );
    signInWithEmailAndPassword( auth, email, password )
      .then( ( userCredential ) => {
        const user = userCredential.user;
        setIsLoading( false );
        toast.success( 'login is successful..' );
        navigate( '/' );
        console.log( user );
      } )
      .catch( ( error ) => {
        const errorMessage = error.message;
        console.log( errorMessage );
        setIsLoading( false );
        toast.error( 'login is failed..' );

      } );
  };

  // Login with google
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = ( event ) => {
    event.preventDefault();
    signInWithPopup( auth, provider )
      .then( ( result ) => {
        const user = result.user;
        toast.success( 'login successfully..' );
        navigate( '/' );
        console.log( user );
      } ).catch( ( error ) => {
        toast.error( error.message );
      } );
  };

  return (
    <>
      { isLoading && <Loader /> }
      <section className={ `container ${ styles.auth }` }>
        <div className={ styles.img }>
          <img src={ loginImg } alt="loginImg" width="400" />
        </div>
        <Card>
          <div className={ styles.form }>
            <h2>Login</h2>
            <form onSubmit={ loginUser }>
              <input
                type="text"
                placeholder='Email'
                value={ email }
                onChange={ ( e => setEmail( e.target.value ) ) }
                required
              />
              <input
                type="password"
                placeholder='Password'
                value={ password }
                onChange={ ( e => setPassword( e.target.value ) ) }
                required
              />
              <button type='submit'
                className='--btn
	--btn-primary --btn-block'
              >
                Login
              </button>
              <div
                className={ styles.links
                }>
                <Link
                  to='/reset'>

                  reset
                  Password
                </Link>
              </div>
              <p
              >
                --
                or
                --
              </p>
            </form>
            <button
              onClick={ signInWithGoogle } className='--btn --btn-danger --btn-block'>
              <FaGoogle color='#fff' />  Login with Google
            </button>
            <span className={ styles.register }>
              <p>Don't have an account?</p>
              <Link to='/register'>Register</Link>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Login;
