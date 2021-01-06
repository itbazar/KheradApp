import React from 'react';
import { Specifications } from '../../../../_themeBase/layout/components/basePage/insidePages/Specifications';
import { SpecificationsUIProvider } from '../../../../_themeBase/layout/components/basePage/insidePages/SpecificationsUIContext';
import { FilterObjectsUIProvider } from '../../../../_themeBase/layout/components/basePage/pages/FilterObjectsUIContext';
import { SelectObjectsField } from '../../../../_themeBase/layout/components/basePage/selectObjects/SelectObjectsField';
import { sortCaret } from '../../../../_themeBase/_helpers';
import * as columnFormatters from "../../../../_themeBase/layout/components/basePage/insidePages/column-formatters";
import { BaseAccessPage } from '../../customComponents/BaseAccessPage';


const init = {
    id: undefined,
    roleId: 0,
    onRoleId: 0,
    roleTitle: "",
    onRoleTitle: "",
    allowed: true,
    isDeleted: false,
};


const columns = [
    {
        dataField: "roleTitle",
        text: columnFormatters.translateByMessageId("MODULES.BASEINFO.ROLE.TITLE"),
        sort: true,
        sortCaret: sortCaret,
    },
    {
        dataField: "onRoleTitle",
        text: columnFormatters.translateByMessageId("MODULES.BASEINFO.ROLE.ON_TITLE"),
        sort: true,
        sortCaret: sortCaret,
    },
    {
        dataField: "allowed",
        text: columnFormatters.translateByMessageId("MODULES.GENERAL.STATUS"),
        // text: "وضعیت",
        sort: true,
        sortCaret: sortCaret,
        formatter: columnFormatters.AllowedColumnFormatter,
    },

    // {
    //   dataField: "action",
    //   text: "Actions",
    //   formatter: ActionsColumnFormatter,
    //   formatExtraData: {
    //     openEditSpecificationDialog: specsUIProps.openEditSpecificationDialog,
    //     openDeleteSpecificationDialog:
    //       specsUIProps.openDeleteSpecificationDialog,
    //   },
    //   classes: "text-right pr-0",
    //   headerClasses: "text-right pr-3",
    //   style: {
    //     minWidth: "100px",
    //   },
    // },
];


export const prepareFilter = (queryParams, values) => {
    const { allowed, roleId, onRoleId } = values;
    const newQueryParams = { ...queryParams };
    const filter = {};

    filter.allowed = allowed !== "" ? +allowed : undefined;
    filter.roleId = roleId !== "" ? +roleId : 0;
    filter.onRoleId = onRoleId !== "" ? +onRoleId : 0;


    // // Filter by all fields
    // filter.title = searchText;
    // if (searchText) {
    //     filter.title = searchText;
    // }
    newQueryParams.filter = filter;

    // let whereClause = "title.contains(@0)"
    let whereClause = ""
    const whereClauseParameters = [];
    // whereClauseParameters.push(searchText)

    // whereClause = whereClause + "isDeleted=@0"
    // whereClauseParameters.push(false)

    if (filter.roleId > 0) {
        whereClause = whereClause + "roleId=@0"
        whereClauseParameters.push(filter.roleId)
    }
    else {
        whereClause = whereClause + "roleId!=@0"
        whereClauseParameters.push(0)
    }

    if (filter.onRoleId > 0) {
        whereClause = whereClause + " and onRoleId=@1"
        whereClauseParameters.push(filter.onRoleId)
    }
    else {
        whereClause = whereClause + " and onRoleId!=@1"
        whereClauseParameters.push(0)
    }

    newQueryParams.whereClause = whereClause;
    newQueryParams.whereClauseParameters = whereClauseParameters;


    return newQueryParams;
};

export const filterInitialValues = {
    //isDeleted: "", // values => All=""/Selling=0/Sold=1
    searchText: "",
    roleId: 0
}
export const filterFields = [
    {
        name: "onRoleId",
        lable: "MODULES.BASEINFO.ROLE.ON_TITLE",
        type: "component",
        list: [],
        component: (props) =>
            <SelectObjectsField api="api/role"
                reduxState="roles"
                sname="onRoleId"
                {...props} />
    },
];

export const RoleAccessPage = ({ id }) => {
    return (
        <FilterObjectsUIProvider>
            <SpecificationsUIProvider currentParentId={id} currentParentName="roleId" initSpecification={init}>
                <Specifications api="api/RoleAccess" reduxName="rolePermissions" columns={columns} prepareFilter={prepareFilter}
                    filterInitialValues={filterInitialValues} filterFields={filterFields} haveFullAccess={false} />
            </SpecificationsUIProvider>
        </FilterObjectsUIProvider>
        // <BaseAccessPage 
        // currentParentId={id} 
        // initSpecification={init} 
        // api="api/RoleAccess" 
        // reduxName="rolePermissions" 
        // columns={columns} 
        // prepareFilter={prepareFilter}
        // filterInitialValues={filterInitialValues} 
        // filterFields={filterFields} 
        // haveFullAccess={false} />
    )
}




