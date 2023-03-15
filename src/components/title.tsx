import css from "./title.module.css";

export default function Title({ children }: any) {
  return <h2 className={css.mainTitle}>{children}</h2>;
}
