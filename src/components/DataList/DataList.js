import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as Api from "../../services/api";

export default class DataList extends Component {
  state = {
    listValues: []
  };

  componentDidMount() {
    const { list } = this.props;
    list.map(item =>
      Api.getData(item)
        .then(({ data }) => {
          this.setState({ listValues: [...this.state.listValues, data] });
        })
        .catch(error => this.setState({ error }))
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
              pathname: `/${item.url.split("/").reverse()[2]}/${
                item.url.split("/").reverse()[1]
              }`
            }}
          >
            {item.name || item.title}&#8194;
          </Link>
        ))}
      </>
    );
  }
}
