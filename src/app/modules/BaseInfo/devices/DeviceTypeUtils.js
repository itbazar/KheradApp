
import * as Yup from "yup";
import { sortCaret } from "../../../../_themeBase/_helpers";
import * as columnFormatters from "../../../../_themeBase/layout/components/basePage/pages/objects-table/column-formatters";
import { Input } from "../../../../_themeBase/_partials/controls";
  
  export const initObject = {
    id: undefined,
    title: ""
  };
  
  export const columns = [
    {
      dataField: "title",
      text: columnFormatters.translateByMessageId("MODULES.BASEINFO.DEVICETYPE.FORM_TITLE_PH"),
      sort: true,
      sortCaret: sortCaret,
    },
    // {
    //   dataField: "IsDeleted",
    //   text: columnFormatters.translateByMessageId("MODULES.GENERAL.STATUS"),
    //   // text: "وضعیت",
    //   sort: true,
    //   sortCaret: sortCaret,
    //   formatter: columnFormatters.StatusColumnFormatter,
    // },
    // {
   
  ];
  
  export const formFields = [
    {
      row: 1,
      list: [
        {
          name: "title",
          type: "text",
          component: Input,
          placeholder: "MODULES.BASEINFO.DEVICETYPE.FORM_TITLE_PH",
          label: "MODULES.BASEINFO.DEVICETYPE.FORM_TITLE_PH",
          rowOrder: 1,
          rowIdx: 1,
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
  
  export const filterInitialValues ={
    isDeleted: "", // values => All=""/Selling=0/Sold=1
    searchText: "",
  }
  export const filterFields = [
    {
      name: "searchText",
      lable: "جستجو",
      type: "text",
      list:[],
    },
  
  ];
  
  
  export const prepareFilter = (queryParams, values) => {
    const { isDeleted, searchText } = values;
    const newQueryParams = { ...queryParams };
    const filter = {};
    // // Filter by isDeleted
    // filter.isDeleted = isDeleted !== "" ? +isDeleted : undefined;
  
    // Filter by all fields
    filter.title = searchText;
    if (searchText) {
      filter.title = searchText;
    }
    newQueryParams.filter = filter;
   
    let whereClause = "title.contains(@0)"
    const whereClauseParameters = [];
    whereClauseParameters.push(searchText)
  
  // if(filter.isDeleted !== undefined){
  //   whereClause = whereClause + " and isDeleted=@1"
  //   whereClauseParameters.push(filter.isDeleted === 0 ? false : true)
  // }
  
   newQueryParams.whereClause = whereClause;
   newQueryParams.whereClauseParameters = whereClauseParameters;
  
    return newQueryParams;
  };

  
// Validation schema
export const ObjectEditSchema = Yup.object().shape({
  title: Yup.string()
      .required("title is required"),
  });
  
  