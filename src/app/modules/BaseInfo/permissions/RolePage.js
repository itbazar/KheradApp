import React, { Suspense } from 'react';
import { Redirect, Switch } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { LayoutSplashScreen, ContentRoute } from "../../../../_themeBase/layout";
import { ObjectEdit } from '../../../../_themeBase/layout/components/basePage/pages/object-edit/ObjectEdit';
import ObjectsPage from '../../../../_themeBase/layout/components/basePage/pages/ObjectsPage';
import { GroupAccessPage } from './GroupAccessPage';
import { MenuAccessPage } from './MenuAccessPage';
import { RoleAccessPage } from './RoleAccessPage';
import {
  formFields,
  otherFields,
  initObject,
  ObjectEditSchema,
  columns,
  prepareFilter,
  filterFields,
  filterInitialValues,
} from './RoleUtils';


const initSpecification = {
  id: undefined,
  title: "",
  roleId: 0,
  groupId: 0,
};

const RolePage = () => {

  const { currentState } = useSelector(
    (state) => ({ currentState: state.roles }),
    shallowEqual
  );

  let isFullAccess = false;
  const { menuList } = useSelector(
    (state) => ({ menuList: state.auth.menu }),
    shallowEqual
  );

  if (menuList.find(q => q.url == "/permissions")) {
    const temp = menuList.find(q => q.url == "/permissions")
    isFullAccess = temp.isFullAccess;
  }


  const otherTabs = [
    { id: 2, title: "MODULES.BASEINFO.ROLE.PERMISSION_GROUP", tab: 'groupAccess',component:GroupAccessPage},
    // { id: 3, title: "MODULES.BASEINFO.ROLE.PERMISSION_SELF", tab: 'selfAccess'},
    // { id: 4, title: "MODULES.BASEINFO.ROLE.PERMISSION_SELF_TYPE", tab: 'selfTypeAccess'},
    { id: 4, title: "MODULES.BASEINFO.ROLE.PERMISSION_ROLE", tab: 'roleAccess',component:RoleAccessPage},
    { id: 4, title: "MODULES.BASEINFO.ROLE.PERMISSION_MENU", tab: 'menuAccess',component:MenuAccessPage},
  ];

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
      {
          <Redirect
             exact={true}
            from="/permissions"
            to="/permissions/roles"
          />
        }
        {
          <Redirect
            // exact={true}
            from="/permissions/permissions"
            to="/permissions/roles"
          />
        }
        <ContentRoute path="/permissions/roles/new"
          render={props =>
            <ObjectEdit {...props} isFullAccess={isFullAccess} basePath="/permissions/roles" api="api/role" currentState={currentState} initObject={initObject}
              formFields={formFields} otherFields={otherFields} ObjectEditSchema={ObjectEditSchema} prepareFilter={prepareFilter} otherTabs={otherTabs}/>}
        />

        <ContentRoute
          path="/permissions/roles/:id/edit"
          render={props =>
            <ObjectEdit {...props} isFullAccess={isFullAccess} basePath="/permissions/roles" api="api/role" currentState={currentState} initObject={initObject}
              formFields={formFields} otherFields={otherFields} ObjectEditSchema={ObjectEditSchema} prepareFilter={prepareFilter} otherTabs={otherTabs} />}
        />

        <ContentRoute
          path="/permissions/roles"
          render={props => <ObjectsPage isFullAccess={isFullAccess} basePath="/permissions/roles" api="api/role"  currentState={currentState} 
          columns={columns} prepareFilter={prepareFilter} filterFields={filterFields} filterInitialValues={filterInitialValues}/>}
        />

      </Switch>
    </Suspense>
  
  )
}

export default RolePage



