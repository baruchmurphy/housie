import React, { useState, useCallback, useEffect } from "react";
import { makeStyles, Box, Button, Typography} from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from 'yup'; 
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import GroceryItem from './GroceryItem';
import FormikAlert from '../../../../formik/FormikAlert';
import FormikInput from '../../../../formik/FormikInput';
import { firestore } from '../../../../services/firebase';

const useStyles = makeStyles({
    box: {        
        flexDirection: 'column'
    },
    card: {
        width: '50rem',
        height: '50rem'
    },
    input: {
        width: '30rem',
        height: '1rem'
    },
    container: {
        display: 'flex',
        justifyContent: 'center'
    },
    inputbox: {
        width: '40rem',
        marginRight: '2rem'
    },
    button: {
        height: '30px'
    }
});

const Grocerylist= () => {
    const classes = useStyles();
    const [, setError] = useState('');
    const [, setLoading] = useState(false);
    const [grocerylist] = useState([]);

    const validationSchema = Yup.object().shape({
        groceryitem: Yup.string()
            .min(1, 'Error, add an item before submitting')
    });

    const renderGroceryListItems = () => {
       return grocerylist.map((item: {text: string, complete: boolean}) => {
            return <GroceryItem item={item} key={item.text} />
       });
    };

    const initialValues = {
        groceryitem: ''
    };

    const handleSubmit = useCallback(
        async function(values, actions) {
            try {
                setError('');
                setLoading(true);
                await firestore.collection('Users').add({
                    groceryitems: values.grocerylist
                });
                actions.setStatus({ successfulSubmit: 'Successfully added' });
            } catch (error) {
                actions.setStatus({ submissionError: 'Something went wrong' });
            } finally {
                console.log('done');
            }
            setLoading(false);
        }, []
    );

    return(
        <>
            <Typography variant="h4">Grocerylist</Typography>
            <Box className={classes.container}>
                <Box className={classes.box}>
                    <Formik 
                        validateOnBlur={false} 
                        validateOnChange={false} 
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                    >
                        <Form>
                            <FormikAlert name="successfulSubmit" severity="success" />
                            <FormikAlert name="submissionError" severity="error" />
                            <FormikInput
                                name="groceryitem"
                                type="text"
                                placeholder="input item here..." 
                                variant="outlined"
                                className={classes.input}
                            />
                            <Button type="submit" variant="contained" color="primary">Add</Button>
                        </Form>
                    </Formik>
                    <Card className={classes.card}>
                        <CardContent>
                            <React.Fragment>
                                {renderGroceryListItems()}
                            </React.Fragment>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </>
    );
};

export default Grocerylist;