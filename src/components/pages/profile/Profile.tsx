import React from "react";

import { ReactComponent as Me } from "~/assets/images/icon/me_1024.svg";

import { CARRER_LIST, QUALIFICATION_LIST } from "~/const";

import { Table } from "~/components/common/table/Table";

import classes from "~/components/pages/profile/Profile.module.scss";

export const Profile: React.FC = () => {
  // TODO: レスポンシブ対応

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
        <Table tableHeaderTitle="career" tableBodyRows={CARRER_LIST}></Table>
        <Table
          tableHeaderTitle="Qualification"
          tableBodyRows={QUALIFICATION_LIST}
        ></Table>
      </div>
    </div>
  );
};
