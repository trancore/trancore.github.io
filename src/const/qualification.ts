import { ComponentProps } from "react";

import { Table } from "~/components/common/table/Table";

/**
 * 資格の定数
 */
export const QUALIFICATION_LIST: ComponentProps<typeof Table>["tableBodyRows"] =
  [
    {
      firstCell: "2012.08",
      secondCell: "普通自動車免許 取得",
    },
    {
      firstCell: "2015.03",
      secondCell: "臨床工学技士免許 取得",
    },
    {
      firstCell: "2015.07",
      secondCell: "第１種ME技術実力検定試験 総合合格",
    },
    {
      firstCell: "2025.06",
      secondCell: "基本情報技術者試験 合格",
    },
    {
      firstCell: "2025.06",
      secondCell: "AWS Certified Cloud Practitioner 合格",
    },
    {
      firstCell: "2025.08",
      secondCell: "AWS Certified Solutions Architect - Associate 合格",
    },
    {
      firstCell: "2025.11",
      secondCell: "HTML5プロフェッショナル認定試験 レベル1 合格",
    },
    {
      firstCell: "2025.11",
      secondCell: "HTML5プロフェッショナル認定試験 レベル2 合格",
    },
    {
      firstCell: "2025.11",
      secondCell: "JSTQB認定テスト技術者資格 Foundation Level試験 合格",
    },
  ];
