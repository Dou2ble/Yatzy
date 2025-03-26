export default function Button(props: {
	className: string;
  children: React.ReactNode;
  disabled: boolean;
  autofocus: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={`flex justify-center items-center bg-primary text-gray-200 font-bold px-4 py-2 rounded-xl text-lg select-none focus:outline-none transition-all focus:ring-4 focus:ring-primary ${props.className} ${props.disabled ? "opacity-25" : "opacity-100 hover:brightness-80 cursor-pointer"}`}
      onClick={props.onClick}
      disabled={props.disabled}
      autoFocus={props.autofocus}
    >
      {props.children}
    </button>
  );
}

Button.defaultProps = {
	className: "",
  disabled: false,
  autofocus: false,
};
