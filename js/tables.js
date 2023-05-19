const url_base = 'https://mineria.onrender.com';
var token = localStorage.getItem('token');

let listar_info = async () => {
    let dataset;
 
    let config = {
        method: 'get',
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
        dataset = res.data.data;
    })
        .catch(function (err) {
            console.log(err);
            if (err.response.status == 401) {
                window.location.href = '/front-end-mineria-final/login.html';
            }
        });
    return dataset;
};

function getValueSelectOption(select, valueOption) {
    for (var i = 0; i < select.options.length; i++) {
        if (select.options[i].value === valueOption) {
            select.selectedIndex = i;
            break;
        }
    }
}

function abrirModalInsert() {
    limpiar()
    var boton1 = document.getElementById("insertar");
    boton1.style.display = "block";
    var boton1 = document.getElementById("actualizar");
    boton1.style.display = "none";
    $('#fm_actualizar').modal({ show: true });
}

const tbody = document.querySelector('#userList tbody');
var idActualizar = 0
let mostrar_datos = async () => {
    let dataset = await listar_info();
    let html = '';

    dataset.forEach(dato => {
        html += `
          <tr>
            <th scope="row">${dato.id}</th>
            <td>${dato.fueltype}</td>
            <td>${dato.companyname}</td>
            <td>${dato.doornumber}</td>
            <td>${dato.carbody}</td>
            <td>${dato.drivewheel}</td>
            <td>${dato.enginelocation}</td>
            <td>${dato.carlength}</td>
            <td>${dato.carwidth}</td>
            <td>${dato.carheight}</td>
            <td>${dato.enginetype}</td>
            <td>${dato.enginesize}</td>
            <td>${dato.horsepower}</td>
            <td>${dato.price}</td>
            <td>
              <a class="actualizar" href="#"><i title="Editar"  data-id="${dato.id}" class="fas fa-edit"></i></a> |
              <a class="eliminar" href="#"><i title="Eliminar" data-id="${dato.id}" class="fas fa-trash"></i></a>
            </td>
          </tr>
        `;
    });

    tbody.innerHTML = html;

    document.querySelectorAll('a.eliminar').forEach(el => {
        el.addEventListener('click', e => {
            e.preventDefault();
            const id = e.target.dataset.id;
            const confirmacion = confirm('¿Está seguro de que desea eliminar este elemento?');
            if (confirmacion) {
                eliminarRegistro(id);
            }
        });
    });

    document.querySelectorAll('a.actualizar').forEach(el => {
        el.addEventListener('click', e => {
            e.preventDefault();
            const id = e.target.dataset.id;
            idActualizar = id
            let item = dataset.filter(item => item.id == id)

            var boton1 = document.getElementById("insertar");
            boton1.style.display = "none";
            var boton1 = document.getElementById("actualizar");
            boton1.style.display = "block";

            let horsepower = document.getElementById("horsepower");
            let enginesize = document.getElementById("enginesize");
            let carheight = document.getElementById("carheight");
            let carwidth = document.getElementById("carwidth");
            let carlength = document.getElementById("carlength");
            let price = document.getElementById("price");
            let doornumberSelect = document.getElementById('doornumber');
            let enginelocationSelect = document.getElementById('enginelocation');
            let carbodySelect = document.getElementById('carbody');
            let fueltypeSelect = document.getElementById('fueltype');
            let drivewheelSelect = document.getElementById('drivewheel');
            let companynameSelect = document.getElementById('companyname');
            let enginetypeSelect = document.getElementById('enginetype');

            horsepower.value = item[0].horsepower
            enginesize.value = item[0].enginesize
            carheight.value = item[0].carheight
            carwidth.value = item[0].carwidth
            carlength.value = item[0].carlength
            price.value = item[0].price

            getValueSelectOption(doornumberSelect, item[0].doornumber)
            getValueSelectOption(enginelocationSelect, item[0].enginelocation)
            getValueSelectOption(carbodySelect, item[0].carbody)
            getValueSelectOption(fueltypeSelect, item[0].fueltype)
            getValueSelectOption(drivewheelSelect, item[0].drivewheel)
            getValueSelectOption(companynameSelect, item[0].companyname)
            getValueSelectOption(enginetypeSelect, item[0].enginetype)

            $('#fm_actualizar').modal({ show: true });
        });
    });
};


function eliminarRegistro(id) {
    let config = {
        method: 'DELETE',
        maxBodyLength: Infinity,
        withCredentials: true,
        url: `${url_base}/api/v1/dataset/${id}`,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': '*',
            'Authorization': token
        }
    };
    axios.request(config)
        .then((response) => {
            let diag = document.getElementById('diag')
            if (response.status === 200) {
                diag.innerHTML = response.data.message
            } else {
                diag.innerHTML = response.data.message + ': comuniquese con el admin'
            }
            $('#informationModal').modal({ show: true });
            mostrar_datos()
        })
        .catch((error) => {
            console.log(error);
            if (err.response.status == 401) {
                window.location.href = '/front-end-mineria-final/login.html';
            }
        });
}



function actualizarRegistro() {

    let horsepower = document.getElementById("horsepower").value;
    let enginesize = document.getElementById("enginesize").value;
    let carheight = document.getElementById("carheight").value;
    let carwidth = document.getElementById("carwidth").value;
    let carlength = document.getElementById("carlength").value;
    let price = document.getElementById("price").value;

    let doornumberSelect = document.getElementById('doornumber').value;
    let enginelocationSelect = document.getElementById('enginelocation').value;
    let carbodySelect = document.getElementById('carbody').value;
    let fueltypeSelect = document.getElementById('fueltype').value;
    let drivewheelSelect = document.getElementById('drivewheel').value;
    let companynameSelect = document.getElementById('companyname').value;
    let enginetypeSelect = document.getElementById('enginetype').value;

    console.log(` Registro que vamos a actualizar ${idActualizar} `);


    let data = JSON.stringify({
        "horsepower": horsepower,
        "enginesize": enginesize,
        "carheight": carheight,
        "carwidth": carwidth,
        "carlength": carlength,
        "doornumber": doornumberSelect,
        "enginelocation": enginelocationSelect,
        "carbody": carbodySelect,
        "fueltype": fueltypeSelect,
        "drivewheel": drivewheelSelect,
        "companyname": companynameSelect,
        "enginetype": enginetypeSelect,
        "price": price
    });

    let config = {
        method: 'PUT',
        withCredentials: true,
        maxBodyLength: Infinity,
        url: `${url_base}/api/v1/dataset/${idActualizar}`,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': '*',
            'Authorization': token
        },
        data: data
    };

    axios.request(config)
        .then((response) => {

            let diag = document.getElementById('diag')
            if (response.status === 200) {
                $('#fm_actualizar').modal('hide');
                diag.innerHTML = response.data.message

            } else {
                diag.innerHTML = response.data.message + ': comuniquese con el admin'
            }

            $('#informationModal').modal({ show: true });
            console.log(JSON.stringify(response.data));
            mostrar_datos()
        })
        .catch((error) => {
            console.log(error);
            if (err.response.status == 401) {
                window.location.href = '/front-end-mineria-final/login.html';
            }
        });
}


function insertaRegistro() {
    let horsepower = document.getElementById("horsepower").value;
    let enginesize = document.getElementById("enginesize").value;
    let carheight = document.getElementById("carheight").value;
    let carwidth = document.getElementById("carwidth").value;
    let carlength = document.getElementById("carlength").value;
    let price = document.getElementById("price").value;

    let doornumberSelect = document.getElementById('doornumber').value;
    let enginelocationSelect = document.getElementById('enginelocation').value;
    let carbodySelect = document.getElementById('carbody').value;
    let fueltypeSelect = document.getElementById('fueltype').value;
    let drivewheelSelect = document.getElementById('drivewheel').value;
    let companynameSelect = document.getElementById('companyname').value;
    let enginetypeSelect = document.getElementById('enginetype').value;

    
    let data = JSON.stringify({
        "horsepower": horsepower,
        "enginesize": enginesize,
        "carheight": carheight,
        "carwidth": carwidth,
        "carlength": carlength,
        "doornumber": doornumberSelect,
        "enginelocation": enginelocationSelect,
        "carbody": carbodySelect,
        "fueltype": fueltypeSelect,
        "drivewheel": drivewheelSelect,
        "companyname": companynameSelect,
        "enginetype": enginetypeSelect,
        "price": price
    });

    let config = {
        method: 'POST',
        maxBodyLength: Infinity,
        withCredentials: true,
        url: `${url_base}/api/v1/dataset`,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': '*',
            'Authorization': token
        },
        data: data
    };

    axios.request(config).then(function (response) {
        console.log(response);
        let diag = document.getElementById('diag')
        if (response.status === 201) {         
            $('#fm_actualizar').modal('hide');   
            diag.innerHTML = response.data.message
            limpiar()

        } else {
            diag.innerHTML = response.data.message + ': comuniquese con el admin'
        }
        mostrar_datos()
        $('#informationModal').modal({ show: true });
    })
    .catch((error) => {
        console.log(error);
        if (err.response.status == 401) {
            window.location.href = '/front-end-mineria-final/login.html';
        }
    });
}

mostrar_datos();