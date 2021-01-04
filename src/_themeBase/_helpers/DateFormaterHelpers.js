import moment from "moment-jalaali";

export function formatDateString(dateString, spiliterChar) {
  var d = new Date(dateString),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join(spiliterChar);
}

//dateString: '2006-09-20T00:00:00'
//locale: 'fa'
export function convertDateStringToLocal(dateString, locale) {
  const tempDateString = new Date(dateString)
    .toLocaleDateString(locale)
    .replace(/([۰-۹])/g, (token) =>
      String.fromCharCode(token.charCodeAt(0) - 1728)
    );
  return tempDateString;
}

export function initDatePickerValue(curDate) {
  // const day = moment(curDate, "YYYY/MM/DD").date();
  // const month = moment(curDate, "YYYY/MM/DD").month();
  // const year = moment(curDate, "YYYY/MM/DD").year();

  // debugger;
  let day = "01";
  let month = "01";
  let year = "0001";

  if (curDate && curDate.length > 7) {
    let temp = curDate.split("/");
    day = temp[2];
    month = temp[1];
    year = temp[0];

    if (temp[1].length < 2) {
      month = "0" + temp[1];
    }
    if (temp[2].length < 2) {
      day = "0" + temp[2];
    }
  }

  const newValue = {
    year: year,
    month: month,
    day: day,
  };

  return newValue;
}

// import moment from 'moment-jalaali'

// export function formatDateString(dateString, spiliterChar) {
//     var d = new Date(dateString),
//         month = '' + (d.getMonth() + 1),
//         day = '' + d.getDate(),
//         year = d.getFullYear();

//     if (month.length < 2)
//         month = '0' + month;
//     if (day.length < 2)
//         day = '0' + day;

//     return [year, month, day].join(spiliterChar);
// }

// //dateString: '2006-09-20T00:00:00'
// //locale: 'fa'
// export function convertDateStringToLocal(dateString, locale) {

//     const tempDateString = new Date(dateString)
//     .toLocaleDateString(locale)
//     .replace(/([۰-۹])/g, (token) =>
//       String.fromCharCode(token.charCodeAt(0) - 1728)
//     );
//     return tempDateString;
// }

// export function initDatePickerValue(curDate) {

//   // let utcDate = moment(curDate, 'jYYYY/jM/jD').format("YYYY/MM/DD");

//   // const day = utcDate.date();
//   // const month = utcDate.month();
//   // const year = utcDate.year();

//   let day = "01";
//   let month = "01";
//   let year = "0001";

//   if (curDate && curDate.length > 7) {
//     let temp = curDate.split('/');
//     day = temp[2];
//     month = temp[1];
//     year = temp[0];

//    if (temp[1].length < 2) { month = '0' + temp[1] }
//    if (temp[2].length < 2) { day = '0' + temp[2] }
//   }

//   const newValue = {
//     year: year,
//     month: month,
//     day: day,
//     };

//     return newValue;
//   }
