import React from "react";
import { BaseTabedPage } from "../../../../_themeBase/layout/components/common/baseTabedPage";
import DormPage from "./DormPage";
import BlockPage from "./BlockPage";
import RoomPage from "./RoomPage";



const components = [
  { id: 1, title: "MODULES.BASEINFO.DORMS.FORM_TITLE", tab: 'dorms', component: <DormPage />},
  { id: 2, title: "MODULES.BASEINFO.BLOCK.FORM_TITLE", tab: 'blocks', component: <BlockPage /> },
  { id: 3, title: "MODULES.BASEINFO.ROOM.FORM_TITLE", tab: 'room', component: <RoomPage />},
];


export const DormBasePage = () => {
  return (
  <BaseTabedPage components ={components} />
  );
}
