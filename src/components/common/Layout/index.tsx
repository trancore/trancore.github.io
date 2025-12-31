import Footer from "~/components/ui/Footer";
import Header from "~/components/ui/Header";
import Menu from "~/components/ui/Menu";
import { useDisplayed } from "~/hooks/useDisplayed/index.ts";
import { cn } from "~/utils/cn";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  const { displayed: displayedMenu, toggleDisplayed } = useDisplayed();
  const hamburgerMenu = { onClick: toggleDisplayed };
  const close = { onClick: toggleDisplayed };

  return (
    <div className={cn("flex min-h-screen flex-col")}>
      <div
        className={cn(
          "shrink-0",
          "text-black dark:text-white",
          "bg-white dark:bg-black",
        )}
      >
        <Header hamburgerMenu={hamburgerMenu} />
      </div>
      <main
        className={cn(
          "flex-1",
          "text-black dark:text-white",
          "bg-white dark:bg-black",
        )}
      >
        {children}
      </main>
      <div className={cn("shrink-0")}>
        <Footer />
      </div>
      {displayedMenu && <Menu close={close} />}
    </div>
  );
}
