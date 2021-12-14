import React, { useState, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton  from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ForumIcon from '@mui/icons-material/Forum';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import { LOGOUT } from '../constants/actionTypes.js'
import './Header.css';

function Header({ backButton }) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: LOGOUT });
    
        history.push('/auth');
    
        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;
    
        if (token) {
            const decodedToken = decode(token);
    
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
    
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <div className='header'>
            {backButton ? (
                <IconButton onClick={() => history.replace(backButton)}>
                    <ArrowBackIosIcon fontSize="large" className="header__icon"/>
                </IconButton>
            ) : (
                <div>
                    <IconButton
                        className="header__icon"
                        id="basic-button"
                        aria-controls="basic-menu"
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    > 
                        <MenuIcon fontSize="large"/>
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        <Link to='/feed'>
                            <MenuItem><HomeIcon></HomeIcon> News Feed</MenuItem>
                        </Link>  
                        <MenuItem onClick={handleClose}><PersonIcon></PersonIcon> Profile</MenuItem>
                        <MenuItem onClick={logout}><ExitToAppIcon></ExitToAppIcon> Logout</MenuItem>
                    </Menu>
                </div>    
            )}

            {/* <Link to='/'>    
                <img
                    className = "header__logo"
                    
                    alt = "logo"
                />
            </Link> */}

            <Link to="/tinderCards">
                <IconButton className="header__icon">
                    <ForumIcon fontSize="large"/>
                </IconButton>
            </Link>
        </div>
    )
}

export default Header
