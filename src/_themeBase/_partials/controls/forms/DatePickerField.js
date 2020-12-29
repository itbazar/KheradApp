import React, { useState } from "react";
import {useField, useFormikContext} from "formik";
import DatePicker from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
// import { utils } from 'react-modern-calendar-datepicker';
import moment from 'moment-jalaali'

// import DatePicker from "react-datepicker";
import { useLang } from "../../../i18n/Basei18n";



const getFieldCSSClasses = (touched, errors) => {
  const classes = ["form-control"];
  if (touched && errors) {
    classes.push("is-invalid");
  }

  if (touched && !errors) {
    classes.push("is-valid");
  }

  return classes.join(" ");
};

export function DatePickerField({ ...props }) {
  const { setFieldValue, errors, touched } = useFormikContext();
  // const [field] = useField(props);
  const {field} = props;
  const locale = useLang()

  // var check = moment(field.value, 'YYYY/MM/DD');

  // var month = check.format('M');
  // var day   = check.format('D');
  // var year  = check.format('YYYY');

  const tempDate = new Date(field.value).toLocaleDateString(locale).replace(/([۰-۹])/g, token => String.fromCharCode(token.charCodeAt(0) - 1728));;
  const curDate = formatDate(tempDate);
  const day = moment(curDate, 'YYYY/MM/DD').date();
  const month = moment(curDate, 'YYYY/MM/DD').month();
  const year = moment(curDate, 'YYYY/MM/DD').year();
  
  console.log("curDate: " + JSON.stringify(curDate));

  console.log(curDate);
  console.log(day);
  console.log(month);
  console.log(year);

  const defaultValue = {
    year: year,
    month:month,
    day:day
  };
  console.log("defaultValue"+JSON.stringify(defaultValue));
  // console.log(defaultValue);
  
  // const defaultValue = {
  //   year: 1399,
  //   month: 10,
  //   day: 5,
  // };
  // debugger;
  const [selectedDay, setSelectedDay] = useState(defaultValue);

  
  return (
    <>
      {props.label && <label>{props.label}</label>}

      <DatePicker
        className={getFieldCSSClasses(touched[field.name], errors[field.name])}
        style={{ width: "100%" }}
        {...field}
        {...props}
        value={selectedDay}
        onChange={val => {
          // debugger;
          console.log("val :")
          let date = new Date(val.year,val.month,val.day).toISOString();
          let newd = moment.utc(date, "jYYYY-jMM-jDDTHH:mm:ss.SSZ").toISOString().slice(0,19);
          console.log(date)
          console.log(newd)
          setFieldValue(field.name,newd);
          setSelectedDay(val)
        }}
        shouldHighlightWeekends
        locale={locale}
      />
      {errors[field.name] && touched[field.name] ? (
        <div className="invalid-datepicker-feedback">
          {errors[field.name].toString()}
        </div>
      ) : (
        <div className="feedback">
          Please enter <b>{props.label}</b> in 'mm/dd/yyyy' format
        </div>
      )}
    </>
  );
}

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('/');
}

// import React from "react";
// import {useField, useFormikContext} from "formik";
// import DatePicker, { registerLocale } from "react-datepicker";
// // import DatePicker from "react-modern-calendar-datepicker";
// // import "react-modern-calendar-datepicker/lib/DatePicker.css";
// import { useLang } from "../../../i18n/Basei18n";

// const getFieldCSSClasses = (touched, errors) => {
//   const classes = ["form-control"];
//   if (touched && errors) {
//     classes.push("is-invalid");
//   }

//   if (touched && !errors) {
//     classes.push("is-valid");
//   }

//   return classes.join(" ");
// };

// export function DatePickerField({ ...props }) {
//   const { setFieldValue, errors, touched } = useFormikContext();
//   // const [field] = useField(props);
//   const {field} = props;
//   const locale = useLang()
//   registerLocale(locale,locale) // register it with the name you want

//   console.log("local :")
//   console.log(locale)
//   return (
//     <>
//       {props.label && <label>{props.label}</label>}
//       <DatePicker
//         className={getFieldCSSClasses(touched[field.name], errors[field.name])}
//         style={{ width: "100%" }}
//         {...field}
//         {...props}
//         selected={(field.value && new Date(field.value)) || null}
//         onChange={val => {
//           setFieldValue(field.name, val);
//         }}
//         locale={locale}
//       />
//       {errors[field.name] && touched[field.name] ? (
//         <div className="invalid-datepicker-feedback">
//           {errors[field.name].toString()}
//         </div>
//       ) : (
//         <div className="feedback">
//           Please enter <b>{props.label}</b> in 'mm/dd/yyyy' format
//         </div>
//       )}
//     </>
//   );
// }
