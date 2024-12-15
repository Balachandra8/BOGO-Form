// Get all the radio buttons
const radioButtons = document.querySelectorAll('input[type="radio"]');

// Function to update the total price
function updateTotalPrice() {
  let totalPrice = 0;
  const boxes = document.querySelectorAll('.box');

  boxes.forEach((box) => {
    const radio = box.querySelector('input[type="radio"]:checked');
    const priceElement = box.querySelector('.current-price');
    const priceText = priceElement ? priceElement.textContent : "";
    const price = parseFloat(priceText.replace('$', '').replace(' USD', '').trim());

    if (radio && !isNaN(price)) {
      totalPrice += price;
    }
  });

  // Update the total price in the footer
  const totalPriceElement = document.querySelector('.total-price');
  if (totalPriceElement) {
    totalPriceElement.textContent = `$${totalPrice.toFixed(2)} USD`;
  }
}

// Function to handle the radio button clicks
radioButtons.forEach((radioButton) => {
  radioButton.addEventListener('change', (e) => {
    // Hide all dropdowns first
    const allDropdowns = document.querySelectorAll('.dropdowns');
    allDropdowns.forEach((dropdown) => {
      dropdown.style.display = 'none';
    });

    // Show the selected radio button's dropdown
    const selectedBox = e.target.closest('.box');
    const selectedDropdown = selectedBox.querySelector('.dropdowns');
    if (selectedDropdown) {
      selectedDropdown.style.display = 'flex';
    }

    // Update the total price
    updateTotalPrice();
  });
});

// Add click listener on each box to trigger radio button selection
const boxes = document.querySelectorAll('.box');
boxes.forEach((box) => {
  box.addEventListener('click', (e) => {
    const radio = box.querySelector('input[type="radio"]');
    if (radio) {
      radio.checked = true;
      // Trigger the change event to update dropdown and price
      radio.dispatchEvent(new Event('change'));
    }
  });
});

// Default selection for the Most Popular box
const defaultPopularRadio = document.querySelector('.most-popular input[type="radio"]');
if (defaultPopularRadio) {
  defaultPopularRadio.checked = true;
  updateTotalPrice(); // Update total price on load
  
  // Hide all dropdowns initially
  const allDropdowns = document.querySelectorAll('.dropdowns');
  allDropdowns.forEach((dropdown) => {
    dropdown.style.display = 'none';
  });

  // Show the dropdown for the selected radio (Most Popular)
  const defaultPopularDropdown = defaultPopularRadio.closest('.box').querySelector('.dropdowns');
  if (defaultPopularDropdown) {
    defaultPopularDropdown.style.display = 'flex';
  }
}
