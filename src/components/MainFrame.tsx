import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, useHistory} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AuthRouter from "./AuthRouter";
import axios from "axios";
import {getHeaders} from "../helpers/getHeaders";

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

function MainFrame() {
    const apiUrl = process.env.REACT_APP_API_URL || '';

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                `${apiUrl}/auth/login`,
                {
                    headers: {
                        'Authorization': `Bearer ${getHeaders()}`,
                    }
                }
            );
            setIsLoggedIn(result.status === 200);
        };

        fetchData();
    });


    const classes = useStyles();
    const history = useHistory();

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
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Header
                        </Typography>
                        {
                            isLoggedIn
                                ? <Button color="inherit" onClick={logout}>Log out</Button>
                                : <Button color="inherit" onClick={login}>Login</Button>
                        }
                    </Toolbar>
                </AppBar>
            </div>
            <AuthRouter/>
        </Router>
    );
}

export default MainFrame;
