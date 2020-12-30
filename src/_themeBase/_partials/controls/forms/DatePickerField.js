import React, { useState, useEffect } from "react";
import DatePicker from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
// import { utils } from 'react-modern-calendar-datepicker';
import moment from "moment-jalaali";

// import DatePicker from "react-datepicker";
import { useLang } from "../../../i18n/Basei18n";
import { useFormikContext } from "formik";
import {
  formatDateString,
  convertDateStringToLocal,
  initDatePickerValue,
} from "../../../_helpers/DateFormaterHelpers";

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
  const { field } = props;
  const locale = useLang();
  const [selectedDay, setSelectedDay] = useState();

  useEffect(() => {
    if (field.value !== "") {
      //'2006-09-20T00:00:00'
      const newValue = convertDateStringToLocal(field.value, locale);
      const defaultValue = initDatePickerValue(newValue);
      console.log("defaultValue" + JSON.stringify(defaultValue));

      setSelectedDay(defaultValue);
    }
  }, [field.value, locale]);

  return (
    <>
      {}
      {props.label && <label>{props.label}</label>}
      <br />
      {
        <DatePicker
          className={getFieldCSSClasses(
            touched[field.name],
            errors[field.name]
          )}
          style={{ width: "100%" }}
          {...field}
          {...props}
          value={selectedDay}
          locale={locale}
          onChange={(val) => {
            // debugger;
            console.log("val :" + JSON.stringify(val));
            // moment.locale('en');
            //'1377-02-09T20:34:16.000Z'
            let date = new Date(val.year, val.month, val.day).toISOString();
            let newd = moment
              .utc(date, "YYYY-MM-DDTHH:mm:ss.SSZ")
              .toISOString()
              .slice(0, 19);
            console.log("date :" + JSON.stringify(date));
            // console.log("enDate :" + JSON.stringify(enDate));
            console.log("newd :" + JSON.stringify(newd));
           
            //1998-05-15T00:00:00


            const newVal = new Date(date)
            .toLocaleDateString("en")
            .replace(/([۰-۹])/g, (token) =>
              String.fromCharCode(token.charCodeAt(0) - 1728)
            );

            const newVal22 = formatDateString(newVal, "/");
                initDatePickerValue(newVal22);


           
            let newd22 = moment
              .utc(newVal22, "YYYY-MM-DDTHH:mm:ss.SSZ")
              .toISOString()
              .slice(0, 19);
               console.log("newd22 :" + JSON.stringify(newd22));
            setFieldValue(field.name, newVal22);
            setSelectedDay(val);
          }}
          shouldHighlightWeekends
        />
      }
      {errors[field.name] && touched[field.name] ? (
        <div className="invalid-datepicker-feedback">
          {errors[field.name].toString()}
        </div>
      ) : (
        <div className="feedback">
          {/* Please enter <b>{props.label}</b> in 'mm/dd/yyyy' format */}
        </div>
      )}
    </>
  );
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
