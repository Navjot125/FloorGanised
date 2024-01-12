const dateListing = () => {
  const moment = require('moment');
  let currentDate = new Date();
  let limit = 15;
  let upcomingDates = [];
  for (let i = 0; i < limit; i++) {
    let newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + i);
    let monthString = newDate.toLocaleString('en-us', {month: 'long'});
    let dayString = moment(newDate).format('DD MMMM YYYY');
    let obj = {
      id: i,
      date: newDate.getDate(),
      month: monthString.toUpperCase(),
      day: dayString,
      monthInNubers: newDate.getMonth(),
    };
    upcomingDates.push(obj);
  }
  return upcomingDates;
};
module.exports = {
  dateListing,
};
