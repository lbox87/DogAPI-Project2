'use strict';

let breedSelected = "";
let endpoint = "";

function breedSubmitted() {
    $(`.js-submit`).click(event => {
        event.preventDefault();
        clearValues();
        submittedBreed();
        // prevent empty submission
        if (breedSelected == "") {
            alert("Please select a breed.");
            return;
        }
        fetchDogs();
    });
}

// captures breed submitted.
function submittedBreed() {
    breedSelected = $('.js-breed').val().toLowerCase();
    endpoint = "https://dog.ceo/api/breed/" + breedSelected + "/images/random";
}

// get dog image from endpoint
function fetchDogs() {
    fetch(`${endpoint}`)
        .then(response => response.json())
        .then(responseJson => displayDog(responseJson))
        .catch(error => {
            console.log(error);
            alert('Something went wrong, check console.');
        });
}

// append dog image from the API response into the js-dogs div
function displayDog(responseJson) {
    console.log(responseJson);
    // error message for user if API can not locate breed submitted
    if (responseJson.message == "Breed not found") {
        alert("Breed not found. Please check your spelling or try a different breed.");
        return;
    }
    else {
        $(`.js-dogs`).append(`<img src="${responseJson.message}" class="col-6 results-img">`);
    }
}

    // refresh values and clear div
    function clearValues() {
        breedSelected = "";
        endpoint = "";
        $(`.js-dogs`).html("");
    }

    $(breedSubmitted);