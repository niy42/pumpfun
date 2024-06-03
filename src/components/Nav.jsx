import React, { useState } from 'react';
import react from '../assets/react.svg';
import { useNavigate } from 'react-router-dom';


const Nav = () => {
    const navigate = useNavigate();

    const navbarLink = [
        { name: 'Markets', url: 'markets' },
        { name: 'Profile', url: 'profile' }
    ]

    const handleNavLink = (url) => (e) => {
        e.preventDefault();
        navigate(url);
    }
    return (
        <>
            <header className='flex justify-between items-center p-4 bg-gradient-to-r from-gray-800 via-gray-900 to-[#cf2347] shadow-lg'>
                <img src={react} alt='react' />

                <nav className='flex space-x-4'>
                    {navbarLink.map(({ name, url }, index) => (
                        <a key={index} href={url} onClick={handleNavLink(url)}>{name}</a>
                    ))}

                </nav>
            </header>
        </>
    )
}

export default Nav;
