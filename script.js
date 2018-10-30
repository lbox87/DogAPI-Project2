'use strict';

let breedSelected = "";
let endpoint = "";

function breedSubmitted() {
    $(`.js-submit`).click(event => {
        event.preventDefault();
        // clearValues();
        submittedBreed();
        // prevent values other than 1-50
        // if ((numberSelected > 50) || (numberSelected < 1)) {
        //     alert("Please select a number 1 through 50.");
        //     return;
        // }
        fetchDogs();
    });
}

// captures number submitted, or defaults to 3 if nothing submitted.
function submittedBreed() {
    breedSelected = $('.js-breed').val();
    // change empty submission to 3
    // if (breedSelected == "") {
    //     breedSelected = 3;
    // }
    endpoint = "https://dog.ceo/api/breed/" + breedSelected + "/images/random";
    console.log(`current endpoint is ${endpoint}`);
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
    $(`.js-dogs`).append(`<img src="${responseJson.message}" class="col-3 results-img">`);
}

// // refresh values and clear div
// function clearValues() {
//     numberSelected = "";
//     endpoint = "";
//     $(`.js-dogs`).html("");
// }

$(breedSubmitted);