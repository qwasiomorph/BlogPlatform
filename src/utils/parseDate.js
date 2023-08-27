const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function parseDate(date) {
  let result = ``;
  const dateObj = new Date(date);
  result += `${months[dateObj.getMonth()]} `;
  result += `${dateObj.getDate()}, `;
  result += `${dateObj.getFullYear()}`;
  return result;
}

export default parseDate;
