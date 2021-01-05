import React from 'react';
import * as Yup from "yup";
import { sortCaret } from "../../../../_themeBase/_helpers";
import * as columnFormatters from "../../../../_themeBase/layout/components/basePage/pages/objects-table/column-formatters";
import {  DatePickerField, Input } from "../../../../_themeBase/_partials/controls";


export const initObject = {
  id: undefined,
  weekday: "",
  weekdaySolar: "",
  dateSolar: "",
  date : "2021-02-17T00:00:00",
  holiday: false
};


export const filterFields = [
  // {
  //   name: "holiday",
  //   lable: "MODULES.GENERAL.STATUS",
  //   type: "select",
  //   list: [
  //     {
  //       value: "",
  //       lable: "MODULES.GENERAL.STATUSALL",
  //     },
  //     {
  //       value: "0",
  //       lable: "MODULES.GENERAL.STATUSENABLE",
  //     },
  //     {
  //       value: "1",
  //       lable: "MODULES.GENERAL.STATUSDELETED",
  //     },

  //   ],
  //   component: SelectStatus
  // },

  {
    name: "searchText",
    lable: "MODULES.GENERAL.SEARCH",
    type: "text",
    list: [],
  },

];

export const columns = [
  
  {
    dataField: "date",
    text: columnFormatters.translateByMessageId("تاریخ"),
    // text: "نام سال تحصیلی",
    sort: true,
    sortCaret: sortCaret,
  },
  {
    dataField: "weekday",
    text: columnFormatters.translateByMessageId("روز هفته"),
    sort: true,
    sortCaret: sortCaret,
  },
 
  {
    dataField: "weekdaySolar",
    text: columnFormatters.translateByMessageId("weekdaySolar"),
    sort: true,
    sortCaret: sortCaret,
  },
  {
    dataField: "dateSolar",
    text: columnFormatters.translateByMessageId("dateSolar"),
    sort: true,
    sortCaret: sortCaret,
  },
  {
    dataField: "holiday",
    text: "وضعیت",
    sort: true,
    sortCaret: sortCaret,
    formatter: columnFormatters.StatusColumnFormatter,
  },
  
];

export const formFields = [
  {
    row: 1,
    list: [
      {
        name: "weekday",
        type: "text",
        component: Input,
        placeholder: "MODULES.BASEINFO.TERM.FORM_TITLE_PH",
        label: "MODULES.BASEINFO.TERM.FORM_TITLE",
        rowIdx: 1,
        class: "col-lg-4"
      },
      {
        name: "date",
        type: "date",
        component: DatePickerField,
        placeholder: "MODULES.BASEINFO.TERM.START_PH",
        label: "MODULES.BASEINFO.TERM.START",
        rowIdx: 2,
        class: "col-lg-4"
      },
      {
        name: "weekdaySolar",
        type: "text",
        component: Input,
        placeholder: "MODULES.BASEINFO.TERM.END_PH",
        label: "MODULES.BASEINFO.TERM.END",
        rowIdx: 3,
        class: "col-lg-4"
      },
    ]
  },
  {
    row: 2,
    list: [
      {
        name: "dateSolar",
        type: "text",
        component: Input,
        placeholder: "MODULES.BASEINFO.TERM.END_PH",
        label: "MODULES.BASEINFO.TERM.END",
        rowIdx: 4,
        class: "col-lg-4"
      },
      // {
      //   name: "holiday",
      //   type: "option",
      //   component: Checkbox,
      //   placeholder: "MODULES.GENERAL.STATUS",
      //   label: "MODULES.GENERAL.STATUS",
      //   rowOrder: 2,
      //   rowIdx: 6,
      //   class: "col-lg-4"
      // },

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


export const filterInitialValues = {
  holiday: "", // values => All=""/Selling=0/Sold=1
  searchText: "",
}


export const prepareFilter = (queryParams, values) => {
  const { holiday, searchText } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};
  // Filter by holiday
  filter.holiday = holiday !== "" ? +holiday : undefined;

  // Filter by all fields
  filter.weekday = searchText;
  if (searchText) {
    filter.weekday = searchText;
  }
  newQueryParams.filter = filter;

  let whereClause = "weekday.contains(@0)"
  const whereClauseParameters = [];
  whereClauseParameters.push(searchText)

  if (filter.holiday !== undefined) {
    whereClause = whereClause + " and holiday=@1"
    whereClauseParameters.push(filter.holiday === 0 ? false : true)
  }

  newQueryParams.whereClause = whereClause;
  newQueryParams.whereClauseParameters = whereClauseParameters;

  return newQueryParams;
};


// Validation schema
export const ObjectEditSchema = Yup.object().shape({
  date: Yup.string()
    .required("date is required"),
  // yearId: Yup.number()
  //   .required("yearId is required"),
  // semesterId: Yup.number()
  //   .required("semesterId is required"),
  // date: Yup.number()
  //   .required("date is required"),
  // endDate: Yup.number()
  //   .required("endDate is required"),

});

