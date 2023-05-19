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
                window.location.href = '/frontend_mineria/login.html';
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

async function main() {
    await get_dataset();
    await myBarChart();
}

main();