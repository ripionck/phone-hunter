const searchResult = document.getElementById
    ("search-result");
const showDetails = document.getElementById("single-details");
//search phone
const searchPhone = () => {
    const inputText = document.getElementById("input-value");
    const inputValue = inputText.value;
    //console.log(inputValue);
    const error = document.getElementById("error");
    if (inputValue < 0 || inputValue == "") {
        error.innerText = "Please input valid name";
        inputText.value = "";
        searchResult.innerHTML = "";
        showDetails.innerHTML = "";
    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`;
        fetch(url)
            .then(response => response.json())
            .then(data => displaySearchResult(data.data))

        inputText.value = "";
        showDetails.innerHTML = "";
    }
}
//display search result
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
//get single data
const details = (info) => {
    const url = `https://openapi.programming-hero.com/api/phone/${info}`
    //console.log(url)
    fetch(url)
        .then(response => response.json())
        .then(data => displayDetails(data.data))
}

// display single details
const displayDetails = data => {
    //console.log(data);
    // const showDetails = document.getElementById("single-details");
    searchResult.innerHTML = "";
    const div = document.createElement("div");
    div.classList.add("div");
    div.innerHTML = `
            <div class="card">
                <img width="250px" height="400px" src="${data.image}" class="card-img-top" alt="...">
                <div class="card-body">
                   <div>
                        <h4 class="fw-bold">Main Features:</h4>
                        <p class="card-text"><span class="fw-bold">Storage:</span> ${data.mainFeatures.storage}</p>
                        <p class="card-text"><span class="fw-bold">Display:</span> ${data.mainFeatures.displaySize}</p>
                        <p class="card-text"><span class="fw-bold">Chip set:</span> ${data.mainFeatures.chipSet}</p>
                        <p class="card-text"><span class="fw-bold">Memory:</span> ${data.mainFeatures.memory}</p>
                        <p class="card-text"><span class="fw-bold">Sensor:</span> ${data.mainFeatures.sensors}</p>
                   </div>
                   <div>
                        <h4 class="fw-bold">Others:</h4>
                        <p class="card-text"><span class="fw-bold">WLAN:</span> ${data.others.WLAN}</p>
                        <p class="card-text"><span class="fw-bold">Bluetooth:</span> ${data.Bluetooth}</p>
                        <p class="card-text"><span class="fw-bold">GPS:</span> ${data.GPS}</p>
                        <p class="card-text"><span class="fw-bold">NFC:</span> ${data.NFC}</p>
                        <p class="card-text"><span class="fw-bold">Radio:</span> ${data.Radio}</p>
                        <p class="card-text"><span class="fw-bold">USB:</span> ${data.USB}</p>
                   </div>
                </div>
            </div>
        `
    showDetails.appendChild(div);
}
