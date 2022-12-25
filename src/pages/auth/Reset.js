import React, { useState } from 'react';
import Card from '../../components/card/Card';
import styles from './auth.module.scss';
import resetImg from '../../assets/forgot.png';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { toast } from 'react-toastify';

const Reset = () => {
  const [ email, setEmail ] = useState( "" );

  const resetPassword = ( event ) => {
    event.preventDefault();

    sendPasswordResetEmail( auth, email )
      .then( () => {
        toast.success( 'check your email for reset link' );
      } )
      .catch( ( error ) => {
        const errorMessage = error.message;
        toast.error( errorMessage );
        // ..
      } );
  };

  return (
    <section className={ `container ${ styles.auth }` }>
      <div className={ styles.img }>
        <img src={ resetImg } alt="resetImg" width="400" />
      </div>
      <Card>
        <div className={ styles.form }>
          <h2>Reset Password</h2>
          <form onSubmit={ resetPassword }>
            <input value={ email } onChange={ ( e ) => setEmail( e.target.value ) } type="email" placeholder='Email' required />
            <button type='submit' className='--btn --btn-primary --btn-block'>Login</button>
            <div className={ styles.links }>
              <p>
                <Link to="/login">Login</Link>
              </p>
              <p>
                <Link to="/register">Register</Link>

              </p>
            </div>
          </form>
        </div>
      </Card>

    </section>
  );
};

export default Reset;
