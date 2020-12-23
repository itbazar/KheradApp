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
} from './GroupUtils';




const GroupPage = () => {

  const { currentState } = useSelector(
    (state) => ({ currentState: state.groups }),
    shallowEqual
  );

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
      {
          <Redirect
            exact={true}
            from="/groups"
            to="/groups/groups"
          />
          
        }
         {
          <Redirect
            // exact={true}
            from="/groups/subgroups"
            to="/groups/groups"
          />
          
        }
       
        <ContentRoute path="/groups/groups/new"
          render={props =>
            <ObjectEdit {...props} basePath="/groups/groups" api="api/group" currentState={currentState} initObject={initObject}
              formFields={formFields} otherFields={otherFields} ObjectEditSchema={ObjectEditSchema} />}
        />

        <ContentRoute
          path="/groups/groups/:id/edit"
          render={props =>
            <ObjectEdit {...props} basePath="/groups/groups" api="api/group" currentState={currentState} initObject={initObject}
              formFields={formFields} otherFields={otherFields} ObjectEditSchema={ObjectEditSchema} />}
        />

        <ContentRoute
          path="/groups/groups"
          render={props => <ObjectsPage basePath="/groups/groups" api="api/group" initialFilter={initialFilter} currentState={currentState} 
          columns={columns} prepareFilter={prepareFilter} filterFields={filterFields} filterInitialValues={filterInitialValues}/>}
        />

      </Switch>
    </Suspense>
  )
}

export default GroupPage



