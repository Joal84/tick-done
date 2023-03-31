import { useContext, useState } from "react";
import Button from "../Button/button";
import Title from "../title";
import css from "./preferences.module.css";
import SelectComponent from "../select-component";
import { CurrencyContext } from "../Data-fecthing/settings-contex";
import { userDataContext } from "../../utils/userAuth";
import { supabase } from "../../utils/supabase";

const currencyOptions = [
  { value: "€", label: "EUR €" },
  { value: "$", label: "USD $" },
  { value: "£", label: "GBP £" },
  { value: "₺", label: "TRY ₺" },
  { value: "¥", label: "JPY ¥" },
  { value: "₹", label: "INR ₹" },
  { value: "R", label: "ZAR R" },
];

export default function Preferences() {
  const [currency, setCurrency]: any = useContext(CurrencyContext);
  const [selectorCurrency, setSelectorCurrency] = useState("");
  const userAuth: any = useContext(userDataContext);

  const user_id = userAuth.id;

  const handlePreferrences = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("user_settings")
      .upsert([{ currency: selectorCurrency, user_id }], {
        onConflict: "user_id",
      })
      .select();
    if (error) {
    }
    if (data) {
      setCurrency(data);
    }
  };

  return (
    <div className={css.container}>
      <form className={css.form}>
        <Title type="secondTitle">Preferences</Title>

        <label className={css.label}>
          Currency
          <div style={{ width: "100%" }}>
            <SelectComponent
              value={currencyOptions.find((option) => {
                return option.value === currency[0]?.currency;
              })}
              options={currencyOptions}
              selector={(e) => setSelectorCurrency(e.value)}
            />
          </div>
        </label>
        <div className={css.buttonsContainer}>
          <Button className="base" onClick={handlePreferrences}>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
