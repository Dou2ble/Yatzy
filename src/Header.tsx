import logo from "./assets/logo.png"

export default function Header(props: { barWidth: string }) {
	return (
		<header className="pt-8 pb-4 lg:pt-20 lg:pb-0">
			<div className="flex justify-center items-center gap-4 text-gray-100 text-8xl font-bold">
				<img src={logo} alt="logo" className="h-[1em] p-2" /> Yatzy
			</div>
			<div className="pt-4">
				<div className="h-[2px] bg-gray-900 w-full">
					<div
						className="bg-primary h-full transition-all"
						style={{
							width: props.barWidth,
						}}
					></div>
				</div>
			</div>
		</header>
	);
}
