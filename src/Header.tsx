import diceGrid from "./diceGrid";

function Logo() {
	return (
		<div
      className={`border-5 size-20 rounded-xl flex justify-center items-center transition-all border-primary`}
    >
      <div className="grid grid-cols-3 grid-rows-3 gap-1.25">
        {diceGrid(5).map((row, i) =>
          row.map((dot, j) => (
            <div
							className={`size-[0.78125rem] transition-all ${dot ? "rounded-full bg-primary" : ""}`}
              key={`${i}-${j}`}
            >
            </div>
          )),
        )}
      </div>
    </div>
	);
}

export default function Header(props: { barWidth: string }) {
	return (
		<header className="pt-8 pb-4 lg:pt-20 lg:pb-0">
			<div className="flex justify-center items-center gap-4 text-gray-100 text-8xl font-bold">
				{/* <img src={logo} alt="logo" className="h-[1em] p-2" /> Yatzy */}
				<Logo /> Yatzy
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
