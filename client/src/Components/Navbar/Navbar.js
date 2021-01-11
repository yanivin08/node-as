import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, Redirect } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import { Menu, MenuItem } from '@material-ui/core'

export default function Navbar() {
    
    const [sidebar, setSidebar] = useState(false);
    const [menuEl, setHandle] = useState(null);

    const handleMenuOpen = e => {
      setHandle(e.currentTarget)
    }

    const handleMenuClose = () => {
      setHandle(null);
    }

    const signOut = () => {
      document.cookie = "token=\"\";expires=Thu, 01 Jan 1970 00:00:01 GMT";
      window.location.reload();
    }

    const getCookie = (name) => {
      return document.cookie.split(';').some(c => {
        return c.trim().startsWith(name + '=')
      })
    }

    const showSidebar = () => setSidebar(!sidebar);
  
    return (
      <>
        <IconContext.Provider value={{ color: '#fff' }}>
          <div className='navbar'>
            <div className='menu-bars'>
              <Link to='#' className='menu-bar'>
                <FaIcons.FaBars onClick={showSidebar} />
              </Link>
              <Link to='#' className='menu-bar'>
                <FaIcons.FaCalendar />
                <span>Appointment Settings</span>
              </Link>
            </div>
            <div className='menu-rights'>
              <Link to='#' className='menu-right' aria-controls='menu' onMouseOver={handleMenuOpen}>
                <FaIcons.FaUser />
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
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>
              {SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </IconContext.Provider>
      </>
    );
}
