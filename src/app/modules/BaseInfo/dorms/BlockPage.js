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
} from './BlockUtils';




export const BlockPage = () => {

  const { currentState } = useSelector(
    (state) => ({ currentState: state.blocks }),
    shallowEqual
  );

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
      {
          <Redirect
            // exact={true}
            from="/dorms/dorms"
            to="/dorms/blocks"
          />
        }
        {
          <Redirect
            // exact={true}
            from="/dorms/rooms"
            to="/dorms/blocks"
          />
        }
        <ContentRoute path="/dorms/blocks/new"
          render={props =>
            <ObjectEdit {...props} basePath="/dorms/blocks" api="api/block" currentState={currentState} initObject={initObject}
              formFields={formFields} otherFields={otherFields} ObjectEditSchema={ObjectEditSchema} />}
        />

        <ContentRoute
          path="/dorms/blocks/:id/edit"
          render={props =>
            <ObjectEdit {...props} basePath="/dorms/blocks" api="api/block" currentState={currentState} initObject={initObject}
              formFields={formFields} otherFields={otherFields} ObjectEditSchema={ObjectEditSchema} />}
        />

        <ContentRoute
          path="/dorms/blocks"
          render={props => <ObjectsPage basePath="/dorms/blocks" api="api/block" initialFilter={initialFilter} currentState={currentState} 
          columns={columns} prepareFilter={prepareFilter} filterFields={filterFields} filterInitialValues={filterInitialValues}/>}
        />

      </Switch>
    </Suspense>
  )
}

export default BlockPage



