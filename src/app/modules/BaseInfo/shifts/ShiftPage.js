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
} from './ShiftUtils';




const ShiftPage = () => {

  const { currentState } = useSelector(
    (state) => ({ currentState: state.shifts }),
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
            // exact={true}
            from="/shifts/worktimes"
            to="/shifts/shifts"
          />
          
        }
        {
          <Redirect
            // exact={true}
            from="/shifts/assign"
            to="/shifts/shifts"
          />
        }
        {/* <ContentRoute path="/shifts/years/new"
          render={props =>
            <ObjectEdit {...props} isFullAccess={isFullAccess} basePath="/shifts/years" api="api/years" currentState={currentState} initObject={initObject}
              formFields={formFields} otherFields={otherFields} ObjectEditSchema={ObjectEditSchema} />}
        />

        <ContentRoute
          path="/shifts/years/:id/edit"
          render={props =>
            <ObjectEdit {...props} isFullAccess={isFullAccess} basePath="/shifts/years" api="api/years" currentState={currentState} initObject={initObject}
              formFields={formFields} otherFields={otherFields} ObjectEditSchema={ObjectEditSchema} />}
        />

        <ContentRoute
          path="/shifts/years"
          render={props => <ObjectsPage isFullAccess={isFullAccess} basePath="/shifts/years" api="api/years" initialFilter={initialFilter} currentState={currentState} 
          columns={columns} prepareFilter={prepareFilter} filterFields={filterFields} filterInitialValues={filterInitialValues}/>}
        /> */}

      </Switch>
    </Suspense>
  )
}

export default ShiftPage


