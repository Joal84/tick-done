import css from "./modal.module.css";
import { useEffect, useRef } from "react";
import Button from "../components/Button/button";
import { ReactComponent as Close } from "../assets/close_black_48dp.svg";

const Modal = function ({ children, onClose }: any) {
  const close: any = useRef(null);

  function onClickOutside(ref: any) {
    useEffect(() => {
      const listener = (event: any) => {
        const handler = () => {
          onClose(false);
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
        <div className={css.buttonContainer}>
          <Close className={css.closeButton} onClick={onClose}>
            Close
          </Close>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
export default Modal;
