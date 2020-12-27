import * as Yup from "yup";
import { sortCaret } from "../../../../_themeBase/_helpers";
import * as columnFormatters from "../../../../_themeBase/layout/components/basePage/pages/objects-table/column-formatters";
import { Input } from "../../../../_themeBase/_partials/controls";
export {filterFields} from "../../customComponents/filterFields";

  export const initObject = {
    id: undefined,
    title: "",
    bankId:0,
    accountNo: "",
    shaba: "",
    psp: 0,
    merchantId: "",
    terminalId: "",
    userName: "",
    password: " ",
    depositId: " ",
    isDeleted: false
  };

  
  export const columns = [
    {
      dataField: "title",
      text: columnFormatters.translateByMessageId("MODULES.BASEINFO.ACCOUNT.TITLE"),
      // text: "نام حساب",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "bankTitle",
      text: columnFormatters.translateByMessageId("MODULES.BASEINFO.ACCOUNT.TITLE"),
      // text: "بانک عامل",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "accountNo",
      text: columnFormatters.translateByMessageId("MODULES.BASEINFO.ACCOUNT.TITLE"),
      // text: "شماره حساب",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "shaba",
      text: columnFormatters.translateByMessageId("MODULES.BASEINFO.ACCOUNT.TITLE"),
      // text: "شماره شبا",
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
          placeholder: "MODULES.BASEINFO.ACCOUNT.TITLE_PH",
          label: "MODULES.BASEINFO.ACCOUNT.TITLE",
          // placeholder: "نام حساب",
          // label: "نام حساب",
          rowOrder: 1,
          rowIdx: 1,
          class: "col-lg-4"
        },
        {
          name: "bankTitle",
          type: "text",
          component: Input,
          placeholder: "MODULES.BASEINFO.ACCOUNT.BANK_PH",
          label: "MODULES.BASEINFO.ACCOUNT.BANK",
          // placeholder: "بانک عامل",
          // label: "بانک عامل",
          rowOrder: 2,
          rowIdx: 1,
          class: "col-lg-4"
        },
        {
          name: "shaba",
          type: "text",
          component: Input,
          placeholder: "MODULES.BASEINFO.ACCOUNT.SHABA_PH",
          label: "MODULES.BASEINFO.ACCOUNT.SHABA",
          // placeholder: "شماره شبا",
          // label: "شماره شبا",
          rowOrder: 1,
          rowIdx: 2,
          class: "col-lg-4"
        }
      ]
    },
    {
      row: 2,
      list: [
        {
          name: "accountNo",
          type: "text",
          component: Input,
          placeholder: "MODULES.BASEINFO.ACCOUNT.NUMBER_PH",
          label: "MODULES.BASEINFO.ACCOUNT.NUMBER",
          // placeholder: "شماره حساب",
          // label: "شماره حساب",
          rowOrder: 1,
          rowIdx: 1,
          class: "col-lg-4"
        },
        {
          name: "psp",
          type: "number",
          component: Input,
          placeholder: "MODULES.BASEINFO.ACCOUNT.PSP_PH",
          label: "MODULES.BASEINFO.ACCOUNT.PSP",
          // placeholder: "شماره شبا  ",
          // label: "شماره شبا  ",
          rowOrder: 2,
          rowIdx: 1,
          class: "col-lg-4"
        },
        {
          name: "merchantId",
          type: "text",
          component: Input,
          placeholder: "MODULES.BASEINFO.ACCOUNT.MERCHANT_PH",
          label: "MODULES.BASEINFO.ACCOUNT.MERCHANT",
          // placeholder: "شماره پذیرنده",
          // label: "شماره پذیرنده",
          rowOrder: 1,
          rowIdx: 2,
          class: "col-lg-4"
        }
      ]
  
    },
    {
      row: 3,
      list: [
      
        {
          name: "terminalId",
          type: "text",
          component: Input,
          placeholder: "MODULES.BASEINFO.ACCOUNT.TERMINAL_CODE_PH",
          label: "MODULES.BASEINFO.ACCOUNT.TERMINAL_CODE",
          // placeholder: "شماره ترمینال",
          // label: "شماره ترمینال",
          rowOrder: 2,
          rowIdx: 1,
          class: "col-lg-4"
        },
        {
          name: "userName",
          type: "text",
          component: Input,
          placeholder: "MODULES.BASEINFO.ACCOUNT.USERNAME_PH",
          label: "MODULES.BASEINFO.ACCOUNT.USERNAME",
          // placeholder: "نام کاربری",
          // label: "نام کاربری",
          rowOrder: 3,
          class: "col-lg-4"
        },
        {
          name: "password",
          type: "text",
          component: Input,
          placeholder: "MODULES.BASEINFO.ACCOUNT.PASSWORD_PH",
          label: "MODULES.BASEINFO.ACCOUNT.PASSWORD",
          // placeholder: "کلمه عبور",
          // label: "کلمه عبور",
          rowOrder: 2,
          rowIdx: 1,
          class: "col-lg-4"
        },
      ]
  
    },
    {
      row: 4,
      list: [
      
       
        {
          name: "depositId",
          type: "text",
          component: Input,
          placeholder: "MODULES.BASEINFO.ACCOUNT.DEPOSIT_ID_PH",
          label: "MODULES.BASEINFO.ACCOUNT.DEPOSIT_ID",
          // placeholder: "شناسه واریز",
          // label: "شناسه واریز",
          rowOrder: 3,
          class: "col-lg-4"
        },
       
      ]
    }
    
  
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
  
  export const filterInitialValues ={
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

if(filter.isDeleted !== undefined){
  whereClause = whereClause + " and isDeleted=@1"
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
  bankId: Yup.number()
      .required("bankId is required"),
  psp: Yup.number()
      .min(6, "6 is minimum")
      .max(18, "18 is maximum"),
   
  });
  
  