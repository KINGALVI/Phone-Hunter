const phoneAPI = () => {

    fetch(`https://openapi.programming-hero.com/api/phones?search=iphone`)
        .then(res => res.json())
        .then(Data => phoneContainer(Data.data));

}

const phoneContainer = (Data) => {

    const phoneContainer = document.getElementById('Phone-Container');

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
                               <b> Are You Sure You Want To Purchase ${Data.phone_name} ? </b>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal"> No </button>
                                <button type="button" class="btn btn-primary" id="yes-btn" data-bs-dismiss="modal"> Yes </button>
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

    document.getElementById('yes-btn').addEventListener('click', function () {
        alert(`You Successfuly Purchase Thish Phone`)
    })

}


phoneAPI()