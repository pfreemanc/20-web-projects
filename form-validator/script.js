// get important elements

const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordCheck = document.getElementById("passwordCheck");

function showSuccess(input) {
  const parent = input.parentNode;
  parent.classList.add("success");
}

function showError(input, message) {
  const parent = input.parentElement;
  parent.classList.add("error");
  const text = parent.querySelector("small");
  text.innerText = message;
}

// Validates email
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(re.test(input.value.trim())) {
    showSuccess(input)
  } else {
    showError(input, 'Email is not valid')
  }
}

// Capitalize the input
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Check if both passwords match
function checkPasswordsMatch(input1, input2) {
  if(input1.value !== input2.value){
    showError(input2, 'Passwords do not match')
  }
}

// Check required fields
function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// Check length of input using specified min/max
function checkLength(input, min, max) {
  if(input.value.length < min){
    showError(input, `${getFieldName(input)} must be at least ${min} characters`);
  } else if(input.value.length > max) {
    showError(input, `${getFieldName(input)} cannot be more than ${max} characters`);
  } else {
    showSuccess(input);
  }
}

function checkTotalSuccess(inputArr) {
  let success = 0;
  inputArr.forEach(input => {
    const parent = input.parentElement;
    if(parent.className === 'success') {
      success++;
    }
  });
  return(success === 4 ? true : false);
}

form.addEventListener("submit", function(event) {

  event.preventDefault();

  checkRequired([username, email, password, passwordCheck]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, passwordCheck)

  if(checkTotalSuccess([username, email, password, passwordCheck])){
    event.submitter.innerText = 'Registered!'
    event.submitter.style.backgroundColor = 'MediumSpringGreen';
  } else {
    console.log(event.submitter);
  }
});
