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
} from './SubGroupUtils';


const SubGroupPage = () => {

  const { currentState } = useSelector(
    (state) => ({ currentState: state.subGroups }),
    shallowEqual
  );

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
      {
          <Redirect
            // exact={true}
            from="/groups/groups"
            to="/groups/subgroups"
          />
        }
        
        <ContentRoute path="/groups/subgroups/new"
          render={props =>
            <ObjectEdit {...props} basePath="/groups/subgroups" api="api/subgroup" currentState={currentState} initObject={initObject}
              formFields={formFields} otherFields={otherFields} ObjectEditSchema={ObjectEditSchema} />}
        />

        <ContentRoute
          path="/groups/subgroups/:id/edit"
          render={props =>
            <ObjectEdit {...props} basePath="/groups/subgroups" api="api/subgroup" currentState={currentState} initObject={initObject}
              formFields={formFields} otherFields={otherFields} ObjectEditSchema={ObjectEditSchema} />}
        />

        <ContentRoute
          path="/groups/subgroups"
          render={props => <ObjectsPage basePath="/groups/subgroups" api="api/subgroup" initialFilter={initialFilter} currentState={currentState} 
          columns={columns} prepareFilter={prepareFilter} filterFields={filterFields} filterInitialValues={filterInitialValues}/>}
        />

      </Switch>
    </Suspense>
  )
}

export default SubGroupPage



