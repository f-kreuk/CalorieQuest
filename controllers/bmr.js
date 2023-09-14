// Function to calculate BMR for men
function calculateBMRForMen(weightInPounds, heightInInches, ageInYears) {
  const constant = 66;
  const weightCoefficient = 6.23;
  const heightCoefficient = 12.7;
  const ageCoefficient = 6.8;

  const bmr =
    constant +
    weightCoefficient * weightInPounds +
    heightCoefficient * heightInInches -
    ageCoefficient * ageInYears;
  return bmr;
}

// Function to calculate BMR for women
function calculateBMRForWomen(weightInPounds, heightInInches, ageInYears) {
  const constant = 655.1;
  const weightCoefficient = 4.35;
  const heightCoefficient = 4.7;
  const ageCoefficient = 4.7;

  const bmr =
    constant +
    weightCoefficient * weightInPounds +
    heightCoefficient * heightInInches -
    ageCoefficient * ageInYears;
  return bmr;
}

// Function to check calorie deficit/surplus
function checkCalorieStatus(caloricIntake, maintenanceCalories) {
  const calorieDeficit = maintenanceCalories - caloricIntake;

  if (calorieDeficit >= 0) {
    return `You are in a calorie deficit of ${calorieDeficit} calories. This is good for weight loss.`;
  } else {
    return `You have consumed ${-calorieDeficit} calories more than needed. Consider adjusting your intake for weight goals.`;
  }
}
