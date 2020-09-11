import React from 'react';
import {BrowserRouter as Router, Link} from "react-router-dom";
import MainRouter from "./MainRouter";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
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
    const classes = useStyles();

    const login = () => {
        console.log('login')
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
                        <Button color="inherit" ><a href={'http://localhost:5000/google'}>Login</a></Button>
                    </Toolbar>
                </AppBar>
            </div>
            <MainRouter/>
        </Router>
    );
}

export default MainMenu;