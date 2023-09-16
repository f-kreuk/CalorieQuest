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
    const response = await fetch(`/api/quest`, {
      method: 'POST',
      body: JSON.stringify({heightFt , heightIn, gender , age ,  startingDate, startingWeight, goalWeight}),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/quest');
    } else {
      alert('Failed to create new quest.');
    }
  }
};

document
  .querySelector('.profile-form')
  .addEventListener('submit', newFormHandler);