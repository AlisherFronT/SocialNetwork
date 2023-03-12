import React, {useEffect, useState} from 'react';
import {Avatar} from "@chakra-ui/react";
import axios from "../../utils/axios";
import {useNavigate, useParams} from "react-router-dom";

const ChatUser = ({id, chatId}) => {

    const [friend, setFriend] = useState()

    const navigate = useNavigate()

    const params = useParams()

    useEffect(() => {
        axios(`/users/${id}`).then(({data}) => setFriend(data))
    }, [])

    return (
        <div style={{background: params['*'] === chatId ? 'blue' : 'transparent'}} className='header__popover-top' onClick={() => navigate(`/chat/${chatId}`)}>
            <Avatar className='header__popover-img'  src={`${process.env.REACT_APP_URL}${friend.image}`}/>
            <div>
                <h3 className='header__popover-title'>{friend.name} {friend.surname}</h3>
                <p className='header__popover-num'>123</p>
            </div>
        </div>
    );
};

export default ChatUser;