import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main>
      <h1>Star Wars</h1>
      <p>
        All the Star Wars data you've ever wanted:
        <Link to="/planets"> Planets</Link>,{" "}
        <Link to="/species">Species</Link>,{" "}
        <Link to="/vehicles">Vehicles</Link>,{" "}
        <Link to="/people">People</Link>,{" "}
        <Link to="/films">Films</Link> and{" "}
        <Link to="/starships">Starships. </Link> 
         From all SEVEN Star Wars films Now with The Force Awakens data!
      </p>
    </main>
  );
};

export default Home;
