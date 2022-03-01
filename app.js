const searchResult = document.getElementById
    ("search-result");
const searchPhone = () => {
    const inputText = document.getElementById("input-value");
    const inputValue = inputText.value;
    //console.log(inputValue);
    const error = document.getElementById("error");
    if (inputValue <= 0 || inputValue == "") {
        error.innerText = "please input valid name";
        inputText.value = "";
        searchResult.innerHTML = "";
    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`;
        fetch(url)
            .then(response => response.json())
            .then(data => displaySearchResult(data.data))

        inputText.value = "";
        searchResult.innerHTML = "";
    }
}

const displaySearchResult = data => {
    // console.log(data);
    // const searchResult = document.getElementById
    // ("search-result");
    error.innerText = "";
    const first20DPhone = data.slice(0, 20);
    first20DPhone.forEach(phone => {
        // console.log(phone)
        const div = document.createElement("div");
        div.classList.add("col");
        //searchResult.innerHTML = "";
        div.innerHTML = `
            <div class="card">
                <img width="200px" height="400px" src="${phone.image}" class="card-img-top" alt="...">
               <div class="card-body">
                  <h5 class="card-title">${phone.phone_name}</h5>
                  <p class="card-text">${phone.brand}</p>
                  <button onclick="details('${phone.slug}')"class="rounded">Details</button>
               </div>
            </div>
        `
        searchResult.appendChild(div);
    })
}

const details = (info) => {
    const url = `https://openapi.programming-hero.com/api/phone/${info}`
    //console.log(url)
    fetch(url)
        .then(response => response.json())
        .then(data => displayDetails(data.data))
}


const displayDetails = data => {
    //console.log(data);
    const showDetails = document.getElementById("single-details");
    searchResult.innerHTML = "";
    const div = document.createElement("div");
    div.classList.add("div");
    div.innerHTML = `
            <div class="card">
                <img width="250px" height="400px" src="${data.image}" class="card-img-top" alt="...">
                <div class="card-body">
                   <p class="card-text"><span class="fw-bold">Release Date:</span> ${data.releaseDate}</p>
                   <p class="card-text"><span class="fw-bold">Storage:</span> ${data.mainFeatures.storage}</p>
                   <p class="card-text"><span class="fw-bold">Memory:</span> ${data.mainFeatures.memory}</p>
                   <p class="card-text"><span class="fw-bold">Sensor:</span> ${data.mainFeatures.sensors}</p>
                </div>
            </div>
        `
    showDetails.appendChild(div);
}