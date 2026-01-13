import CardRepository from "~/components/ui/CardRepository";
import MenuSide from "~/components/ui/MenuSide";
import Splash from "~/components/ui/Splash";
import { RepositoryOwnerDocument } from "~/graphql/github/query-generated/graphql";
import { useFetchGitHub } from "~/hooks/useFetchGitHub";
import { cn } from "~/utils/cn";
import { useMemo, useState } from "react";

const MENU_ITEMS = [
  {
    id: "github",
    title: "GitHub",
  },
  {
    id: "musicplayer",
    title: "music player",
  },
  {
    id: "lp",
    title: "LP",
    items: ["test1", "test2", "test3", "test4", "test5"],
  },
] as const satisfies { id: string; title: string; items?: string[] }[];

type MenuItemsId = (typeof MENU_ITEMS)[number]["id"];

export default function Products() {
  const { data, error, isLoading } = useFetchGitHub(RepositoryOwnerDocument);
  const [selected, setSelected] = useState<MenuItemsId>(MENU_ITEMS[0].id);

  const repositories = useMemo(() => {
    return data?.repositoryOwner?.repositories.edges
      ?.filter((edge) => {
        return edge?.node?.owner.login === "trancore";
      })
      .map((edge) => {
        return {
          readme:
            // (edge?.node?.object?.__typename === "Blob" &&
            //   edge?.node?.object?.text) ||
            // "null",
            // @ts-expect-error: 実際に取得できる型が__typename=Blobに限らないため、型チェックを外す
            edge?.node?.object?.text || "",
          name: edge?.node?.name || "",
          description: edge?.node?.description || "",
          url: edge?.node?.url || "",
          code: {
            color: edge?.node?.primaryLanguage?.color || "",
            language: edge?.node?.primaryLanguage?.name || "",
          },
        };
      });
  }, [data]);

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
        <main
          className={cn(
            "w-full flex-1 gap-8",
            isLoading && "flex justify-center",
            !isLoading && "md:grid md:grid-cols-2",
          )}
        >
          {/* GitHub */}
          {selected === "github" && isLoading && !error && (
            <div
              className={cn("loading-spinner", "mt-10 size-10", "border-5")}
            />
          )}

          {selected === "github" &&
            !isLoading &&
            !error &&
            repositories &&
            repositories?.length > 0 &&
            repositories.map((repo) => (
              <CardRepository key={repo.name} content={repo} />
            ))}

          {/* musicplayer */}
          {selected === "musicplayer" && <div></div>}

          {/* LP */}
          {selected === "lp" && <div></div>}
        </main>
        <div className={cn("h-fit w-64", "sticky top-10")}>
          <MenuSide
            menuItems={MENU_ITEMS}
            onClickMenuItem={(id) => setSelected(id as MenuItemsId)}
          />
        </div>
      </div>
    </>
  );
}
