import { supabase } from "../utils/supabase";
import { useEffect, useState, useContext } from "react";
import { newAddedProduct } from "../components/add-to-shopplist";

import DisplayShopplist from "../components/display-shopplist";

export default function List() {
  return (
    <div>
      <DisplayShopplist />
    </div>
  );
}
9;
