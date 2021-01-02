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
  collageId: 0,
  collageTitle: "",
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
  {
    dataField: "collageTitle",
    text: columnFormatters.translateByMessageId("MODULES.BASEINFO.COLLAGE.TITLE"),
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
        rowIdx: 1,
        class: "col-lg-4"
      },
      {
        name: "collageId",
        type: "option",
        component: (props) =>
          <SelectObjects api="api/collage"
            reduxState="collages"
            sname="collageId"
            label={columnFormatters.translateByMessageId("MODULES.BASEINFO.COLLAGE.TITLE")} {...props} />,
        placeholder: "MODULES.BASEINFO.COLLAGE.TITLE",
        label: "MODULES.BASEINFO.COLLAGE.CODE",
        // placeholder: "کد دانشکده",
        // label: "کد دانشکده",
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
    name: "collageId",
    lable: "MODULES.BASEINFO.DORM.TITLE",
    type: "component",
    list: [],
    component: (props) =>
      <SelectObjects api="api/collage"
        reduxState="collages"
        sname="collageId"
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
  const { isDeleted, searchText,collageId } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};
  // Filter by isDeleted
  filter.isDeleted = isDeleted !== "" ? +isDeleted : undefined;

  // Filter by collageId
  filter.collageId = collageId !== "" ? +collageId : 0;

  // Filter by all fields
  filter.title = searchText;
  if (searchText) {
    filter.title = searchText;
  }
  newQueryParams.filter = filter;

  let whereClause = "title.contains(@0)"
  const whereClauseParameters = [];
  whereClauseParameters.push(searchText)

  if (filter.collageId > 0) {
    whereClause = whereClause + " and collageId=@1"
    whereClauseParameters.push(filter.collageId)
  }
  else {
    whereClause = whereClause + " and collageId!=@1"
    whereClauseParameters.push(0)
  }

  if (filter.isDeleted != undefined) {
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
  collageId: Yup.number()
    .required("collageId is required"),

});

