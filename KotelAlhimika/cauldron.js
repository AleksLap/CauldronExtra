'use strict';

let dragged;
let elementsList = document.getElementById('ingredientsList');

// drag event

document.addEventListener('dragstart', function (event) {
    dragged = event.target;
});

document.addEventListener('dragover', function (event) {
    event.preventDefault();
});

document.addEventListener('drop', function (event) {
    event.preventDefault();

    let cauldronList = document.getElementById('cauldronList');

    if(event.target.className === 'cauldronSVG'){
        dragged.parentNode.removeChild( dragged );
        cauldronList.appendChild( dragged );
    }
    if(event.target.className !== 'cauldronSVG'){
        dragged.parentNode.removeChild( dragged );
        elementsList.appendChild( dragged );
    }
    checkInFormulas();

});

// search in formulas

function checkInFormulas() {
    let result = '';
    let cauldronListElements = document.querySelectorAll('ul.ingredientsInCauldron > li');

    if(cauldronListElements.length < 2) {
    result = '';
    }
    else {

    for(let i = 0; i < formulas.length; i++) {
        let elementsArray = formulas[i].elements;
        let count = 0;

        for (let j = 0; j < cauldronListElements.length; j++) {
            let elementValue = cauldronListElements[j].dataset.element;

            if (elementsArray.indexOf(elementValue) >= 0){
                count++;
            }
        }
        if (count === cauldronListElements.length) {
            result = formulas[i].result;
            break
        }
    }
}
    showResult(result);
    return result;

}

checkInFormulas();

// input result

function showResult(result) {
    document.getElementById('result').innerHTML = result;
}

// reset

let button = document.getElementById('reset');

button.addEventListener('click', function (event) {
    event.preventDefault();

    let cauldronElementsList = document.querySelectorAll('ul.ingredientsInCauldron > li');
    let cauldronList = document.getElementById('cauldronList');

    for(let i = 0; i < cauldronElementsList.length; i++){
        let remove = cauldronElementsList[i];
        cauldronList.removeChild(remove);
        elementsList.appendChild(remove);
    }
});

// search

let searchElem = document.getElementById('searchElement');

searchElem.addEventListener('input', function () {
    let searchText = document.getElementById('searchElement').value.toLowerCase();
    const elements = document.querySelectorAll('ul.availableElements > li');

    for (let i = 0; i < elements.length; i++) {
        let searchInName = elements[i].textContent;

        if (searchInName.indexOf(searchText) === -1) {
            elements[i].style.display = 'none';
        }
        else {
            elements[i].style.display = 'block';
        }
    }
});