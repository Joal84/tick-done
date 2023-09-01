import css from "./login-page.module.css";
import { motion } from "framer-motion";
import { ReactComponent as LogoBox } from "../../assets/logo_box.svg";
import { ReactComponent as LogoLettering } from "../../assets/logo_lettering.svg";

export default function Login({ signIn, signUp, resetPass }) {
  return (
    <>
      <div className={css.background}>
        <div className={css.container}>
          <div className={css.branding}>
            <div className={css.logo}>
              <LogoBox className={css.logoBox} />
              <LogoLettering className={css.logoLettering} />
            </div>
            <span className={css.slogan}>add. buy. repeat.</span>
            <p className={css.description}>
              A grocery list application made simple.
            </p>
          </div>
          <motion.div
            initial={{ x: "-20%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 0.6, type: "spring" }}
            className={css.pannel}
          >
            {signIn || signUp || resetPass}
          </motion.div>
        </div>
      </div>
    </>
  );
}
