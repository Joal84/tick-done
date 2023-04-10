import React from "react";
import { ReactComponent as GithubLogo } from "../../assets/icons8-github.svg";
import css from "./footer.module.css";
import { ReactComponent as Email } from "../../assets/email_white_48dp.svg";
import { ReactComponent as Linkedin } from "../../assets/linkedin.svg";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.infoContainer}>
        <p className={css.copyright}>
          &copy; 2023 tick-done by João Alvim P. <br />
          All rights reserved
        </p>

        <div className={css.contactContainer}>
          <p className={css.illustrationInfo}>
            Illustration by: <br />
            <a
              href="http://www.freepik.com"
              target="_blank"
              className={css.link}
            >
              Studiogstock / Freepik
            </a>
          </p>
          <a href="https://github.com/Joal84/tick-done" target="_blank">
            <GithubLogo className={css.logo} />
          </a>
          <a href="mailto:joalmonog@gmail.com" className={css.contactLinks}>
            <Email className={css.logo} />
          </a>
          <a
            href="https://www.linkedin.com/in/jo%C3%A3o-pinheiro-50a169210/"
            target="_blank"
          >
            <Linkedin className={css.logo} />
          </a>
        </div>
      </div>
    </footer>
  );
}
