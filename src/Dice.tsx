export interface DiceData {
	value: number,
	isLocked: boolean
}

function SmallDot() {
	return (
		<div className="bg-gray-200 size-1 rounded-full"></div>
	)
}

function Dot() {
	return (
		<div className="bg-gray-200 size-2.5 rounded-full"></div>
	)
}

export function SmallDice(props: { value: number }) {
	return <div
		className={`border-3 border-gray-200 size-8 rounded-lg flex justify-center items-center`}
	>
		< div className="grid grid-cols-3 grid-rows-3 p-1 gap-0.5">
			{props.value == 1 &&
				<>
					<div></div>
					<div></div>
					<div></div>

					<div></div>
					<SmallDot />
					<div></div>

					<div></div>
					<div></div>
					<div></div>
				</>
			}
			{props.value == 2 &&
				<>
					<div></div>
					<div></div>
					<SmallDot />

					<div></div>
					<div></div>
					<div></div>

					<SmallDot />
					<div></div>
					<div></div>
				</>
			}
			{props.value == 3 &&
				<>
					<div></div>
					<div></div>
					<SmallDot />

					<div></div>
					<SmallDot />
					<div></div>

					<SmallDot />
					<div></div>
					<div></div>
				</>
			}
			{props.value == 4 &&
				<>
					<SmallDot />
					<div></div>
					<SmallDot />

					<div></div>
					<div></div>
					<div></div>

					<SmallDot />
					<div></div>
					<SmallDot />
				</>
			}
			{props.value == 5 &&
				<>
					<SmallDot />
					<div></div>
					<SmallDot />

					<div></div>
					<SmallDot />
					<div></div>

					<SmallDot />
					<div></div>
					<SmallDot />
				</>
			}
			{props.value == 6 &&
				<>
					<SmallDot />
					<div></div>
					<SmallDot />

					<SmallDot />
					<div></div>
					<SmallDot />

					<SmallDot />
					<div></div>
					<SmallDot />
				</>
			}
		</div>
	</div >
}

export function FancyDice(props: DiceData) {
	return (
		<div
			className={`border-4 border-gray-200 size-16 rounded-xl flex justify-center items-center transition-all hover:scale-115 ${props.isLocked ? 'bg-red-900' : ''}`}
			title={`Value: ${props.value} ${props.isLocked ? "(locked)" : ""}`}
		>
			< div className="grid grid-cols-3 grid-rows-3 gap-1">
				{props.value == 1 &&
					<>
						<div></div>
						<div></div>
						<div></div>

						<div></div>
						<Dot />
						<div></div>

						<div></div>
						<div></div>
						<div></div>
					</>
				}
				{props.value == 2 &&
					<>
						<div></div>
						<div></div>
						<Dot />

						<div></div>
						<div></div>
						<div></div>

						<Dot />
						<div></div>
						<div></div>
					</>
				}
				{props.value == 3 &&
					<>
						<div></div>
						<div></div>
						<Dot />

						<div></div>
						<Dot />
						<div></div>

						<Dot />
						<div></div>
						<div></div>
					</>
				}
				{props.value == 4 &&
					<>
						<Dot />
						<div></div>
						<Dot />

						<div></div>
						<div></div>
						<div></div>

						<Dot />
						<div></div>
						<Dot />
					</>
				}
				{props.value == 5 &&
					<>
						<Dot />
						<div></div>
						<Dot />

						<div></div>
						<Dot />
						<div></div>

						<Dot />
						<div></div>
						<Dot />
					</>
				}
				{props.value == 6 &&
					<>
						<Dot />
						<div></div>
						<Dot />

						<Dot />
						<div></div>
						<Dot />

						<Dot />
						<div></div>
						<Dot />
					</>
				}
			</div>
		</div >
	)
}

FancyDice.defaultProps = {
	isLocked: false
}
