import Link, { LinkProps } from "next/link";
import { PropsWithChildren } from "react";

type TLinkProps = PropsWithChildren & LinkProps;

export default function Linky({ children, ...linkProps }: TLinkProps) {
  return (
    <Link
      {...linkProps}
      className="text-primary-600 underline cursor-pointer dark:text-primary-400"
    >
      {children}
    </Link>
  );
}
