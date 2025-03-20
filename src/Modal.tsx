import { ReactNode, useEffect, useRef } from "react";

export default function Modal(props: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    backdropRef.current?.animate(
      [
        {
          opacity: "0",
        },
        {
          opacity: "1",
        },
      ],
      { duration: 200, fill: "forwards" },
    );
  }, [props.isOpen]);

  if (!props.isOpen) {
    return null;
  }

  return (
    <div
      className={`absolute top-0 left-0 h-full w-full bg-[#000000cc] z-100 flex justify-center items-center transition-all`}
      id="backdrop"
      ref={backdropRef}
    >
      <div
        className="bg-gray-800 text-gray-200  rounded-xl overflow-hidden"
        ref={modalRef}
      >
        <div className="p-8 text-2xl bg-gray-700 flex items-center justify-between">
          <strong>{props.title}</strong>
          <button
            className="aspect-square flex justify-center items-center cursor-pointer"
            onClick={props.onClose}
          >
            <i className="iconify mdi icon-[mdi--close]"></i>
          </button>
        </div>
        <hr className="border-gray-600" />
        <div className="p-10 text-lg">{props.children}</div>
      </div>
    </div>
  );
}
