import React, { ComponentProps } from "react";

import { ReactComponent as Me } from "~/assets/images/icon/me_1024.svg";

import { Table } from "~/components/common/table/Table";

import classes from "~/components/pages/profile/Profile.module.scss";

export const Profile: React.FC = () => {
  const carrerList: ComponentProps<typeof Table>["tableBodyRows"] = [
    {
      firstCell: "2015.03",
      secondCell: "医療系私立大学 医療工学系学科 卒業",
    },
    {
      firstCell: "2017.03",
      secondCell: "医療系大学大学院 医療系学科 卒業",
    },
    {
      firstCell: "2019.04 - 2019.07",
      secondCell: "1社目：医療機器メーカー 研究開発職",
    },
    {
      firstCell: "2020.01 - 2021.09",
      secondCell: "2社目：SI企業 Webアプリエンジニア職",
    },
    {
      firstCell: "2021.10 -",
      secondCell: "3社目：SI企業 Webアプリ / フロントエンドエンジニア職",
    },
  ];

  const qualificationList: ComponentProps<typeof Table>["tableBodyRows"] = [
    {
      firstCell: "2012.08",
      secondCell: "普通自動車免許 取得",
    },
    {
      firstCell: "2015.03",
      secondCell: "臨床工学技士免許 取得",
    },
  ];

  return (
    <div className={classes.content}>
      <div className={classes["left-content"]}>
        <p className={classes.title}>Profile</p>
        <div className={classes["profile-image-box"]}>
          {/* TODO: 自画像に変更する */}
          <Me className={classes["profile-image"]} />
        </div>
      </div>
      <div className={classes["right-content"]}>
        <Table tableHeaderTitle="career" tableBodyRows={carrerList}></Table>
        <Table
          tableHeaderTitle="Qualification"
          tableBodyRows={qualificationList}
        ></Table>
      </div>
    </div>
  );
};
