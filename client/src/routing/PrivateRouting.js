import React from 'react';
import {Route,Routes} from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../pages/Home/Home";
import Friends from "../pages/Friends/Friends";
import MyProfile from "../pages/MyProfile/MyProfile";
import NotFound from "../pages/NotFound/NotFound";
import Notifications from "../pages/Notifications/Notifications";
import Request from "../pages/Requests/Request";
import Photos from "../pages/Photos/Photos";

const PrivateRouting = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route path='' element={<Home/>}/>
                <Route path='findfriends' element={<Friends/>}/>
                <Route path='myprofile' element={<MyProfile/>}/>
                <Route path='notifications' element={<Notifications/>}/>
                <Route path='requests' element={<Request/>}/>
                <Route path='photos' element={<Photos/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Route>
        </Routes>
    );
};

export default PrivateRouting;