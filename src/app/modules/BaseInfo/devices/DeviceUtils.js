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
  deviceGroupId: 0,
  // deviceGroup: "",
  serialCode:"",
  relationCode:0,
  ipAddress:"",
  portNumber:0,
  isDeleted: false
};

export const columns = [
  {
    dataField: "title",
    text:columnFormatters.translateByMessageId("MODULES.BASEINFO.DEVICE.FORM_TITLE"),
    sort: true,
    sortCaret: sortCaret,
  },
  
  // {
  //   dataField: "deviceGroup",
  //   text: "نام گروه ",
  //   sort: true,
  //   sortCaret: sortCaret,
  // },
  {
    dataField: "serialCode",
    text: "شماره سریال ",
    sort: true,
    sortCaret: sortCaret,
  },
  {
    dataField: "relationCode",
    text: "شماره کد ارتباط  ",
    sort: true,
    sortCaret: sortCaret,
  },
  {
    dataField: "ipAddress",
    text: "آدرس IP",
    sort: true,
    sortCaret: sortCaret,
  },
  {
    dataField: "portNumber",
    text: " پورت ",
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
  // {
  //   dataField: "action",
  //   text: "عملیات",
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
        placeholder: "MODULES.BASEINFO.DEVICE.FORM_TITLE",
        label: "MODULES.BASEINFO.DEVICE.FORM_TITLE",
        rowIdx: 1,
        class: "col-lg-4"
      },
      {
        name: "deviceGroupId",
        type: "text",
        component: (props) =>
        <SelectObjects api="api/DeviceGroup"
          reduxState="deviceTypes"
          sname="deviceGroupId"
          label={columnFormatters.translateByMessageId("MODULES.BASEINFO.DORM.FORM_TITLE")} {...props} />,
        placeholder: "MODULES.BASEINFO.DEVICETYPE.FORM_TITLE_PH",
        label: "MODULES.BASEINFO.DEVICETYPE.FORM_TITLE_PH",
        rowIdx: 2,
        class: "col-lg-4"
      },
      
    ]
  },
  {
    row: 2,
    list: [
      {
        name: "serialCode",
        type: "text",
        component: Input,
        placeholder: "شماره سریال",
        label: "شماره سریال",
        rowIdx: 3,
        class: "col-lg-4"
      },
      {
        name: "relationCode",
        type: "text",
        component: Input,
        placeholder: "کد گروه دستگاه",
        label: "کد گروه دستگاه",
        rowIdx: 4,
        class: "col-lg-4"
      },
      {
        name: "ipAddress",
        type: "option",
        component: Input,
        placeholder: "آدرس IP",
        label: "آدرس IP",
        rowIdx: 5,
        class: "col-lg-3"
      },
      {
        name: "portNumber",
        type: "option",
        component: Input,
        placeholder: "پورت",
        label: "پورت",
        rowIdx: 6,
        class: "col-lg-1"
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
    name: "deviceGroupId",
    lable: "MODULES.BASEINFO.DORM.TITLE",
    type: "component",
    list: [],
    component:  (props) =>
    <SelectObjects api="api/DeviceGroup"
      reduxState="deviceTypes"
      sname="deviceGroupId"
      {...props} />,
  },
  {
    name: "searchText",
    lable: "جستجو",
    type: "text",
    list: [],
  },

];


export const prepareFilter = (queryParams, values) => {
  const { isDeleted, searchText,deviceGroupId } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};
  // Filter by isDeleted
  filter.isDeleted = isDeleted !== "" ? +isDeleted : undefined;

 // Filter by deviceGroupId
 filter.deviceGroupId = deviceGroupId !== "" ? +deviceGroupId : 0;

  // Filter by all fields
  filter.title = searchText;
  if (searchText) {
    filter.title = searchText;
  }
  newQueryParams.filter = filter;
 
  let whereClause = "title.contains(@0)"
  const whereClauseParameters = [];
  whereClauseParameters.push(searchText)

  if (filter.deviceGroupId > 0) {
    whereClause = whereClause + " and deviceGroupId=@1"
    whereClauseParameters.push(filter.deviceGroupId)
  }
  else {
    whereClause = whereClause + " and deviceGroupId!=@1"
    whereClauseParameters.push(0)
  }

if(filter.isDeleted != undefined){
  whereClause = whereClause + " and isDeleted=@2"
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
  deviceGroupId: Yup.number()
    .required("deviceGroupId is required"),
  
    relationCode: Yup.number()
    .required("relationCode is required"),
    ipAddress: Yup.string()
    .required("ipAddress is required"),
    portNumber: Yup.number()
    .required("portNumber is required"),

});

