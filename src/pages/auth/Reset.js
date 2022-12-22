import React from 'react';
import Card from '../../components/card/Card';
import styles from './auth.module.scss';
import resetImg from '../../assets/forgot.png';
import { Link } from 'react-router-dom';

const Reset = () => {
  return (
    <section className={ `container ${ styles.auth }` }>
      <div className={ styles.img }>
        <img src={ resetImg } alt="resetImg" width="400" />
      </div>
      <Card>
        <div className={ styles.form }>
          <h2>Reset Password</h2>
          <form>
            <input type="password" placeholder='Password' required />
            <button className='--btn --btn-primary --btn-block'>Login</button>
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
