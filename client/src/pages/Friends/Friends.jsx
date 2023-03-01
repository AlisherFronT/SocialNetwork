import React, {useEffect, useState} from 'react';
import {RiUserAddLine} from "react-icons/ri"
import {AiOutlineSearch} from "react-icons/ai"
import {useDispatch, useSelector} from "react-redux";
import {changeSearch, findAllUser} from "../../redux/reducers/findUsers";
import {Image, useToast} from "@chakra-ui/react";
import axios from "../../utils/axios";
import {fillUser} from "../../redux/reducers/user";
import {findUserSelector, userSelector} from "../../redux/reselect";


const Friends = () => {

    const dispatch = useDispatch()

    const {user} = useSelector(userSelector)
    const {data, filter} = useSelector(findUserSelector)

    const [search, setSearch] = useState(filter.search || '' )

    const toast = useToast()


    useEffect(() => {
        dispatch(findAllUser({login : user.login, search}))
        dispatch(changeSearch(search))
    }, [search])


    const sendRequest = (id) => {
        axios.patch(`/request/${user._id}`, {request: id})
            .then((res) => {
                toast({
                    title: 'Запрос отправлен',
                    status: 'success',
                    duration: 5000,
                    position: 'center-top',
                    isClosable: true,
                })
                dispatch(fillUser(res.data))
            })
            .catch(() => toast({
            title: 'Ошибка при отправке запроса',
            status: 'error',
            duration: 5000,
            position: 'center-top',
            isClosable: true,
        }))
    }


    console.log(data)

    return (
        <section className="friends">
            <div className="friends__row">
                <div className="friends__follow">
                    <div className="friends__top">
                        <h2 className="friends__title">
                            Search friends
                        </h2>
                    </div>
                    <div className="friends__search">
                        <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" className="friends__search-input" placeholder={"Search"}/>
                        <button className="friends__search-btn">
                            <AiOutlineSearch/>
                        </button>
                    </div>
                    <div className="friends__cards">
                        {
                            data.map((item) => (
                                <div key={item._id} className="friends__card">
                                    <Image alt={item.login} className="friends__card-img" src={`${process.env.REACT_APP_URL}${item.image}`} fallbackSrc='https://via.placeholder.com/150' />

                                    <div className="friends__card-bottom">
                                        <div className="friends__card-info">
                                            <a href="" className="friends__card-link">
                                                {item.name} {item.surname}
                                            </a>
                                            <p className="friends__card-friends">
                                                Нет общих друзей
                                            </p>
                                        </div>

                                        {
                                            user.requests.includes(item._id) ? '' :  <button className="friends__card-btn" onClick={() => sendRequest(item._id)}>
                                                <RiUserAddLine/>
                                            </button>
                                        }


                                    </div>
                                </div>
                            ))
                        }

                    </div>
                </div>
                <div className="friends__filter">

                </div>
            </div>
        </section>
    );
};

export default Friends;