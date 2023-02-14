import { useContext, useState } from "react";
import { userDataContext } from "../utils/userAuth";
import css from "./manage-products.module.css";
import AddToProduct from "../components/add-to-product";
import DisplayProducts from "../components/display-products";
import Modal from "../components/modal";
import Button from "../components/button";

export default function ManageProducts() {
  const [addOverlayOpen, setAddOverlayOpen] = useState(false);
  const [editOverlayOpen, setEditOverlayOpen] = useState(false);
  const userAuth: any = useContext(userDataContext);

  return (
    <div className={css.background}>
      {Object.keys(userAuth).length === 0 ? (
        <p>Login to manage your products</p>
      ) : (
        <>
          <div className={css.addButton}>
            <Button
              title="Add Product"
              onClick={() => setAddOverlayOpen(true)}
            />
          </div>

          <DisplayProducts
            setAddOverlayOpen={setAddOverlayOpen}
            addOverlayOpen={addOverlayOpen}
            setEditOverlayOpen={setEditOverlayOpen}
            editOverlayOpen={editOverlayOpen}
          />
        </>
      )}
      {addOverlayOpen && (
        <>
          <Modal
            setAddOverlayOpen={setAddOverlayOpen}
            AddToProduct={
              <AddToProduct setAddOverlayOpen={setAddOverlayOpen} />
            }
          ></Modal>
        </>
      )}
    </div>
  );
}
