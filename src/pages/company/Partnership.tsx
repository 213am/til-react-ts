import React from "react";
import { IPartner } from "../../App";

interface PartnerProps {
  children?: React.ReactNode;
  partnerList: IPartner[];
}

const Partnership: React.FC<PartnerProps> = ({ partnerList }) => {
  return (
    <div className="p-6">
      <p className="text-2xl mb-6">Partnership</p>
      <ul>
        {partnerList?.map((item, index) => (
          <li key={index} className="flex w-full gap-4 text-lg py-1">
            <span>{item.name}</span>
            <span>{item.link}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Partnership;
