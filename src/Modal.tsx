import { ReactNode } from "react"

export default function Modal(props: { children: ReactNode }) {
	return <div className="absolute top-0 left-0 h-full w-full bg-[#00000050] backdrop-blur-sm z-10 flex justify-center items-center">
		<div className="bg-gray-800 text-gray-200 p-4 rounded-xl">
			{props.children}
		</div>
	</div>
}
