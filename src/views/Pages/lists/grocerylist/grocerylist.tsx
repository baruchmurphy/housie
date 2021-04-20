import React, { useState, useCallback, useEffect } from "react";
import { makeStyles, Box, Button, Typography} from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from 'yup'; 
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormikAlert from '../../../../formik/FormikAlert';
import FormikInput from '../../../../formik/FormikInput';
import { firestore } from '../../../../services/firebase';
import { useAuth } from '../../../../contexts/AuthContext';

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
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [grocerylist, setGroceryList] = useState([]);
    const { lists, profile } = useAuth();
    

    useEffect(() => {
        if (lists) {
            console.log(profile)
            setGroceryList(lists.groceryList);
            setLoading(false);
        }
    }, [lists])

    const validationSchema = Yup.object().shape({
        groceryitem: Yup.string()
            .min(1, 'Error, add an item before submitting')
    });

    const renderGroceryListItems = () => {
    //    return grocerylist.map((item: {item: string, complete: boolean}) => {
    //         console.log('=====>', item)
    //         return <GroceryItem item={item} key={item.item} />
    //    });
    };

    const initialValues = {
        listItems: grocerylist,
        addedValue: 'things'
    };

    const handleSubmit = useCallback(
        async function(values, actions) {
            try {
                setError('');
                setLoading(true);
                await firestore.collection('Lists').add({
                    groceryitems: values.groceryList
                });
                actions.setStatus({ successfulSubmit: 'Successfully added' });
            } catch (error) {
                actions.setStatus({ submissionError: 'Something went wrong' });
                console.log(error)
            } finally {
                console.log('done');
                setLoading(false);
            }
        }, []
    );

    if (loading) {
        return (
            <Typography>Loading</Typography>
        )
    }

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
                        {(formikBag) => (
                            <Form>
                                <Card>
                                    <CardContent>
                                        <FormikInput 
                                            name='addedValue'
                                            variant='outlined'
                                            className={classes.input}
                                        />
                                        <Button type="submit" variant="contained" color="primary">Add</Button>
                                    </CardContent>
                                </Card>
                                <FormikAlert name="successfulSubmit" severity="success" />
                                <FormikAlert name="submissionError" severity="error" />
                                <Box>
                                    {formikBag.values.listItems.map((groceryItem, idx) => {
                                        console.log('item', groceryItem)
                                        return (
                                            <Card key={idx}>
                                                <CardContent>
                                                    hello
                                                    {groceryItem['item']}
                                                </CardContent>
                                            </Card>
                                        )
                                    })}
                                
                                </Box>
                            </Form>
                        )}
                    </Formik>
                            <>
                                {renderGroceryListItems()}
                            </>
                </Box>
            </Box>
        </>
    );
};

export default Grocerylist;