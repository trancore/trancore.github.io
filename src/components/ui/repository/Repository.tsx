import React from "react";

import { Icon } from "~/components/common/icon/Icon";

import "~/components/ui/repository/Repository.modules.scss";

export const Repository: React.FC = () => {
  return (
    <div className="repository">
      <div className="readme">
        <div className="readme_back">
          <div className="readme_content">
            <p>README</p>
          </div>
        </div>
      </div>
      <div className="description">
        <div className="repository_name">
          <Icon name="Book" size={44}></Icon>
          <p>trancore/trancore.github.io</p>
        </div>
        <div className="repository_description">
          <p>My portfolio site.</p>
        </div>
        <div className="repository_code">
          <div className="code_color">⚪️</div>
          <div className="code_language">
            <p>Typescript</p>
          </div>
        </div>
      </div>
    </div>
  );
};
