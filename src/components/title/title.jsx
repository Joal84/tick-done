import css from "./title.module.css";

export default function Title({ children, type = "mainTitle" }) {
  return type === "mainTitle" ? (
    <h1 className={css.mainTitle}>{children}</h1>
  ) : (
    <h2 className={css[type]}>{children}</h2>
  );
}
