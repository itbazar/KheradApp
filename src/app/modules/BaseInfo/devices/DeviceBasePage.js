import React from "react";
import { BaseTabedPage } from "../../../../_themeBase/layout/components/common/baseTabedPage";
import DeviceTypePage from "./DeviceTypePage";
import DevicePage from "./DevicePage";

const components = [
  { id: 1, title: "MODULES.BASEINFO.DEVICETYPE.FORM_TITLE", tab: 'deviceTypes', component: <DeviceTypePage key={1}/>},
  { id: 2, title: "MODULES.BASEINFO.DEVICE.FORM_TITLE", tab: 'devices', component: <DevicePage key={2}/> },
];

export const DeviceBasePage = () => {
  return (
  <BaseTabedPage components ={components} />
  );
}
