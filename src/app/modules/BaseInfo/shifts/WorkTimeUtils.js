import React from 'react';
import * as Yup from "yup";
import { sortCaret } from "../../../../_themeBase/_helpers";
import * as columnFormatters from "../../../../_themeBase/layout/components/basePage/pages/objects-table/column-formatters";
import { DatePickerField, Input, Select } from "../../../../_themeBase/_partials/controls";
import {
  ObjectStatusTitles,
} from '../../../../_themeBase/layout/components/basePage/pages/ObjectsUIHelpers';
export {filterFields} from "../../customComponents/filterFields";



export const SelectStatus = (props) => {
  return (
    <Select name="isDeleted" label="MODULES.GENERAL.STATUS" {...props}>
      {ObjectStatusTitles.map((isDeleted, index) => (
        <option key={isDeleted} value={index}>
          {isDeleted}
        </option>
      ))}
    </Select>
  )
}


export const initObject = {
  id: undefined,
  title: "",
  yearId: 0,
  year: "",
  semesterId: 0,
  semester: "",
  termDateStart : "0000-00-00",
  termDateEnd : "0000-00-00",
  isDeleted: false
};

export const columns = [
  {
    dataField: "title",
    text: columnFormatters.translateByMessageId("MODULES.BASEINFO.WORKTIME.TITLE"),
    // text: "نام ساعت کاری",
    sort: true,
    sortCaret: sortCaret,
  },
  {
    dataField: "yearId",
    text: columnFormatters.translateByMessageId("MODULES.BASEINFO.WORKTIME.DURATION"),
    // text: "طول ساعت کاری",
    sort: true,
    sortCaret: sortCaret,
  },
  {
    dataField: "year",
    text: columnFormatters.translateByMessageId("MODULES.BASEINFO.WORKTIME.ENTRANCE"),
    // text: "ساعت ورود",
    sort: true,
    sortCaret: sortCaret,
  },
  {
    dataField: "semesterId",
    text: columnFormatters.translateByMessageId("MODULES.BASEINFO.WORKTIME.LEAVING"),
    // text: "ساعت خروج",
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
        placeholder: "MODULES.BASEINFO.WORKTIME.TITLE_PH",
        label: "MODULES.BASEINFO.WORKTIME.TITLE",
        // placeholder: "نام ساعت کاری",
        // label: "نام ساعت کاری",
        rowOrder: 1,
        rowIdx: 1,
        class: "col-lg-4"
      },
      {
        name: "yearId",
        type: "text",
        component: Input,
        placeholder: "MODULES.BASEINFO.WORKTIME.DURATION_PH",
        label: "MODULES.BASEINFO.WORKTIME.DURATION_PH",
        // placeholder: "طول ساعت کاری",
        // label: "طول ساعت کاری",
        rowOrder: 2,
        rowIdx: 1,
        class: "col-lg-4"
      },
      {
        name: "semesterId",
        type: "text",
        component: Input,
        placeholder: "MODULES.BASEINFO.WORKTIME.LEAVING_PH",
        label: "MODULES.BASEINFO.WORKTIME.LEAVING_PH",
        // placeholder: "ساعت خروج",
        // label: "ساعت خروج",
        rowOrder: 2,
        rowIdx: 1,
        class: "col-lg-4"
      },
    ]
  },
  {
    row: 1,
    list: [

      // {
      //   name: "termDateStart",
      //   type: "text",
      //   component: Input,
      //   placeholder: "MODULES.BASEINFO.WORKTIME.TITLE_PH",
      //   label: "MODULES.BASEINFO.WORKTIME.TITLE_PH",
      //   // placeholder: "شروع ترم",
      //   // label: "شروع ترم",
      //   rowOrder: 1,
      //   rowIdx: 1,
      //   class: "col-lg-4"
      // },
      // {
      //   name: "termDateEnd",
      //   type: "text",
      //   component: Input,
      //   placeholder: "MODULES.BASEINFO.WORKTIME.TITLE_PH",
      //   label: "MODULES.BASEINFO.WORKTIME.TITLE_PH",
      //   // placeholder: "پایان ترم",
      //   // label: "پایان ترم",
      //   rowOrder: 2,
      //   rowIdx: 1,
      //   class: "col-lg-4"
      // },
      // {
      //   name: "isDeleted",
      //   type: "option",
      //   component: SelectStatus,
      //   // placeholder: "وضعیت",
      //   // label: "وضعیت",
      //   rowOrder: 2,
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
  isDeleted: "", // values => All=""/Selling=0/Sold=1
  searchText: "",
}
// export const filterFields = [
//   {
//     name: "isDeleted",
//     lable: "وضعیت",
//     type: "select",
//     list: [
//       {
//         value: "",
//         lable: "همه",
//       },
//       {
//         value: "0",
//         lable: "فعال",
//       },
//       {
//         value: "1",
//         lable: "حذف شده",
//       },

//     ],
//     component: SelectStatus
//   },
//   {
//     name: "searchText",
//     lable: "جستجو",
//     type: "text",
//     list: [],
//   },

// ];


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
  termDateStart: Yup.number()
    .required("termDateStart is required"),
  termDateEnd: Yup.number()
    .required("termDateEnd is required"),

});

