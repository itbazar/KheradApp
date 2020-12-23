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
  yearId: 0,
  // year: "",
  semesterId: 0,
  // semester: "",
  startDate : "0000-00-00",
  endDate : "0000-00-00",
  isDeleted: false
};


export const columns = [
  {
    dataField: "title",
    text: columnFormatters.translateByMessageId("MODULES.BASEINFO.TERM.TITLE"),

    sort: true,
    sortCaret: sortCaret,
  },
  // {
  //   dataField: "yearId",
  //   text: "کد سال تحصیلی",
  //   sort: true,
  //   sortCaret: sortCaret,
  // },
  {
    dataField: "year",
    text: columnFormatters.translateByMessageId("MODULES.BASEINFO.YEAR.TITLE"),

    // text: "نام سال تحصیلی",
    sort: true,
    sortCaret: sortCaret,
  },
  // {
  //   dataField: "semesterId",
  //   text: "کد نیمسال تحصیلی",
  //   sort: true,
  //   sortCaret: sortCaret,
  // },
  {
    dataField: "semester",
    text: columnFormatters.translateByMessageId("MODULES.BASEINFO.SEMESTER.TITLE"),

    // text: "نام نیمسال تحصیلی",
    sort: true,
    sortCaret: sortCaret,
  },
  {
    dataField: "startDate",
    text: columnFormatters.translateByMessageId("MODULES.BASEINFO.TERM.START"),

    // text: "شروع ترم",
    sort: true,
    sortCaret: sortCaret,
  },
  {
    dataField: "endDate",
    text: columnFormatters.translateByMessageId("MODULES.BASEINFO.TERM.END"),

    // text: "پایان ترم",
    sort: true,
    sortCaret: sortCaret,
  },
  {
    dataField: "isDeleted",
    text: "وضعیت",
    sort: true,
    sortCaret: sortCaret,
    formatter: columnFormatters.StatusColumnFormatter,
  },
  {
    dataField: "action",
    text: "عملیات",
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
        placeholder: "MODULES.BASEINFO.TERM.FORM_TITLE_PH",
        label: "MODULES.BASEINFO.TERM.FORM_TITLE",
        rowOrder: 1,
        rowIdx: 1,
        class: "col-lg-4"
      },
      {
        name: "yearId",
        type: "text",
        component: Input,
        placeholder: "MODULES.BASEINFO.YEAR.CODE_PH",
        label: "MODULES.BASEINFO.YEAR.CODE",
        rowOrder: 2,
        rowIdx: 1,
        class: "col-lg-4"
      },
      {
        name: "semesterId",
        type: "text",
        component: Input,
        placeholder: "MODULES.BASEINFO.SEMESTER.CODE_PH",
        label: "MODULES.BASEINFO.SEMESTER.CODE",
        rowOrder: 2,
        rowIdx: 1,
        class: "col-lg-4"
      },
    ]
  },
  {
    row: 1,
    list: [

      {
        name: "startDate",
        type: "text",
        component: Input,
        placeholder: "MODULES.BASEINFO.TERM.START_PH",
        label: "MODULES.BASEINFO.TERM.START",
        rowOrder: 1,
        rowIdx: 1,
        class: "col-lg-4"
      },
      {
        name: "endDate",
        type: "text",
        component: Input,
        placeholder: "MODULES.BASEINFO.TERM.END_PH",
        label: "MODULES.BASEINFO.TERM.END",
        rowOrder: 2,
        rowIdx: 1,
        class: "col-lg-4"
      },
      {
        name: "isDeleted",
        type: "option",
        component: SelectStatus,
        placeholder: "MODULES.GENERAL.STATUS",
        label: "MODULES.GENERAL.STATUS",
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

export const filterInitialValues = {
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
  yearId: Yup.number()
    .required("yearId is required"),
  semesterId: Yup.number()
    .required("semesterId is required"),
  // startDate: Yup.number()
  //   .required("startDate is required"),
  // endDate: Yup.number()
  //   .required("endDate is required"),

});

