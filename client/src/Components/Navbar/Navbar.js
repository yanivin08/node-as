import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { Menu, MenuItem } from '@material-ui/core'
import { Person, Menu as Menus, Close } from '@material-ui/icons';

export default function Navbar(props) {
    

    const [sidebar, setSidebar] = useState(false);
    const [menuEl, setHandle] = useState(null);

    const getCookie = (cname) => {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) === ' ') {
          c = c.substring(1);
          }
          if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
          }
      }
      return "";
    }

    const uType = parseInt(getCookie("val"))

    const handleMenuOpen = e => {
      setHandle(e.currentTarget)
    }

    const handleMenuClose = () => {
      setHandle(null);
    }

    const signOut = () => {
      document.cookie = "a=\"\";path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT";
      document.cookie = "dt=\"\";path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT";
      document.cookie = "u=\"\";path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT";
      document.cookie = "val=\"\";path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT";
      window.location.reload();
    }

    const showSidebar = () => setSidebar(!sidebar);
    console.log(uType)

    return (
      <>
          <div className='navbar'>
            <div className='menu-bars'>
              <Link to='#' className='menu-bar'>
                <Menus style={{color: 'white', fontSize: '30px'}} onClick={showSidebar}/>
                
              </Link>
              <Link to='#' className='menu-bar'>
                <span>Appointment Settings</span>
              </Link>
            </div>
            <div className='menu-rights'>
              <Link to='#' className='menu-right' aria-controls='menu' onMouseOver={handleMenuOpen}>
                <Person style={{color: 'white', fontSize: '30px'}}/>
              </Link>
            </div>
            <Menu style={{marginTop: '45px'}}
              id='menu' anchorEl={menuEl} open={Boolean(menuEl)} onClose={handleMenuClose}>
              <MenuItem onClick={handleMenuClose}>My Profile</MenuItem>
              <MenuItem onClick={handleMenuClose, signOut}>Sign Out</MenuItem>
            </Menu>
          </div>
          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' onClick={showSidebar}>
              <li className='navbar-toggle'>
                <Link to='#' className='menu-bar'>
                    <Close style={{color: 'white', fontSize: '30px'}}/>
                </Link>
              </li>
              {SidebarData.map((item, index) => {
                return (
                    !item.private || (item.private && uType > 2)
                        ? <li key={index} className={item.cName}>
                                      <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                      </Link>
                                    </li>
                        : null
                    );
              })}
            </ul>
          </nav>
      </>
    );
}
