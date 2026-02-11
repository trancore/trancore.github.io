import Loading from "~/components/common/Loading";
import CardRepository from "~/components/ui/CardRepository";
import MenuSide from "~/components/ui/MenuSide";
import MusicPlayer from "~/components/ui/MusicPlayer";
import Splash from "~/components/ui/Splash";
import { MENU_SIDE_ITEMS_LIST } from "~/consts";
import { RepositoryOwnerDocument } from "~/graphql/github/query-generated/graphql";
import { useFetchGitHub } from "~/hooks/useFetchGitHub";
import { useMediaQuery } from "~/hooks/useMeidaQuery";
import type { MenuSideItemsList } from "~/types/menu";
import { cn } from "~/utils/cn";
import { useMemo, useState } from "react";

type MenuSideItemsListId = MenuSideItemsList[number]["id"];

export default function Products() {
  const { data, error, isLoading } = useFetchGitHub(RepositoryOwnerDocument);
  const { isSP } = useMediaQuery();
  const [selected, setSelected] = useState<MenuSideItemsListId>(
    MENU_SIDE_ITEMS_LIST[0].id,
  );

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
        backgroundColor="bg-product-page-theme"
      />
      <div className={cn("max-w-7xl gap-6 p-6", "m-auto flex")}>
        {/* GitHub */}
        {selected === "github" && (
          <main
            className={cn(
              "w-full flex-1 gap-8",
              "flex flex-col",
              isLoading && "justify-center",
              !isLoading && "md:grid md:grid-cols-2",
            )}
          >
            {selected === "github" && isLoading && !error && (
              <Loading type="spinner" />
            )}

            {!isLoading &&
              !error &&
              repositories &&
              repositories?.length > 0 &&
              repositories.map((repo) => (
                <CardRepository key={repo.name} content={repo} />
              ))}
          </main>
        )}

        {/* musicplayer */}
        {selected === "musicplayer" && (
          <main className={cn("w-full flex-1")}>
            <MusicPlayer />
          </main>
        )}

        {/* LP */}
        {selected === "lp" && (
          <main
            className={cn(
              "w-full flex-1",
              // isLoading && "flex justify-center",
              // !isLoading && "md:grid md:grid-cols-2",
            )}
          >
            <div></div>
          </main>
        )}

        {isSP ? (
          <MenuSide
            menuItems={MENU_SIDE_ITEMS_LIST}
            onClickMenuItem={(id) => setSelected(id as MenuSideItemsListId)}
          />
        ) : (
          <div className={cn("h-fit w-64", "sticky top-10")}>
            <MenuSide
              menuItems={MENU_SIDE_ITEMS_LIST}
              onClickMenuItem={(id) => setSelected(id as MenuSideItemsListId)}
            />
          </div>
        )}
      </div>
    </>
  );
}
