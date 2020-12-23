import { SelectStatus } from './SelectStatus';

export const filterFields = [
  {
    name: "isDeleted",
    lable: "MODULES.GENERAL.STATUS",
    type: "select",
    list:[
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
    component:SelectStatus
  },
  {
    name: "searchText",
    lable: "MODULES.GENERAL.SEARCH",
    type: "text",
    list:[],
  },

];