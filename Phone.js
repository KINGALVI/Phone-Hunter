const phoneAPI = (Phone) => {

    fetch(`https://openapi.programming-hero.com/api/phones?search=${Phone}`)
        .then(res => res.json())
        .then(Data => phoneContainer(Data.data));

}


document.getElementById('phone-search-button').addEventListener('click', function () {
    const phoneInputField = document.getElementById('phone-input-field');
    const phoenInputText = phoneInputField.value;
    phoneInputField.value = '';
    phoneAPI(phoenInputText);
    toggleSpinner(true);
})


document.addEventListener("DOMContentLoaded", function () {


    document.getElementById('phone-input-field').addEventListener('keyup', function () {

        const searchButton = document.getElementById('phone-search-button');

        if (event.key === "Enter") {
            searchButton.click()
            event.preventDefault()
            toggleSpinner(true);
        }

    })

})

const toggleSpinner = spinner => {

    const spinnerDiv = document.getElementById('spinner');
    if (spinner === true) {
        spinnerDiv.classList.remove('d-none');
    }
    else {
        spinnerDiv.classList.add('d-none');
    }

}

const showNoPhoneText = (Data) => {

    const getNoPhoneText = document.getElementById('no-phone-found');

    if (Data.length === 0) {
        getNoPhoneText.classList.remove('d-none')
    }
    else {
        getNoPhoneText.classList.add('d-none')
    }

}

const phoneContainer = (Data) => {

    const phoneContainer = document.getElementById('Phone-Container');
    phoneContainer.innerHTML = '';
    phoneContainer.textContent

    showNoPhoneText(Data);

    Data.forEach(Data => {
        const phoneSection = document.createElement('div');
        phoneSection.innerHTML = `
    <div class="col">

        <div class="card" style="width: 18rem;">

            <img src=${Data.image} class="card-img-top" alt="...">

            <div class="card-body">

                <h3 class="card-title">Brand : ${Data.brand}</h3>
                <br>
                <h4> Model : ${Data.phone_name} </h4>
                <br>
    
                <button type="button" class="btn btn-success" onclick="phoneDetailAPI('${Data.slug}')" data-bs-toggle="modal" data-bs-target="#exampleModal"> Detail Information </button>

            </div>

        </div>

    </div>
        `
        phoneContainer.appendChild(phoneSection)
    })

    toggleSpinner(false);

}


const phoneDetailAPI = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url)
    const Data = await res.json()
    phoneDetail(Data.data)
}

const phoneDetail = phoneDetail => {
    console.log(phoneDetail)
    const modalContainer = document.getElementById('modal-container')
    modalContainer.innerHTML = `
    <center>

    <ol class="list-group">

        <center>
            <li class="list-group-item  ">
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
                    ${phoneDetail.others.Bluetooth}
                </div>
            </li>
        </center>

        <center>
            <li class="list-group-item">
                <div class="ms-2 me-auto">
                    <div class="fw-bold">GPS</div>
                    ${phoneDetail.others.GPS}
                </div>
            </li>
        </center>

        <center>
            <li class="list-group-item">
                <div class="ms-2 me-auto">
                    <div class="fw-bold">NFC</div>
                    ${phoneDetail.others.NFC}
                </div>
            </li>
        </center>

        <center>
            <li class="list-group-item">
                <div class="ms-2 me-auto">
                    <div class="fw-bold">Radio</div>
                    ${phoneDetail.others.Radio}
                </div>
            </li>
        </center>

        <center>
            <li class="list-group-item">
                <div class="ms-2 me-auto">
                    <div class="fw-bold">USB</div>
                    ${phoneDetail.others.USB}
                </div>
            </li>
        </center>

        <center>
            <li class="list-group-item">
                <div class="ms-2 me-auto">
                    <div class="fw-bold">WLAN</div>
                    ${phoneDetail.others.WLAN}
                </div>
            </li>
        </center>

        <center>
            <li class="list-group-item">
                <div class="ms-2 me-auto">
                    <div class="fw-bold">Release Date</div>
                    ${phoneDetail.releaseDate}
                </div>
            </li>
        </center>

    </ol>
    
</center>
    `
}