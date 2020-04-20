const currencyEl_one = document.getElementById('currency-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_one = document.getElementById('amount-one');
const amountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');


// Fetch exchange rates ad update the DOM
function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  fetch(`https://prime.exchangerate-api.com/v5/19fa2d59f48a2df6c2f5253c/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      const rate = data.conversion_rates[currency_two];
      
      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });
}

// Event listeners
currencyEl_one.addEventListener('change', calculate);

// input is for using arrows or changing values
amountEl_one.addEventListener('input', calculate);

currencyEl_two.addEventListener('change', calculate);

amountEl_two.addEventListener('input', calculate);

swap.addEventListener('click', () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
});

calculate();