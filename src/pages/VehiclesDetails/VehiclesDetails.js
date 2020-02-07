import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import * as Api from '../../services/api';
import { getIdFromProps } from '../../services/getIdFromProps';
import DataList from '../../components/DataList/DataList';

export default class VehiclesDetails extends Component {
  state = {
    details: {},
    error: null,
    isLoading: false,
    characters: [],
    films: [],
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    const id = getIdFromProps(this.props);
    Api.getVehiclesDetails(id)
      .then(({ data }) => {
        this.setState({
          details: data,
          characters: data.pilots,
          films: data.films,
        });
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const { isLoading, error, details, characters, films } = this.state;
    return (
      <div>
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {isLoading && (
          <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
        )}
        {Object.keys(details).length > 0 && (
          <>
            <h3>{details.name}</h3>
            <p>Model: {details.model}</p>
            <p>Manufacturer:{details.manufacturer}</p>
            <p>Cost in credits: {details.cost_in_credits}</p>
            <p>length: {details.length}</p>
            <p>Max atmosphering speed: {details.max_atmosphering_speed}</p>
            <p>Crew: {details.crew}</p>
            <p>Cargo capacity:{details.cargo_capacity}</p>
            <p>Consumables: {details.consumables}</p>
            <p>Vehicle class: {details.vehicle_class}</p>
            <p>Passengers: {details.passengers}</p>
            {films.length > 0 && (
              <p>
                Films: <DataList list={films} />
              </p>
            )}
            {characters.length > 0 && (
              <p>
                Pilots: <DataList list={characters} />
              </p>
            )}
          </>
        )}
      </div>
    );
  }
}
