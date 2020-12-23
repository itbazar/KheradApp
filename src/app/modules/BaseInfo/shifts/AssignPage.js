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
} from './AssignUtils';


const AssignPage = () => {

  const { currentState } = useSelector(
    (state) => ({ currentState: state.shiftAssigns }),
    shallowEqual
  );

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
      {
          <Redirect
            // exact={true}
            from="/shifts/worktimes"
            to="/shifts/assign"
          />
        }
        {
          <Redirect
            // exact={true}
            from="/shifts/shifts"
            to="/shifts/assign"
          />
        }
        {/* <ContentRoute path="/shifts/assign/new"
          render={props =>
            <ObjectEdit {...props} basePath="/shifts/assign" api="api/assign" currentState={currentState} initObject={initObject}
              formFields={formFields} otherFields={otherFields} ObjectEditSchema={ObjectEditSchema} />}
        />

        <ContentRoute
          path="/shifts/assign/:id/edit"
          render={props =>
            <ObjectEdit {...props} basePath="/shifts/assign" api="api/assign" currentState={currentState} initObject={initObject}
              formFields={formFields} otherFields={otherFields} ObjectEditSchema={ObjectEditSchema} />}
        />

        <ContentRoute
          path="/shifts/assign"
          render={props => <ObjectsPage basePath="/shifts/assign" api="api/assign" initialFilter={initialFilter} currentState={currentState} 
          columns={columns} prepareFilter={prepareFilter} filterFields={filterFields} filterInitialValues={filterInitialValues}/>}
        /> */}

      </Switch>
    </Suspense>
  )
}

export default AssignPage



