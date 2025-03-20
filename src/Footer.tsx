import { ReactNode } from "react";

function FooterLink(props: { href: string; children: ReactNode }) {
  return (
    <a
      className="flex justify-center items-center gap-1 hover:text-gray-300 transition-all cursor-pointer"
      href={props.href}
    >
      {props.children}
    </a>
  );
}

export default function Footer() {
  return (
    <div className="flex justify-center text-gray-500 pt-24 lg:pt-0">
      <div className="w-[min(64rem,80vw)] flex justify-between pb-8">
        <FooterLink href="https://github.com/Dou2ble/Yatzy">
          <span className="icon-[mdi--github]"></span>
          github
        </FooterLink>
        <FooterLink href="https://github.com/Dou2ble/Yatzy/tags">
          <span className="icon-[mdi--tag-outline]"></span>
          alpha
        </FooterLink>
      </div>
    </div>
  );
}
