const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

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

// Get data from local storage and update the page/UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  console.log(selectedSeats);

  if(selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if(selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    })
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if(selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
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

// Initial count and total set 
updateSelectedCount();