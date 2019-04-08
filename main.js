let clickedInput = 'customer-data'
const inputs = document.querySelectorAll('.input')
const buttons = document.querySelectorAll('.btn');
const productBtns = document.querySelectorAll('.product-btn');
const pencilIcon = document.querySelector('.pencil')

// Change clickedInput value so that correct input is targeted when clicking on keypad
inputs.forEach(input => input.addEventListener('click', (e) => {
  clickedInput = e.target.dataset.target
  input.focus()
}))

pencilIcon.addEventListener('click', (e) => {
  clickedInput = e.currentTarget.dataset.target
  document.getElementById(e.currentTarget.dataset.target).focus()
})

// Click eventlistener for keypad
buttons.forEach(button => button.addEventListener('click', (e) => {
  const thisInput = document.getElementById(clickedInput)
  e.target.classList.add('clicked');
  setTimeout(function() {
    e.target.classList.remove('clicked');
  }, 100);
  switch(e.target.id) {
    case "delete":
      thisInput.value = thisInput.value.slice(0, -1);
      if (clickedInput === 'customer-data' && thisInput.value.length === 9) {
        thisInput.value = thisInput.value.slice(0, -3)
      }
      console.log('delete')
      break;
    case "ok":
      console.log('ok')
      break;
    default:
      if (clickedInput === 'contact-data' && thisInput.value.length === 10) {
        return
      }
      if (clickedInput === 'customer-data' && thisInput.value.length === 13) {
        return
      }
      thisInput.value = thisInput.value + e.target.id
      if (clickedInput === 'customer-data' && thisInput.value.length === 6) {
        thisInput.value = thisInput.value + ' - '
      }
  }
}));

// Click eventlistener for amount buttons on products
productBtns.forEach(button => button.addEventListener('click', (e) => {
  const amountSpan = document.getElementById('product-' + e.currentTarget.dataset.product)
  if (e.currentTarget.classList.contains('increase-btn')) {
    amountSpan.innerHTML = Number(amountSpan.innerHTML) +1
  } else if (e.currentTarget.classList.contains('decrease-btn') && Number(amountSpan.innerHTML) > 0) {
    amountSpan.innerHTML = Number(amountSpan.innerHTML) -1
  }
  updatePrices()
}));

function calculatePrice() {
  const totalProductOne = Number(document.getElementById('product-1').innerHTML) * 599
  const totalProductTwo = Number(document.getElementById('product-2').innerHTML) * 139
  let deliveryCost = 0
  if (document.getElementById('hemleverans').checked) {
    deliveryCost+=79
  }
  return totalProductOne + totalProductTwo + deliveryCost
}

function updatePrices() {
  document.getElementById('total').innerHTML = calculatePrice()
  document.getElementById('moms').innerHTML = Math.floor(calculatePrice() * .25)
}

updatePrices()