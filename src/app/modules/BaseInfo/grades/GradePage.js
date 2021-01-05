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
} from './GradeUtils';




const GradePage = () => {

  const { currentState } = useSelector(
    (state) => ({ currentState: state.grades }),
    shallowEqual
  );
  
  let isFullAccess = false;
  const { menuList } = useSelector(
    (state) => ({ menuList: state.auth.menu }),
    shallowEqual
  );

  if (menuList.find(q => q.url == "/grades")) {
    const temp = menuList.find(q => q.url == "/grades")
    isFullAccess = temp.isFullAccess;
  }


  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
      
        <ContentRoute path="/grades/new"
          render={props =>
            <ObjectEdit {...props} isFullAccess={isFullAccess} basePath="/grades" api="api/grade" currentState={currentState} initObject={initObject}
              formFields={formFields} otherFields={otherFields} ObjectEditSchema={ObjectEditSchema} prepareFilter={prepareFilter}/>}
        />

        <ContentRoute
          path="/grades/:id/edit"
          render={props =>
            <ObjectEdit {...props} isFullAccess={isFullAccess} basePath="/grades" api="api/grade" currentState={currentState} initObject={initObject}
              formFields={formFields} otherFields={otherFields} ObjectEditSchema={ObjectEditSchema} prepareFilter={prepareFilter}/>}
        />

        <ContentRoute
          path="/grades"
          render={props => <ObjectsPage isFullAccess={isFullAccess} basePath="/grades" api="api/grade"  currentState={currentState} 
          columns={columns} prepareFilter={prepareFilter} filterFields={filterFields} filterInitialValues={filterInitialValues}/>}
        />

      </Switch>
    </Suspense>
  )
}

export default GradePage



