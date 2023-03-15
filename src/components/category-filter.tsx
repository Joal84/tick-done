import css from "./category-filter.module.css";
import Select from "react-select";

export default function CategoryFilter({
  value,
  selector,
  placeholder,
  options,
}: any) {
  return (
    <div>
      <Select
        value={value}
        placeholder={<div>{placeholder}</div>}
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
        onChange={selector}
      ></Select>
    </div>
  );
}
