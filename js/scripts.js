"use strict";


//form elements
const form = document.querySelector(".form");
const submit = document.querySelector("submit");
const fnameInput = document.getElementById('fname');
const lnameInput = document.getElementById('lname');
const genderInputs = document.querySelectorAll('input[name="gender"]');
const dateInput = document.getElementById('date');
const degreeSelect = document.querySelector('#degreeSelect');
const fileInput = document.querySelector('#file');
const checked = document.querySelector('.checked');

//profile image's container elements
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const genderSpan = document.querySelector('#sex');
const dateOfBirth = document.querySelector('#dateOfBirth');
const degree = document.querySelector('#degree');
const uploadedImage = document.querySelector('#uploadedImage');

const saveButton = document.querySelector('.saved-profiles');
const displayProfiles = document.querySelector('.diplay-profiles');
const closeButton = document.querySelector('.fa-regular');

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

// close saved profile pop up page

displayProfiles.addEventListener('click', ()=> {
    displayProfiles.style.display = 'none';
})


// load data from localstorage

window.onload = () => {
    const savedData = JSON.parse(localStorage.getItem('.form'));
    if(savedData) {
        console.log(savedData)
        fnameInput.value = savedData.fname || "";
        lnameInput.value = savedData.lname || "";
        dateInput.value = savedData.date || "";
        degreeSelect.value = savedData.degree || '';
        uploadedImage.style.display = savedData.image || 'images/profile.png';
        genderInputs.forEach(input => {
            if (input.value === savedData.gender) {
                input.checked = true;
            }
        });
        firstName.textContent = savedData.fname || "";
        lastName.textContent = savedData.lname || "";
        genderSpan.textContent = savedData.gender || "";
        dateOfBirth.textContent = savedData.date || "";
        degree.textContent = savedData.degree || "";
    }
}


const  createProfileDisplay = function(profileData) {
    const profileContainer = document.createElement('div');
    profileContainer.className = 'display-saved';

    const imageContainer = document.createElement('div');
    imageContainer.className = 'display-saved-image';
    const image = document.createElement('img');
    image.src = profileData.image || 'images/profile.png'; 
    image.alt = 'Profile Image';
    imageContainer.appendChild(image);

    const savedInfo = document.createElement('div');
    savedInfo.className = 'saved-info';

    savedInfo.innerHTML = `
        <span>${profileData.fname}</span>
        <span>${profileData.lname}</span>
        <span>${profileData.gender}</span>
        <span>${profileData.date}</span>
        <span>${profileData.degree}</span>
    `;

    profileContainer.appendChild(imageContainer);
    profileContainer.appendChild(savedInfo);
    
    displayProfiles.appendChild(profileContainer);
}

form.addEventListener('submit', (e)=> {
    e.preventDefault();


    checked.style.display = 'inline';


    const profileData = {
        fname: fnameInput.value,
        lname: lnameInput.value,
        gender: Array.from(genderInputs).find(input => input.checked)?.value || '',
        date: dateInput.value,
        degree: degreeSelect.value,
        image: uploadedImage.src
    }

    localStorage.setItem('profileData', JSON.stringify(profileData));

    firstName.textContent = profileData.fname ;
    lastName.textContent = profileData.lname ;
    genderSpan.textContent = profileData.gender ;
    dateOfBirth.textContent = profileData.date ;
    degree.textContent = profileData.degree ;

    createProfileDisplay(profileData);

    form.reset();

    console.log(profileData);
})

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadedImage.src = e.target.result; 
            uploadedImage.style.display = 'block'; 
        };
        reader.readAsDataURL(file); 
    }
})