import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import LoadingScreen from './components/LoadingScreen'

interface PrivateRouteProps {
    component: any; 
    // rest: any[];
    exact: boolean;
    path: string;
}

export const PrivateRoute = ({ component: Component, ...rest}: PrivateRouteProps
    ) => {
        const { currentUser, authLoading } = useAuth()
        console.log(authLoading, '=======> privateroute')
    if (authLoading) {
        return <LoadingScreen />
    } else {
        return(
            <Route
                {...rest}
                render={props => {
                   console.log(currentUser)
                   return currentUser? <Component {...props}></Component> : <Redirect to='/login'/>   
                }}         
                >
            </Route>
        )
    }
}