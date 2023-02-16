import { useState, useEffect, useContext, useMemo, useRef } from "react";
import { ProductListContext } from "../App.js";
import Tags from "@yaireo/tagify/dist/react.tagify";

import "../tagify.css";

// Tagify settings object
const baseTagifySettings = {
  maxTags: 6,
  placeholder: "type a product",
  dropdown: {
    enabled: 0,
  },
};

export default function TagField({ handleChange, tagifyRef }: any) {
  const [tagifySettings, setTagifySettings] = useState([]);
  const [tagifyProps, setTagifyProps] = useState({});
  const [productList]: any = useContext(ProductListContext);

  const settings: any = {
    ...baseTagifySettings,
    ...tagifySettings,
  };

  useEffect(() => {
    setTagifyProps({ loading: true });
    setTagifyProps((lastProps) => ({
      ...lastProps,
      whitelist: productList.map((item: any) => item.name),

      loading: false,
    }));
  }, []);

  return (
    <>
      <Tags
        tagifyRef={tagifyRef}
        settings={settings}
        defaultValue=""
        autoFocus={true}
        {...tagifyProps}
        onChange={handleChange}
      />
    </>
  );
}
