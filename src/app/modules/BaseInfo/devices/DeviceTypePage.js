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
} from './DeviceTypeUtils';




const DeviceTypePage = () => {

  const { currentState } = useSelector(
    (state) => ({ currentState: state.deviceTypes }),
    shallowEqual
  );

  
  let isFullAccess = false;
  const { menuList } = useSelector(
    (state) => ({ menuList: state.auth.menu }),
    shallowEqual
  );

  if (menuList.find(q => q.url == "/devices")) {
    const temp = menuList.find(q => q.url == "/devices")
    isFullAccess = temp.isFullAccess;
  }


  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
      {
          <Redirect
            exact={true}
            from="/devices"
            to="/devices/types"
          />
          
        }
         {
          <Redirect
            from="/devices/devices"
            to="/devices/types"
          />
          
        }
       
        <ContentRoute path="/devices/types/new"
          render={props =>
            <ObjectEdit {...props} isFullAccess={isFullAccess} basePath="/devices/types" api="api/DeviceGroup" currentState={currentState} initObject={initObject}
              formFields={formFields} otherFields={otherFields} ObjectEditSchema={ObjectEditSchema} prepareFilter={prepareFilter}/>}
        />

        <ContentRoute
          path="/devices/types/:id/edit"
          render={props =>
            <ObjectEdit {...props} isFullAccess={isFullAccess} basePath="/devices/types" api="api/DeviceGroup" currentState={currentState} initObject={initObject}
              formFields={formFields} otherFields={otherFields} ObjectEditSchema={ObjectEditSchema} prepareFilter={prepareFilter}/>}
        />

        <ContentRoute
          path="/devices/types"
          render={props => <ObjectsPage isFullAccess={isFullAccess} basePath="/devices/types" api="api/DeviceGroup"  currentState={currentState} 
          columns={columns} prepareFilter={prepareFilter} filterFields={filterFields} filterInitialValues={filterInitialValues}/>}
        />

      </Switch>
    </Suspense>
  )
}

export default DeviceTypePage



