import buttonCss from "./button.module.css";
type props = {
  title: string;
  onClick: () => void;
};

export default function Button({ title, onClick }: props) {
  return (
    <button className={buttonCss.btn} onClick={onClick}>
      {title}
    </button>
  );
}
