import css from "./preferences.module.css";
import { useContext, useState } from "react";
import { supabase } from "../../utils/supabase";
import { CurrencyContext } from "../data-fecthing/settings-contex";
import { userDataContext } from "../data-fecthing/userAuth";
import Button from "../button/button";
import Title from "../title/title";
import SelectComponent from "../select-component/select-component";
import Swal from "sweetalert2";

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
  const [currency, setCurrency] = useContext(CurrencyContext);
  const [selectorCurrency, setSelectorCurrency] = useState("");
  const [userAuth, setUser] = useContext(userDataContext);
  const user_id = userAuth.user.id;

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
      setCurrency(data[0].currency);
      Swal.fire({
        title: "Information Updated",
        icon: "success",
        confirmButtonColor: "#227250",
        iconColor: "#227250",
      });
    }
  };

  return (
    <div className={css.container}>
      <form className={css.form} onSubmit={handlePreferrences}>
        <Title type="secondTitle">Preferences</Title>

        <label className={css.label}>
          Currency
          <div style={{ width: "100%" }}>
            <SelectComponent
              value={currencyOptions.find((option) => {
                return option.value === (currency ? currency : "€");
              })}
              options={currencyOptions}
              selector={(e) => setSelectorCurrency(e.value)}
            />
          </div>
        </label>
        <div className={css.buttonsContainer}>
          <Button className="base" onSubmit={handlePreferrences}>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
