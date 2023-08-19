import React from "react";

import geometry68 from "~/assets/images/geometry68.svg";

import { LinkButton } from "~/components/common/button/LinkButton";

import "~/components/pages/top/Top.modules.scss";

export const Top: React.FC = () => {
  return (
    <div className="content">
      <div className="left-content">
        <p className="welcome">welcome</p>
        <img className="nazo-image" src={geometry68} />
      </div>
      <div className="right-content">
        <ul>
          <li>
            <LinkButton text="Profile" textSize={20} />
          </li>
          <li>
            <LinkButton text="Products" textSize={20} />
          </li>
          <li>
            <LinkButton text="🎵" textSize={20} />
          </li>
        </ul>
      </div>
    </div>
  );
};
