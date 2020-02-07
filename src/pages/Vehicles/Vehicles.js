import React, { Component } from "react";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import * as Api from "../../services/api";
import Search from "../../components/Search/Search";
import BtnLoadMore from "../../components/BtnLoadMore/BtnLoadMore";

export default class Vehicles extends Component {
  state = {
    vehicles: [],
    error: null,
    isLoading: false,
    page: 1

  };
  componentDidMount() {
    const { page } = this.state;
    this.setState({ isLoading: true });
    Api.getVehicles(page)
      .then(({ data }) => {
        this.setState({ vehicles: data.results });
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  }

  componentWillUnmount() {
    const { page } = this.state;

    Api.getVehicles(page);
  }

  onSearch = query => {
    const path = this.props.location.pathname;
    this.setState({ isLoading: true });
    Api.getSearch(path, query)
      .then(({ data }) => {
        this.setState({ vehicles: data.results });
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  onLoadMore = () => {
    const { page } = this.state;
    this.setState({ page: this.state.page + 1 });
    Api.getPeople(page + 1)
      .then(({ data }) => {
        this.setState({ vehicles: [...this.state.vehicles, ...data.results] });
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    const { vehicles, error, isLoading } = this.state;
    vehicles.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
    return (
      <div>
        <Search onSearch={this.onSearch} placelolder={"Search vehicles... "} />
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {isLoading && (
          <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
        )}
        <ul>
          {vehicles.length > 0 &&
            vehicles.map(item => (
              <li key={item.created}>
                <Link
                  to={{
                    pathname: `/vehicles/${item.url.split("/").reverse()[1]}`
                  }}
                >
                  {item.name}
                </Link>
              </li>
            ))}
        </ul>
        <BtnLoadMore onLoadMore={this.onLoadMore} />
      </div>
    );
  }
}
