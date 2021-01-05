import React, { useState, useEffect, useMemo } from "react";
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



export const setDatepickerValue = ({
  val,
  field,
  locale,
  setFieldValue,
  setSelectedDay,
}) => {
  let utcDate = null;
  if (locale === "fa") {
    utcDate = moment(`${val.year}/${val.month}/${val.day}`, "jYYYY/jM/jD");
  } else {
    utcDate = moment(`${val.year}-${val.month}-${val.day}`, "YYYY-MM-DD");
  }
  // console.log("utcDate 1980 " + JSON.stringify(utcDate));
  let newValue = utcDate.format("YYYY-MM-DDTHH:mm:ss");
  // console.log("newValue 1980 " + JSON.stringify(newValue));
  setFieldValue(field.name, newValue);
  // setdefaultDate(defaultValue);
  setSelectedDay(val);
};

export function DatePickerField({ ...props }) {
  const { setFieldValue, errors, touched } = useFormikContext();
  const { field } = props;
  const locale = useLang();
  const [selectedDay, setSelectedDay] = useState();
  const [defaultDate, setdefaultDate] = useState({
    year: "1400",
    month: "01",
    day: "01",
  });

  // useEffect(() => {

  //     setSelectedDay(defaultDate);

  // }, [defaultDate]);

  // useEffect(() => {
  //   let newValue = null;
  //   let defaultValue = null;
  //   // if (defaultDate === selectedDay)
  //   //   return;
  //   if (field.value !== "") {
  //     //'2006-09-20T00:00:00'
  //      newValue = convertDateStringToLocal(field.value, locale);
  //   }
  //   else
  //   {
  //     let mNow = moment();// today
  //     newValue = mNow.format("jYYYY/jMM/jDD");

  //   }
  //   defaultValue = initDatePickerValue(newValue);
  //   console.log("defaultValue 1980  " + JSON.stringify(defaultValue));
  //   // setdefaultDate(defaultValue);
  // //  setSelectedDay(defaultValue);
  // }, []);

  // useEffect(() => {
  //   setdefaultDate(field.value);
  // }, [])


  const dateValue = ( field ) => {
    const defaultDate1 = {
      year: "1400",
      month: "01",
      day: "01",
    };
    return defaultDate1;
    const defaultDate2 = {
      year: "1399",
      month: "11",
      day: "11",
    };
    if (field && field.value !== "") {
      return defaultDate1;
    } else {
      return defaultDate2;
    }
  };


  return (
    <>
      {/* {field.value !== "" :  setSelectedDay({
        year: "0001",
        month: "01",
        day: "01",
        })} */}
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
          value={null}
          locale={locale}
          onChange={(val) => {
            // setDatepickerValue({
            //   val,
            //   field,
            //   locale,
            //   setFieldValue,
            //   setSelectedDay,
            // });
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
