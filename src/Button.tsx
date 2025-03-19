export default function Button(props: { label: string, disabled: boolean, autofocus: boolean, onClick: () => void }) {
	return <button className={`cursor-pointer bg-blue-400 text-gray-200 font-bold px-4 py-2 rounded-xl text-lg select-none focus:outline-none hover:bg-blue-500 transition-all focus:ring-4 focus:ring-blue-300 ${props.disabled ? "opacity-25" : "opacity-100"}`} onClick={props.onClick} disabled={props.disabled} autoFocus={props.autofocus}>
		{props.label}
	</button>
}

Button.defaultProps = {
	disabled: false,
	autofocus: false
}
