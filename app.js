const searchPhone = () => {
    const inputText = document.getElementById("input-value");
    const inputValue = inputText.value;
    console.log(inputValue);
    inputText.value = "";
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displaySearchResult(data.data))
}

const displaySearchResult = data => {
    //console.log(data);
    const searchResult = document.getElementById
        ("search-result");
    const first20DPhone = data.slice(0, 20);
    first20DPhone.forEach(phone => {
        // console.log(phone)
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = `
            <div class="card">
                <img src="${phone.image}" class="card-img-top" alt="...">
               <div class="card-body">
                  <h5 class="card-title">${phone.phone_name}</h5>
                  <p class="card-text">${phone.brand}</p>
                 <button onclick="displayDetails('${phone.slug}')"class="rounded">Details</button>
               </div>
            </div>
        `
        searchResult.appendChild(div);
    })
}

const displayDetails = (info) => {
    const url = `https://openapi.programming-hero.com/api/phone/${info}`
    //console.log(url)
    fetch(url)
        .then(response => response.json())
        .then(data => console.log(data.data))
}