import React, {useRef, useState} from 'react';
import {Button, Input, CloseButton} from "@chakra-ui/react"
import axios from "../../utils/axios";
import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../../redux/reselect";
import { v4 as uuidv4 } from 'uuid';
import {fillUser} from "../../redux/reducers/user";
import { Fancybox as NativeFancybox } from "@fancyapps/ui/dist/fancybox.esm.js";
import "@fancyapps/ui/dist/fancybox.css";


const Photos = () => {

    const image = useRef()

    const [photo, setPhoto] = useState('')

    const [desc, setDesc] = useState('')
    const {user} = useSelector(userSelector)
    const dispatch = useDispatch()

    const handleImage = async (e) => {
        try {

            const formData = new FormData()
            const file = e.target.files[0]
            formData.append('image', file)

            await axios.post('/upload', formData).then(({data}) => setPhoto(data.url))

        } catch (err) {
            console.log(err, 'Error!')
        }
    }

    const resetHandler = () => {
        setPhoto('')
        setDesc('')
    }

    const addPhoto = async () => {
        try {
            const res = await axios.patch(`/users/${user._id}/addphoto`, {
                url: photo,
                description: desc,
                id: uuidv4()
            })

            dispatch(fillUser(res.data))

            setDesc('')
            setPhoto('')


        } catch (err) {
            console.log(err)
        }

    }


    return (
        <section className='photos'>
            <div className="container">

                <div className="photos__content">
                    <div className="photos__top">
                        <h2 className='photos__images'>Мои Фотографии</h2>
                        <div className="photos__btns">
                            <Button color='black' colorScheme='gray'>Создать альбом</Button>
                            <Button onClick={() => image.current.click()} colorScheme='facebook'>Добавить фотографию</Button>

                            <input onChange={handleImage} ref={image} type="file" id='image' hidden/>

                        </div>
                    </div>



                    {
                        photo.length ? <>
                                <div className="photos__image">
                                    <CloseButton className='photos__image-close' onClick={resetHandler} />
                                    <img data-fancybox data-caption={desc}  data-src={`${process.env.REACT_APP_URL}${photo}`} className='photos__image-img' src={`${process.env.REACT_APP_URL}${photo}`} alt=""/>
                                    <Input width='300px' placeholder='Описание' className='photos__image-field' />
                                </div>

                                <Button onClick={addPhoto} color='black' colorScheme='gray'>Опубликовать на моей странице</Button>
                                        </> : user.photos.length ? <div className='photos__row'>
                                {
                                    user.photos.map((item) => (
                                        <img className='photos__row-img' data-fancybox='gallery' data-caption={item.description}  src={`${process.env.REACT_APP_URL}${item.url}`}  alt=""/>
                                    ))
                                }
                                         </div> :

                                            <div className="photos__empty">
                                                 Вы можете загрузить свои фотографии!
                                            </div>
                    }
                </div>

            </div>
        </section>
    );
};

export default Photos;