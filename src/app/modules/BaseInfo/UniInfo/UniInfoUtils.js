import * as Yup from "yup";
import { sortCaret } from "../../../../_themeBase/_helpers";
import * as columnFormatters from "../../../../_themeBase/layout/components/basePage/pages/objects-table/column-formatters";
import { Input } from "../../../../_themeBase/_partials/controls";

export { filterFields } from "../../customComponents/filterFields";

export const initObject = {
  id: undefined,
  title: "",
  code: 0,
  address: "",
  tel: "",
  postalCode: "",
  usersActiveCount: "",
  manager: "",
  managerTel: "",
  foodManager: "",
  foodManagerTel: " ",
  dormManager: " ",
  dormManagerTel: " ",
  sportManager: " ",
  sportManagerTel: " ",
  officialManager: "",
  officialManagerTel: " ",
  isDeleted: false,
};

export const columns = [
  {
    dataField: "title",
    text: columnFormatters.translateByMessageId(
      "MODULES.BASEINFO.UNIINFO.TITLE"
    ),
    sort: true,
    sortCaret: sortCaret,
  },
  {
    dataField: "code",
    text: columnFormatters.translateByMessageId(
      "MODULES.BASEINFO.UNIINFO.CODE"
    ),
    sort: true,
    sortCaret: sortCaret,
  },
  {
    dataField: "address",
    // text: "آدرس",
    text: columnFormatters.translateByMessageId("MODULES.GENERAL.ADDRESS"),

    sort: true,
    sortCaret: sortCaret,
  },
  {
    dataField: "tel",
    text: columnFormatters.translateByMessageId("MODULES.GENERAL.TELEPHONE"),

    // text: "شماره تماس",
    sort: true,
    sortCaret: sortCaret,
  },
  {
    dataField: "postalCode",
    text: columnFormatters.translateByMessageId("MODULES.GENERAL.POSTALCODE"),

    // text: "کد پستی ",
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
        label: "MODULES.BASEINFO.UNIINFO.TITLE",
        placeholder: "MODULES.BASEINFO.UNIINFO.TITLE_PH",
        rowIdx: 1,
        class: "col-lg-4",
      },
      {
        name: "code",
        type: "text",
        component: Input,
        placeholder: "MODULES.BASEINFO.UNIINFO.CODE_PH",
        label: "MODULES.BASEINFO.UNIINFO.CODE",
        rowIdx: 2,
        class: "col-lg-4",
      },
      {
        name: "tel",
        type: "text",
        component: Input,
        placeholder: "MODULES.GENERAL.TELEPHONE_PH",
        label: "MODULES.GENERAL.TELEPHONE",
        rowIdx: 3,
        class: "col-lg-4",
      },
    ],
  },
  {
    row: 2,
    list: [
      {
        name: "address",
        type: "text",
        component: Input,
        placeholder: "MODULES.GENERAL.ADDRESS_PH",
        label: "MODULES.GENERAL.ADDRESS",
        rowIdx: 4,
        class: "col-lg-12",
      },
    ],
  },
  {
    row: 3,
    list: [
      {
        name: "postalCode",
        type: "number",
        component: Input,
        placeholder: "MODULES.GENERAL.POSTALCODE_PH",
        label: "MODULES.GENERAL.POSTALCODE",
        rowIdx: 5,
        class: "col-lg-4",
      },
      {
        name: "usersActiveCount",
        type: "text",
        component: Input,
        placeholder: "MODULES.BASEINFO.UNIINFO.MAXUSER_PH",
        label: "MODULES.BASEINFO.UNIINFO.MAXUSER",
        rowIdx: 6,
        class: "col-lg-4",
      },
      {
        name: "manager",
        type: "text",
        component: Input,
        placeholder: "MODULES.BASEINFO.UNIINFO.STUDENT_MANAGER_PH",
        label: "MODULES.BASEINFO.UNIINFO.STUDENT_MANAGER",
        rowIdx: 7,
        class: "col-lg-4",
      },
    ],
  },
  {
    row: 4,
    list: [
      {
        name: "managerTel",
        type: "text",
        component: Input,
        placeholder: "MODULES.BASEINFO.UNIINFO.STUDENT_MANAGER_TEL_PH",
        label: "MODULES.BASEINFO.UNIINFO.STUDENT_MANAGER_TEL",
        rowIdx: 8,
        class: "col-lg-4",
      },
      {
        name: "foodManager",
        type: "text",
        component: Input,
        placeholder: "MODULES.BASEINFO.UNIINFO.NUTRITION_MANAGER_PH",
        label: "MODULES.BASEINFO.UNIINFO.NUTRITION_MANAGER",
        rowIdx: 9,
        class: "col-lg-4",
      },
      {
        name: "foodManagerTel",
        type: "text",
        component: Input,
        placeholder: "MODULES.BASEINFO.UNIINFO.NUTRITION_MANAGER_TEL_PH",
        label: "MODULES.BASEINFO.UNIINFO.NUTRITION_MANAGER_TEL",
        rowIdx: 10,
        class: "col-lg-4",
      },
    ],
  },
  {
    row: 5,
    list: [
      {
        name: "dormManager",
        type: "text",
        component: Input,
        placeholder: "MODULES.BASEINFO.UNIINFO.DORMITORY_MANAGER_PH",
        label: "MODULES.BASEINFO.UNIINFO.DORMITORY_MANAGER",
        rowIdx: 11,
        class: "col-lg-4",
      },
      {
        name: "dormManagerTel",
        type: "text",
        component: Input,
        placeholder: "MODULES.BASEINFO.UNIINFO.DORMITORY_MANAGER_TEL_PH",
        label: "MODULES.BASEINFO.UNIINFO.DORMITORY_MANAGER_TEL",
        rowIdx: 12,
        class: "col-lg-4",
      },
      {
        name: "sportManager",
        type: "text",
        component: Input,
        placeholder: "MODULES.BASEINFO.UNIINFO.SPORT_MANAGER_PH",
        label: "MODULES.BASEINFO.UNIINFO.SPORT_MANAGER",
        rowIdx: 13,
        class: "col-lg-4",
      },
    ],
  },
  {
    row: 6,
    list: [
      {
        name: "sportManagerTel",
        type: "text",
        component: Input,
        placeholder: "MODULES.BASEINFO.UNIINFO.SPORT_MANAGER_TEL_PH",
        label: "MODULES.BASEINFO.UNIINFO.SPORT_MANAGER_TEL",
        rowIdx: 14,
        class: "col-lg-4",
      },
      {
        name: "officialManager",
        type: "text",
        component: Input,
        placeholder: "MODULES.BASEINFO.UNIINFO.ADMINISTRATIVE_MANAGER_PH",
        label: "MODULES.BASEINFO.UNIINFO.ADMINISTRATIVE_MANAGER",
        rowIdx: 15,
        class: "col-lg-4",
      },
      {
        name: "officialManagerTel",
        type: "text",
        component: Input,
        placeholder: "MODULES.BASEINFO.UNIINFO.ADMINISTRATIVE_MANAGER_TEL_PH",
        label: "MODULES.BASEINFO.UNIINFO.ADMINISTRATIVE_MANAGER_TEL",
        rowIdx: 16,
        class: "col-lg-4",
      },
    ],
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
};

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

  let whereClause = "title.contains(@0)";
  const whereClauseParameters = [];
  whereClauseParameters.push(searchText);

  if (filter.isDeleted !== undefined) {
    whereClause = whereClause + " and isDeleted=@1";
    whereClauseParameters.push(filter.isDeleted === 0 ? false : true);
  }

  newQueryParams.whereClause = whereClause;
  newQueryParams.whereClauseParameters = whereClauseParameters;

  return newQueryParams;
};

// Validation schema
export const ObjectEditSchema = Yup.object().shape({
  title: Yup.string().required("title is required"),
  code: Yup.number().required("code is required"),
  // postalCode: Yup.number()
  //     .min(18, "18 is minimum")
  //     .max(18, "18 is maximum"),
});
