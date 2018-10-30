'use strict';

let numberSelected = "";
let endpoint = "";

function numberSubmitted() {
    $(`.js-submit`).click(event => {
        event.preventDefault();
        clearValues();
        submittedNumber();
        // prevent values other than 1-50
        if ((numberSelected > 50) || (numberSelected < 1)) {
            alert("Please select a number 1 through 50.");
            return;
        }
        fetchDogs();
    });
}

// captures number submitted, or defaults to 3 if nothing submitted.
function submittedNumber() {
    numberSelected = $('.js-number').val();
    // change empty submission to 3
    if (numberSelected == "") {
        numberSelected = 3;
    }
    endpoint = "https://dog.ceo/api/breeds/image/random/" + numberSelected;
}

// get dog images from endpoint
function fetchDogs() {
    fetch(`${endpoint}`)
        .then(response => response.json())
        .then(responseJson => displayDog(responseJson))
        .catch(error => {
            console.log(error);
            alert('Something went wrong, check console.');
        });

}

// append each dog image from the API response into the js-dogs div
function displayDog(responseJson) {
    console.log(responseJson);
    for (let i = 0; i < responseJson.message.length; i++) {
        $(`.js-dogs`).append(`<img src="${responseJson.message[i]}" class="col-3 results-img">`);
    }
}

// refresh values and clear div
function clearValues() {
    numberSelected = "";
    endpoint = "";
    $(`.js-dogs`).html("");
}

$(numberSubmitted);