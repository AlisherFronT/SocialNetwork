import React from 'react';
import {SlPencil} from "react-icons/sl"

const MyProfile = () => {
    return (
        <section className="profile">
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
                    <button className="profile__info-change">
                        Change profile
                    </button>
                </div>
            </div>
        </section>
    );
};

export default MyProfile;