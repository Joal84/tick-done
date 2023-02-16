import React, { useState } from "react";
import css from "./filtered-search.module.css";

export default function Search({ onChangeHandler }: any) {
  return (
    <>
      <input
        className={css.searchField}
        type="search"
        placeholder="Search for Products"
        onChange={onChangeHandler}
      ></input>
    </>
  );
}
