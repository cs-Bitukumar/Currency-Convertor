// ------------------- Currency to Country Map -------------------
const currencyToCountryName = {
  AED: "United Arab Emirates",
  AFN: "Afghanistan",
  ALL: "Albania",
  AMD: "Armenia",
  ARS: "Argentina",
  AUD: "Australia",
  BDT: "Bangladesh",
  BGN: "Bulgaria",
  BHD: "Bahrain",
  BRL: "Brazil",
  CAD: "Canada",
  CHF: "Switzerland",
  CNY: "China",
  COP: "Colombia",
  CZK: "Czech Republic",
  DKK: "Denmark",
  DOP: "Dominican Republic",
  EGP: "Egypt",
  EUR: "Eurozone",
  GBP: "United Kingdom",
  GHS: "Ghana",
  HKD: "Hong Kong",
  HUF: "Hungary",
  IDR: "Indonesia",
  ILS: "Israel",
  INR: "India",
  IQD: "Iraq",
  IRR: "Iran",
  ISK: "Iceland",
  JPY: "Japan",
  KES: "Kenya",
  KRW: "South Korea",
  KWD: "Kuwait",
  LKR: "Sri Lanka",
  MAD: "Morocco",
  MVR: "Maldives",
  MXN: "Mexico",
  MYR: "Malaysia",
  NGN: "Nigeria",
  NOK: "Norway",
  NPR: "Nepal",
  NZD: "New Zealand",
  OMR: "Oman",
  PEN: "Peru",
  PHP: "Philippines",
  PKR: "Pakistan",
  PLN: "Poland",
  QAR: "Qatar",
  RON: "Romania",
  RUB: "Russia",
  SAR: "Saudi Arabia",
  SEK: "Sweden",
  SGD: "Singapore",
  THB: "Thailand",
  TRY: "Turkey",
  TWD: "Taiwan",
  USD: "United States",
  VND: "Vietnam",
  ZAR: "South Africa"
};

// ------------------- HTML Element References -------------------
const fromCurr = document.getElementById("from");
const toCurr = document.getElementById("to");
const amountInput = document.querySelector("form input");
const form = document.querySelector("form");
const msg = document.querySelector(".msg");
const fromImg = document.querySelector(".from img");
const toImg = document.querySelector(".to img");

// ------------------- Populate Dropdowns -------------------
const currencyCodes = Object.keys(currencyToCountryName);

currencyCodes.forEach(code => {
  const fromOption = document.createElement("option");
  const toOption = document.createElement("option");

  fromOption.value = code;
  fromOption.text = `${code} - ${currencyToCountryName[code]}`;
  toOption.value = code;
  toOption.text = `${code} - ${currencyToCountryName[code]}`;

  if (code === "USD") fromOption.selected = true;
  if (code === "INR") toOption.selected = true;

  fromCurr.appendChild(fromOption);
  toCurr.appendChild(toOption);
});

// ------------------- Update Flags on Change -------------------
fromCurr.addEventListener("change", () => {
  updateFlag(fromCurr.value, fromImg);
});
toCurr.addEventListener("change", () => {
  updateFlag(toCurr.value, toImg);
});

function updateFlag(currencyCode, imgElement) {
  const countryCode = getCountryCode(currencyCode);
  imgElement.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

function getCountryCode(currencyCode) {
  const specialCases = {
    EUR: "EU",
    USD: "US",
    GBP: "GB",
    JPY: "JP",
    CNY: "CN",
    AUD: "AU",
    CAD: "CA",
    INR: "IN",
    RUB: "RU"
    // Add more if needed
  };
  return specialCases[currencyCode] || currencyCode.slice(0, 2);
}

// ------------------- Convert Button Event -------------------
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const amount = parseFloat(amountInput.value);
  if (isNaN(amount) || amount <= 0) {
    msg.innerText = "Please enter a valid amount.";
    return;
  }

  const from = fromCurr.value;
  const to = toCurr.value;

  const URL = `https://api.exchangerate-api.com/v4/latest/${from}`;

  try {
    const response = await fetch(URL);
    if (!response.ok) throw new Error("Rate not available.");
    const data = await response.json();

    const rate = data.rates[to];
    if (!rate) throw new Error("Invalid currency selected.");

    const converted = (amount * rate).toFixed(2);
    msg.innerText = `${amount} ${from} = ${converted} ${to}`;
  } catch (error) {
    msg.innerText = "Error: " + error.message;
  }
});
