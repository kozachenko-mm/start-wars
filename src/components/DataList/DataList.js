/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as Api from '../../services/api';

export default class DataList extends Component {
  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  state = {
    listValues: [],
  };

  componentDidMount() {
    const { list } = this.props;
    list.map(item =>
      Api.getData(item)
        .then(({ data }) => {
          this.setState({ listValues: [...this.state.listValues, data] });
        })
        // eslint-disable-next-line react/no-unused-state
        .catch(error => this.setState({ error })),
    );
  }

  render() {
    const { listValues } = this.state;
    return (
      <>
        {listValues.map(item => (
          <Link
            key={item.created}
            to={{
              pathname: `/${item.url.split('/').reverse()[2]}/${
                item.url.split('/').reverse()[1]
              }`,
            }}
          >
            {item.name || item.title}&#8194;
          </Link>
        ))}
      </>
    );
  }
}
