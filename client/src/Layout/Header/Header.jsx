import React from 'react';
import {IoMdNotifications} from 'react-icons/io'
import HeaderSearch from "./HeaderSearch";
import noUser from '../../assets/noUser.png'
import {BiChevronsDown} from 'react-icons/bi'
import SwitchLang from "./SwitchLang/SwitchLang";
import {Link} from "react-router-dom";
import {AiFillSetting} from 'react-icons/ai'
import {MdOutlineLanguage} from 'react-icons/md'
import {BsPaletteFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import {
    Avatar,
    Popover,
    PopoverTrigger,
    Button,
    PopoverContent,
    PopoverArrow,
    PopoverHeader,
    PopoverCloseButton,
    PopoverBody,
    Icon
} from "@chakra-ui/react";
import {useDispatch, useSelector} from "react-redux";
import {logOutUser} from "../../redux/reducers/user";

const Header = () => {


    const {user} = useSelector(store=> store.persistedReducer.user)
    const dispatch = useDispatch()


    return (
        <header className='header'>
            <div className="container">
                <nav className='header__nav'>
                    <div className='header__left'>
                        <Link to={'/'}>
                            <h1 className='header__title'>IT-RUN web</h1>
                        </Link>

                        <HeaderSearch/>
                    </div>
                    <div className='header__right'>
                        <Link to='/notifications' className='header__notif'>
                            <IoMdNotifications/>
                        </Link>
                        <Link to='/requests' className='header__notif'>
                            <IoMdNotifications/>
                        </Link>


                        <Popover  placement='top-end'  isLazy>
                            <PopoverTrigger>
                                <Button  className='header__user'>
                                    <Avatar   name={`${user.name} ${user.surname}`} src={`${process.env.REACT_APP_URL}${user.image}`}/>
                                    <span className='header__user-icon'>
                                <BiChevronsDown/>
                                    </span>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent  bg='black'>
                                <PopoverCloseButton  />
                                <PopoverArrow   bg='black'/>
                                <div className='header__popover'>
                                    <div className='header__popover-top'>
                                        <Avatar className='header__popover-img'  name={`${user.name} ${user.surname}`} src={`${process.env.REACT_APP_URL}${user.image}`}/>
                                        <div>
                                            <h3 className='header__popover-title'>{user.name} {user.surname}</h3>
                                            <p className='header__popover-num'>{user.phone}</p>
                                        </div>
                                    </div>
                                    <ul className='header__popover-list'>
                                        <li className='header__popover-item'>
                                            <Icon  as={AiFillSetting}/>
                                            <span className='header__popover-text'>Настройки</span>
                                        </li>
                                        <li className='header__popover-item'>
                                            <Icon  as={BsPaletteFill}/>
                                            <span className='header__popover-text'>Тема</span>
                                        </li>
                                        <li className='header__popover-item'>
                                            <Icon as={MdOutlineLanguage}/>
                                            <SwitchLang/>
                                        </li>
                                        <li className='header__popover-item' onClick={() => dispatch(logOutUser()) }>
                                            <Icon  as={FiLogOut}/>
                                            <span className='header__popover-text'>Выйти</span>
                                        </li>
                                    </ul>

                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;