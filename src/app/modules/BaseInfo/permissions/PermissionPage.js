import React, { Suspense } from 'react';
import { Redirect, Switch } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { LayoutSplashScreen, ContentRoute } from "../../../../_themeBase/layout";
import { ObjectEdit } from '../../../../_themeBase/layout/components/basePage/pages/object-edit/ObjectEdit';
import ObjectsPage from '../../../../_themeBase/layout/components/basePage/pages/ObjectsPage';
import {
  formFields,
  otherFields,
  initObject,
  ObjectEditSchema,
  columns,
  initialFilter,
  prepareFilter,
  filterFields,
  filterInitialValues,
} from './PermissionUtils';



const PermissionPage = () => {

  const { currentState } = useSelector(
    (state) => ({ currentState: state.permissions }),
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

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
      {
          <Redirect
            // exact={true}
            from="/permissions/roles"
            to="/permissions/permissions"
          />
        }
         
        <ContentRoute path="/permissions/permissions/new"
          render={props =>
            <ObjectEdit {...props} isFullAccess={isFullAccess} basePath="/permissions/permissions" api="api/role" currentState={currentState} initObject={initObject}
              formFields={formFields} otherFields={otherFields} ObjectEditSchema={ObjectEditSchema} />}
        />

        <ContentRoute
          path="/permissions/permissions/:id/edit"
          render={props =>
            <ObjectEdit {...props} isFullAccess={isFullAccess} basePath="/permissions/permissions" api="api/role" currentState={currentState} initObject={initObject}
              formFields={formFields} otherFields={otherFields} ObjectEditSchema={ObjectEditSchema} />}
        />

        <ContentRoute
          path="/permissions/permissions"
          render={props => <ObjectsPage isFullAccess={isFullAccess} basePath="/permissions/permissions" api="api/role" initialFilter={initialFilter} currentState={currentState} 
          columns={columns} prepareFilter={prepareFilter} filterFields={filterFields} filterInitialValues={filterInitialValues}/>}
        />

      </Switch>
    </Suspense>
  )
}

export default PermissionPage



