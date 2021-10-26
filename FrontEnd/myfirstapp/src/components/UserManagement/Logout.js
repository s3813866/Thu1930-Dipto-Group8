import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ErrorIcon from '@material-ui/icons/Error';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        textAlign: 'center',
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
    middle: {
        textAlign: 'center',
        justifyContent: "center",
        alignItems: "center",
    },
    textBlue: {
        color: 'blue',
    }
}));

window.localStorage.clear(); 
window.sessionStorage.clear(); 

export default function Logout() {
    const classes = useStyles();

    localStorage.removeItem("token");
    sessionStorage.removeItem("userType");

    localStorage.clear();
    sessionStorage.clear();

    return (
        <div className={classes.root}>
            <Grid >
                <div className={classes.middle}>
                    <div className={classes.textBlue}>
                        <p>

                        </p>
                        <h1>You Have Successfully Logged Out <ErrorIcon/> </h1>
                    </div>
                    <p> Logging Out <ErrorIcon/>
                    </p>
                </div>

            </Grid>
        </div>
    );
}