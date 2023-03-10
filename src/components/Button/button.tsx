import { Children } from "react";
import { ReactComponent as FbLogo } from "../../assets/facebook-f_Logo-White-Logo.wine.svg";
import { ReactComponent as GoogleLogo } from "../../assets/google_logo.svg";
import { ReactComponent as AddSVG } from "../../assets/plus-icon.svg";

import css from "./button.module.css";

export type ButtonProps = {
  buttonType: any;
  title: string;
  className: any;
  onClick: any;
};

export default function Button({
  children,
  onClick,
  className = "base",
}: ButtonProps) {
  return (
    <button className={css[className]} onClick={onClick}>
      {children}
      {className === "facebook" && <FbLogo className={css.fbLogo} />}
      {className === "google" && <GoogleLogo className={css.googleLogo} />}
      {className === "add" && <AddSVG className={css.addLogo} />}
    </button>
  );
}
