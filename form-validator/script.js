// get important elements

const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordCheck = document.getElementById('passwordCheck');

function showSuccess(input) {
  const parent = input.parentNode;
  parent.classList.add('success');
}

function showError(input, message) {
  const parent = input.parentElement;
  parent.classList.add('error');
  const text = parent.querySelector('small');
  text.innerText = message;
}

form.addEventListener('submit', function( event) {
  event.preventDefault();

  // Username validation
  if(username.textLength == 0) {
    showError(username, "A username is required.");
  } else {
    showSuccess(username);
  }


})
