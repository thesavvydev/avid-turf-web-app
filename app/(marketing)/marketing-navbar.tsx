"use client";

import { Button, Navbar } from "flowbite-react";

export default function MarketingNavbar() {
  return (
    <header>
      <Navbar fluid>
        <Navbar.Brand href="/">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            HOM
          </span>
        </Navbar.Brand>
        <div className="flex items-center gap-3 lg:order-2">
          <Button
            color="gray"
            href="/sign-in"
            className="border-0 hover:bg-gray-50 focus:outline-none focus:ring-gray-300 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            Log in
          </Button>
          <Button color="info" href="#">
            Get started
          </Button>
          <Navbar.Toggle theme={{ icon: "h-5 w-5 shrink-0" }} />
        </div>
        <Navbar.Collapse
          theme={{
            list: "mt-4 flex flex-col lg:mt-0 lg:flex-row lg:space-x-8 lg:text-base lg:font-medium",
          }}
          className="lg:order-1"
        >
          <Navbar.Link active href="#" className="rounded-lg">
            Home
          </Navbar.Link>
          <Navbar.Link href="#">Company</Navbar.Link>
          <Navbar.Link href="#">Features</Navbar.Link>
          <Navbar.Link href="#">Pricing</Navbar.Link>
          <Navbar.Link href="#">Contact</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}
