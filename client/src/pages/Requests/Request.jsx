import React from 'react';
import {useCancelRequestMutation, useGetRequestsQuery} from "../../redux/reducers/requests";
import {useDispatch, useSelector} from "react-redux";
import {Button, Image} from "@chakra-ui/react";
import {fillUser} from "../../redux/reducers/user";


const Request = () => {

    const {user} = useSelector(store => store.persistedReducer.user)

    const dispatch = useDispatch()

    const [cancelRequest, obj] = useCancelRequestMutation()

    if (obj.data) {
        console.log(obj.data)
        dispatch(fillUser(obj.data))
    }
    const {data= [], isLoading} = useGetRequestsQuery(obj.data ? obj.data.requests : user.requests)


    const handleCancelRequest = async (id) => {
        await cancelRequest({senderId: user._id, recieverId:id }).unwrap()
    }

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    return (
        <div className='requests'>

            Hello world

            <div className="container">
                <div className='notification__list'>
                    {
                        data.map((item) => (
                            <div key={item._id} className='notification__card'>
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
                                        <Button onClick={() => handleCancelRequest(item._id) }  color='black' colorScheme='gray'>Отклонить</Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            
        </div>
    );
};

export default Request;