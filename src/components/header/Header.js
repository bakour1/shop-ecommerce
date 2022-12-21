import React from 'react';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';

const Logo = (
  <div className={ styles.logo }>
    <Link to='/'>
      <h2>
        e<span>Shop</span>.
      </h2>
    </Link>
  </div>
);

const Header = () => {
  return (
    <header>
      <div className={ styles.header }>
        { Logo }
        <nav>
          <ul>
            <li>
              <Link to='/' >
                Home
              </Link>
            </li>
            <li>
              <Link to='/contact' >
                contact Us
              </Link>
            </li>
          </ul>
          <div className={ styles[ 'header-right' ] }>
            <div className={ styles.links }>
              <Link to='/login'>Login</Link>
              <Link to='/register'>Register</Link>
              <Link to='/order-history'>My Order</Link>
            </div>
            <div className={ styles.cart }>
              <link to='/cart'>
                Cart
              </link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
