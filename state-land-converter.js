const STATE_CONVERSION_RATES = {
  "bihar": { stateCode: "BR", hectareFactor: 0.250, unitName: "Bigha" },
  "uttar pradesh": { stateCode: "UP", hectareFactor: 0.253, unitName: "Bigha" },
  "rajasthan": { stateCode: "RJ", hectareFactor: 0.250, unitName: "Bigha" },
  "madhya pradesh": { stateCode: "MP", hectareFactor: 0.133, unitName: "Bigha" },
  "punjab": { stateCode: "PB", hectareFactor: 0.101, unitName: "Bigha" },
  "haryana": { stateCode: "HR", hectareFactor: 0.101, unitName: "Bigha" },
  "west bengal": { stateCode: "WB", hectareFactor: 0.1338, unitName: "Bigha" },
  "assam": { stateCode: "AS", hectareFactor: 0.1338, unitName: "Bigha" },
  "himachal pradesh": { stateCode: "HP", hectareFactor: 0.0809, unitName: "Bigha" },
  "uttarakhand": { stateCode: "UK", hectareFactor: 0.0809, unitName: "Bigha" },
  "gujarat": { stateCode: "GJ", hectareFactor: 0.161, unitName: "Bigha" },
  "maharashtra": { stateCode: "MH", hectareFactor: 0.250, unitName: "Bigha" },
  "jharkhand": { stateCode: "JH", hectareFactor: 0.250, unitName: "Bigha" },
  "odisha": { stateCode: "OD", hectareFactor: 0.250, unitName: "Bigha" },
  "tripura": { stateCode: "TR", hectareFactor: 0.1338, unitName: "Bigha" },
  "chhattisgarh": { stateCode: "CG", hectareFactor: 0.133, unitName: "Bigha" },
  "sikkim": { stateCode: "SK", hectareFactor: 0.1338, unitName: "Bigha" },
  "jammu and kashmir": { stateCode: "JK", hectareFactor: 0.0505, unitName: "Kanal" },
  "goa": { stateCode: "GA", hectareFactor: 0.0101, unitName: "Guntha" },
  "karnataka": { stateCode: "KA", hectareFactor: 0.0101, unitName: "Guntha" },
  "tamil nadu": { stateCode: "TN", hectareFactor: 0.0223, unitName: "Ground" },
  "andhra pradesh": { stateCode: "AP", hectareFactor: 0.0040, unitName: "Cent" },
  "telangana": { stateCode: "TS", hectareFactor: 0.0101, unitName: "Guntha" },
  "kerala": { stateCode: "KL", hectareFactor: 0.0040, unitName: "Cent" },
  "meghalaya": { stateCode: "ML", hectareFactor: 0.1338, unitName: "Bigha / Acre" },
  "manipur": { stateCode: "MN", hectareFactor: 0.1338, unitName: "Bigha / Acre" },
  "mizoram": { stateCode: "MZ", hectareFactor: 0.1338, unitName: "Bigha / Acre" },
  "nagaland": { stateCode: "NL", hectareFactor: 0.1338, unitName: "Bigha / Acre" }
};

const stateSelect = document.querySelector("#state");
const fromUnitSelect = document.querySelector("#from-unit");
const toUnitSelect = document.querySelector("#to-unit");
const amountInput = document.querySelector(".amount input");
const message = document.querySelector(".msg");
const formButton = document.querySelector("form button");

for (const stateName in STATE_CONVERSION_RATES) {
  const option = document.createElement("option");
  option.value = stateName;
  option.textContent = stateName.replace(/\b\w/g, letter => letter.toUpperCase());
  stateSelect.append(option);
}

stateSelect.value = "bihar";

function updateStateAndUnits() {
  const state = STATE_CONVERSION_RATES[stateSelect.value];
  document.querySelector("#state-code").textContent = state.stateCode;
  fromUnitSelect.innerHTML = `<option value="local">${state.unitName}</option><option value="hectare">Hectare</option>`;
  toUnitSelect.innerHTML = `<option value="hectare">Hectare</option><option value="local">${state.unitName}</option>`;
  fromUnitSelect.value = "local";
  toUnitSelect.value = "hectare";
}

function updateConversion() {
  const amount = Number(amountInput.value) || 0;
  const state = STATE_CONVERSION_RATES[stateSelect.value];
  const fromFactor = fromUnitSelect.value === "hectare" ? 1 : state.hectareFactor;
  const toFactor = toUnitSelect.value === "hectare" ? 1 : state.hectareFactor;
  const convertedAmount = amount * fromFactor / toFactor;
  const fromUnitName = fromUnitSelect.value === "hectare" ? "Hectare" : state.unitName;
  const toUnitName = toUnitSelect.value === "hectare" ? "Hectare" : state.unitName;

  message.textContent = `${amount} ${fromUnitName} = ${convertedAmount.toFixed(2)} ${toUnitName}`;
}

stateSelect.addEventListener("change", () => {
  updateStateAndUnits();
  updateConversion();
});
fromUnitSelect.addEventListener("change", updateConversion);
toUnitSelect.addEventListener("change", updateConversion);

updateStateAndUnits();

formButton.addEventListener("click", event => {
  event.preventDefault();
  updateConversion();
});

updateConversion();
