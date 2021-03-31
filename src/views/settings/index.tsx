import React, { useCallback, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from 'yup'; 
import { Button, Box, Link, makeStyles } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormikInput from '../../formik/FormikInput';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from "react-router-dom";
import FormikAlert from '../../formik/FormikAlert';

const useStyles = makeStyles({
    inputs: {
        marginBottom: 3
    },
    card: {
        border: "solid black 2px",
        width: 400,
        height: 350,
        display: 'flex',
        justifyContent: 'center'
      },
    sidebar: {
        border: "solid black 2px",
        width: 250,
        minHeight: 769,
        display: 'flex',
        marginRight: 80,
    },
    pos: {
        marginBottom: 12,
    },
    settings: {
        display: 'flex',
        marginRight: 20,
    }
});


const Settings = () => {
    const { currentUser, updatePassword, updateEmail } = useAuth()
    const [, setLoading] = useState(false);
    const [, setError] = useState('');
    const history = useHistory();
    const classes = useStyles();

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required'),
        password: Yup.string()
            .required('Password is required'),
    });
    
    const initialValues = {
        email: currentUser.email,
        password: currentUser.password

    };
    
    const handleSubmit = useCallback(
        async function(values) {
            if (values.password !== values.confirmPassword) {
                     return setError('Passwords do not match')
                 }
           const promises = []
           setLoading(true)
           setError
           if (currentUser.email !== values.email) {
            promises.push(updateEmail(currentUser.email))
           }
           if (currentUser.password !== values.password) {
            promises.push(updatePassword(currentUser.password))
           }
           Promise.all(promises).then(() => {
               history.push('/')
           }).catch(()=> {
               setError('failed to update account')
           }).finally(() => {
               setLoading(false)
           })
        }, []
    );

    return(
        <>
        <div className={classes.settings}>
            <Card className={classes.sidebar}>
                <CardContent>
                    <h2>Profile Settings</h2>
                </CardContent>
            </Card>
            <Card className={classes.card}>
                <CardContent>
                    <Box display="flex" justifyContent="center" className={classes.pos}>
                        <Formik 
                            validateOnBlur={false} 
                            validateOnChange={false} 
                            initialValues={initialValues}
                            onSubmit={handleSubmit}
                            validationSchema={validationSchema}
                        >
                        {(formikBag) => (
                                <Form>
                                <FormikAlert name="loginSucess" severity="success" />
                                <FormikAlert name="loginError" severity="error" />
                                <FormikInput
                                    defaultValue={formikBag.values.email}
                                    name="email"
                                    type="email"
                                    placeholder="Leave blank to keep the same..." 
                                    fullWidth
                                    variant="outlined"
                                    className={classes.inputs}
                                />
                                <FormikInput 
                                    name="password"
                                    type="password"
                                    placeholder="Leave blank to keep the same..." 
                                    fullWidth
                                    variant='outlined'
                                    className={classes.inputs}
                                />
                                <FormikInput 
                                    name="password-confirm"
                                    type="password"
                                    placeholder="Leave blank to keep the same..." 
                                    fullWidth
                                    variant='outlined'
                                    className={classes.inputs}
                                />
                                <Box my={3}>
                                    <Button type="submit" variant='contained' color="primary">Update</Button>
                                </Box>
                                <Link href="/">Cancel</Link>
                            </Form>
                        )};
                        </Formik>
                    </Box>
                </CardContent>
            </Card>
            </div>
        </>
    );
};

export default Settings;