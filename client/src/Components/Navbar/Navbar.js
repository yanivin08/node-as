import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { Menu, MenuItem, FormControlLabel, Switch, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import { Person, Menu as Menus, Close, SettingsApplicationsTwoTone } from '@material-ui/icons';



export default function Navbar() {
    
    const [sidebar, setSidebar] = useState(false);
    const [menuEl, setHandle] = useState(null);
    const [dialogBox, setDialog] = useState(false);
    const [appoint, setAppoint] = useState(false);

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
    
    const handleDialog = () => setDialog(!dialogBox);

    const handleAppoint = () => {
      
      setAppoint(!appoint);
    }

    return (
      <>
          <Dialog
          open={dialogBox}
          onClose={handleDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Start Setting up Appointment?"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Swith the toggle button below to start/stop setting up appointments.
                  <FormControlLabel
                      control={<Switch checked={appoint} onChange={handleAppoint} name="appoint" />}
                      label="Appointment"
                  />
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDialog} color="primary">
                  Close
                </Button>
            </DialogActions>
          </Dialog>
          <div className='navbar'>
            <div className='menu-bars'>
              <Link to='#' className='menu-bar'>
                <Menus style={{color: 'white', fontSize: '30px'}} onClick={showSidebar}/>
                
              </Link>
              <span style={{ marginLeft: '30px', color: 'white' }}>Appointment Settings</span>
            </div>
            <div className='menu-rights'>
              <Link to='#' className='menu-right' aria-controls='menu' onMouseOver={handleMenuOpen}>
                <Person style={{color: 'white', fontSize: '30px'}}/>
              </Link>
            </div>
            <Menu style={{marginTop: '45px'}}
              id='menu' anchorEl={menuEl} open={Boolean(menuEl)} onClose={handleMenuClose}>
              { getCookie('val') >= 2 ? <MenuItem onClick={handleDialog}>My Application</MenuItem> : null}
              <MenuItem onClick={handleMenuClose}>
                <Link to='/user/account' style={{textDecoration: 'none', color: 'black' }}>
                  My Profile
                </Link>    
              </MenuItem>
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
                    !item.private || (item.private && uType > 1)
                        ? <li key={index} className={item.cName}>
                                      <Link to={item.path}>
                                        {item.icon}
                                        <span className='nav-span'>{item.title}</span>
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
