import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <main className="h-screen bg-zinc-900 p-4 sm:p-0 md:grid md:place-items-center">
      <section className="mx-auto w-full max-w-sm space-y-6 rounded bg-zinc-50 p-4 shadow-lg sm:p-8">
        {children}
      </section>
    </main>
  );
}
