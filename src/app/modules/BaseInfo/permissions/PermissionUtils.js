import React from 'react';
import * as Yup from "yup";
import { sortCaret } from "../../../../_themeBase/_helpers";
import * as columnFormatters from "../../../../_themeBase/layout/components/basePage/pages/objects-table/column-formatters";
import { Input } from "../../../../_themeBase/_partials/controls";
import { SelectStatus } from '../../customComponents/SelectStatus';
import { SelectObjectsField } from '../../../../_themeBase/layout/components/basePage/selectObjects/SelectObjectsField';
import { MultiSelectObjects } from '../../../../_themeBase/layout/components/basePage/pages/MultiSelectObjects';
// export {filterFields} from "../../customComponents/filterFields";


export const initObject = {
  id: undefined,
  title: "",
  roleId: 0,
  // year: "",
  groupId: 0,
  // semester: "",
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
//     <SelectObjects api="api/semester" currentState={currentState} sname="groupId" label="نیمسال" {...props} />
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
//       sname="roleId"
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
    name: "roleId",
    lable: "MODULES.BASEINFO.YEAR.TITLE",
    type: "component",
    list: [],
    component: (props) =>
      <SelectObjectsField api="api/role"
        reduxState="roles"
        sname="roleId"
        {...props} />
  },
  // {
  //   name: "groupId",
  //   lable: "MODULES.BASEINFO.SEMESTER.TITLE",
  //   type: "component",
  //   list: [],
  //   component: (props) =>
  //     <SelectObjects api="api/group"
  //       reduxState="groups"
  //       sname="groupId"
  //       {...props} />
  // },
  {
    name: "groupId",
    lable: "MODULES.BASEINFO.SEMESTER.TITLE",
    type: "component",
    list: [],
    component: (props) =>
        <MultiSelectObjects api="api/group"
          reduxState="groups"
          sname="groupId"
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
  //   dataField: "roleId",
  //   text: "کد سال تحصیلی",
  //   sort: true,
  //   sortCaret: sortCaret,
  // },
  // {
  //   dataField: "year",
  //   text: columnFormatters.translateByMessageId("MODULES.BASEINFO.YEAR.TITLE"),
  //   // text: "نام سال تحصیلی",
  //   sort: true,
  //   sortCaret: sortCaret,
  // },
  // {
  //   dataField: "groupId",
  //   text: "کد نیمسال تحصیلی",
  //   sort: true,
  //   sortCaret: sortCaret,
  // },
  // {
  //   dataField: "semester",
  //   text: columnFormatters.translateByMessageId("MODULES.BASEINFO.SEMESTER.TITLE"),

  //   // text: "نام نیمسال تحصیلی",
  //   sort: true,
  //   sortCaret: sortCaret,
  // },
  // {
  //   dataField: "startDate",
  //   text: columnFormatters.translateByMessageId("MODULES.BASEINFO.TERM.START"),

  //   // text: "شروع ترم",
  //   sort: true,
  //   sortCaret: sortCaret,
  // },
  // {
  //   dataField: "endDate",
  //   text: columnFormatters.translateByMessageId("MODULES.BASEINFO.TERM.END"),

  //   // text: "پایان ترم",
  //   sort: true,
  //   sortCaret: sortCaret,
  // },
  {
    dataField: "isDeleted",
    text: columnFormatters.translateByMessageId("MODULES.GENERAL.STATUS"),
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
        name: "title",
        type: "text",
        component: Input,
        placeholder: "MODULES.BASEINFO.TERM.FORM_TITLE_PH",
        label: "MODULES.BASEINFO.TERM.FORM_TITLE",
        rowIdx: 1,
        class: "col-lg-4"
      },
      {
        name: "roleId",
        type: "select",
        component: (props) =>
          <SelectObjectsField api="api/role"
            reduxState="roles"
            sname="roleId"
            label={columnFormatters.translateByMessageId("MODULES.BASEINFO.ROLE.TITLE")} {...props} />,
        placeholder: "MODULES.BASEINFO.ROLE.TITLE",
        label: "MODULES.BASEINFO.ROLE.TITLE",
        rowIdx: 2,
        class: "col-lg-4"
      },
      {
        name: "groupId",
        type: "select",
        component: (props) =>
          <SelectObjectsField api="api/group"
            reduxState="groups"
            sname="groupId"
            label={columnFormatters.translateByMessageId("MODULES.BASEINFO.GROUP.TITLE")} {...props} />,
        placeholder: "MODULES.BASEINFO.GROUP.TITLE",
        label: "MODULES.BASEINFO.GROUP.TITLE",
        rowIdx: 3,
        class: "col-lg-4"
      },
    ]
  },
  {
    row: 2,
    list: [

      // {
      //   name: "startDate",
      //   type: "date",
      //   component: DatePickerField,
      //   placeholder: "MODULES.BASEINFO.TERM.START_PH",
      //   label: "MODULES.BASEINFO.TERM.START",
      //   rowOrder: 1,
      //   rowIdx: 4,
      //   class: "col-lg-4"
      // },
      // {
      //   name: "endDate",
      //   type: "text",
      //   component: Input,
      //   placeholder: "MODULES.BASEINFO.TERM.END_PH",
      //   label: "MODULES.BASEINFO.TERM.END",
      //   rowOrder: 2,
      //   rowIdx: 5,
      //   class: "col-lg-4"
      // },
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
  const { isDeleted, searchText, groupId, roleId } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};
  // Filter by isDeleted
  filter.isDeleted = isDeleted !== "" ? +isDeleted : undefined;

  // Filter by roleId
  filter.roleId = roleId !== "" ? +roleId : 0;

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
    whereClauseParameters.push(filter.groupId)
  }

  if (filter.roleId > 0) {
    whereClause = whereClause + " and roleId=@2"
    whereClauseParameters.push(filter.roleId)
  }
  else {
    whereClause = whereClause + " and roleId!=@2"
    whereClauseParameters.push(filter.roleId)
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
  roleId: Yup.number()
    .required("roleId is required"),
  groupId: Yup.number()
    .required("groupId is required"),
  // startDate: Yup.number()
  //   .required("startDate is required"),
  // endDate: Yup.number()
  //   .required("endDate is required"),

});

