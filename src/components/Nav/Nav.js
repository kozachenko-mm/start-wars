
import React from 'react';
import {NavLink} from 'react-router-dom'
import { ReactComponent as Logo } from '../../assets/icons/icons8-star-wars (1).svg';
import style from './Nav.module.css'

const Nav = () => {
    return (
        <nav className={style.nav} >
            <Logo  width="250" height="150" />
            <ul className={style.list}>
                <li className={style.item}><NavLink to='/' exact className={style.link} activeClassName={style.activeLink}>Home</NavLink></li>
                <li className={style.item}><NavLink to='/films' className={style.link} activeClassName={style.activeLink}>Films</NavLink></li>
                <li className={style.item}><NavLink to='/people' className={style.link} activeClassName={style.activeLink}>People</NavLink></li>
                <li className={style.item}><NavLink to='/planets' className={style.link} activeClassName={style.activeLink}>Planets</NavLink></li>
                <li className={style.item}><NavLink to='/species' className={style.link} activeClassName={style.activeLink}>Species</NavLink></li>
                <li className={style.item}><NavLink to='/starships' className={style.link} activeClassName={style.activeLink}>Starships</NavLink></li>
                <li className={style.item}><NavLink to='/vehicles' className={style.link} activeClassName={style.activeLink}>Vehicles</NavLink></li>
            </ul>            
        </nav>
    );
};

export default Nav;

