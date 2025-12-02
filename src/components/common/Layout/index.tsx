import type { ReactNode } from "react";
import Footer from "~/components/ui/Footer";
import Header from "~/components/ui/Header";
import { cn } from "~/utils/cn";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className={cn("flex flex-col min-h-screen")}>
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
