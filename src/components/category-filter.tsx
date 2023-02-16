import css from "./category-filter.module.css";

export default function CategoryFilter({ onChangeHandler }: any) {
  return (
    <>
      <label htmlFor="category-search" className={css.title}>
        Category
      </label>
      <select
        id="category-search"
        className={css.dropdown}
        name="category-search"
        onChange={(e) => onChangeHandler(e.target.value)}
      >
        <option value="all">All</option>
        <option value="None">None</option>
        <option value="Food-and-Pantry">Food and Pantry</option>
        <option value="Health-and-Beauty">Health and Beauty</option>
        <option value="Household">Household</option>
      </select>
    </>
  );
}
