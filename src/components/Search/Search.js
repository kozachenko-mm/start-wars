import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Search.module.css';

export default class Search extends Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    placelolder: PropTypes.string.isRequired,
  };

  state = {
    inputValue: '',
  };

  handleChange = ({ target }) => {
    this.props.onSearch(target.value);
    this.setState({ inputValue: target.value });
  };

  render() {
    const { inputValue } = this.state;
    const { placelolder } = this.props;
    return (
      <input
        className={styles.input}
        type="text"
        value={inputValue}
        placeholder={placelolder}
        onChange={this.handleChange}
      />
    );
  }
}
