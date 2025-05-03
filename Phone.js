// Function to fetch phone data based on user search input
const phoneAPI = (Phone) => {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${Phone}`)
        .then(res => res.json()) // Convert response to JSON
        .then(Data => phoneContainer(Data.data)); // Pass retrieved data to phoneContainer function
};

// Event listener for search button click
document.getElementById('phone-search-button').addEventListener('click', function () {
    const phoneInputField = document.getElementById('phone-input-field');
    const phoneInputText = phoneInputField.value;

    // Clear input field after search
    phoneInputField.value = '';

    // Fetch phone data using API call
    phoneAPI(phoneInputText);

    // Show loading spinner while fetching results
    toggleSpinner(true);
});

// Event listener for "Enter" key in search input field
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('phone-input-field').addEventListener('keyup', function (event) {
        const searchButton = document.getElementById('phone-search-button');

        if (event.key === "Enter") {
            searchButton.click(); // Trigger search button click
            event.preventDefault(); // Prevent default form submission
            toggleSpinner(true); // Show spinner while loading results
        }
    });
});

// Function to toggle the loading spinner visibility
const toggleSpinner = (spinner) => {
    const spinnerDiv = document.getElementById('spinner');

    if (spinner) {
        spinnerDiv.classList.remove('d-none'); // Show spinner
    } else {
        spinnerDiv.classList.add('d-none'); // Hide spinner
    }
};

// Function to display "No Phone Found" message if search returns empty results
const showNoPhoneText = (Data) => {
    const getNoPhoneText = document.getElementById('no-phone-found');

    if (Data.length === 0) {
        getNoPhoneText.classList.remove('d-none'); // Show message
    } else {
        getNoPhoneText.classList.add('d-none'); // Hide message
    }
};

// Function to populate phone results in the UI
const phoneContainer = (Data) => {
    const phoneContainer = document.getElementById('Phone-Container');
    phoneContainer.innerHTML = ''; // Clear previous results

    showNoPhoneText(Data); // Check if no phone was found

    // Loop through each phone in the API response and create UI elements dynamically
    Data.forEach(phone => {
        const phoneSection = document.createElement('div');
        phoneSection.innerHTML = `
            <div class="col">
                <div class="card" style="width: 18rem;">
                    <img src=${phone.image} class="card-img-top" alt="Phone Image">
                    <div class="card-body">
                        <h3 class="card-title">Brand: ${phone.brand}</h3>
                        <br>
                        <h4>Model: ${phone.phone_name}</h4>
                        <br>
                        <button type="button" class="btn btn-success" onclick="phoneDetailAPI('${phone.slug}')" 
                            data-bs-toggle="modal" data-bs-target="#exampleModal">Detail Information</button>
                    </div>
                </div>
            </div>
        `;
        phoneContainer.appendChild(phoneSection);
    });

    // Hide the loading spinner after results are loaded
    toggleSpinner(false);
};

// Function to fetch detailed phone information based on selected model
const phoneDetailAPI = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url); // Fetch phone details using API
    const Data = await res.json(); // Convert response to JSON
    phoneDetail(Data.data); // Pass data to phoneDetail function
};

// Function to display detailed phone specifications inside the modal
const phoneDetail = (phoneDetail) => {
    console.log(phoneDetail); // Log phone details for debugging

    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = `
        <center>
            <ol class="list-group">
                <center>
                    <li class="list-group-item">
                        <div class="ms-2 me-auto">
                            <div class="fw-bold">ChipSet</div>
                            ${phoneDetail.mainFeatures.chipSet}
                        </div>
                    </li>
                </center>
                <center>
                    <li class="list-group-item">
                        <div class="ms-2 me-auto">
                            <div class="fw-bold">Display Size</div>
                            ${phoneDetail.mainFeatures.displaySize}
                        </div>
                    </li>
                </center>
                <center>
                    <li class="list-group-item">
                        <div class="ms-2 me-auto">
                            <div class="fw-bold">Memory</div>
                            ${phoneDetail.mainFeatures.memory}
                        </div>
                    </li>
                </center>
                <center>
                    <li class="list-group-item">
                        <div class="ms-2 me-auto">
                            <div class="fw-bold">Storage</div>
                            ${phoneDetail.mainFeatures.storage}
                        </div>
                    </li>
                </center>
                <center>
                    <li class="list-group-item">
                        <div class="ms-2 me-auto">
                            <div class="fw-bold">Bluetooth</div>
                            ${phoneDetail.others?.Bluetooth ?? "N/A"}
                        </div>
                    </li>
                </center>
                <center>
                    <li class="list-group-item">
                        <div class="ms-2 me-auto">
                            <div class="fw-bold">GPS</div>
                            ${phoneDetail.others?.GPS ?? "N/A"}
                        </div>
                    </li>
                </center>
                <center>
                    <li class="list-group-item">
                        <div class="ms-2 me-auto">
                            <div class="fw-bold">NFC</div>
                            ${phoneDetail.others?.NFC ?? "N/A"}
                        </div>
                    </li>
                </center>
                <center>
                    <li class="list-group-item">
                        <div class="ms-2 me-auto">
                            <div class="fw-bold">Radio</div>
                            ${phoneDetail.others?.Radio ?? "N/A"}
                        </div>
                    </li>
                </center>
                <center>
                    <li class="list-group-item">
                        <div class="ms-2 me-auto">
                            <div class="fw-bold">USB</div>
                            ${phoneDetail.others?.USB ?? "N/A"}
                        </div>
                    </li>
                </center>
                <center>
                    <li class="list-group-item">
                        <div class="ms-2 me-auto">
                            <div class="fw-bold">WLAN</div>
                            ${phoneDetail.others?.WLAN ?? "N/A"}
                        </div>
                    </li>
                </center>
                <center>
                    <li class="list-group-item">
                        <div class="ms-2 me-auto">
                            <div class="fw-bold">Release Date</div>
                            ${phoneDetail.releaseDate || "Not Available"}
                        </div>
                    </li>
                </center>
            </ol>
        </center>
    `;
};
