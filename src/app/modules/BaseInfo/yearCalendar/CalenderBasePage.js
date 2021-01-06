import React from "react";
import { BaseTabedPage } from "../../../../_themeBase/layout/components/common/baseTabedPage";
import CalendarPage from "./CalendarPage";
import BaseCalendarPage from "./BaseCalendar";

const components = [
  { id: 1, title: "MODULES.BASEINFO.CALENDER.FORM_TITLE", tab: 'CALENDER', component: <CalendarPage key={1} /> },
  { id: 2, title: "MODULES.BASEINFO.BaseCalendar.FORM_TITLE", tab: 'BaseCalendar', component: <BaseCalendarPage key={2}/>},
];

export const CalenderBasePage = () => {
  return (
  <BaseTabedPage components ={components} />
  );
}
export default CalenderBasePage;