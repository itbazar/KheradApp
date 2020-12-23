import React from "react";
import { BaseTabedPage } from "../../../../_themeBase/layout/components/common/baseTabedPage";
import YearPage from "./YearPage";
import TermPage from "./TermPage";
import SemesterPage from "./SemesterPage";


const components = [
  { id: 1, title: "MODULES.BASEINFO.TERM.FORM_TITLE", tab: 'terms', component: <TermPage />},
  { id: 2, title: "MODULES.BASEINFO.YEAR.FORM_TITLE", tab: 'years', component: <YearPage />},
  { id: 3, title: "MODULES.BASEINFO.SEMESTER.FORM_TITLE", tab: 'semesters', component: <SemesterPage /> },
];

export const TermBasePage = () => {
  return (
  <BaseTabedPage components ={components} />
  );
}
