async function getTxt(url) {
    let response = await fetch(url);
    let data = await response.text();
    return data;
}

const getRandomArrayElement = array => {
    return array[Math.floor(Math.random() * array.length)];
}

async function fetchNPM(keyword) {
    let response = await fetch(`http://npmsearch.com/query?q=${keyword}`);
    let data = await response.json();
    return data;
}

const expansionsHTML = document.getElementById("npm-expansions-txt");
let txtArr = [];

getTxt("./assets/npm-expansions/expansions.txt").then(data => {
    txtArr = data.split("\r\n");
    let item = getRandomArrayElement(txtArr);
    expansionsHTML.innerText = item;

});

expansionsHTML.addEventListener("click", e => {
    if(txtArr.length > 0) {
        let item = getRandomArrayElement(txtArr);
        expansionsHTML.innerText = item;
    }
});




const searchBarHTML = document.getElementById("search-npm-packages");
const npmQueryContainer = document.getElementById("npm-search-results-container");

searchBarHTML.addEventListener("keyup", e => {
    let result = [];
    
    fetchNPM(searchBarHTML.value).then(data => {
        npmQueryContainer.innerHTML = "";

        results = data.results.slice(0, 10);
        results.forEach(result => {
            
            let resultContainer = document.createElement("div");
            resultContainer.classList.add("rs-container", "border-b-sm", "p-3", "py-3")

            let rsMeta = document.createElement("div");
            rsMeta.classList.add("rs-meta");

            let p = document.createElement("p");
        
            if(results.indexOf(result) < 5) {
                let h3 = document.createElement("h3");
                let rsVersion = document.createElement("div");
                rsVersion.classList.add("rs-version");
                let pVersion = document.createElement("p");

                h3.innerText = result.name[0];
                p.innerText = result.description[0];
                pVersion.innerText = result.version[0];

                rsVersion.prepend(pVersion);
                rsMeta.prepend(h3, p);

                resultContainer.prepend(rsMeta, rsVersion);
                npmQueryContainer.prepend(resultContainer);

            } else {
                p.innerText = result.name[0];
                rsMeta.prepend(p);
                resultContainer.prepend(rsMeta);
                npmQueryContainer.append(resultContainer);
            }
        })
        
    })
});