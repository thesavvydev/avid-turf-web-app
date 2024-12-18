import { PropsWithChildren } from "react";
import MarketingNavbar from "./marketing-navbar";
import MarketingFooter from "./marketing-footer";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <MarketingNavbar />
      {children}
      <MarketingFooter />
    </>
  );
}
