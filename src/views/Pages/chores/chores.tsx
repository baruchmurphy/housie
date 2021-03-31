import React from "react";
import { makeStyles } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


const useStyles = makeStyles({
    card: {
        border: 'solid black 2px',
        width: '25rem',
        height: '15rem'
    }
});

const Chores = () => {
    const classes = useStyles();

    return(
        <>
            <h2>Chores</h2>
            <Card className={classes.card}>
                <CardContent>
                    Chores
                </CardContent>
            </Card>
        </>
    );
};

export default Chores;