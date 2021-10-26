import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {ClickAwayListener, Grow, Link, MenuList, Popper} from "@material-ui/core";
import Paper from "@mui/material/Paper";

export default function MenuAppBar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [NewanchorEl, setNewAnchorEl] = React.useState(null);
    const anchorRef = React.useRef(null);
    const [open, setOpen] = React.useState(false);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    const handleMenuTwo = (event) => {
        setNewAnchorEl(event.currentTarget);
    };
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };


    const handleCloseTwo = () => {
        setNewAnchorEl(null);
    };
    const handleCloses = () => {
        setAnchorEl(null);
    };



    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        ref={anchorRef}
                        id="composition-button"
                        aria-controls={open ? 'composition-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                    >
                        <MenuIcon />
                        </IconButton>
                        <Popper
                            open={open}
                            anchorEl={anchorRef.current}
                            role={undefined}
                            placement="bottom-start"
                            transition
                            disablePortal
                        >
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{
                                        transformOrigin:
                                            placement === 'bottom-start' ? 'left top' : 'left bottom',
                                    }}
                                >
                                    <Paper>
                                        <ClickAwayListener onClickAway={handleClose}>
                                            <MenuList
                                                autoFocusItem={open}
                                                id="composition-menu"
                                                aria-labelledby="composition-button"
                                                onKeyDown={handleListKeyDown}
                                            >
                                                <MenuItem onClick={handleClose} component={Link} href="/search">Search</MenuItem>
                                                <MenuItem onClick={handleClose} component={Link} href="/BookListing">All Books</MenuItem>
                                                <MenuItem onClick={handleClose} component={Link} href="/Enquiry">Enquiry</MenuItem>
                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                    <br/>
                    <a className="navbar-brand" href="/" style={{ color: 'red' }} sx={{ flexGrow: 1 }}>
                        Bookeroo
                    </a>
                    {(
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleCloses}
                            >
                                <MenuItem onClose={handleCloses} component={Link} href="/register">My account</MenuItem>
                                <MenuItem onClose={handleCloses} component={Link} href="/register">Home</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}



//  class Header extends Component {
//      constructor(){
//          super();
//
//          this.state= {
//              auth: true,
//              anchorEl: null
//          };
//
//          this.handleClose = this.handleClose.bind(this);
//
//      }
//
//      handleClose(e){
//          this.setState({anchorEl: null});
//      }
//
//
//     render() {
//         return (
//             <div>
//             <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
//             <div className="container">
//                 <a className="navbar-brand" href="/home" sx={{ flexGrow: 1 }>
//                     Bookeroo
//                 </a>
//                 <IconButton
//                     size="large"
//                     edge="start"
//                     color="inherit"
//                     aria-label="menu"
//                     sx={{ mr: 2 }}
//                 >
//                     <MenuIcon />
//
//                 </IconButton>
//                 <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
//                     <span className="navbar-toggler-icon" />
//                 </button>
//
//                 <div className="collapse navbar-collapse" id="mobile-nav">
//                     <ul className="navbar-nav mr-auto">
//                         <li className="nav-item">
//                             <a className="nav-link" href="/dashboard">
//                                 Dashboard
//                             </a>
//                         </li>
//                         <li className="nav-item">
//                             <a className="nav-link" href="/search">
//                                 Search
//                             </a>
//                         </li>
//                     </ul>
//
//                     <ul className="navbar-nav ml-auto">
//                         <li className="nav-item">
//                             <a className="nav-link " href="/register">
//                                 Sign Up
//                             </a>
//                         </li>
//                         <li className="nav-item">
//                             <a className="nav-link" href="/login">
//                                 Login
//                             </a>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </nav>
//             </div>
//         )
//     }
// }
// export default Header;