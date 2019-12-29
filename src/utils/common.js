import moment from "moment-jalaali";

export const formatNumberDateToJalaliDate = (value) => {
  let inputDate = moment(value, 'jYYYYjMMjDD');
  if (inputDate.isValid()) {
    return inputDate.format('jYYYY/jMM/jDD');
  } else {
    console.log("Invalid Date Format !!");
    return '';
  }

  // if (value) {
  //   const inputDate = value.toString();
  //   if (moment(inputDate, 'jYYYYjMMjDD').isValid()) {
  //     const year = inputDate.substring(0, 4);
  //     const month = inputDate.substring(4, 6);
  //     const day = inputDate.substring(6);
  //     const date_s = year + '/' + month + '/' + day;
  //     if (moment(date_s, 'jYYYY/jMM/jDD').isValid()) {
  //       return date_s;
  //     } else
  //       return '';
  //   }
  // }
};

export const formatJalaliDateToNumber = (value) => {
  if (moment(value, 'jYYYY/jMM/jDD').isValid()) {
    let m = moment(value, 'jYYYY/jMM/jDD');
    return +m.format('jYYYYjMMjDD');
  } else {
    console.log("Invalid Date Format !!");
    return '';
  }
};
