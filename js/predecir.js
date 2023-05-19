function limpiar() {
    document.getElementById("horsepower").value = ""
    document.getElementById("enginesize").value = "";
    document.getElementById("carheight").value = "";
    document.getElementById("carwidth").value = "";
    document.getElementById("carlength").value = "";
    document.getElementById("price").value = "";

    document.getElementById('doornumber').value = "";
    document.getElementById('enginelocation').value = "";
    document.getElementById('carbody').value = "";
    document.getElementById('fueltype').value = "";
    document.getElementById('drivewheel').value = "";
    document.getElementById('companyname').value = "";
    document.getElementById('enginetype').value = "";
}


token = localStorage.getItem('token');

function loadSelectOptions(elementSelect, data) {

    data.forEach(element => {
        console.log(element);
        var optionElement = document.createElement('option');
        optionElement.value = element;
        optionElement.textContent = element;
        elementSelect.appendChild(optionElement);

    });

}


function loadData() {
    let config = {
        method: 'GET',
        maxBodyLength: Infinity,
        withCredentials: true,
        url: 'https://mineria.onrender.com/api/v1/dataset/categories',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': '*',
            'Authorization': token
        }
    };
    const doornumberSelect = document.getElementById('doornumber');
    const enginelocationSelect = document.getElementById('enginelocation');
    const carbodySelect = document.getElementById('carbody');
    const fueltypeSelect = document.getElementById('fueltype');
    const drivewheelSelect = document.getElementById('drivewheel');
    const enginetypeSelect = document.getElementById('enginetype');
    const companynameSelect = document.getElementById('companyname');

    axios.request(config).then(function (response) {
        console.log(response.data.data);
        data = response.data.data

        loadSelectOptions(doornumberSelect, data.doornumber);
        loadSelectOptions(enginelocationSelect, data.enginelocation);
        loadSelectOptions(carbodySelect, data.carbody);
        loadSelectOptions(fueltypeSelect, data.fueltype);
        loadSelectOptions(drivewheelSelect, data.drivewheel);
        loadSelectOptions(enginetypeSelect, data.enginetype);
        loadSelectOptions(companynameSelect, data.companyname);

        console.log(response.data.data.carbody);

    })
        .catch((error) => {
            console.log(error);
            if (err.response.status == 401) {
                window.location.href = '/front-end-mineria-final/index.html';
            }
        });

}


function predecir() {

    const horsepower = document.getElementById("horsepower").value;
    const enginesize = document.getElementById("enginesize").value;
    const carheight = document.getElementById("carheight").value;
    const carwidth = document.getElementById("carwidth").value;
    const carlength = document.getElementById("carlength").value;

    const doornumberSelect = document.getElementById('doornumber').value;
    const enginelocationSelect = document.getElementById('enginelocation').value;
    const carbodySelect = document.getElementById('carbody').value;
    const fueltypeSelect = document.getElementById('fueltype').value;
    const drivewheelSelect = document.getElementById('drivewheel').value;

    let formValues = {
        "horsepower": horsepower,
        "enginesize": enginesize,
        "carheight": carheight,
        "carwidth": carwidth,
        "carlength": carlength,
        "doornumber": doornumberSelect,
        "enginelocation": enginelocationSelect,
        "drivewheel": drivewheelSelect,
        "fueltype": fueltypeSelect,
        "carbodySelect": carbodySelect
    };

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        withCredentials: true,
        url: 'https://mineria.onrender.com/api/v1/algorithm',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': '*',
            'Authorization': token
        },
        data: formValues
    };
    console.log(config);

    axios.request(config).then(function (response) {
        console.log(response);
        let diag = document.getElementById('diag')
        if (response.status === 200) {
            const mensaje = `Mae = ${response.data.data.mae}, mse = ${response.data.data.mse}, score = ${response.data.data.score}, 
                    el precio de la predicion es ${response.data.data.price}`
            diag.innerHTML = mensaje
            limpiar()

        } else {
            diag.innerHTML = response.data.message + ': comuniquese con el admin'
        }
        $('#informationModal').modal({ show: true });
    })
        .catch((error) => {
            console.log(error);
            if (error.response.status == 401) {
                window.location.href = '/front-end-mineria-final/login.html';
            }
        });

}


loadData()