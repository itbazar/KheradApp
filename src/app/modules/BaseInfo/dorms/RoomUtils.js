import React from 'react';
import * as Yup from "yup";
import { sortCaret } from "../../../../_themeBase/_helpers";
import * as columnFormatters from "../../../../_themeBase/layout/components/basePage/pages/objects-table/column-formatters";
import { Input } from "../../../../_themeBase/_partials/controls";
import { SelectStatus } from '../../customComponents/SelectStatus';
export {filterFields} from "../../customComponents/filterFields";
 
  
  export const initObject = {
    id: undefined,
    title: "",
    dormId:0,
    // dorm: "",
    blockId:0,
    // block: "",
    isDeleted: false
  };
  
  export const columns = [
    {
      dataField: "title",
      text: "نام اتاق",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "dormId",
      text: "کد سرا",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "dorm",
      text: "نام سرا",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "blockId",
      text: "کد بلاک",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "block",
      text: "نام بلاک",
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
          placeholder: "نام اتاق",
          label: "نام اتاق",
          rowOrder: 1,
          rowIdx: 1,
          class: "col-lg-4"
        },
        {
          name: "dormId",
          type: "text",
          component: Input,
          placeholder: "کد سرا",
          label: "کد سرا",
          rowOrder: 2,
          rowIdx: 1,
          class: "col-lg-4"
        },
        {
          name: "blockId",
          type: "text",
          component: Input,
          placeholder: "کد بلاک",
          label: "کد بلاک",
          rowOrder: 2,
          rowIdx: 1,
          class: "col-lg-4"
        },
        {
          name: "isDeleted",
          type: "option",
          component: SelectStatus,
          placeholder: "وضعیت",
          label: "وضعیت",
          rowOrder: 2,
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
  
  export const initialFilter = {
    filter: {
      title: "",
    },
    sortOrder: "asc", // asc||desc
    sortField: "title",
    pageNumber: 1,
    pageSize: 10,

    whereClause: "",
    whereClauseParameters: [
      
    ],
    orderCluase: "id asc ",
    skipCount: 0,
    takeCount: 5
  };
  
  export const filterInitialValues ={
    isDeleted: "", // values => All=""/Selling=0/Sold=1
    searchText: "",
  }
  export const filterFields111 = [
    {
      name: "isDeleted",
      lable: "وضعیت",
      type: "select",
      list:[
        {
          value: "",
          lable: "همه",
        },
        {
          value: "0",
          lable: "فعال",
        },
        {
          value: "1",
          lable: "حذف شده",
        },
      
      ],
      component:SelectStatus
    },
    {
      name: "searchText",
      lable: "جستجو",
      type: "text",
      list:[],
    },
  
  ];
  
  
  export const prepareFilter = (queryParams, values) => {
    const { isDeleted, searchText } = values;
    const newQueryParams = { ...queryParams };
    const filter = {};
    // Filter by isDeleted
    filter.isDeleted = isDeleted !== "" ? +isDeleted : undefined;
  
    // Filter by all fields
    filter.title = searchText;
    if (searchText) {
      filter.title = searchText;
    }
    newQueryParams.filter = filter;
   
    let whereClause = "title.contains(@0)"
    const whereClauseParameters = [];
    whereClauseParameters.push(searchText)
  
  if(filter.isDeleted != undefined){
    whereClause = whereClause + " and isDeleted=@1"
    whereClauseParameters.push(filter.isDeleted == 0 ? false : true)
  }
  
   newQueryParams.whereClause = whereClause;
   newQueryParams.whereClauseParameters = whereClauseParameters;
  
    return newQueryParams;
  };

  
// Validation schema
export const ObjectEditSchema = Yup.object().shape({
  title: Yup.string()
      .required("title is required"),
  dormId: Yup.number()
      .required("dormId is required"),
      blockId: Yup.number()
      .required("blockId is required"),
   
  });
  
  