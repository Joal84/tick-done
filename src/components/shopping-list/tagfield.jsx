import "./tagify.css";
import { useState, useEffect, useContext } from "react";
import { ProductListContext } from "../data-fecthing/productlist-context";
import { userDataContext } from "../data-fecthing/userAuth.jsx";
import Tags from "@yaireo/tagify/dist/react.tagify";

export default function TagField({ handleChange, tagifyRef }) {
  const [tagifySettings, setTagifySettings] = useState([]);
  const [tagifyProps, setTagifyProps] = useState({});
  const [userAuth, setUser] = useContext(userDataContext);
  const [productList] = useContext(ProductListContext);

  // Displaying user name
  let userName;
  userAuth
    ? (userName = userAuth.user?.user_metadata.name.split(" ")[0])
    : (userName = "User");

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
      whitelist: productList?.map((item) => item.name),

      loading: false,
    }));
  }, [productList, userAuth]);

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
