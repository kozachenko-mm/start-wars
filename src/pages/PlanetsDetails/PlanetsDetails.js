import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import * as Api from '../../services/api';
import { getIdFromProps } from '../../services/getIdFromProps';
import DataList from '../../components/DataList/DataList';

export default class PlanetsDetails extends Component {
  state = {
    details: {},
    error: null,
    isLoading: false,
    films: [],
    residents: [],
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    const id = getIdFromProps(this.props);
    Api.getPlanetsDetails(id)
      .then(({ data }) => {
        this.setState({
          details: data,
          films: data.films,
          residents: data.residents,
        });
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const { isLoading, error, details, films, residents } = this.state;
    return (
      <div>
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {isLoading && (
          <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
        )}
        {Object.keys(details).length > 0 && (
          <>
            <h3>{details.name}</h3>
            <p>Rotation period: {details.rotation_period}</p>
            <p>Orbital period: {details.orbital_period}</p>
            <p>Diameter: {details.diameter}</p>
            <p>Climate: {details.climate}</p>
            <p>Gravity: {details.gravity}</p>
            <p>Terrain: {details.terrain}</p>
            <p>Surface water: {details.surface_water}</p>
            <p>Population: {details.population}</p>
            {films.length > 0 && (
              <p>
                Films: <DataList list={films} />
              </p>
            )}
            {residents.length > 0 && (
              <p>
                Residents: <DataList list={residents} />
              </p>
            )}
          </>
        )}
      </div>
    );
  }
}
