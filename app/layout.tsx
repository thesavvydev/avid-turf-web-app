import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Flowbite, ThemeModeScript } from "flowbite-react";
import { customTheme } from "./flowbite-theme";
import { twMerge } from "tailwind-merge";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Avid Turf",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={twMerge(GeistSans.className, "h-full")}
      suppressHydrationWarning
    >
      <head>
        <ThemeModeScript />
      </head>
      <body className="h-full bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-300">
        <Flowbite theme={{ theme: customTheme }}>{children}</Flowbite>
      </body>
    </html>
  );
}
