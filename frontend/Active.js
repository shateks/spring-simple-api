const URL_API = 'http://localhost:8011/signal';
const MAX_BUFFER = 1000
let mainHeader = document.querySelector('h1');
let sessionData = [];

async function fetchData() {
    let data = null;
    try {
        const response = await fetch(URL_API);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        data = await response.json();
        data = {
            "timestamp": new Date(data.timestamp * 1000).toLocaleTimeString(),
            "value": data.value
        };
        console.log('My console log: ', data);
    }
    catch (error) {
        console.error('Custom error handling: ', error.message);
        data = {
            "timestamp": new Date().toLocaleTimeString(),
            "value": 0
        }
    }
    return data;
}

setInterval(() => {
    fetchData()
        .then((data) => {
            console.log(data);
            sessionData.push(data);
            sessionData = sessionData.slice(-MAX_BUFFER);
        })
    updateChart(sessionData);
}, 1000);

let chart;

async function createChart() {
    chart = new Chart(document.getElementById('myChart'), {
        type: 'line',
        data: {
            datasets: [{
                label: 'Value Over Time',
                borderColor: 'blue',
                fill: false
            }]
        },
        options: {
            animations: false,
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { display: true },
                y: { display: true }
            }
        }
    });
    console.log('Chart created:', chart);
}

function updateChart(data) {
    const values = data.map(item => [item.timestamp, item.value]);
    chart.data.datasets[0].data = values;
    chart.update();
}

console.log("Active.js loaded");
createChart();