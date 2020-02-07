import React from 'react';
import PropTypes from 'prop-types';
import style from './BtnLoadMore.module.css';

const BtnLoadMore = ({ onLoadMore }) => (
  <button type="button" className={style.button} onClick={onLoadMore}>
    Load more
  </button>
);
BtnLoadMore.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
export default BtnLoadMore;
