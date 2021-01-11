import * as Yup from "yup";
import { sortCaret } from "../../../../_themeBase/_helpers";
import * as columnFormatters from "../../../../_themeBase/layout/components/basePage/pages/objects-table/column-formatters";
import { Input } from "../../../../_themeBase/_partials/controls";

export { filterFields } from "../../customComponents/filterFields";

export const initObject = {
    id: undefined,
    dormId: 0,
    blockId: 0,
    roomId: 0,
    roleId: 0,
    groupId: 0,
    subGroupId: 0,
    collageId: 0,
    fieldId: 0,
    gradeId: 0,
    workUnitId: 0,
    username: "",
    idNumber: "",
    firstName: "",
    lastName: "",
    nationalCode: "",
    gender: "",
    email: "",
    mobile: "",
    barcodeNumber: "",
    expirationDate: " ",
    deliveryDate: " ",
    credit: 0,
    lastLoginDate: " ",
    lastLoginIp: " ",
    reasonDeactivated: "",
    isPayOff: true,
    lostCard: true,
    replicaCard1: true,
    replicaCard2: true,
    replicaCard3: true,
    isLogin: true,
    sActive: true,
    isDeleted: false,
};


export const columns = [
    {
        dataField: "username",
        text: columnFormatters.translateByMessageId(
            "MODULES.BASEINFO.USERS.USERNAME"
        ),
        sort: true,
        sortCaret: sortCaret,
    },
    {
        dataField: "idNumber",
        text: columnFormatters.translateByMessageId(
            "MODULES.BASEINFO.USERS.IDNUMBER"
        ),
        sort: true,
        sortCaret: sortCaret,
    },
    {
        dataField: "firstName",
        text: columnFormatters.translateByMessageId("MODULES.BASEINFO.USERS.FIRSTNAME"),
        sort: true,
        sortCaret: sortCaret,
    },
    {
        dataField: "lastName",
        text: columnFormatters.translateByMessageId("MODULES.BASEINFO.USERS.LASTNAME"),
        sort: true,
        sortCaret: sortCaret,
    },
    {
        dataField: "nationalCode",
        text: columnFormatters.translateByMessageId("MODULES.BASEINFO.USERS.NATIONALCODE"),
        sort: true,
        sortCaret: sortCaret,
    },
    {
        dataField: "IsDeleted",
        text: columnFormatters.translateByMessageId("MODULES.GENERAL.STATUS"),
        sort: true,
        sortCaret: sortCaret,
        formatter: columnFormatters.StatusColumnFormatter,
    },
    {
      dataField: "action",
      text: columnFormatters.translateByMessageId("MODULES.GENERAL.ACTION"),
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
                name: "id",
                type: "text",
                component: Input,
                placeholder: "MODULES.BASEINFO.USERS.ID_PH",
                label: "MODULES.BASEINFO.USERS.ID",
                rowIdx: 16,
                class: "col-lg-4",
            },
            {
                name: "username",
                type: "text",
                component: Input,
                label: "MODULES.BASEINFO.USERS.USERNAME",
                placeholder: "MODULES.BASEINFO.USERS.USERNAME_PH",
                rowIdx: 1,
                class: "col-lg-4",
            },
            {
                name: "idNumber",
                type: "text",
                component: Input,
                placeholder: "MODULES.BASEINFO.USERS.IDNUMBER_PH",
                label: "MODULES.BASEINFO.USERS.IDNUMBER",
                rowIdx: 2,
                class: "col-lg-4",
            },
           
        ],
    },
    {
        row: 2,
        list: [
            {
                name: "firstName",
                type: "text",
                component: Input,
                placeholder: "MODULES.BASEINFO.USERS.FIRSTNAME_PH",
                label: "MODULES.BASEINFO.USERS.FIRSTNAME",
                rowIdx: 4,
                class: "col-lg-4",
            },
            {
                name: "lastName",
                type: "text",
                component: Input,
                placeholder: "MODULES.BASEINFO.USERS.LASTNAME_PH",
                label: "MODULES.BASEINFO.USERS.LASTNAME",
                rowIdx: 3,
                class: "col-lg-4",
            },
            {
                name: "gender",
                type: "text",
                component: Input,
                placeholder: "MODULES.BASEINFO.USERS.GENDER_PH",
                label: "MODULES.BASEINFO.USERS.GENDER",
                rowIdx: 6,
                class: "col-lg-4",
            },
        ],
    },
    {
        row: 3,
        list: [
            {
                name: "nationalCode",
                type: "number",
                component: Input,
                placeholder: "MODULES.BASEINFO.USERS.NATIONALCODE_PH",
                label: "MODULES.BASEINFO.USERS.NATIONALCODE",
                rowIdx: 5,
                class: "col-lg-4",
            },
          
            {
                name: "email",
                type: "text",
                component: Input,
                placeholder: "MODULES.BASEINFO.USERS.EMAIL_PH",
                label: "MODULES.BASEINFO.USERS.EMAIL",
                rowIdx: 7,
                class: "col-lg-4",
            },
            {
                name: "mobile",
                type: "text",
                component: Input,
                placeholder: "MODULES.BASEINFO.USERS.MOBILE_PH",
                label: "MODULES.BASEINFO.USERS.MOBILE",
                rowIdx: 8,
                class: "col-lg-4",
            },
        ],
    },
    {
        row: 4,
        list: [
           
            {
                name: "barcodeNumber",
                type: "text",
                component: Input,
                placeholder: "MODULES.BASEINFO.USERS.BARCODENUMBER_PH",
                label: "MODULES.BASEINFO.USERS.BARCODENUMBER",
                rowIdx: 9,
                class: "col-lg-4",
            },
            {
                name: "credit",
                type: "text",
                component: Input,
                placeholder: "MODULES.BASEINFO.USERS.CREDIT_PH",
                label: "MODULES.BASEINFO.USERS.CREDIT",
                rowIdx: 12,
                class: "col-lg-4",
            },
           
        ],
    },
    {
        row: 5,
        list: [
            {
                name: "deliveryDate",
                type: "text",
                component: Input,
                placeholder: "MODULES.BASEINFO.USERS.DELIVERYDATE_PH",
                label: "MODULES.BASEINFO.USERS.DELIVERYDATE",
                rowIdx: 11,
                class: "col-lg-4",
            },
            {
                name: "expirationDate",
                type: "text",
                component: Input,
                placeholder: "MODULES.BASEINFO.USERS.EXPIRATIONDATE_PH",
                label: "MODULES.BASEINFO.USERS.EXPIRATIONDATE",
                rowIdx: 10,
                class: "col-lg-4",
            },
            
            {
                name: "lastLoginDate",
                type: "text",
                component: Input,
                placeholder: "MODULES.BASEINFO.USERS.LASTLOGINDATE_PH",
                label: "MODULES.BASEINFO.USERS.LASTLOGINDATE",
                rowIdx: 13,
                class: "col-lg-4",
            },
        ],
    },
    {
        row: 6,
        list: [
            {
                name: "lastLoginIp",
                type: "text",
                component: Input,
                placeholder: "MODULES.BASEINFO.USERS.LASTLOGINIP_PH",
                label: "MODULES.BASEINFO.USERS.LASTLOGINIP",
                rowIdx: 14,
                class: "col-lg-4",
            },
            {
                name: "reasonDeactivated",
                type: "text",
                component: Input,
                placeholder: "MODULES.BASEINFO.USERS.REASONDEACTIVATED_PH",
                label: "MODULES.BASEINFO.USERS.REASONDEACTIVATED",
                rowIdx: 15,
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
    filter.username = searchText;
    if (searchText) {
        filter.username = searchText;
    }
    newQueryParams.filter = filter;

    let whereClause = "username.contains(@0)";
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
    username: Yup.string().required("username is required"),
    idNumber: Yup.number().required("idNumber is required"),
    // nationalCode: Yup.number()
    //     .min(18, "18 is minimum")
    //     .max(18, "18 is maximum"),
});
