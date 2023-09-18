const newFormHandler = async (event) => {
  event.preventDefault();

  const height_ft = document.querySelector('#height_ft').value.trim();
  const height_in = document.querySelector('#height_in').value.trim();
  const gender = document.querySelector('#gender').value.trim();
  const age = document.querySelector('#age').value.trim();
  const starting_date = document.querySelector('#starting_date').value.trim();
  const starting_weight = document.querySelector('#starting_weight').value.trim();
  const goal_weight = document.querySelector('#goal_weight').value.trim();
  
  console.log(height_ft);
  console.log(height_in);
  console.log(gender);
  console.log(age);
  console.log(starting_date);
  console.log(starting_weight);
  console.log(goal_weight);

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

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/quests/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete quest');
    }
  }
};


document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelector('.new-quest-form')
    .addEventListener('submit', newFormHandler);
});

document
  .querySelector('.quest-list')
  .addEventListener('click', delButtonHandler);