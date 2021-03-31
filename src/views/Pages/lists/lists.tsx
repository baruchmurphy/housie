import React from "react";
import { makeStyles, Link } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles({
    card: {
        border: 'solid black 2px',
        width: '25rem',
        height: '15rem'
    }
});

const Lists = () => {
    const classes = useStyles();

    return(
        <>
            <h2>Lists</h2>
            <Card className={classes.card}>
                <CardContent>
                    <Link href="/home/lists/grocerylist">Gocery List</Link>
                </CardContent>
            </Card>
        </>
    );
};

export default Lists;