import React, { ComponentProps, FC } from "react";

import { Repository } from "~/components/ui/repository/Repository";

import classes from "~/components/pages/products/Products.module.scss";

export const Products: FC = () => {
  const dummyList: ComponentProps<typeof Repository>["repositry"][] = [
    {
      readme: "README",
      name: "trancore/trancore.github.io",
      description: "My portfolio site.",
      codeLanguage: "Typescript",
    },
    {
      readme: "README",
      name: "trancore/trancore.github.io",
      description: "My portfolio site.",
      codeLanguage: "Typescript",
    },
  ];

  return (
    <div className={classes.content}>
      <p className={classes.title}>Products</p>
      <div className={classes["repository-box"]}>
        {dummyList.map((dummy) => (
          <Repository key={dummy.name} repositry={dummy} />
        ))}
      </div>
    </div>
  );
};
