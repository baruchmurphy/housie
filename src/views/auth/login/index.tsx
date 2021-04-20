import React, { useCallback, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from 'yup'; 
import { Button, Box, Link, Typography, makeStyles } from "@material-ui/core";
import { useAuth } from '../../../contexts/AuthContext';
import { useHistory } from "react-router-dom";
import FormikAlert from '../../../formik/FormikAlert';
import FormikInput from '../../../formik/FormikInput';

const useStyles = makeStyles({
    inputs: {
        marginBottom: 3
    }
});

const Login = () => {
    const { login } = useAuth()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const classes = useStyles();
    const history = useHistory();

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required'),
        password: Yup.string()
            .required('Password is required'),
    });
    
    const initialValues = {
        email: '',
        password: '',
    };
    
    const handleSubmit = useCallback(
        async function(values, actions) {
            try {
                await login(values.email, values.password);
                setError('');
                setLoading(true);
                console.log(loading)
                actions.setStatus({ loginSuccess: 'Signing in...'});
            } catch (error) { 
                console.log(error);
                actions.setStatus({ loginError: 'Something went wrong' });
            } finally {
                setLoading(false);
                history.push('/home');
            }
        }, []
    );

    return( 
        <>
            <Typography variant="h4" gutterBottom>Login</Typography>
            <Box display="flex" justifyContent="center">
                <Box maxWidth={300}>
                    <Formik 
                        validateOnBlur={false} 
                        validateOnChange={false} 
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                    >
                        <Form>
                            <FormikAlert name="loginSucess" severity="success" />
                            <FormikAlert name="loginError" severity="error" />
                            <FormikInput
                                name="email"
                                type="email"
                                placeholder="Type email here..." 
                                fullWidth
                                variant="outlined"
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
                            <Box my={3}>
                                <Button type="submit" variant='contained' color="primary">Submit</Button>
                            </Box>
                            <Link href="/register">Need an accoount? Create one</Link><br />
                            <Link href="/forgot">Forgot Password?</Link>
                        </Form>
                    </Formik>
                </Box>
            </Box>
        </>
    );
};

export default Login;