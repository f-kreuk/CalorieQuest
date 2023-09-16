const newFormHandler = async (event) => {
  event.preventDefault();

  const heightFt = document.querySelector('#heightFt-profile').value.trim();
  const heightIn = document.querySelector('#heightIn-profile').value.trim();
  const gender = document.querySelector('#gender-profile').value.trim();
  const age = document.querySelector('#age-profile').value.trim();

  if (heightFt && heightIn && gender & age) {
    const response = await fetch(`/api/user`, {
      method: 'POST',
      body: JSON.stringify({heightFeet , heightInches, gender , age }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to update user record');
    }
  }
  console.log(user);
};

document
  .querySelector('.profile-form')
  .addEventListener('submit', newFormHandler);
