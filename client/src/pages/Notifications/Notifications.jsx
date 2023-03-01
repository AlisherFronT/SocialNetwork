import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {emptyNotification, getAllNotifications} from "../../redux/reducers/notification";
import {Image, Button, useToast} from "@chakra-ui/react";
import axios from "../../utils/axios";
import {fillUser} from "../../redux/reducers/user";
import {notificationSelector, userSelector} from "../../redux/reselect";

const Notifications = () => {

    const {user} = useSelector(userSelector)
    const {data} = useSelector(notificationSelector)
    const dispatch = useDispatch()
    const toast = useToast()

    useEffect(() => {
        if (user.notification.length){
            dispatch(getAllNotifications({arr : user.notification}))
        } else {
            dispatch(emptyNotification())
        }
    }, [user])

    const acceptFriends = (id) => {
        axios.patch('/request/add', {
            senderId: id,
            recieverId: user._id
        }).then((res) => {
            toast({
                title: 'Добавлен в друзья',
                status: 'success',
                duration: 5000,
                position: 'center-top',
                isClosable: true,
            })
            dispatch(fillUser(res.data))

        }).catch(() => {
            toast({
                title: 'Запрос отклонен',
                status: 'error',
                duration: 5000,
                position: 'center-top',
                isClosable: true,
            })
        })
    }

    const cancelFriends = (id) => {
        axios.patch('/request/cancel', {
            senderId: id,
            recieverId: user._id
        }).then((res) => {
            toast({
                title: 'Заявка не принята',
                status: 'success',
                duration: 5000,
                position: 'center-top',
                isClosable: true,
            })
            dispatch(fillUser(res.data))

        }).catch(() => {
            toast({
                title: 'Запрос отклонен',
                status: 'error',
                duration: 5000,
                position: 'center-top',
                isClosable: true,
            })
        })
    }

    console.log(user.notification)
    return (
        <section className='notification'>
            <div className="container">
                <div className='notification__content'>
                    <h2 className='notification__title'>Уведомления</h2>

                    <div className='notification__list'>
                        {
                            data.map((item) => (
                                <div className='notification__card'>
                                    <div className='notification__card-left'>
                                        <Image
                                            fallbackSrc='https://via.placeholder.com/100'
                                            borderRadius='full'
                                            boxSize='100px'
                                            src={`${process.env.REACT_APP_URL}${item.image}`}
                                            alt={`${item.name} ${item.surname}`}
                                        />

                                        <div className='notification__info'>
                                            <p className='notification__info-name'>{item.name} {item.surname} </p>
                                            <p className='notification__info-action'>хочет добавить вас в друзья</p>
                                            <p className='notification__info-city'>{item.city}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <div className='notification__btns'>
                                            <Button onClick={() => cancelFriends(item._id)} color='black' colorScheme='gray'>Отклонить</Button>
                                            <Button onClick={() => acceptFriends(item._id)} colorScheme='messenger'>Принять</Button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Notifications;