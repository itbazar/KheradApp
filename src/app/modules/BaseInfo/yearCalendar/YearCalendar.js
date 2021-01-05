import React, { useState } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";
import { useLang } from "../../../../_themeBase/i18n";
import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar,
} from "../../../../_themeBase/_partials/controls";

export const YearCalendar = () => {
//   const suhbeader = useSubheader();
//   suhbeader.setTitle("My Custom title");
   const locale = useLang();
  const [value,setValue] = useState();
  const [isGregorian,setIsGregorian] = useState(true);
  const [selectedDay, setSelectedDay] = useState([]);

  const getCustomFormat = (inputValue, isGregorian) => {
    if (!inputValue)
      return '';
    const inputFormat = isGregorian ? 'YYYY/M/D' : 'jYYYY/jM/jD';
    return isGregorian ? inputValue.locale('es').format(inputFormat) :
      inputValue.locale('fa').format(inputFormat);
  }


  return (

    <Card >
         {/* {actionsLoading && <ModalProgressBar />} */}
      <CardHeader title="{title}">
        <CardHeaderToolbar>
          <button
            type="button"
            // onClick={backToProductsList}
            className="btn btn-light"
          >
            <i className="fa fa-arrow-left"></i>
            Back
          </button>
          {`  `}
          <button className="btn btn-light ml-2">
            <i className="fa fa-redo"></i>
            Reset
          </button>
          {`  `}
          <button
            type="submit"
            className="btn btn-primary ml-2"
            // onClick={saveProductClick}
          >
            Save
          </button>
        </CardHeaderToolbar>
      </CardHeader>
  <CardBody>
    <div className="row">
    <div className="col-lg-4">
    <Calendar
    key={1}
      value={selectedDay}
      onChange={setSelectedDay}
      shouldHighlightWeekends
      calendarClassName="responsive-calendar" 
      locale={locale}
    />
        </div>
       </div>
    
    
    {/* <Button variant="primary">Go somewhere</Button> */}
  </CardBody>
</Card>


  
    );
};
