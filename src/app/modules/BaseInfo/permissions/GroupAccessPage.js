import React from 'react';
import { Specifications } from '../../../../_themeBase/layout/components/basePage/insidePages/Specifications';
import { SpecificationsUIProvider } from '../../../../_themeBase/layout/components/basePage/insidePages/SpecificationsUIContext';
import { FilterObjectsUIProvider } from '../../../../_themeBase/layout/components/basePage/pages/FilterObjectsUIContext';
import { SelectObjectsField } from '../../../../_themeBase/layout/components/basePage/selectObjects/SelectObjectsField';

const init = {
    id: undefined,
    roleId: 0,
    groupId: 0,
    subGroupId: 0,
    allowed: true,
    isDeleted: false,
};


export const prepareFilter = (queryParams, values) => {
    const { allowed, roleId, groupId,subGroupId } = values;
    const newQueryParams = { ...queryParams };
    const filter = {};
    // Filter by allowed
    filter.allowed = allowed !== "" ? +allowed : undefined;

    // Filter by roleId
    filter.roleId = roleId !== "" ? +roleId : 0;

    // Filter by roleId
    filter.groupId = groupId !== "" ? +groupId : 0;

    // Filter by subGroupId
    filter.subGroupId = subGroupId !== "" ? +subGroupId : 0;

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

    if (filter.groupId > 0) {
        whereClause = whereClause + " and groupId=@1"
        whereClauseParameters.push(filter.groupId)
    }
    else {
        whereClause = whereClause + " and groupId!=@1"
        whereClauseParameters.push(0)
    }

    if (filter.subGroupId > 0) {
        whereClause = whereClause + " and subGroupId=@2"
        whereClauseParameters.push(filter.subGroupId)
    }
    else {
        whereClause = whereClause + " and subGroupId!=@2"
        whereClauseParameters.push(0)
    }

    // if (filter.isDeleted != undefined) {
    //     whereClause = whereClause + " and isDeleted=@1"
    //     whereClauseParameters.push(filter.isDeleted == 0 ? false : true)
    // }

    newQueryParams.whereClause = whereClause;
    newQueryParams.whereClauseParameters = whereClauseParameters;


    let wSelect = ""
    const wParametersSelect = [];
    if (groupId > 0) {
      wSelect = wSelect + "groupId=@0"
      wParametersSelect.push(groupId)
    }
    else {
      wSelect = wSelect + "groupId!=@0"
      wParametersSelect.push(0)
    }
    newQueryParams.whereClauseSelect = wSelect;
    newQueryParams.whereClauseParametersSelect = wParametersSelect;


    return newQueryParams;
};

export const filterInitialValues = {
    //isDeleted: "", // values => All=""/Selling=0/Sold=1
    searchText: "",
    roleId: 0
}
export const filterFields = [
    {
        name: "groupId",
        lable: "MODULES.BASEINFO.Group.FORM_TITLE",
        type: "component",
        list: [],
        component: (props) =>
            <SelectObjectsField api="api/group"
                reduxState="groups"
                sname="groupId"
                {...props} />
    },
    {
        name: "subGroupId",
        lable: "MODULES.BASEINFO.SubGroup.FORM_TITLE",
        type: "component",
        list: [],
        component: (props) =>
            <SelectObjectsField api="api/subgroup"
                reduxState="subGroups"
                sname="subGroupId"
                {...props} />
    },

];

export const GroupAccessPage = ({ id }) => {
    return (
        <FilterObjectsUIProvider>
            <SpecificationsUIProvider currentParentId={id} initSpecification={init}>
                <Specifications api="api/GroupAccess" reduxName="groupPermissions" prepareFilter={prepareFilter}
                    filterInitialValues={filterInitialValues} filterFields={filterFields} />
            </SpecificationsUIProvider>
            </FilterObjectsUIProvider>
    )
}




