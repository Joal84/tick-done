import css from "./select-component.module.css";
import Select from "react-select";

export default function SelectComponent({
  value,
  selector,
  placeholder,
  options,
  width,
}) {
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
            border: state.isFocused ? "2px solid #469675" : "1px solid #b5b5b5",
            boxShadow: state.isFocused ? "0px 0px 2px #469675" : "none",
            "&:hover": {
              border: "1px solid #b5b5b5",
              boxShadow: "2px solid #469675",
            },
            width: width,
            height: "48px",
            borderRadius: "5px",
            backgroundColor: "#fff",
            focus: "#111",
          }),
          dropdownIndicator: (baseStyles, state) => ({
            ...baseStyles,
            color: "#111",
          }),
          placeholder: (baseStyles, state) => ({
            ...baseStyles,
            color: "#757575",
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
