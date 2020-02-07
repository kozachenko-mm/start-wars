/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import * as Api from '../../services/api';
import { getIdFromProps } from '../../services/getIdFromProps';
import DataList from '../../components/DataList/DataList';

export default class SpeciesDetails extends Component {
  state = {
    details: {},
    error: null,
    isLoading: false,
    characters: [],
    films: [],
    homeworld: [],
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    const id = getIdFromProps(this.props);
    Api.getSpeciesDetails(id)
      .then(({ data }) => {
        this.setState({
          details: data,
          characters: data.people,
          films: data.films,
          homeworld: [...this.state.homeworld, data.homeworld],
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
      films,
      homeworld,
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
            <p>Classification: {details.classification}</p>
            <p>Designation: {details.designation}</p>
            <p>Average height: {details.average_height}</p>
            <p>Skin colors: {details.skin_colors}</p>
            <p>Hair colors: {details.hair_colors}</p>
            <p>Eye colors: {details.eye_colors}</p>
            <p>Average lifespan: {details.average_lifespan}</p>
            <p>Language: {details.language}</p>
            <p>
              Homeworld: <DataList list={homeworld} />
            </p>
            {films.length > 0 && (
              <p>
                Films: <DataList list={films} />
              </p>
            )}
            {characters.length > 0 && (
              <p>
                Characters: <DataList list={characters} />
              </p>
            )}
          </>
        )}
      </div>
    );
  }
}
