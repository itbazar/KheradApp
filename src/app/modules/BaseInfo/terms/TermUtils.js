import React from 'react';
import * as Yup from "yup";
import { sortCaret } from "../../../../_themeBase/_helpers";
import * as columnFormatters from "../../../../_themeBase/layout/components/basePage/pages/objects-table/column-formatters";
import { DatePickerField, Input } from "../../../../_themeBase/_partials/controls";
import { SelectStatus } from '../../customComponents/SelectStatus';
import { SelectObjectsField } from '../../../../_themeBase/layout/components/basePage/selectObjects/SelectObjectsField';
// export {filterFields} from "../../customComponents/filterFields";


export const initObject = {
  id: undefined,
  title: "",
  yearId: 0,
  // year: "",
  semesterId: 0,
  // semester: "",
  startDate : "",
  endDate : "",
  // startDate : "2021-02-17T00:00:00",
  // endDate : "2021-02-17T00:00:00",
  isDeleted: false
};



// export const SelectSemesters = (props) => {
//   const { currentState } = useSelector(
//     (state) => ({ currentState: state.semesters }),
//     shallowEqual
//   );
//   // console.log("semesters")
//   // console.log(props)
//   return (
//     <SelectObjects api="api/semester" currentState={currentState} sname="semesterId" label="نیمسال" {...props} />
//   )
// }

// export const SelectYears = (props) => {
//   const { currentState } = useSelector(
//     (state) => ({ currentState: state.years }),
//     shallowEqual
//   );
//   return (
//     <SelectObjects
//       api="api/year"
//       reduxState={currentState}
//       sname="yearId"
//       label={columnFormatters.translateByMessageId("MODULES.BASEINFO.YEAR.TITLE")}
//       {...props} />
//   )
// }


export const filterFields = [
  {
    name: "isDeleted",
    lable: "MODULES.GENERAL.STATUS",
    type: "select",
    list: [
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
    component: SelectStatus
  },
  {
    name: "yearId",
    lable: "MODULES.BASEINFO.YEAR.TITLE",
    type: "component",
    list: [],
    component: (props) =>
      <SelectObjectsField api="api/year"
        reduxState="years"
        sname="yearId"
        {...props} />
  },
  {
    name: "semesterId",
    lable: "MODULES.BASEINFO.SEMESTER.TITLE",
    type: "component",
    list: [],
    component: (props) =>
      <SelectObjectsField api="api/semester"
        reduxState="semesters"
        sname="semesterId"
        {...props} />
  },

  {
    name: "searchText",
    lable: "MODULES.GENERAL.SEARCH",
    type: "text",
    list: [],
  },

];

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
    formatter: columnFormatters.DateColumnFormatter,
  },
  {
    dataField: "endDate",
    text: columnFormatters.translateByMessageId("MODULES.BASEINFO.TERM.END"),

    // text: "پایان ترم",
    sort: true,
    sortCaret: sortCaret,
    formatter: columnFormatters.DateColumnFormatter,
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
        placeholder: "MODULES.BASEINFO.TERM.FORM_TITLE_PH",
        label: "MODULES.BASEINFO.TERM.FORM_TITLE",
        rowOrder: 1,
        rowIdx: 1,
        class: "col-lg-4"
      },
      {
        name: "yearId",
        type: "select",
        component: (props) =>
          <SelectObjectsField api="api/year"
            reduxState="years"
            sname="yearId"
            label={columnFormatters.translateByMessageId("MODULES.BASEINFO.YEAR.TITLE")} {...props} />,
        placeholder: "MODULES.BASEINFO.YEAR.CODE_PH",
        label: "MODULES.BASEINFO.YEAR.CODE",
        rowOrder: 2,
        rowIdx: 2,
        class: "col-lg-4"
      },
      {
        name: "semesterId",
        type: "select",
        component: (props) =>
          <SelectObjectsField api="api/semester"
            reduxState="semesters"
            sname="semesterId"
            label={columnFormatters.translateByMessageId("MODULES.BASEINFO.SEMESTER.TITLE")} {...props} />,
        placeholder: "MODULES.BASEINFO.SEMESTER.CODE_PH",
        label: "MODULES.BASEINFO.SEMESTER.CODE",
        rowOrder: 2,
        rowIdx: 3,
        class: "col-lg-4"
      },
    ]
  },
  {
    row: 2,
    list: [

      {
        name: "startDate",
        type: "date",
        component: DatePickerField,
        placeholder: "MODULES.BASEINFO.TERM.START_PH",
        label: "MODULES.BASEINFO.TERM.START",
        rowOrder: 1,
        rowIdx: 4,
        class: "col-lg-4"
      },
      {
        name: "endDate",
        type: "text",
        component: DatePickerField,
        placeholder: "MODULES.BASEINFO.TERM.END_PH",
        label: "MODULES.BASEINFO.TERM.END",
        rowOrder: 2,
        rowIdx: 5,
        class: "col-lg-4"
      },
      // {
      //   name: "isDeleted",
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
  isDeleted: "", // values => All=""/Selling=0/Sold=1
  searchText: "",
}


export const prepareFilter = (queryParams, values) => {
  const { isDeleted, searchText, semesterId, yearId } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};
  // Filter by isDeleted
  filter.isDeleted = isDeleted !== "" ? +isDeleted : undefined;

  // Filter by yearId
  filter.yearId = yearId !== "" ? +yearId : 0;

  // Filter by semesterId
  filter.semesterId = semesterId !== "" ? +semesterId : 0;

  // Filter by all fields
  filter.title = searchText;
  if (searchText) {
    filter.title = searchText;
  }
  newQueryParams.filter = filter;

  let whereClause = "title.contains(@0)"
  const whereClauseParameters = [];
  whereClauseParameters.push(searchText)

  if (filter.semesterId > 0) {
    whereClause = whereClause + " and semesterId=@1"
    whereClauseParameters.push(filter.semesterId)
  }
  else {
    whereClause = whereClause + " and semesterId!=@1"
    whereClauseParameters.push(filter.semesterId)
  }

  if (filter.yearId > 0) {
    whereClause = whereClause + " and yearId=@2"
    whereClauseParameters.push(filter.yearId)
  }
  else {
    whereClause = whereClause + " and yearId!=@2"
    whereClauseParameters.push(filter.yearId)
  }

  if (filter.isDeleted !== undefined) {
    whereClause = whereClause + " and isDeleted=@3"
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
  yearId: Yup.number()
    .required("yearId is required"),
  semesterId: Yup.number()
    .required("semesterId is required"),
  // startDate: Yup.number()
  //   .required("startDate is required"),
  // endDate: Yup.number()
  //   .required("endDate is required"),

});

