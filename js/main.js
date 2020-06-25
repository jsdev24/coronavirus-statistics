
let list = document.querySelector("#table");
let global = document.getElementById("global");
let globalCases = document.getElementById("globalCases");
let globalDeaths = document.getElementById("globalDeaths");
let globalrecovered = document.getElementById("globalrecovered");


fetch("https://api.covid19api.com/summary")
    .then(data => {
        return data.json();
    }).then(data => {
        global.style.display = "block";
        globalCases.innerHTML = data.Global.TotalConfirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        globalDeaths.innerHTML = data.Global.TotalDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        globalrecovered.innerHTML = data.Global.TotalRecovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        showStatictics(data.Countries);
    })


let showStatictics = countries => {

    let createRow = document.createElement("tr");
    [
        "Country",
        "New Confirmed",
        "New Deaths",
        "New Recovered",
        "Total Confirmed",
        "Total Deaths",
        "Total Recovered"
    ].forEach(item => {
        let createColumn = document.createElement("td");
        createColumn.innerHTML = item;
        createRow.appendChild(createColumn);
    })
    table.appendChild(createRow);


    countries.forEach(country => {
        let createRow = document.createElement("tr");

        let obj = {
            countryname: country.Country,
            newconfirmed: country.NewConfirmed,
            newdeaths: country.NewDeaths,
            newrecovered: country.NewRecovered,
            totalconfirmed: country.TotalConfirmed,
            totalDeaths: country.TotalDeaths,
            totalrecovered: country.TotalRecovered
        };

        for (let i in obj) {
            let createColumn = document.createElement("td");
            createColumn.innerHTML = obj[i];
            createRow.appendChild(createColumn);
        }

        list.appendChild(createRow);
    })

}
