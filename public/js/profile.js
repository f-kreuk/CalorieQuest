const newFormHandler = async (event) => {
  event.preventDefault();

  const height_ft = document.querySelector('#height_ft').value.trim();
  const height_in = document.querySelector('#height_in').value.trim();
  const gender = document.querySelector('#gender').value.trim();
  const age = document.querySelector('#age').value.trim();
  const starting_date = document.querySelector('#starting_date').value.trim();
  const starting_weight = document.querySelector('#starting_weight').value.trim();
  const goal_weight = document.querySelector('#goal_weight').value.trim();
  const quest_length = document.querySelector('#quest_length').value.trim();
  
  if (height_ft && height_in && gender && age && starting_date && starting_weight && goal_weight && quest_length) {
    const questResponse = await fetch(`/api/quests`, {
      method: 'POST',
      body: JSON.stringify({ height_ft, height_in, gender, age, starting_date, starting_weight, goal_weight, quest_length }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (questResponse.ok) {
      const questData = await questResponse.json();
      const questId = questData.id;
      const startDate = new Date(starting_date);

      for (let i = 0; i < quest_length; i++) {
        const dateForDailyLog = new Date(startDate);
        dateForDailyLog.setDate(startDate.getDate()+i);
        const formattedDate = dateForDailyLog.toISOString().slice(0, 10);


        const dailyLogResponse = await fetch(`/api/dailylogs`, {
          method: 'POST',
          body: JSON.stringify({ quest_id: questId, date: formattedDate}),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!dailyLogResponse.ok) {
          console.log(`Failed to create DailyLog record ${i + 1}`);
        }
      }  
      console.log("Quest and DailyLogs created successfully.");
      document.location.replace('/profile');
    } else {
      console.log("Failed to create Quest");
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