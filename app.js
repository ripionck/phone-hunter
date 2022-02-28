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
    // console.log(data);
    const searchResult = document.getElementById("search-result");
    data.forEach(phone => {
        console.log(phone)
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = `
            <div class="card">
                <img src="${phone.image}" class="card-img-top" alt="...">
               <div class="card-body">
                  <h5 class="card-title">${phone.phone_name}</h5>
                  <p class="card-text">${phone.brand}</p>
                 <button class="border-0">Details</button>
               </div>
            </div>
        `
        searchResult.appendChild(div);
    })
}