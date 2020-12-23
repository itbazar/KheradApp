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
} from './DormUtils';




const DormPage = () => {

  const { currentState } = useSelector(
    (state) => ({ currentState: state.dorms }),
    shallowEqual
  );

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
    <Switch>
    {
        <Redirect
          exact={true}
          from="/dorms"
          to="/dorms/dorms"
        />
        
      }
       {
        <Redirect
          // exact={true}
          from="/dorms/blocks"
          to="/dorms/dorms"
        />
        
      }
      {
        <Redirect
          // exact={true}
          from="/dorms/rooms"
          to="/dorms/dorms"
        />
      }
      <ContentRoute path="/dorms/dorms/new"
        render={props =>
          <ObjectEdit {...props} basePath="/dorms/dorms" api="api/dorm" currentState={currentState} initObject={initObject}
            formFields={formFields} otherFields={otherFields} ObjectEditSchema={ObjectEditSchema} />}
      />

      <ContentRoute
        path="/dorms/dorms/:id/edit"
        render={props =>
          <ObjectEdit {...props} basePath="/dorms/dorms" api="api/dorm" currentState={currentState} initObject={initObject}
            formFields={formFields} otherFields={otherFields} ObjectEditSchema={ObjectEditSchema} />}
      />

      <ContentRoute
        path="/dorms/dorms"
        render={props => <ObjectsPage basePath="/dorms/dorms" api="api/dorm" initialFilter={initialFilter} currentState={currentState} 
        columns={columns} prepareFilter={prepareFilter} filterFields={filterFields} filterInitialValues={filterInitialValues}/>}
      />

    </Switch>
  </Suspense>
  )
}

export default DormPage



