
import React from 'react';
import {NavLink} from 'react-router-dom'

const Nav = () => {
    return (
        <nav>
            <ul>
                <li><NavLink to='/'>Home</NavLink></li>
                <li><NavLink to='/films'>Films</NavLink></li>
                <li><NavLink to='/people'>People</NavLink></li>
                <li><NavLink to='/planets'>Planets</NavLink></li>
                <li><NavLink to='/species'>Species</NavLink></li>
                <li><NavLink to='/starships'>Starships</NavLink></li>
                <li><NavLink to='/vehicles'>Vehicles</NavLink></li>
            </ul>            
        </nav>
    );
};

export default Nav;

