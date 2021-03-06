import React from "react";
import { BaseTabedPage } from "../../../../_themeBase/layout/components/common/baseTabedPage";
import  GroupPage  from "./GroupPage";
import  SubGroupPage  from "./SubGroupPage";


const components = [
  { id: 1, title: "MODULES.BASEINFO.Group.FORM_TITLE", tab: 'groups', component: <GroupPage key={1}/>},
  { id: 2, title: "MODULES.BASEINFO.SubGroup.FORM_TITLE", tab: 'subgroups', component: <SubGroupPage key={2}/> },
];

export const GroupBasePage = () => {
  return (
  <BaseTabedPage components ={components} />
  );
}
