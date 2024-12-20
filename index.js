// load all phones 
const loadPhones = async (buttonStatus, searchText) => {
    document.getElementById('loading').classList.add('hidden');
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText ? searchText : 'iphone'}`);
    const data = await response.json();
    displayPhones(data.data, buttonStatus);
}
// phone details modal work
const phoneDetails = async(slug) =>{
    const response = await fetch(`https://openapi.programming-hero.com/api/phone/${slug}`);
    const data = await response.json();
    console.log(data.data);
    
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = `<dialog id="my_modal_1" class="modal">
    <div class="modal-box">
    <h3 class="text-2xl text-center font-bold">${data.data.name}</h3>
    <figure class="px-10 pt-10 flex justify-center">
            <img src="${data.data.image}" alt="Shoes"
            class="rounded-xl" />
        </figure>
    <div class="pt-4">
    <p class="py-2 text-xl text-neutral-600 font-bold px-10">Brand: ${data.data.brand}</p>
    <p class="py-2 text-xl text-neutral-600 font-bold px-10">${data.data.releaseDate}</p>
    </div>
    <div class="modal-action">
    <form method="dialog">
    <!-- if there is a button in form, it will close the modal -->
    <button class="btn">Close</button>
    </form>
    </div>
    </div>
    </dialog>`;
    my_modal_1.showModal();
};


// display all phones
const displayPhones = (phones, buttonStatus) => {
    const mobileContainer = document.getElementById('mobile-container');
    mobileContainer.innerHTML = '';
    if(phones.length === 0){
        mobileContainer.classList.remove('grid');
        mobileContainer.innerHTML = `
        <div class = "w-11/12 mx-auto">
        <p class="text-center text-2xl font-bold">No mobile found!!</p>
        </div>`
    }
    else{
        mobileContainer.classList.add('grid');
    }
    (buttonStatus?phones:phones.slice(0,6)).forEach(phone => {
        const mobileCard = document.createElement('div');
        mobileCard.innerHTML = `
        <div class="card bg-base-100 py-4 shadow-xl">
        <figure class="px-10 pt-10">
            <img src="${phone.image}" alt="Shoes"
            class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title">${phone.phone_name
            }</h2>
            <p>${phone.slug}</p>
        <div class="card-actions">
            <button class="btn" onclick="phoneDetails('${phone.slug}')">Show Details</button>
        </div>
        </div>
        </div>`;
        mobileContainer.appendChild(mobileCard);
    })
}

// displayAll button handler
const showAllButtonHandler = () => {
    const searchText = document.getElementById('input-field').value;
    loadPhones(true, searchText);
}

const loadHandler = () => {
    document.getElementById('loading').classList.remove('hidden');
    const searchText = document.getElementById('input-field').value;
    setTimeout(() => {
        loadPhones(false, searchText);
    }, 2000)
};
