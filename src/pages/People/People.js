/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as Api from '../../services/api';
import Search from '../../components/Search/Search';
import BtnLoadMore from '../../components/BtnLoadMore/BtnLoadMore';
import style from './People.module.css';

export default class People extends Component {
  static propTypes = {
    location: PropTypes.objectOf(PropTypes.string).isRequired,
  };

  state = {
    people: [],
    error: null,
    isLoading: false,
    page: 1,
  };

  componentDidMount() {
    const { page } = this.state;
    this.setState({ isLoading: true });
    Api.getPeople(page)
      .then(({ data }) => {
        this.setState({ people: data.results });
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  }

  componentWillUnmount() {
    const { page } = this.state;
    Api.getPeople(page);
  }

  onLoadMore = () => {
    const { page } = this.state;
    this.setState(prevState => ({ page: prevState.page + 1 }));
    Api.getPeople(page + 1)
      .then(({ data }) => {
        this.setState({ people: [...this.state.people, ...data.results] });
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  onSearch = query => {
    const path = this.props.location.pathname;
    this.setState({ isLoading: true });
    Api.getSearch(path, query)
      .then(({ data }) => {
        this.setState({ people: data.results });
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    const { people, error, isLoading } = this.state;
    people.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
    return (
      <div>
        <Search onSearch={this.onSearch} placelolder="Search characters... " />
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {isLoading && (
          <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
        )}
        <ul className={style.list}>
          {people.length > 0 &&
            people.map(item => (
              <li className={style.item} key={item.created}>
                <Link
                  to={{
                    pathname: `/people/${item.url.split('/').reverse()[1]}`,
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
