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
} from './FieldUtils';




const FieldPage = () => {

  const { currentState } = useSelector(
    (state) => ({ currentState: state.fields }),
    shallowEqual
  );

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
      {
          <Redirect
            // exact={true}
            from="/collages/collages"
            to="/collages/fields"
          />
        }
       
        <ContentRoute path="/collages/fields/new"
          render={props =>
            <ObjectEdit {...props} basePath="/collages/fields" api="api/field" currentState={currentState} initObject={initObject}
              formFields={formFields} otherFields={otherFields} ObjectEditSchema={ObjectEditSchema} />}
        />

        <ContentRoute
          path="/collages/fields/:id/edit"
          render={props =>
            <ObjectEdit {...props} basePath="/collages/fields" api="api/field" currentState={currentState} initObject={initObject}
              formFields={formFields} otherFields={otherFields} ObjectEditSchema={ObjectEditSchema} />}
        />

        <ContentRoute
          path="/collages/fields"
          render={props => <ObjectsPage basePath="/collages/fields" api="api/field" initialFilter={initialFilter} currentState={currentState} 
          columns={columns} prepareFilter={prepareFilter} filterFields={filterFields} filterInitialValues={filterInitialValues}/>}
        />

      </Switch>
    </Suspense>
  )
}

export default FieldPage



