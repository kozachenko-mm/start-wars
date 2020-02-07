import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as Api from '../../services/api';
import Search from '../../components/Search/Search';

export default class Films extends Component {
  static propTypes = {
    location: PropTypes.objectOf(PropTypes.string).isRequired,
  };

  state = {
    movies: [],
    error: null,
    isLoading: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    Api.getFilms()
      .then(({ data }) => {
        this.setState({ movies: data.results });
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  }

  componentWillUnmount() {
    Api.getFilms();
  }

  onSearch = query => {
    const { location } = this.props;
    const path = location.pathname;
    this.setState({ isLoading: true });
    Api.getSearch(path, query)
      .then(({ data }) => {
        this.setState({ movies: data.results });
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    const { movies, error, isLoading } = this.state;
    movies.sort((a, b) => a.episode_id - b.episode_id);
    return (
      <div>
        <Search onSearch={this.onSearch} placelolder="Search movies... " />
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {isLoading && (
          <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
        )}
        <ul>
          {movies.length > 0 &&
            movies.map(item => (
              <li key={item.episode_id}>
                <Link
                  to={{
                    pathname: `/films/${item.url.split('/').reverse()[1]}`,
                  }}
                >
                  {item.title}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}
