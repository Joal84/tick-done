import "./tagify.css";
import { useState, useEffect, useContext } from "react";
import { ProductListContext } from "../data-fecthing/productlist-context";
import { userDataContext } from "../data-fecthing/userAuth.jsx";
import Tags from "@yaireo/tagify/dist/react.tagify";

export default function TagField({ handleChange, tagifyRef }) {
  const [userAuth, setUser] = useContext(userDataContext);
  const [tagifySettings, setTagifySettings] = useState([]);
  const [tagifyProps, setTagifyProps] = useState({});
  const [productList] = useContext(ProductListContext);

  const userName = userAuth?.user_metadata.name;

  // Tagify settings object
  const baseTagifySettings = {
    maxTags: 6,
    placeholder: `${userName ? userName : ""}, type a product`,
    autoComplete: true,
    rightKey: true,
    dropdown: {
      enabled: 0,
    },
  };

  const settings = {
    ...baseTagifySettings,
    ...tagifySettings,
  };

  useEffect(() => {
    setTagifyProps((lastProps) => ({
      ...lastProps,
      whitelist: productList.map((item) => item.name),

      loading: false,
    }));
  }, [productList, userName]);

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
