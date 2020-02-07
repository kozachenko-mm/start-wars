import React, { Component } from "react";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import Search from "../../components/Search/Search";
import * as Api from "../../services/api";
import BtnLoadMore from "../../components/BtnLoadMore/BtnLoadMore";
import style from './Starships.module.css'


export default class Starships extends Component {
  state = {
    starships: [],
    error: null,
    isLoading: false,
    page: 1

  };

  componentDidMount() {
    const { page } = this.state;

    this.setState({ isLoading: true });
    Api.getStarships(page)
      .then(({ data }) => {
        this.setState({ starships: data.results });
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  }

  componentWillUnmount() {
    const { page } = this.state;

    Api.getStarships(page)
  }

  onSearch = query => {
    const path = this.props.location.pathname;
    this.setState({ isLoading: true });
    Api.getSearch(path, query)
      .then(({ data }) => {
        this.setState({ starships: data.results });
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  onLoadMore = () => {
    const { page } = this.state;
    this.setState({ page: this.state.page + 1 });
    Api.getPeople(page + 1)
      .then(({ data }) => {
        this.setState({ starships: [...this.state.starships, ...data.results] });
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    const { starships, error, isLoading } = this.state;
    starships.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
    return (
      <div>
        <Search onSearch={this.onSearch} placelolder={"Search starships... "} />
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {isLoading && (
          <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
        )}
        <ul className={style.list}>
          {starships.length > 0 &&
            starships.map(item => (
              <li className={style.item} key={item.created}>
                <Link
                  to={{
                    pathname: `/starships/${item.url.split("/").reverse()[1]}`
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
