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
  prepareFilter,
  filterFields,
  filterInitialValues,
} from './UsersUtils';
import SearchUserPage from './SearchUserPage';
import { UserEdit } from './user-edit/UserEdit';




const UsersPage = () => {

  const { currentState } = useSelector(
    (state) => ({ currentState: state.users }),
    shallowEqual
  );

  let isFullAccess = false;
  const { menuList } = useSelector(
    (state) => ({ menuList: state.auth.menu }),
    shallowEqual
  );

  if (menuList.find(q => q.url == "/persons")) {
    const temp = menuList.find(q => q.url == "/persons")
    isFullAccess = temp.isFullAccess;
  }

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
     
      {/* {
          <Redirect
            exact={true}
            from="/users"
            to="/persons"
          />
        } */}
        
        <ContentRoute path="/persons/search"
          render={props => <SearchUserPage />}
        />


        <ContentRoute path="/persons/new"
          render={props =>
            <UserEdit {...props} isFullAccess={isFullAccess} basePath="/persons" api="api/user" currentState={currentState} initObject={initObject}
              formFields={formFields} otherFields={otherFields} ObjectEditSchema={ObjectEditSchema} prepareFilter={prepareFilter}/>}
        />

        <ContentRoute
          path="/persons/:id/edit"
          render={props =>
            <UserEdit {...props} isFullAccess={isFullAccess} basePath="/persons" api="api/user" currentState={currentState} initObject={initObject}
              formFields={formFields} otherFields={otherFields} ObjectEditSchema={ObjectEditSchema} prepareFilter={prepareFilter}/>}
        />

        <ContentRoute
          path="/persons"
          render={props => <ObjectsPage isFullAccess={isFullAccess} basePath="/persons" api="api/user"  currentState={currentState} 
          columns={columns} prepareFilter={prepareFilter} filterFields={filterFields} filterInitialValues={filterInitialValues}/>}
        />

      </Switch>
    </Suspense>
  )
}

export default UsersPage



