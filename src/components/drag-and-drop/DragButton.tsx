import css from "./DragButton.module.css";
import { DragControls } from "framer-motion";

interface Props {
  dragControls: DragControls;
}

export default function DragButton({ dragControls }: Props) {
  function startDrag(event: any) {
    dragControls.start(event);
  }
  return (
    <svg
      className={css.drag}
      xmlns="http://www.w3.org/2000/svg"
      height="48px"
      viewBox="0 0 24 24"
      width="48px"
      fill="#000000"
      onPointerDown={startDrag}
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    </svg>
  );
}
