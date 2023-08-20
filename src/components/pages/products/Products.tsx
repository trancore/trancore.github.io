import React, { ComponentProps } from "react";

import { Repository } from "~/components/ui/repository/Repository";

import classes from "~/components/pages/products/Products.module.scss";

export const Products: React.FC = () => {
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
    {
      readme: "README",
      name: "trancore/trancore.github.io",
      description:
        "My portfolio site.My portfolio site.My portfolio site.My portfolio site.My portfolio site.",
      codeLanguage: "Typescript",
    },
  ];

  return (
    <div className={classes.content}>
      <p className={classes.title}>Products</p>
      <div className={classes["repository-box"]}>
        {dummyList.map((dummy) => (
          <div key={dummy.name} className={classes.repository}>
            <Repository key={dummy.name} repositry={dummy} />
          </div>
        ))}
      </div>
    </div>
  );
};
