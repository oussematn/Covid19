fetch("https://covid-19-data.p.rapidapi.com/totals?format=json", {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
        "x-rapidapi-key": "c1c9ac5c6bmsh1b282839ac12b47p181d16jsnc5c49e75afb0"
    }
}).then(response => response.json()).then(res => {
    var ctx = document.getElementById('global_summary').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Confirmed', 'Deaths', 'Recovered', 'Critical'],
            datasets: [{
                data: [res[0].confirmed, res[0].deaths, res[0].recovered, res[0].critical],
                backgroundColor: [
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        }
    })
})



fetch("https://covid-19-data.p.rapidapi.com/country/all?format=json", {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
        "x-rapidapi-key": "c1c9ac5c6bmsh1b282839ac12b47p181d16jsnc5c49e75afb0"
    }
}).then(response => response.json()).then(res => {
    for (let i = 0; i < res.length; i++) {
        const element = res[i];
        let country_name = element.country;
        if (element.confirmed == 0) {
            continue;
        }
        if (element.country == 'Israel') {
            country_name = "Occupied Palestine"
        }
        const row =
            `<tr class="countrie_search ${element.country}">
                <td>${country_name}</td>
                <td>${element.confirmed}</td>
                <td>${element.deaths}</td>
                <td>${element.recovered}</td>
                <td>${element.deaths}</td>
            </tr>`
        document.querySelector('tbody').innerHTML += row;
    }

})

// Dealing with search

let input = document.querySelector('.form-control');

input.addEventListener('input', () => {
    let filter, table, tr, td, i, txtValue;
    filter = input.value.toUpperCase();
    table = document.getElementById("all_stats");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
});