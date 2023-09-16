const newFormHandler = async (event) => {
  event.preventDefault();

  const heightFt = document.querySelector('#heightFt-profile').value.trim();
  const heightIn = document.querySelector('#heightIn-profile').value.trim();
  const gender = document.querySelector('#gender-profile').value.trim();
  const age = document.querySelector('#age-profile').value.trim();
  const startingDate = document.querySelector('#startingDate-profile').value.trim();
  const startingWeight = document.querySelector('#startingWeight-profile').value.trim();
  const goalWeight = document.querySelector('#goalWeight-profile').value.trim();

  if (heightFt && heightIn && gender && age && startingDate && startingWeight && goalWeight) {
    const response = await fetch(`/api/user`, {
      method: 'POST',
      body: JSON.stringify({heightFt , heightIn, gender , age ,  startingDate, startingWeight, goalWeight}),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create new quest.');
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
      alert('Failed to delete quest.');
    }
  }
};

document
  .querySelector('.profile-form')
  .addEventListener('submit', newFormHandler);

  document
  .querySelector('.quest-list')
  .addEventListener('click', delButtonHandler);