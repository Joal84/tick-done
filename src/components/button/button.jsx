import css from "./button.module.css";
import { ReactNode, MouseEventHandler, FormEventHandler } from "react";
import { ReactComponent as FbLogo } from "../../assets/facebook-f_Logo-White-Logo.wine.svg";
import { ReactComponent as GoogleLogo } from "../../assets/google_logo.svg";
import { ReactComponent as AddSVG } from "../../assets/plus-icon.svg";

export default function Button({
  children,
  onClick,
  onSubmit,
  className = "base",
}) {
  return (
    <button
      className={css[className]}
      onClick={onClick}
      onSubmit={onSubmit}
      type={onSubmit ? "submit" : "button"} // If onSubmit is provided, treat as submit button
    >
      {children}
      {className === "facebook" && <FbLogo className={css.fbLogo} />}
      {className === "google" && <GoogleLogo className={css.googleLogo} />}
      {className === "add" && <AddSVG className={css.addLogo} />}
    </button>
  );
}
