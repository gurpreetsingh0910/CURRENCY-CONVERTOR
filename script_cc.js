const api = "https://api.exchangerate-api.com/v4/latest/USD";

let search = document.querySelector(".searchBox");
let convert = document.querySelector(".convert");
let fromCurrency = document.querySelector(".from");
let toCurrency = document.querySelector(".to");
let finalValue = document.querySelector(".finalValue");
let finalAmount = document.getElementById("finalAmount");
let resultFrom;
let resultTo;
let searchValue;

fromCurrency.addEventListener('change', (event) => {
    resultFrom = ${event.target.value};
});

toCurrency.addEventListener('change', (event) => {
    resultTo = ${event.target.value};
});

search.addEventListener('input', updateValue);

function updateValue(e) {
    searchValue = e.target.value;
}

convert.addEventListener("click", getResults);

function getResults() {
    fetch(${api})
        .then(response => {
            return response.json();
        })
        .then(displayResults)
        .catch(error => {
            console.log("Error fetching data:", error);
        });
}

function displayResults(currency) {
    let fromRate = currency.rates[resultFrom];
    let toRate = currency.rates[resultTo];

    if (fromRate && toRate) {
        finalValue.innerHTML = ((toRate / fromRate) * searchValue).toFixed(2);
        finalAmount.style.display = "block";
    } else {
        finalValue.innerHTML = "Invalid currency selection";
    }
}

function clearVal() {
    window.location.reload();
    finalValue.innerHTML = "";
}