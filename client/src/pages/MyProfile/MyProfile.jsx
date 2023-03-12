import React, {useState} from 'react';

import {SlPencil} from "react-icons/sl"
import {Button} from "@chakra-ui/react"
import EmojiPicker from "emoji-picker-react";
import {BsEmojiSmile} from "react-icons/bs"
import axios from "../../utils/axios";
import {v4 as uuidv4} from "uuid";
import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../../redux/reselect";
import {fillUser} from "../../redux/reducers/user";
import { format } from 'timeago.js';
import {useNavigate} from "react-router-dom";


const MyProfile = () => {

    const [selectEmoji, setSelectEmoji] = useState(false)

    const [post, setPost] = useState('')

    const {user} = useSelector(userSelector)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const addPost = async () => {
        try {

            const res = await axios.patch(`/users/${user._id}/addpost`, {

                text: post,
                owner: user._id,
                id: uuidv4(),
                date: Date.now()
            })

            dispatch(fillUser(res.data))

           setPost('')

        }catch (e) {
            console.log(e)
        }
    }


    return (
        <section className="profile">
            <div className="container">
                <div className="profile__info">
                    <div className="profile__info-top">
                        <button className="profile__info-cover">
                            <SlPencil/>
                            Change cover
                        </button>
                    </div>
                    <div className="profile__info-bottom">
                        <div className="profile__info-avatar">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_baDvEfYqIi1NMQllLO2fapGPAeG58n2N6Q&usqp=CAU" alt="" className="profile__info-image"/>
                        </div>
                        <div className="profile__info-user">
                            <h3 className="profile__info-name">
                                Ivan Ivanov
                            </h3>
                            <a href="" className="profile__info-about">
                                Enter information about yourself <span>></span>
                            </a>
                        </div>
                        <button onClick={() => navigate('/editmyprofile')} className="profile__info-change">
                            Change profile
                        </button>
                    </div>
                </div>

                <div className="profile__addPost">
                    <div className='profile__addPost-top'>
                        <textarea  value={post} onChange={(e) => setPost(e.target.value)} placeholder='Что у вас нового?' className='profile__addPost-field' type="text"/>

                        {
                            selectEmoji ? <div className='profile__emoji-block' onMouseLeave={() => setSelectEmoji(false)}>
                                    <EmojiPicker  onEmojiClick={(emoji) => setPost(prev => post + emoji.emoji)} className='profile__emoji-picker'/>
                                     </div>  : <span onMouseEnter={() => setSelectEmoji(true)} className='profile__addPost-emoji'><BsEmojiSmile/></span>
                        }

                    </div>
                    <Button onClick={addPost} colorScheme='blue'>Button</Button>
                </div>

                <div className="profile__posts">
                    <div className="profile__posts-top">
                        <Button colorScheme='teal' variant='ghost'>
                            Все записи
                        </Button>
                        <Button colorScheme='teal' variant='ghost'>
                            Мои записи
                        </Button>
                        <Button colorScheme='teal' variant='ghost'>
                            Архив записей
                        </Button>
                    </div>

                    <div className="profile__posts-row">
                        {
                            user.posts.map((item) => (
                                <div key={item.id} className='profile__post-card'>
                                    <div className='profile__post-card-top'>
                                        {format(item.date)}
                                    </div>
                                    <p className='profile__post-card-text'>{item.text}</p>
                                    <div className='profile__post-card-icons'></div>
                                </div>
                            ))
                        }
                    </div>


                </div>
            </div>
        </section>
    );
};

export default MyProfile;