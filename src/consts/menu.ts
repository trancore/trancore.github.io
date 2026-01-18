export const MENU_SIDE_ITEMS_LIST = [
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
    title: "🚧 LP",
    items: ["test1", "test2", "test3", "test4", "test5"],
  },
] as const satisfies { id: string; title: string; items?: string[] }[];
