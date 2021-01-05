import React from "react";
import { BaseTabedPage } from "../../../../_themeBase/layout/components/common/baseTabedPage";
import SearchUserPage from "./SearchUserPage";
import UsersPage from "./UsersPage";


const components = [
  { id: 1, title: "MODULES.BASEINFO.USERS.SEARCH", tab: 'search', component: <SearchUserPage key={1}/>},
  { id: 2, title: "MODULES.BASEINFO.USERS.TITLE", tab: 'users', component: <UsersPage key={2} />},
];

export const UserBasePage = () => {
  return (
  <BaseTabedPage components ={components} />
  );
}
