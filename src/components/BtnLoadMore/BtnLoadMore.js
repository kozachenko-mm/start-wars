import React from "react";
import style from "./BtnLoadMore.module.css"


const BtnLoadMore = ({onLoadMore}) => (
    <button type="button" className={style.button} onClick={onLoadMore}>
      Load more
    </button>
  );
export default BtnLoadMore;
