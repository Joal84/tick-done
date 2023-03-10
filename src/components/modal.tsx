import css from "./modal.module.css";
import { useEffect, useRef } from "react";
import Button from "../components/Button/button";

const Modal = function ({
  setEditOverlayOpen,
  EditProduct,
  AddToProduct,
  setAddOverlayOpen,
}: any) {
  const close: any = useRef(null);

  function onClickOutside(ref: any) {
    useEffect(() => {
      const listener = (event: any) => {
        const handler = () => {
          if (setAddOverlayOpen) {
            setAddOverlayOpen(false);
          }
          if (setEditOverlayOpen) {
            setEditOverlayOpen(false);
          }
        };
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        } else {
          handler();
        }
      };

      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    }, [ref]);
  }

  onClickOutside(close);

  return (
    <div className={css.overlay}>
      <div className={css.modal} ref={close}>
        {EditProduct || AddToProduct}
      </div>
      <div className={css.buttonContainer}>
        <Button
          title="Close"
          onClick={() => setAddOverlayOpen(false) || setEditOverlayOpen(false)}
        />
      </div>
    </div>
  );
};
export default Modal;
