let searchInput = document.getElementById("searchInput");
let spinner = document.getElementById("spinner");
let searchResults = document.getElementById("searchResults");

function createAndAppendSearchResult(result) {

    //creating div 

    let resultItemDiv = document.createElement("div");
    resultItemDiv.classList.add("result-item");
    searchResults.appendChild(resultItemDiv);

    //creating SearchResult Title

    let {
        link,
        title,
        description
    } = result;

    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.textContent = title;
    titleEl.classList.add("result-title");
    resultItemDiv.appendChild(titleEl);

    //creating break element
    let titleBreakElement = document.createElement("br");
    resultItemDiv.appendChild(titleBreakElement);

    //creating url element
    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    resultItemDiv.appendChild(urlEl);

    //creating break element
    let linkBreakElement = document.createElement("br");
    resultItemDiv.appendChild(linkBreakElement);

    //creating description element
    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("link-description");
    descriptionEl.textContent = description;
    resultItemDiv.appendChild(descriptionEl);

}


function displayResults(search_results) {
    spinner.classList.toggle("d-none"); // spinner not get displayed after displaying search results

    for (let result of search_results) {
        createAndAppendSearchResult(result);
    }

}

function wikipediaSearch(event) {
    if (event.key === "Enter") {
        spinner.classList.toggle("d-none"); //to display spinner before displaying search results

        let searchInputValue = searchInput.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInputValue;

        let option = {
            method: "GET"
        };
        fetch(url, option)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }

}

searchInput.addEventListener("keydown", wikipediaSearch);