import React from "react";
import { BaseTabedPage } from "../../../../_themeBase/layout/components/common/baseTabedPage";
import WorkTimePage from "./WorkTimePage";
import AssignPage from "./AssignPage";
import ShiftPage from "./ShiftPage";


const components = [
  { id: 1, title: "MODULES.BASEINFO.WORKTIME.FORM_TITLE", tab: 'worktimes', component: <WorkTimePage key={1}/>},
  { id: 2, title: "MODULES.BASEINFO.SHIFT.FORM_TITLE", tab: 'shifts', component: <ShiftPage key={2}/>},
  { id: 3, title: "MODULES.BASEINFO.ASSIGN.FORM_TITLE", tab: 'assign', component: <AssignPage key={3}/> },
];

export const ShiftBasePage = () => {
  return (
  <BaseTabedPage components ={components} />
  );
}
