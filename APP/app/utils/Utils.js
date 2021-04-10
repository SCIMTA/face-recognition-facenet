const formatNumber = num =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const toDateString = date => {
  let today = new Date(date);
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();

  return dd + "/" + mm + "/" + yyyy;
};
module.exports = {
  formatNumber,
  toDateString
};
