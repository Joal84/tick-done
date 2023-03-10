import css from "./category-filter.module.css";
import Select from "react-select";
import Background from "./Background/background";

const options = [
  { value: "all", label: "All" },
  { value: "None", label: "None" },
  { value: "Food-and-Pantry", label: "Food-and-Pantry" },
  { value: "Health-and-Beauty", label: "Health-and-Beauty" },
  { value: "Household", label: "Household" },
];

export default function CategoryFilter({ onChangeHandler }: any) {
  return (
    <div>
      <Select
        placeholder={<div>Filter Category</div>}
        options={options}
        className={css.box}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            border: `1px solid #cbcbcb`,
            height: "48px",
            borderRadius: "4px",
            backgroundColor: "#fff",
          }),
          dropdownIndicator: (baseStyles, state) => ({
            ...baseStyles,
            color: "#111",
          }),
          placeholder: (baseStyles, state) => ({
            ...baseStyles,
            color: "#111",
          }),
          indicatorSeparator: (baseStyles) => ({}),
          option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: state.isFocused ? "#227250" : "transparent",
            color: state.isFocused ? "#fff" : "#111",
          }),
        }}
        onChange={(e) => onChangeHandler(e.value)}
      ></Select>
    </div>
  );
}
