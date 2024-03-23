const phoneAPI = (Phone, DataLimit) => {

    fetch(`https://openapi.programming-hero.com/api/phones?search=${Phone}`)
        .then(res => res.json())
        .then(Data => phoneContainer(Data.data, DataLimit));

}

document.getElementById('phone-search-button').addEventListener('click', function () {
    const phoneInputField = document.getElementById('phone-input-field');
    const phoenInputText = phoneInputField.value;
    phoneInputField.value = '';
    phoneAPI(phoenInputText);

})

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
    
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"> Buy Now </button>
    
    
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel"> Mobile Purchase Confirmation </h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                               <b> You Are Successfuly Purchase ${Data.phone_name} !! ? </b>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-success" data-bs-dismiss="modal"> OK </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    </div>
        `
        phoneContainer.appendChild(phoneSection)
    })

}


// phoneAPI()