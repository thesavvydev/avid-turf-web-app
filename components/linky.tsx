import Link, { LinkProps } from "next/link";
import { PropsWithChildren } from "react";

type TLinkProps = PropsWithChildren & LinkProps;

export default function Linky({ children, ...linkProps }: TLinkProps) {
  return (
    <Link
      {...linkProps}
      className="cursor-pointer text-primary-600 underline dark:text-primary-400"
    >
      {children}
    </Link>
  );
}
