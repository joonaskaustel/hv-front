import React from 'react';
import {BrowserRouter as Router, Link} from "react-router-dom";
import MainRouter from "./MainRouter";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from "react-router-dom";
import {useLocation} from "react-router";
// import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function MainMenu() {
    const apiUrl = process.env.REACT_APP_API_URL || '';

    const classes = useStyles();
    const history = useHistory();
    const location = useLocation()

    const login = () => {
        window.location.replace(`${apiUrl}/auth/google`)
    }

    const logout = () => {
        // clear token
        localStorage.clear()
        history.go(0)
    }

    return (
        <Router>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            {/*<MenuIcon />*/}
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            News
                        </Typography>
                        <Button color="inherit" onClick={login}>Login</Button>
                        <Button color="inherit" onClick={logout}>Log out</Button>
                    </Toolbar>
                </AppBar>
            </div>
            <MainRouter/>
        </Router>
    );
}

export default MainMenu;