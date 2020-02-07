import React from 'react';
import { Link } from 'react-router-dom';
import style from './Home.module.css';

const Home = () => {
  return (
    <main className={style.main}>
      <h1 className={style.title}>Star Wars</h1>
      <p className={style.text}>
        All the Star Wars data you&apos;ve ever wanted:
        <Link to="/planets"> Planets</Link>, <Link to="/species">Species</Link>,{' '}
        <Link to="/vehicles">Vehicles</Link>, <Link to="/people">People</Link>,{' '}
        <Link to="/films">Films</Link> and{' '}
        <Link to="/starships">Starships. </Link>
        From all SEVEN Star Wars films Now with The Force Awakens data!
      </p>
    </main>
  );
};

export default Home;
