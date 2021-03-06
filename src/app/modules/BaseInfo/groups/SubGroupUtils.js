import React from 'react';
import * as Yup from "yup";
import { sortCaret } from "../../../../_themeBase/_helpers";
import * as columnFormatters from "../../../../_themeBase/layout/components/basePage/pages/objects-table/column-formatters";
import { Input } from "../../../../_themeBase/_partials/controls";
import { SelectStatus } from '../../customComponents/SelectStatus';
import { SelectObjectsField } from '../../../../_themeBase/layout/components/basePage/selectObjects/SelectObjectsField';
 
  
  export const initObject = {
    id: undefined,
    title: "",
    groupId:0,
    groupTitle: "",
    isDeleted: false
  };
  
  export const columns = [
    {
      dataField: "title",
      text:  columnFormatters.translateByMessageId("MODULES.BASEINFO.SubGroup.FORM_TITLE"),
      sort: true,
      sortCaret: sortCaret,
    },
   
    {
      dataField: "groupTitle",
      text:  columnFormatters.translateByMessageId("MODULES.BASEINFO.Group.FORM_TITLE"),
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "IsDeleted",
      text: columnFormatters.translateByMessageId("MODULES.GENERAL.STATUS"),
      // text: "وضعیت",
      sort: true,
      sortCaret: sortCaret,
      formatter: columnFormatters.StatusColumnFormatter,
    },
    {
      dataField: "action",
      text: columnFormatters.translateByMessageId("MODULES.GENERAL.ACTION"),
      // text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        // openEditObjectPage: objectsUIProps.openEditObjectPage,
        // openDeleteObjectDialog: objectsUIProps.openDeleteObjectDialog,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];
  
  export const formFields = [
    {
      row: 1,
      list: [
        {
          name: "title",
          type: "text",
          component: Input,
          placeholder: "MODULES.BASEINFO.SubGroup.FORM_TITLE",
          label: "MODULES.BASEINFO.SubGroup.FORM_TITLE",
          rowIdx: 1,
          class: "col-lg-4"
        },
        {
          name: "groupId",
          type: "text",
          component:(props) =>
          <SelectObjectsField api="api/group"
            reduxState="groups"
            sname="groupId"
            label={columnFormatters.translateByMessageId("MODULES.BASEINFO.Group.FORM_TITLE")} {...props} />,
          placeholder:"MODULES.BASEINFO.Group.FORM_TITLE",
          label: "MODULES.BASEINFO.Group.FORM_TITLE",
          rowIdx: 2,
          class: "col-lg-4"
        },
       
      ]
    },
  
  ];
  
  export const otherFields = [
    // {
    //   name: "description",
    //   lable: "Description",
    //   type: "textarea",
    //   as: "textarea",
    //   rowOrder: 1,
    //   rowIdx: 1,
    //   class: "form-control"
    // },
  
  ];
  
  
  
  export const filterInitialValues ={
    isDeleted: "", // values => All=""/Selling=0/Sold=1
    searchText: "",
  }
  export const filterFields = [
    {
      name: "isDeleted",
      lable: "MODULES.GENERAL.STATUS",
      type: "select",
      list:[
        {
          value: "",
          lable: "MODULES.GENERAL.STATUSALL",
        },
        {
          value: "0",
          lable: "MODULES.GENERAL.STATUSENABLE",
        },
        {
          value: "1",
          lable: "MODULES.GENERAL.STATUSDELETED",
        },
      
      ],
      component:SelectStatus
    },
    {
      name: "groupId",
      lable: "MODULES.BASEINFO.DORM.TITLE",
      type: "component",
      list: [],
      component: (props) =>
        <SelectObjectsField api="api/group"
          reduxState="groups"
          sname="groupId"
          {...props} />
    },
    {
      name: "searchText",
      lable: "MODULES.GENERAL.SEARCH",
      type: "text",
      list:[],
    },
  
  ];
  
  
  export const prepareFilter = (queryParams, values) => {
    const { isDeleted, searchText,groupId } = values;
    const newQueryParams = { ...queryParams };
    const filter = {};
    // Filter by isDeleted
    filter.isDeleted = isDeleted !== "" ? +isDeleted : undefined;
  
  // Filter by groupId
  filter.groupId = groupId !== "" ? +groupId : 0;

    // Filter by all fields
    filter.title = searchText;
    if (searchText) {
      filter.title = searchText;
    }
    newQueryParams.filter = filter;
   
    let whereClause = "title.contains(@0)"
    const whereClauseParameters = [];
    whereClauseParameters.push(searchText)
  
    if (filter.groupId > 0) {
      whereClause = whereClause + " and groupId=@1"
      whereClauseParameters.push(filter.groupId)
    }
    else {
      whereClause = whereClause + " and groupId!=@1"
      whereClauseParameters.push(0)
    }

  if(filter.isDeleted !== undefined){
    whereClause = whereClause + " and isDeleted=@2"
    whereClauseParameters.push(filter.isDeleted === 0 ? false : true)
  }
  
   newQueryParams.whereClause = whereClause;
   newQueryParams.whereClauseParameters = whereClauseParameters;
  
    return newQueryParams;
  };

  
// Validation schema
export const ObjectEditSchema = Yup.object().shape({
  title: Yup.string()
      .required("title is required"),
  groupId: Yup.number()
      .required("groupId is required"),
   
  });
  
  