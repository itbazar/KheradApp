import { Switch } from '@material-ui/core';
import React, { Suspense, useEffect } from 'react';
import { shallowEqual, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { ContentRoute, LayoutSplashScreen } from '../../../_themeBase/layout';
import { ObjectEdit } from '../../../_themeBase/layout/components/basePage/pages/object-edit/ObjectEdit';
import ObjectsPage from '../../../_themeBase/layout/components/basePage/pages/ObjectsPage';

const BaseObjectsPage = ({
    stateName,
    redirectList,
    manuUrl,
    basePath,
    api,
    initObject,
    formFields,
    otherFields,
    ObjectEditSchema,
    columns,
    
    prepareFilter,
    filterFields,
    filterInitialValues,
}) => {

    let isFullAccess = false;
    const { currentState } = useSelector(
        (state) => ({ currentState: state[stateName] }),
        shallowEqual
    );

    const { menuList } = useSelector(
        (state) => ({ menuList: state.auth.menu }),
        shallowEqual
    );

    if (menuList.find(q => q.url == manuUrl)) {
        const temp = menuList.find(q => q.url == manuUrl)
        isFullAccess = temp.isFullAccess;
    }

    return (
        <Suspense fallback={<LayoutSplashScreen />}>
            <Switch>

                {redirectList.map((redirect, idx) =>
                    <Redirect
                        key={idx}
                        exact={redirect.exact}
                        from={redirect.from}
                        to={redirect.to}
                    />
                )}

                <ContentRoute path={`${basePath}/new`}
                    render={props =>
                        <ObjectEdit {...props} isFullAccess={isFullAccess} basePath={basePath} api={api} currentState={currentState} initObject={initObject}
                            formFields={formFields} otherFields={otherFields} ObjectEditSchema={ObjectEditSchema} prepareFilter={prepareFilter}/>}
                />

                <ContentRoute
                    path={`${basePath}/:id/edit`}
                    render={props =>
                        <ObjectEdit {...props} isFullAccess={isFullAccess} basePath={basePath} api={api} currentState={currentState} initObject={initObject}
                            formFields={formFields} otherFields={otherFields} ObjectEditSchema={ObjectEditSchema} prepareFilter={prepareFilter}/>}
                />


                <ContentRoute
                    path={basePath}
                    render={props => <ObjectsPage isFullAccess={isFullAccess} basePath={basePath} api={api}  currentState={currentState}
                        columns={columns} prepareFilter={prepareFilter} filterFields={filterFields} filterInitialValues={filterInitialValues} />}
                />

            </Switch>
        </Suspense>
    )
}

export default BaseObjectsPage



