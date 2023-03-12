import React, {useEffect, useState} from 'react';
import {Avatar, Input} from "@chakra-ui/react";
import EmojiPicker from "emoji-picker-react";
import {BsEmojiSmile} from "react-icons/bs";
import {useSelector} from "react-redux";
import {userSelector} from "../../redux/reselect";
import axios from "../../utils/axios";
import ChatUser from "./ChatUser";

const Chat = () => {

    const [selectEmoji, setSelectEmoji] = useState(false)

    const {user} = useSelector(userSelector)

    const [friends, setFriends] = useState([])

    const [chats, setChats] = useState([])

    useEffect(() => {
        axios(`/users?friends=${user.friends.join(',')}`)
            .then(({data}) => setFriends(data))

        axios(`/chats/${user._id}`)
            .then(({data}) => setChats(data))
    }, [])



    return (
        <section className='chat'>
            <div className="container">
                <div className="chat__content">
                    <div className="chat__sidebar">
                        <div className="chat__search">
                            <input type="text"/>
                        </div>
                        <div className="chat__friends">

                            {
                               friends.map((item) => (
                                   <Avatar key={item._id} src={`${process.env.REACT_APP_URL}${item.image}`}/>
                               ))
                            }

                        </div>
                        <div className="chat__list">
                            <div className='chat__item'>
                                {
                                    chats.map((item) => (
                                        <ChatUser key={item.id} chatId={item._chatId} item={item.members.filter(el => el !== user._id)}/>
                                    ))
                                }

                            </div>
                        </div>
                    </div>
                    <div className="chat__block">
                        <div className="chat__block-top">
                            <h2>Name</h2>

                            <Avatar/>
                        </div>

                        <div className="chat__block-bottom">
                            <Input className='chat__block-field' placeholder='type message'/>

                            {
                                selectEmoji ? <div className='chat__block-emoji-block profile__emoji-block' onMouseLeave={() => setSelectEmoji(false)}>
                                    <EmojiPicker   className='profile__emoji-picker'/>
                                </div>  : <span onClick={() => setSelectEmoji(true)} className='chat__block-emoji profile__addPost-emoji'><BsEmojiSmile/></span>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Chat;