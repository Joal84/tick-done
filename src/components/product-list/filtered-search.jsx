import css from "./filtered-search.module.css";

export default function Search({ onChangeHandler }) {
  return (
    <label className={css.label} htmlFor="search">
      Search
      <input
        id="search"
        className={css.searchField}
        type="search"
        placeholder="type a product"
        onChange={onChangeHandler}
      ></input>
    </label>
  );
}
