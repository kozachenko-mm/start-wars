import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import * as Api from '../../services/api';
import { getIdFromProps } from '../../services/getIdFromProps';
import DataList from '../../components/DataList/DataList';

export default class FilmsDetails extends Component {
  state = {
    details: {},
    error: null,
    isLoading: false,
    characters: [],
    planets: [],
    species: [],
    starships: [],
    vehicles: [],
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    const id = getIdFromProps(this.props);
    Api.getFilmsDetails(id)
      .then(({ data }) => {
        this.setState({
          details: data,
          characters: data.characters,
          planets: data.planets,
          species: data.species,
          starships: data.starships,
          vehicles: data.vehicles,
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
      characters,
      planets,
      species,
      starships,
      vehicles,
    } = this.state;
    const date = new Date(details.release_date);
    return (
      <div>
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {isLoading && (
          <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
        )}
        {Object.keys(details).length > 0 && (
          <>
            <h2>{details.title}</h2>
            <p>Episode {details.episode_id}</p>
            <p>{details.opening_crawl}</p>
            <p>Year: {date.getFullYear()}</p>
            <p>Director: {details.director}</p>
            <p>Producer: {details.producer}</p>
            <p>
              Characters: <DataList list={characters} />
            </p>
            <p>
              Planets: <DataList list={planets} />
            </p>
            <p>
              Species: <DataList list={species} />
            </p>
            <p>
              Starships: <DataList list={starships} />
            </p>
            <p>
              Vehicles: <DataList list={vehicles} />
            </p>
          </>
        )}
      </div>
    );
  }
}
