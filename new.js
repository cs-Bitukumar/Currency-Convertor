const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies";



let drop_down = document.querySelectorAll(".select-container select");
let btn = document.querySelector("form button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");



  

// Populate dropdowns
for (let select of drop_down) {
  for (let currency_code in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currency_code;
    newOption.value = currency_code;

    if (select.name === "from" && currency_code === "USD") {
      newOption.selected = true;
    } else if (select.name === "to" && currency_code === "INR") {
      newOption.selected = true;
    }

    select.append(newOption);
    
  }

  select.addEventListener("change", function (evt) {
    updateFlag(evt.target);
  });
}

// Update flags
const updateFlag = function (select) {
  let currCode = select.value;
  let countryCode = countryList[currCode];
  let img = select.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
};

// Get and display exchange rate
const updateExchangeRate = async function () {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;

  if (amtVal === "" || amtVal <= 0) {
    amtVal = 1;
    amount.value = amtVal;
  }

  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

  try {
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmt = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt.toFixed(2)} ${toCurr.value}`;
  } catch (error) {
    msg.innerText = "Something went wrong while fetching data!";
    console.error("Error fetching exchange rate:", error);
  }
};


// Event listeners
btn.addEventListener("click", function (evt) {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", function () {
  updateExchangeRate();
});
