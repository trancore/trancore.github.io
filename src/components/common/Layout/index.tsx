import Footer from "~/components/ui/Footer";
import Header from "~/components/ui/Header";
import { cn } from "~/utils/cn";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className={cn("flex min-h-screen flex-col")}>
      <div className={cn("shrink-0")}>
        <Header />
      </div>
      <main className={cn("flex-1")}>{children}</main>
      <div className={cn("shrink-0")}>
        <Footer />
      </div>
    </div>
  );
}
