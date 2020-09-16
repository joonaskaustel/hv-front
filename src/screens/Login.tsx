import React from 'react';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {makeStyles, Theme} from '@material-ui/core/styles';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));


function Login() {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.root}>
                <Alert severity="warning">This is a warning message!</Alert>
            </div>
        </div>
    );
}

export default Login;
