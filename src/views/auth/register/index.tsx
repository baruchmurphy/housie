import React, { useCallback, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from 'yup'; 
import { Button, Box, Link, Typography, makeStyles, } from "@material-ui/core";
import FormikInput from '../../../formik/FormikInput';
import FormikAlert from '../../../formik/FormikAlert';
import { useAuth } from '../../../contexts/AuthContext';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles({
    inputs: {
        marginBottom: 3
    }
});

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { signup } = useAuth();
    const classes = useStyles();
    const validationSchema = Yup.object().shape({
        fullName: Yup.string().required('Name is required'),
        email: Yup.string().required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be between 6-20 characters')
            .max(20, 'Password must be between 6-20 characters')
            .required('Password is required'),
        confirmPassword: Yup.string().required('Password Confirmation is required')
    })
    
    const initialValues = {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    };
    
    const handleSubmit = useCallback(
        async function(values, actions) {
            if (values.password !==
                values.confirmPassword) {
                    return setError('Passwords do not match')
                }
                    await signup(values.email, values.password)
                try {
                    setError('')
                    setLoading(true)
                    // firestore.collection('Users').add({
                    //     name: values.fullName,
                    //     email: values.email,
                    //     password: values.password,
                    //     confirmPassword: values.confirmPassword
                    // })
                    actions.setStatus({ loginSuccess: 'Setting up...'})
                    // history.push('/home')
                    console.log('done');
                } catch (error) {
                actions.setStatus({ loginError: 'Something went wrong' })
            }
            setLoading(false)
            console.log(loading)
        }, []
    );

    return( 
            <>
                <Typography variant="h4" gutterBottom>Sign Up</Typography>
                    <Box display="flex" justifyContent="center">
                        <Box maxWidth={300}>
                        {error && <Alert severity="error">{error}</Alert>}
                            <Formik 
                                validateOnBlur={false} 
                                validateOnChange={false} 
                                initialValues={initialValues}
                                onSubmit={handleSubmit}
                                validationSchema={validationSchema}
                            >
                            <Form id="sign-up-form">
                                <FormikAlert name="loginSuccess" severity="success"  />
                                <FormikAlert name="loginError" severity="error"  />
                                <FormikInput 
                                    name="fullName"
                                    placeholder="Type name here..."
                                    id="fullName"
                                    fullWidth
                                    variant='outlined'
                                    className={classes.inputs}
                                />
                                <FormikInput 
                                    name="email"
                                    type="email"
                                    placeholder="Type email here..." 
                                    fullWidth
                                    variant='outlined'
                                    className={classes.inputs}
                                />
                                <FormikInput 
                                    name="password"
                                    type="password"
                                    placeholder="Type password here..." 
                                    fullWidth
                                    variant='outlined'
                                    className={classes.inputs}
                                />
                                <FormikInput 
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Confirm password here..." 
                                    fullWidth
                                    variant='outlined'
                                    className={classes.inputs}
                                />
                                <Box display="flex" justifyContent="center" my={3}>
                                    <Button disabled={loading} type="submit" variant="contained" color="primary">
                                        Sign Up
                                    </Button>
                                </Box>
                                <Link href="/login" >Already have an account? Login</Link>
                            </Form>
                        </Formik>
                    </Box>
                </Box>
            </>
    );
};

export default Register;