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
    collageId:0,
    // collage: "",
    isDeleted: false
  };
  
  export const columns = [
    {
      dataField: "title",
     
      text: columnFormatters.translateByMessageId("MODULES.BASEINFO.FIELD.TITLE"),
      // text: "نام رشته",
      sort: true,
      sortCaret: sortCaret,
    },
    // {
    //   dataField: "collageId",
    //   text: "کد دانشکده",
    //   sort: true,
    //   sortCaret: sortCaret,
    // },
    {
      dataField: "collage",
      text: columnFormatters.translateByMessageId("MODULES.BASEINFO.FIELD.FORM_TITLE"),
      // text: "نام دانشکده",
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
          placeholder: "MODULES.BASEINFO.FIELD.TITLE_PH",
          label: "MODULES.BASEINFO.FIELD.TITLE",
          // placeholder: "نام رشته",
          // label: "نام رشته",
          rowOrder: 1,
          rowIdx: 1,
          class: "col-lg-4"
        },
        {
          name: "collageId",
          type: "text",
          component: Input,
          placeholder: "MODULES.BASEINFO.COLLAGE.CODE_PH",
          label: "MODULES.BASEINFO.COLLAGE.CODE",
          // placeholder: "کد دانشکده",
          // label: "کد دانشکده",
          rowOrder: 2,
          rowIdx: 2,
          class: "col-lg-4"
        },
        {
          name: "isDeleted",
          type: "option",
          component: SelectStatus,
          placeholder: "MODULES.GENERAL.STATUS",
          label: "MODULES.GENERAL.STATUS",
          rowIdx: 2,
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
  collageId: Yup.number()
      .required("collageId is required"),
   
  });
  
  