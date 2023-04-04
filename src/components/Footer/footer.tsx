import React from "react";
import { ReactComponent as GithubLogo } from "../../assets/icons8-github.svg";
import { ReactComponent as Email } from "../../assets/email_white_48dp.svg";
import { Link } from "react-router-dom";
import css from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.infoContainer}>
        <p className={css.copyright}>
          &copy; 2023 tick-done by João Alvim P. <br />
          All rights reserved
        </p>
        <p className={css.copyright}>
          Illustration by: <br />
          <a href="http://www.freepik.com" target="_blank">
            Studiogstock / Freepik
          </a>
        </p>

        <div className={css.contactContainer}>
          <a
            href="https://github.com/Joal84/tick-done"
            target="_blank"
            className={css.contactLinks}
          >
            <p>GitHub</p> <GithubLogo className={css.logo} />
          </a>
          <a href="mailto:joalmonog@gmail.com" className={css.contactLinks}>
            <p>Contact Me</p> <Email className={css.logo} />
          </a>
        </div>
      </div>
    </footer>
  );
}
