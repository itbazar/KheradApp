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
} from './TermUtils';




const TermPage = () => {

  const { currentState } = useSelector(
    (state) => ({ currentState: state.terms }),
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
            <ObjectEdit {...props} isFullAccess={isFullAccess} basePath="/terms/terms" api="api/term" currentState={currentState} initObject={initObject}
              formFields={formFields} otherFields={otherFields} ObjectEditSchema={ObjectEditSchema} prepareFilter={prepareFilter}/>}
        />

        <ContentRoute
          path="/terms/terms/:id/edit"
          render={props =>
            <ObjectEdit {...props} isFullAccess={isFullAccess} basePath="/terms/terms" api="api/term" currentState={currentState} initObject={initObject}
              formFields={formFields} otherFields={otherFields} ObjectEditSchema={ObjectEditSchema} prepareFilter={prepareFilter}/>}
        />

        <ContentRoute
          path="/terms/terms"
          render={props => <ObjectsPage isFullAccess={isFullAccess} basePath="/terms/terms" api="api/term"  currentState={currentState} 
          columns={columns} prepareFilter={prepareFilter} filterFields={filterFields} filterInitialValues={filterInitialValues}/>}
        />

      </Switch>
    </Suspense>
  )
}

export default TermPage



