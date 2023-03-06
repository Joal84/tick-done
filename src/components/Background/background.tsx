import css from "./background.module.css";

export default function Background({ children }: any) {
  return <div className={css.background}>{children}</div>;
}
