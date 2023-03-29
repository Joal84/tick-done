import Title from "../components/title";
import css from "./settings.module.css";
import AccountSettings from "../components/Settings/account-settings";
import Preferences from "../components/Settings/preferences";

export default function Settings({ nav, footer }: any) {
  return (
    <div style={{ overflow: "hidden" }}>
      <div>{nav}</div>
      <div className={css.dividerContainer}>
        <Title type="secondTitle">Settings</Title>
        <div className={css.divider}></div>
      </div>
      <div className={css.container}>
        <img
          src="src/assets/background-settings4.webp"
          alt="shopping illustration"
          className={css.backgroundImage}
        ></img>

        <div className={css.components}>
          <AccountSettings />
          <Preferences />
        </div>
      </div>
      {footer}
    </div>
  );
}