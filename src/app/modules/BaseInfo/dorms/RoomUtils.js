import React from 'react';
import * as Yup from "yup";
import { sortCaret } from "../../../../_themeBase/_helpers";
import * as columnFormatters from "../../../../_themeBase/layout/components/basePage/pages/objects-table/column-formatters";
import { Input } from "../../../../_themeBase/_partials/controls";
import { SelectStatus } from '../../customComponents/SelectStatus';
import { SelectObjects } from '../../../../_themeBase/layout/components/basePage/pages/SelectObjects';


export const initObject = {
  id: undefined,
  title: "",
  dormId: 0,
  dormTitle: "",
  blockId: 0,
  blockTitle: "",
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
    dataField: "dormTitle",
    text: columnFormatters.translateByMessageId("MODULES.BASEINFO.DORM.TITLE"),
    sort: true,
    sortCaret: sortCaret,
  },
  {
    dataField: "blockTitle",
    text: columnFormatters.translateByMessageId("MODULES.BASEINFO.BLOCK.FORM_TITLE"),
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
  // {
  //   dataField: "action",
  //   text: columnFormatters.translateByMessageId("MODULES.GENERAL.ACTION"),
  //   // text: "Actions",
  //   formatter: columnFormatters.ActionsColumnFormatter,
  //   formatExtraData: {
  //     // openEditObjectPage: objectsUIProps.openEditObjectPage,
  //     // openDeleteObjectDialog: objectsUIProps.openDeleteObjectDialog,
  //   },
  //   classes: "text-right pr-0",
  //   headerClasses: "text-right pr-3",
  //   style: {
  //     minWidth: "100px",
  //   },
  // },
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
        rowIdx: 1,
        class: "col-lg-4"
      },
      {
        name: "dormId",
        type: "option",
        component: (props) =>
          <SelectObjects api="api/dorm"
            reduxState="dorms"
            sname="dormId"
            label={columnFormatters.translateByMessageId("MODULES.BASEINFO.DORM.FORM_TITLE")} {...props} />,
        placeholder: "MODULES.BASEINFO.DORM.FORM_TITLE",
        label: "MODULES.BASEINFO.DORM.FORM_TITLE",
        rowIdx: 2,
        class: "col-lg-4"
      },
      {
        name: "blockId",
        type: "option",
        component: (props) =>
          <SelectObjects api="api/block"
            reduxState="blocks"
            sname="blockId"
            label={columnFormatters.translateByMessageId("MODULES.BASEINFO.BLOCK.FORM_TITLE")} {...props} />,
        placeholder: "MODULES.BASEINFO.BLOCK.FORM_TITLE",
        label: "MODULES.BASEINFO.BLOCK.FORM_TITLE",
        rowIdx: 3,
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
  takeCount: 5,

  whereClauseSelect: "",
  whereClauseParametersSelect: [
  ],
};

export const filterInitialValues = {
  isDeleted: "", // values => All=""/Selling=0/Sold=1
  searchText: "",
}

export const filterFields = [
  {
    name: "isDeleted",
    lable: "وضعیت",
    type: "select",
    list: [
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
    component: SelectStatus
  },
  {
    name: "dormId",
    lable: "MODULES.BASEINFO.DORM.TITLE",
    type: "component",
    list: [],
    component: (props) =>
      <SelectObjects api="api/dorm"
        reduxState="dorms"
        sname="dormId"
        {...props} />
  },
  {
    name: "blockId",
    lable: "MODULES.BASEINFO.BLOCK.FORM_TITLE",
    type: "component",
    list: [],
    component: (props) =>
      <SelectObjects api="api/block"
        reduxState="blocks"
        sname="blockId"
        {...props} />
  },
  {
    name: "searchText",
    lable: "جستجو",
    type: "text",
    list: [],
  },

];


export const prepareFilter = (queryParams, values) => {
  const { isDeleted, searchText,dormId,blockId } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};
  // Filter by isDeleted
  filter.isDeleted = isDeleted !== "" ? +isDeleted : undefined;

 // Filter by dormId
 filter.dormId = dormId !== "" ? +dormId : 0;

 // Filter by blockId
 filter.blockId = blockId !== "" ? +blockId : 0;

  // Filter by all fields
  filter.title = searchText;
  if (searchText) {
    filter.title = searchText;
  }
  newQueryParams.filter = filter;

  let whereClause = "title.contains(@0)"
  const whereClauseParameters = [];
  whereClauseParameters.push(searchText)

  if (filter.dormId > 0) {
    whereClause = whereClause + " and dormId=@1"
    whereClauseParameters.push(filter.dormId)
  }
  else {
    whereClause = whereClause + " and dormId!=@1"
    whereClauseParameters.push(0)
  }
  
  if (filter.blockId > 0) {
    whereClause = whereClause + " and blockId=@2"
    whereClauseParameters.push(filter.blockId)
  }
  else {
    whereClause = whereClause + " and blockId!=@2"
    whereClauseParameters.push(0)
  }

  if (filter.isDeleted != undefined) {
    whereClause = whereClause + " and isDeleted=@3"
    whereClauseParameters.push(filter.isDeleted == 0 ? false : true)
  }

  newQueryParams.whereClause = whereClause;
  newQueryParams.whereClauseParameters = whereClauseParameters;

  
  let wSelect = ""
  const wParametersSelect = [];
  if (dormId > 0) {
    wSelect = wSelect + "dormId=@0"
    wParametersSelect.push(dormId)
  }
  else {
    wSelect = wSelect + "dormId!=@0"
    wParametersSelect.push(0)
  }
  newQueryParams.whereClauseSelect = wSelect;
  newQueryParams.whereClauseParametersSelect = wParametersSelect;

  return newQueryParams;
};


export const selectFilter = {
  whereClause: "",
  whereClauseParameters: [

  ],
  orderCluase: "id asc ",
  skipCount: 0,
  takeCount: 100
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

