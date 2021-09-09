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





export default function PageNotFound() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid >
                <div className={classes.middle}>
                    <div className={classes.textBlue}>
                        <p>
                            asdasdasdas
                        </p>
                <h1>404 NOT FOUND <ErrorIcon/> </h1>
                    </div>
                <p>404 NOT 11 FOUND  <ErrorIcon/>
                </p>
                </div>

            </Grid>
            </div>
            );
            }