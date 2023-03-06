import css from "./title.module.css";

export default function Title({ title }: any) {
  return <h2 className={css.mainTitle}>{title}</h2>;
}
