import React from 'react';
import {SlPencil} from "react-icons/sl";
import {useSelector} from "react-redux";
import {userSelector} from "../../redux/reselect";
import {useTranslation} from "react-i18next";
import {days, months, years} from "../../utils/birthday"

const EditMyProfile = () => {

    const {user} = useSelector(userSelector)

    const  {t, i18n} = useTranslation()

    return (
        <section className='editMyProfile'>
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
                            <img src={`${process.env.REACT_APP_URL}${user.image}`} alt="" className="profile__info-image"/>
                        </div>
                        <div className="profile__info-user">
                            <h3 className="profile__info-name">
                                Ivan Ivanov
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="editMyProfile__content">

                    <div className="editMyProfile__card">
                        <label htmlFor='info' className="editMyProfile__label">
                            Краткая информация
                        </label>
                        <textarea id='info' className="editMyProfile__field"/>
                    </div>

                    <div className="editMyProfile__card">
                        <label htmlFor='family' className="editMyProfile__label">
                            Семейное положение
                        </label>

                        <select name="" id="" className="editMyProfile__field">
                            <option value="">Не выбрано</option>
                            <option value="single">Не женат</option>
                            <option value="married">Женат</option>
                            <option value="in love">Влюблен</option>
                        </select>
                    </div>

                    <div className="editMyProfile__card">
                        <label htmlFor='family' className="editMyProfile__label">
                            День рождение
                        </label>

                        <select name="" id="" className="editMyProfile__field">
                            {
                                days.map((item) => (
                                    <option key={item} value={item}>{item}</option>
                                ))
                            }
                        </select>
                        <select name="" id="" className="editMyProfile__field">
                            {
                                months.map((item) => (
                                    <option key={item.en} value={item.en}>{i18n.language === 'ru' ? item.ru : item.en}</option>
                                ))
                            }
                        </select>
                        <select name="" id="" className="editMyProfile__field">
                            {
                                years(2007).map((item) => (
                                    <option key={item} value={item}>{item}</option>
                                ))
                            }
                        </select>

                    </div>


                </div>
            </div>
        </section>
    );
};

export default EditMyProfile;