/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as Api from '../../services/api';
import Search from '../../components/Search/Search';
import BtnLoadMore from '../../components/BtnLoadMore/BtnLoadMore';
import style from './Species.module.css';

export default class Species extends Component {
  static propTypes = {
    location: PropTypes.objectOf(PropTypes.string).isRequired,
  };

  state = {
    species: [],
    error: null,
    isLoading: false,
    page: 1,
  };

  componentDidMount() {
    const { page } = this.state;

    this.setState({ isLoading: true });
    Api.getSpecies(page)
      .then(({ data }) => {
        this.setState({ species: data.results });
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  }

  componentWillUnmount() {
    const { page } = this.state;

    Api.getSpecies(page);
  }

  onSearch = query => {
    const path = this.props.location.pathname;
    this.setState({ isLoading: true });
    Api.getSearch(path, query)
      .then(({ data }) => {
        this.setState({ species: data.results });
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  onLoadMore = () => {
    const { page } = this.state;
    this.setState(prevState => ({ page: prevState.page + 1 }));
    Api.getPeople(page + 1)
      .then(({ data }) => {
        this.setState({ species: [...this.state.species, ...data.results] });
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    const { species, error, isLoading } = this.state;
    species.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
    return (
      <div>
        <Search onSearch={this.onSearch} placelolder="Search species... " />
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {isLoading && (
          <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
        )}
        <ul className={style.list}>
          {species.length > 0 &&
            species.map(item => (
              <li className={style.item} key={item.created}>
                <Link
                  to={{
                    pathname: `/species/${item.url.split('/').reverse()[1]}`,
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
