import React from 'react';
import { Specifications } from '../../../_themeBase/layout/components/basePage/insidePages/Specifications';
import { SpecificationsUIProvider } from '../../../_themeBase/layout/components/basePage/insidePages/SpecificationsUIContext';
import { FilterObjectsUIProvider } from '../../../_themeBase/layout/components/basePage/pages/FilterObjectsUIContext';



export const BaseAccessPage = ({ 
    id,
    currentParentName,
    initSpecification,
    api,
    reduxName,
    columns,
    prepareFilter,
    filterInitialValues,
    filterFields,
    haveFullAccess }) => {

    return (
        <FilterObjectsUIProvider>
            <SpecificationsUIProvider currentParentId={id} currentParentName={currentParentName} initSpecification={initSpecification}>
                <Specifications api={api} reduxName={reduxName} columns={columns} prepareFilter={prepareFilter}
                    filterInitialValues={filterInitialValues} filterFields={filterFields} haveFullAccess={haveFullAccess}/>
            </SpecificationsUIProvider>
        </FilterObjectsUIProvider>
    )
}




