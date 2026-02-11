document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  // Simple validation example
  if(name && email && subject && message) {
    alert('Thank you for contacting us, ' + name + '!');
    // Optionally, reset the form
    this.reset();
  } else {
    alert('Please fill in all fields.');
  }
});