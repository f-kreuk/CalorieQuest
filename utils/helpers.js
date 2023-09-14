const { format, addDays } = require('date-fns');

// Function to get the current date in 'YYYY-MM-DD' format
function getCurrentDate() {
  return format(new Date(), 'yyyy-MM-dd');
}

// Function to calculate BMR (Basal Metabolic Rate)
function calculateBMR(weightKG, heightCM, ageYears, isMale) {
  // Harris-Benedict Equation
  const genderFactor = isMale ? 5 : -161;
  const bmr = 88.362 + 13.397 * weightKG + 4.799 * heightCM - 5.677 * ageYears + genderFactor;
  return Math.round(bmr); // Round to a whole number
}

module.exports = {
  getCurrentDate,
  calculateBMR,
};

