import React from "react";
import { BaseTabedPage } from "../../../../_themeBase/layout/components/common/baseTabedPage";
import PermissionPage from "./PermissionPage";
import RolePage from "./RolePage";


const components = [
  { id: 1, title: "MODULES.BASEINFO.ROLE.FORM_TITLE", tab: 'roles', component: <RolePage key={1}/>},
  { id: 2, title: "MODULES.BASEINFO.ROLE.PERMISSION_TITLE", tab: 'permissions', component: <PermissionPage key={2} />},
];

export const PermissionBasePage = () => {
  return (
  <BaseTabedPage components ={components} />
  );
}
