const characters = {
  duck: '🦆',
  cat: '<img src="cat-moveupdown.webp" />',
  dog: '<img src="dog-moveupdown.gif" />'
};

let reminders = [];

// Select Character and start animation
function selectCharacter(type) {
  const pet = document.getElementById('pixel-pet');
  const petAvatar = document.getElementById('pet-avatar');

  petAvatar.innerHTML = characters[type];

  pet.classList.remove('idle');
  pet.classList.remove('running');
  
  // Force reflow
  void pet.offsetWidth;

  pet.classList.add('running');
}

// Stop Widget
function stopWidget() {
  const pet = document.getElementById('pixel-pet');
  pet.classList.remove('running');
  pet.classList.add('idle');
}

// Add a new reminder phrase
function addReminder() {
  const input = document.getElementById('reminder-input');
  const text = input.value.trim();

  if (text === '') return;

  reminders.push(text);
  input.value = '';

  renderReminders();
}

// Remove a specific reminder by index
function removeReminder(index) {
  reminders.splice(index, 1);
  renderReminders();
}

// Update both the Speech Bubbles and the Controls UI List
function renderReminders() {
  const bubblesContainer = document.getElementById('speech-bubbles');
  const listContainer = document.getElementById('reminders-list');

  // Render Speech Bubbles above character
  bubblesContainer.innerHTML = reminders
    .map(text => `<div class="bubble">•${escapeHtml(text)}</div>`)
    .join('');

  // Render active reminders in controls panel
  listContainer.innerHTML = reminders
    .map((text, index) => `
      <div class="reminder-item">
        <span>${escapeHtml(text)}</span>
        <button class="clear-btn" onclick="removeReminder(${index})">✕</button>
      </div>
    `)
    .join('');
}

// Helper to escape special HTML characters
function escapeHtml(str) {
  return str.replace(/[&<>"']/g, function(m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[m];
  });
}

// Allow pressing "Enter" key in input field to add reminder
document.getElementById('reminder-input').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    addReminder();
  }
});