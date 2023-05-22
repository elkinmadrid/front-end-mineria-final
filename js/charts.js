var data_set;
let myBarChart_ = new Chart();
let myDynamicChat = new Chart();

let get_dataset = async () => {
    var token = localStorage.getItem('token');

    const url_base = 'https://mineria.onrender.com';
    let config = {
        method: 'GET',
        withCredentials: true,
        maxBodyLength: Infinity,
        url: url_base + '/api/v1/dataset',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': '*',
            'Authorization': token
        }
    };
    await axios(config).then(function (res) {
        data_set = res.data.data;
    })
        .catch(function (err) {
            console.log(err);
            if (err.response.status == 401) {
                window.location.href = '/login.html';
            }
        });
    return data_set;
};


let myBarChart = async (buttonClicked) => {

    let data = {};

    let etiquetas = [];
    let valores = [];
    let label_grafic = ''
    if (buttonClicked === 'marcas') {
        myBarChart_.destroy();
        label_grafic = 'Cantidad de marcas de carros.'
        document.querySelector('#btn-marcas').classList.add('active');
        document.querySelector('#btn-carbody').classList.remove('active');
        for (const carro of data_set) {
            const marca = carro.companyname.toUpperCase();
            if (marca in data) {
                data[marca] += 1;
            } else {
                data[marca] = 1;
            }
        }
    } else if (buttonClicked === 'carbody') {
        myBarChart_.destroy();
        label_grafic = 'Cantidad tipo carroceria por carro.'
        document.querySelector('#btn-carbody').classList.add('active');
        document.querySelector('#btn-marcas').classList.remove('active');
        for (const carro of data_set) {
            const carbody_ = carro.carbody;
            if (carbody_ in data) {
                data[carbody_] += 1;
            } else {
                data[carbody_] = 1;
            }
        }
    } else {
        myBarChart_.destroy();
        createChartBar(etiquetas, valores, label_grafic);
        return data;
    }


    etiquetas = Object.keys(data);
    valores = Object.values(data);


    createChartBar(etiquetas, valores, label_grafic);
}


function createChartBar(etiquetas, valores, label_) {
    var ctxmyBarChart = document.getElementById("myBarChart");
    myBarChart_ = new Chart(ctxmyBarChart, {
        type: 'bar',
        data: {
            labels: etiquetas,
            datasets: [{
                label: label_,
                data: valores,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }],
        },
        options: {
            legend: {
                display: true,
                position: 'bottom'
            },
            cutoutPercentage: 80,
        },
    });

}

let myPieChart = async () => {

    myDynamicChat.destroy();
    let tipoCombustible = data_set.map(item => item.fueltype)
    let label = tipoCombustible.filter((item, index) => tipoCombustible.indexOf(item) === index)

    let contador = {}
    data_set.forEach(element => {
        const fueltype = element.fueltype
        if (!contador[fueltype]) {
            contador[fueltype] = 1
        }
        else {
            contador[fueltype]++;
        }
    });
    const valores = Object.values(contador)

    const colores = ["#5598D8", "#8555D8"]

    var ctxmyPieChart = document.getElementById("myPieChart");
    myDynamicChat = new Chart(ctxmyPieChart, {
        type: 'pie',
        data: {
            labels: label,
            datasets: [{
                label: 'Cantidad de Vehiculos',
                data: valores,
                backgroundColor: colores,
                borderColor: '#FFFFFF',
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            cutoutPercentage: 200
        }
    });

}


let myScatterChart = async () => {

    const prices = data_set.filter(item => item.price).map(item => item.price)
    const horsepowers = data_set.filter(item => item.horsepower).map(item => item.horsepower)

    const data = []
    prices.forEach((element, index) => {
        data.push({
            x: horsepowers[index],
            y: prices[index]
        });
    });

    const ctxsCatterChart = document.getElementById('scatterChart').getContext('2d');

    const scatterChart = new Chart(ctxsCatterChart, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Potencia vs Precio',
                data: data
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom'
                }]
            }
        }
    });

}


function color_background(amout_labels) {
    colors = []

    var colors = [];
    for (var i = 0; i < amout_labels; i++) {
        var alpha = Math.random(); // Generar un valor de transparencia aleatorio entre 0 y 1
        var color = 'rgba(' + getRandomNumber(0, 255) + ', ' + getRandomNumber(0, 255) + ', ' + getRandomNumber(0, 255) + ', ' + alpha.toFixed(2) + ')';
        colors.push(color);
    }
    return colors;
}

// Función auxiliar para generar un número aleatorio en un rango
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let myAreaChart =  async () => {
    
    let tipomotor = data_set.map(item => item.enginetype)
    let labels = tipomotor.filter((item, index) => tipomotor.indexOf(item) === index)

    let contador = {}
    data_set.forEach(element => {
        const enginetype = element.enginetype
        if (!contador[enginetype]) {
            contador[enginetype] = 1
        }
        else {
            contador[enginetype]++;
        }
    });
    const valores = Object.values(contador)

    const colores = color_background(labels.length)

    var ctxmyAreaChart = document.getElementById("myAreaChart");
    const myAreaChart = new Chart(ctxmyAreaChart, {
        type: 'polarArea',
        data: {
            labels: labels,
            datasets: [{
                label: 'Cantidad de Vehiculos',
                data: valores,
                backgroundColor: colores,
                borderColor: '#FFFFFF',
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            cutoutPercentage: 200
        }
    });
}


async function main() {
    await get_dataset();
    await myBarChart();
    await myPieChart();
    await myScatterChart();
    await myAreaChart()
}

main();