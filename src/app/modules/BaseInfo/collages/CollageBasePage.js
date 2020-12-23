import React from "react";
import { BaseTabedPage } from "../../../../_themeBase/layout/components/common/baseTabedPage";
import CollagePage from "./CollagePage";
import FieldPage from "./FieldPage";

const components = [
  { id: 1, title: "MODULES.BASEINFO.COLLAGE.FORM_TITLE", tab: 'collages', component: <CollagePage />},
  { id: 2, title: "MODULES.BASEINFO.FIELD.FORM_TITLE", tab: 'fields', component: <FieldPage /> },
];

export const CollageBasePage = () => {
  return (
  <BaseTabedPage components ={components} />
  );
}
