// Parse URL parameters
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

// Display a message if ID exists
const messageDiv = document.getElementById('url-message');
if (id) {
  messageDiv.textContent = `You're comparing device ID: ${id}`;
} else {
  messageDiv.textContent = `No device selected. Browse our comparison tool to begin.`;
}
