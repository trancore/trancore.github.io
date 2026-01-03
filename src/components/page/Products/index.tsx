import MenuSide from "~/components/ui/MenuSide";
import Splash from "~/components/ui/Splash";
import { cn } from "~/utils/cn";

export default function Products() {
  const menuItems = [
    {
      title: "GitHub",
    },
    {
      title: "music player",
    },
    {
      title: "LP",
      items: ["test1", "test2", "test3", "test4", "test5"],
    },
  ];

  return (
    <>
      <Splash
        title="Products"
        descriptions={[
          "Showcasing my self-developed applications.",
          "自分で開発したアプリケーションやミュージックプレイヤー、練習用LPページ掲載しています。",
        ]}
        backgroundColor="bg-green-600"
      />
      <div className={cn("max-w-7xl gap-6 p-6", "m-auto flex")}>
        <main className={cn("flex-1")}>
          {/* GitHub */}
          <div></div>

          {/* musicplayer */}
          <div></div>

          {/* LP */}
          <div></div>
        </main>
        <div className={cn("w-64")}>
          <MenuSide menuItems={menuItems} />
        </div>
      </div>
    </>
  );
}
