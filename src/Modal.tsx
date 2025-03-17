import { ReactNode } from "react"

export default function Modal(props: { children: ReactNode }) {
	return <div className="absolute top-0 left-0 h-full w-full bg-[#00000050] backdrop-blur-sm z-10">
		{props.children}
	</div>
}
