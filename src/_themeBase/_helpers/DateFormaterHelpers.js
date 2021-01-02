import moment from 'moment-jalaali'


export function formatDateString(dateString, spiliterChar) {
    var d = new Date(dateString),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
  
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
  
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
  const day = moment(curDate, "YYYY/MM/DD").date();
  const month = moment(curDate, "YYYY/MM/DD").month();
  const year = moment(curDate, "YYYY/MM/DD").year();

  const newValue = {
    year: year,
    month: month,
    day: day,
    };
    
    return newValue;
  }