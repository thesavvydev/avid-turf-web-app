import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <main className="h-screen md:grid md:place-items-center bg-zinc-900 p-4 sm:p-0">
      <section className="bg-zinc-50 max-w-sm w-full p-4 sm:p-8 space-y-6 shadow-lg rounded mx-auto">
        {children}
      </section>
    </main>
  );
}
