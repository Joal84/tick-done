import { useState, useEffect, useContext } from "react";
import { ProductListContext } from "../components/Data-fecthing/productlist-context";
import Tags from "@yaireo/tagify/dist/react.tagify";
// import "@yaireo/tagify/dist/tagify.css";
import { userDataContext } from "../utils/userAuth.js";
import "../tagify.css";

export default function TagField({ handleChange, tagifyRef }: any) {
  const userAuth: any = useContext(userDataContext);
  const [tagifySettings, setTagifySettings] = useState([]);
  const [tagifyProps, setTagifyProps] = useState({});
  const [productList]: any = useContext(ProductListContext);

  const userName = userAuth?.user_metadata.name;

  // Tagify settings object
  const baseTagifySettings = {
    maxTags: 6,
    placeholder: `${userName ? userName : ""}, type a product`,
    dropdown: {
      enabled: 0,
    },
  };

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
