const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = parseInt(movieSelect.value);

// Update total selected seats 
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .selected');
  const selectedSeatsCount = selectedSeats.length;

  // Copy select seats into array
  // Map array, return new array of indexes. 
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  console.log(seatsIndex);
  
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Saves selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Movie select event, updating ticket price
movieSelect.addEventListener('change', event => {
  ticketPrice = parseInt(event.target.value);
  setMovieData(event.target.selectedIndex, event.target.value);
  updateSelectedCount();
})

// Seat click event
container.addEventListener('click', function(event) {
  const currentSeat = event.target;

  if(currentSeat.classList.contains('seat') && !currentSeat.classList.contains('occupied')){
    currentSeat.classList.toggle('selected')
    updateSelectedCount();
  }
})