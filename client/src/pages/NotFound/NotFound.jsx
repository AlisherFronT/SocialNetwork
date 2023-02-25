import React from 'react';
import {Navigate, useLocation} from 'react-router-dom'
import {useSelector} from "react-redux";

const NotFound = () => {



    const {user} = useSelector((store) =>  store.persistedReducer.user)

    if ( !user.login.length) {
        return (
            <Navigate to='/login'/>
        );
    }
    return (
        <Navigate to='/'/>
    );
};

export default NotFound;