import css from "./modal.module.css";
import { useEffect, useRef } from "react";
import { ReactComponent as Close } from "../../assets/close_black_48dp.svg";

const Modal = function ({ children, onClose }) {
  const close = useRef(null);

  function onClickOutside(ref) {
    useEffect(() => {
      const listener = (event) => {
        const handler = () => {
          onClose(false);
        };
        // Checking the type of the event and cast it to the appropriate type
        if ("touches" in event) {
          const touchEvent = event;
          if (!ref.current || ref.current.contains(touchEvent.target)) {
            return;
          } else {
            handler();
          }
        } else {
          const mouseEvent = event;
          if (!ref.current || ref.current.contains(mouseEvent.target)) {
            return;
          } else {
            handler();
          }
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
