"use strict";


//form elements
const form = document.querySelector(".form");
const submit = document.querySelector("submit");
const fnameInput = document.getElementById('fname');
const lnameInput = document.getElementById('lname');
const genderInputs = document.querySelectorAll('input[name="gender"]');
const dateInput = document.getElementById('date');
const degreeSelect = document.querySelector('#degreeSelect');
const fileInput = document.querySelector('#file')

//profile image's container elements
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const genderSpan = document.querySelector('#sex');
const dateOfBirth = document.querySelector('#dateOfBirth');
const degree = document.querySelector('#degree');
const uploadedImage = document.querySelector('#uploadedImage');

const saveButton = document.querySelector('.saved-profiles');
const displayProfiles = document.querySelector('.diplay-profiles')

// display input values in profile card


fnameInput.addEventListener('input', ()=> {
    firstName.textContent = fnameInput.value;
});
lnameInput.addEventListener('input', ()=> {
    lastName.textContent = lnameInput.value;
});
genderInputs.forEach(input => {
    input.addEventListener('change', ()=> {
        genderSpan.textContent = input.checked ? input.value : '';
    });
});
dateInput.addEventListener('input', ()=> {
    dateOfBirth.textContent = dateInput.value;
});
degreeSelect.addEventListener("change", ()=> {
    degree.textContent = degreeSelect.value;
});
fileInput.addEventListener('change', (event)=> {
    const file = event.target.files[0];
    if(file){
        const reader = new FileReader();
        reader.onload = function(e){
            uploadedImage.src = e.target.result; 
            uploadedImage.style.display = 'block'
        }
        reader.readAsDataURL(file);
    }
});

//show saved profiles after click
saveButton.addEventListener('click', ()=> {
    displayProfiles.style.display = 'flex';
});

// load data from localstorage

