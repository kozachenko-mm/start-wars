import React, { Component } from "react";
import Loader from "react-loader-spinner";
import * as Api from "../../services/api";
import { getIdFromProps } from "../../services/getIdFromProps";
import DataList from "../../components/DataList/DataList";

export default class PeopleDetails extends Component {
  state = {
    details: {},
    error: null,
    isLoading: false,
    films: [],
    species: [],
    starships: [],
    vehicles: [],
    homeworld:[]
  };
  componentDidMount() {
    this.setState({ isLoading: true });
    const id = getIdFromProps(this.props);
    Api.getPeopleDetails(id)
      .then(({ data }) => {
        this.setState({
          details: data,
          films: data.films,
          species: data.species,
          starships: data.starships,
          vehicles: data.vehicles,
          homeworld: [...this.state.homeworld, data.homeworld]
        });
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  }
  render() {
    const {
      isLoading,
      error,
      details,
      films,
      species,
      starships,
      vehicles,
      homeworld
    } = this.state;
    return (
      <div>
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {isLoading && (
          <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
        )}
        {Object.keys(details).length > 0 && (
          <>
            <h3>{details.name}</h3>
            <p>Height: {details.height}</p>
            <p>Mass: {details.mass}</p>
            <p>Hair color: {details.hair_color}</p>
            <p>Skin color: {details.skin_color}</p>
            <p>Eye color: {details.eye_color}</p>
            <p>Birth year: {details.birth_year}</p>
            <p>Gender: {details.gender}</p>
            <p>Homeworld: <DataList list={homeworld} /></p>
            {films.length > 0 && (
              <p>
                Films: <DataList list={films} />
              </p>
            )}
            {species.length > 0 && (
              <p>
                Species: <DataList list={species} />
              </p>
            )}
            {starships.length > 0 && (
              <p>
                Starships: <DataList list={starships} />
              </p>
            )}
            {vehicles.length > 0 && (
              <p>
                Vehicles: <DataList list={vehicles} />
              </p>
            )}
          </>
        )}
      </div>
    );
  }
}
