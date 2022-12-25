import React, { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaTimes, FaUserCircle } from 'react-icons/fa';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../../firebase/config';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from '../../redux/slice/authSlice';
import ShowOnLogin, { ShowOnLogout } from '../hiddenLink/hiddenLink';

const Logo = (
  <div className={ styles.logo }>
    <Link to='/'>
      <h2>
        e<span>Shop</span>.
      </h2>
    </Link>
  </div>
);

const Cart = (
  <span className={ styles.cart }>
    <Link to='/cart'>
      Cart
      <FaShoppingCart size={ 20 } />
      <p>0</p>
    </Link>
  </span>
);

const activeLink = ( { isActive } ) =>
  isActive ? `${ styles.active }` : "";

const Header = () => {
  const [ showMenu, setShowMenu ] = useState( false );
  const [ displayName, setDisplayName ] = useState( '' );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Monitor currently sign in user
  useEffect( () => {
    onAuthStateChanged( auth, ( user ) => {
      if ( user ) {
        if ( user.displayName == null ) {
          const uName = user.email.substring( 0, user.email.indexOf( '@' ) );
          setDisplayName( uName );
        } else {
          setDisplayName( user.displayName );
        }

        dispatch( SET_ACTIVE_USER( {
          email: user.email,
          userName: user.displayName ? user.displayName : displayName,
          userId: user.uid
        } ) );
        // ...
      } else {
        setDisplayName( '' );
        dispatch( REMOVE_ACTIVE_USER() );
      }
    } );
  }, [ dispatch, displayName ] );

  const toggleMenu = () => {
    setShowMenu( !showMenu );
  };

  const hideMenu = () => {
    setShowMenu( false );
  };

  const logoutUser = () => {
    signOut( auth ).then( () => {
      toast.success( 'logout successfully..' );
      navigate( '/' );
    } ).catch( ( error ) => {
      toast.error( 'failed sign out' );
    } );
  };

  return (
    <header>
      <div className={ styles.header }>
        { Logo }
        <nav className={ showMenu ? `${ styles[ 'show-nav' ] }` : `${ styles[ 'hide-nav' ] }` }>
          <div
            className={
              showMenu
                ? `${ styles[ "nav-wrapper" ] } ${ styles[ "show-nav-wrapper" ] }`
                : `${ styles[ "nav-wrapper" ] }`
            }
            onClick={ hideMenu }
          ></div>
          <ul onClick={ hideMenu }>
            <li className={ styles[ "logo-mobile" ] }>
              { Logo }
              <FaTimes size={ 22 } color="#fff" onClick={ hideMenu } />
            </li>
            <li>
              <NavLink to='/' className={ activeLink }  >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to='/contact' className={ activeLink } >
                contact Us
              </NavLink>
            </li>
          </ul>
          <div className={ styles[ 'header-right' ] } onClick={ hideMenu }>
            <span className={ styles.links }>
              <ShowOnLogout>

                <NavLink to='/login' className={ activeLink }>Login</NavLink>

              </ShowOnLogout>

              <ShowOnLogin>
                <span href="#" ><FaUserCircle size={ 16 } />
                  hi, { displayName }
                </span>
                {/* <NavLink to='/register' className={ activeLink }>Register</NavLink> */ }
                <NavLink to='/order-history' className={ activeLink }>My Order</NavLink>


                <NavLink to='/' onClick={ logoutUser }>Logout</NavLink>

              </ShowOnLogin>
            </span>
            { Cart }
          </div>
        </nav>
        <div className={ styles[ 'menu-icon' ] }>
          { Cart }
          <HiOutlineMenuAlt3 size={ 28 } onClick={ toggleMenu } />
        </div>
      </div>
    </header>
  );
};

export default Header;
