// Initialisation
const country_search_error = document.querySelector('.alert');
country_search_error.style.display = 'none';
if (localStorage.getItem('Country') != null) {
    get_stats(localStorage.getItem('Country'));
    document.querySelector('#current_country').innerHTML = localStorage.getItem('Country');
}
else {
    get_stats("Tunisia");
    document.querySelector('#current_country').innerHTML = "Tunisia";
}

document.querySelector('#country_search').addEventListener('keyup', () => {
    if (event.keyCode === 13) {
        get_stats(document.querySelector('#country_search').value)
        document.querySelector('#current_country').innerHTML = document.querySelector('#country_search').value;
        document.querySelector('#country_search').value = '';
    }
})

function get_stats(country) {
    fetch(`https://api.covid19api.com/total/country/${country}`, {
        method: 'GET'
    }).then(res => res.json()).then(res => {
        localStorage.setItem('Country', country);
        const dates = res.map(x => x.Date.substr(0, 10)).slice(30, res.length);
        const confirmed = res.map(x => x.Confirmed).slice(30, res.length);
        const total_confirmed = confirmed[confirmed.length - 1];
        const deaths = res.map(x => x.Deaths).slice(30, res.length);
        const total_deaths = deaths[deaths.length - 1];
        const recovered = res.map(x => x.Recovered).slice(30, res.length);
        const total_recovered = recovered[recovered.length - 1];
        return { dates, confirmed, deaths, recovered, total_confirmed, total_deaths, total_recovered }
    }).catch(err => {
        country_search_error.style.display = 'block';
        setTimeout(() => {
            country_search_error.style.display = 'none';
        }, 5000);
    })
    .then(x => {
        fetch(`https://covid-19-data.p.rapidapi.com/country?format=json&name=${country}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
                "x-rapidapi-key": "c1c9ac5c6bmsh1b282839ac12b47p181d16jsnc5c49e75afb0"
            }
        }).then(res => res.json()).then(res => {
            console.log(res);
            var ctx = document.getElementById('summary').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Confirmed', 'Deaths', 'Recovered', 'Critical'],
                    datasets: [{
                        data: [res[0].confirmed, res[0].deaths, res[0].recovered,res[0].critical],
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
        return x
    })
        .then(x => {
            var ctx = document.getElementById('confirmed').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: x.dates,
                    datasets: [{
                        label: '# Confirmed',
                        data: x.confirmed,
                        backgroundColor: [
                            'rgba(255, 206, 86, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 206, 86, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            })
            return x
        }).then(x => {
            var ctx = document.getElementById('deaths').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: x.dates,
                    datasets: [{
                        label: '# Deaths',
                        data: x.deaths,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            })
            return x
        }).then(x => {
            var ctx = document.getElementById('recovered').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: x.dates,
                    datasets: [{
                        label: '# Recovered',
                        data: x.recovered,
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.2)',
                        ],
                        borderColor: [
                            'rgba(75, 192, 192, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            })
            return x
        })
}