const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
console.log(seats);
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = parseInt(movieSelect.value);

// Update total selected seats 
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .selected').length;

  count.innerText = selectedSeats;
  total.innerText = selectedSeats * ticketPrice;
}

// Movie select event, updating ticket price
movieSelect.addEventListener('change', event => {
  ticketPrice = parseInt(event.target.value);
})

// Seat click event
container.addEventListener('click', function(event) {
  const currentSeat = event.target;

  if(currentSeat.classList.contains('seat') && !currentSeat.classList.contains('occupied')){
    currentSeat.classList.toggle('selected')
    updateSelectedCount();
  }
})