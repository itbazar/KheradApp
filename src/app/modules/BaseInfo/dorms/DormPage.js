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
} from './DormUtils';
import BaseObjectsPage from '../../customComponents/BaseObjectsPage';



const redirects = [
  {
    exact: true,
    from: "/dorms",
    to: "/dorms/dorms",
  },
  {
    exact: false,
    from: "/dorms/blocks",
    to: "/dorms/dorms",
  },
  {
    exact: false,
    from: "/dorms/rooms",
    to: "/dorms/dorms",
  },
];

const DormPage = () => {

  const { currentState } = useSelector(
    (state) => ({ currentState: state.dorms }),
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

    {/* // <BaseObjectsPage manuUrl="/dorms" redirectList={redirects} stateName="dorms" basePath="/dorms/dorms" api="api/dorm" currentState={currentState} initObject={initObject}
    //   formFields={formFields} otherFields={otherFields} ObjectEditSchema={ObjectEditSchema} 
    //   columns={columns} prepareFilter={prepareFilter} filterFields={filterFields} filterInitialValues={filterInitialValues} /> */}

        <ContentRoute path="/dorms/dorms/new"
          render={props =>
            <ObjectEdit {...props} isFullAccess={isFullAccess} basePath="/dorms/dorms" api="api/dorm" currentState={currentState} initObject={initObject}
              formFields={formFields} otherFields={otherFields} ObjectEditSchema={ObjectEditSchema} prepareFilter={prepareFilter}/>}
        />

        <ContentRoute
          path="/dorms/dorms/:id/edit"
          render={props =>
            <ObjectEdit {...props} isFullAccess={isFullAccess} basePath="/dorms/dorms" api="api/dorm" currentState={currentState} initObject={initObject}
              formFields={formFields} otherFields={otherFields} ObjectEditSchema={ObjectEditSchema} prepareFilter={prepareFilter}/>}
        />

        <ContentRoute
          path="/dorms/dorms"
          render={props => <ObjectsPage isFullAccess={isFullAccess} basePath="/dorms/dorms" api="api/dorm"  currentState={currentState}
            columns={columns} prepareFilter={prepareFilter} filterFields={filterFields} filterInitialValues={filterInitialValues} />}
        />

      </Switch>
    </Suspense>

  )
}

export default DormPage



