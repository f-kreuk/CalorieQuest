const { format } = require('date-fns');

// Function to get the current date in 'YYYY-MM-DD' format
function getCurrentDate() {
  return format(new Date(), 'yyyy-MM-dd');
}

module.exports = {
  getCurrentDate,
};

