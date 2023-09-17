const newFormHandler = async (event) => {
  event.preventDefault();

  const height_ft = document.querySelector('#heightFt-profile').value.trim();
  const height_in = document.querySelector('#heightIn-profile').value.trim();
  const gender = document.querySelector('#gender-profile').value.trim();
  const age = document.querySelector('#age-profile').value.trim();
  const starting_date = document.querySelector('#startingDate-profile').value.trim();
  const starting_weight = document.querySelector('#startingWeight-profile').value.trim();
  const goal_weight = document.querySelector('#goalWeight-profile').value.trim();
  


  if (height_ft && height_in && gender && age && starting_date && starting_weight && goal_weight) {
    const response = await fetch(`/api/quests`, {
      method: 'POST',
      body: JSON.stringify({ height_ft, height_in, gender, age, starting_date, starting_weight, goal_weight }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log("Works");
      document.location.replace('/profile');
    } else {
      console.log("didn't work");
      if (response.status === 400) {
        alert('Validation error: Please check your inputs.');
      } else {
        alert('Failed to create new quest.');
      }
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelector('.new-quest-form')
    .addEventListener('submit', newFormHandler);
});