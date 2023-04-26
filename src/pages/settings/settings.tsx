import css from "./settings.module.css";
import Title from "../../components/title/title";
import AccountSettings from "../../components/settings/account-settings";
import Preferences from "../../components/settings/preferences";
import shoppingImage from "../../assets/background-settings4.webp";

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
          src={shoppingImage}
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
