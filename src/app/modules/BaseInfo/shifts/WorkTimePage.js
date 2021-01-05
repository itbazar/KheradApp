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
} from './WorkTimeUtils';


const WorkTimePage = () => {

  const { currentState } = useSelector(
    (state) => ({ currentState: state.workTimes }),
    shallowEqual
  );

  let isFullAccess = false;
  const { menuList } = useSelector(
    (state) => ({ menuList: state.auth.menu }),
    shallowEqual
  );

  if (menuList.find(q => q.url == "/dorms")) {
    const temp = menuList.find(q => q.url == "/dorms")
    isFullAccess = temp.isFullAccess;
  }

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
      {
          <Redirect
            exact={true}
            from="/shifts"
            to="/shifts/worktimes"
          />
          
        }
      {
          <Redirect
            // exact={true}
            from="/shifts/shifts"
            to="/shifts/worktimes"
          />
        }
         {
          <Redirect
            // exact={true}
            from="/shifts/assign"
            to="/shifts/worktimes"
          />
        }
        <ContentRoute path="/shifts/worktimes/new"
          render={props =>
            <ObjectEdit {...props} isFullAccess={isFullAccess} basePath="/shifts/worktimes" api="api/worktimes" currentState={currentState} initObject={initObject}
              formFields={formFields} otherFields={otherFields} ObjectEditSchema={ObjectEditSchema} prepareFilter={prepareFilter}/>}
        />

        <ContentRoute
          path="/shifts/worktimes/:id/edit"
          render={props =>
            <ObjectEdit {...props} isFullAccess={isFullAccess} basePath="/shifts/worktimes" api="api/worktimes" currentState={currentState} initObject={initObject}
              formFields={formFields} otherFields={otherFields} ObjectEditSchema={ObjectEditSchema} prepareFilter={prepareFilter}/>}
        />

        <ContentRoute
          path="/shifts/worktimes"
          render={props => <ObjectsPage isFullAccess={isFullAccess} basePath="/shifts/worktimes" api="api/worktimes"  currentState={currentState} 
          columns={columns} prepareFilter={prepareFilter} filterFields={filterFields} filterInitialValues={filterInitialValues}/>}
        />

      </Switch>
    </Suspense>
  )
}

export default WorkTimePage



