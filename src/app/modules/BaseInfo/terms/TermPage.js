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
} from './TermUtils';




const TermPage = () => {

  const { currentState } = useSelector(
    (state) => ({ currentState: state.terms }),
    shallowEqual
  );

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
      {
          <Redirect
            exact={true}
            from="/terms"
            to="/terms/terms"
          />
          
        }
      {
          <Redirect
            // exact={true}
            from="/terms/years"
            to="/terms/terms"
          />
        }
         {
          <Redirect
            // exact={true}
            from="/terms/semesters"
            to="/terms/terms"
          />
        }
        <ContentRoute path="/terms/terms/new"
          render={props =>
            <ObjectEdit {...props} basePath="/terms/terms" api="api/term" currentState={currentState} initObject={initObject}
              formFields={formFields} otherFields={otherFields} ObjectEditSchema={ObjectEditSchema} />}
        />

        <ContentRoute
          path="/terms/terms/:id/edit"
          render={props =>
            <ObjectEdit {...props} basePath="/terms/terms" api="api/term" currentState={currentState} initObject={initObject}
              formFields={formFields} otherFields={otherFields} ObjectEditSchema={ObjectEditSchema} />}
        />

        <ContentRoute
          path="/terms/terms"
          render={props => <ObjectsPage basePath="/terms/terms" api="api/term" initialFilter={initialFilter} currentState={currentState} 
          columns={columns} prepareFilter={prepareFilter} filterFields={filterFields} filterInitialValues={filterInitialValues}/>}
        />

      </Switch>
    </Suspense>
  )
}

export default TermPage



