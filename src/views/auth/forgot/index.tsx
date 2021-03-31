import React from "react";
import * as Yup from 'yup'; 
import { Button, Box, Link, Typography, makeStyles } from "@material-ui/core";
import FormikInput from '../../../formik/FormikInput';
import { Formik, Form } from "formik";

const useStyles = makeStyles({
    inputs: {
        marginBottom: 3
    }
});

const Forgot = () => {
    const classes = useStyles();

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required'),
        password: Yup.string()
            .required('Password is required'),
    });
    
    // const handleSubmit = useCallback(
    //     async function(values, actions) {
    //         console.log('hello')
    //         try {
    //             setError('')
    //             setLoading(true)
    //             await resetPassword(values.email)
    //             actions.setStatus({ loginSuccess: 'Check your inbox for further instructions'})
    //             console.log(values.email)
    //         } catch (error) { 
    //             actions.setStatus({ loginError: 'Something went wrong' })
    //         } finally {
    //             setLoading(false)
    //         }
    //     }, []
    // )
    
    const initialValues = {
        email: '',
    };
    
// const value = {
//     resetPassword
// }

    return( 
        <>
            <Typography variant="h4" gutterBottom>Recover Password</Typography>
            <Box display="flex" justifyContent="center">
                <Box maxWidth={300}>
                    <Formik 
                        validateOnBlur={false} 
                        validateOnChange={false} 
                        initialValues={initialValues}
                        onSubmit={() => console.log('hello')}
                        validationSchema={validationSchema}
                    >
                        <Form>
                            <FormikInput
                                name="email"
                                type="email"
                                placeholder="Type email here..." 
                                fullWidth
                                variant="outlined"
                                className={classes.inputs}
                            />
                            <Box my={3}>
                                <Button type="submit" variant='contained' color="primary">Submit</Button>
                            </Box>
                            <Link href="/register">Need an accoount? Create one</Link><br />
                            <Link href="/login">Sign In</Link>
                        </Form>
                    </Formik>
                </Box>
            </Box>
        </>
    );
};

export default Forgot;