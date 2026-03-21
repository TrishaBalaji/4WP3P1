document.addEventListener('DOMContentLoaded', function() { 
const sold = document.getElementById('bags_sold') //received a ReferenceError: document is not defined, when working with mustache 
const ship = document.getElementById('bags_ship')
const form = document.getElementById('form')

form.addEventListener('submit', (e) => {
  let messages = []
  if (sold.value === '' || sold.value == null) {
    messages.push('Bags sold is required')
  }

  if (ship.value === '' || ship.value == null) {
    messages.push('Bags shipped is required')
  }

  if (sold.value.length <= 0) {
    messages.push('Bags sold must be more than 0')
  } 

  if (ship.value.length <= 0) {
    messages.push('Bags shipped must be more than 0')
  }


  if (messages.length > 0) {
    e.preventDefault()
    errorElement.innerText = messages.join(', ')
  }
}) 
});
