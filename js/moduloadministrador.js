const url_base = 'https://mineria.onrender.com';
var token = localStorage.getItem('token');



let carbody_report = async () => {

    let dataset;

    let config = {
        method: 'GET',
        withCredentials: true,
        maxBodyLength: Infinity,
        url: url_base + '/api/v1/dataset/carbody-price',
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

}

let fueltype_price_report = async () => {

    let dataset;

    let config = {
        method: 'GET',
        withCredentials: true,
        maxBodyLength: Infinity,
        url: url_base + '/api/v1/dataset/fueltype-price',
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

}

let horsepower_price_report = async () => {

    let dataset;

    let config = {
        method: 'GET',
        withCredentials: true,
        maxBodyLength: Infinity,
        url: url_base + '/api/v1/dataset/horsepower-price',
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

}

async function report(option, name) {
    let dataset;
    if (option === 1) dataset = await carbody_report();
    if (option === 2) dataset = await fueltype_price_report();
    if (option === 3) dataset = await horsepower_price_report()

    const doc = new jsPDF({
        orientation: "p", //set orientation
        unit: "pt", //set unit for document
        format: "letter" //set document standard
    });

    let keys = Object.keys(dataset[0])

    let columns = [];
    let columnsStyle = {};
    keys.forEach(key => {
        const column = {title: key, dataKey: key}
        columnsStyle[key] = { fillColor: false }
        columns.push(column);
    });

    doc.autoTable(columns, dataset, {
        styles: {
            fillColor: [51, 51, 51],
            lineColor: 240,
            lineWidth: 1,
        },
        columnStyles: columnsStyle,
        margin: { top: 60 },
        addPageContent: function (data) {
            doc.text("", 40, 30);
        }
    });

    doc.save(`${name}.pdf`)
}

let listar_info = async () => {

    let dataset;

    let config = {
        method: 'GET',
        withCredentials: true,
        maxBodyLength: Infinity,
        url: url_base + '/api/v1/contact-us',
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

}


let mostrar_datos = async () => {
    const tablebody = document.querySelector("#Tabla_de_Contacto tbody")

    let dataset = await listar_info();
    let html = '';

    dataset.forEach(dato => {
        html += `
          <tr>
            <th scope="row">${dato.nombre_solicitante}</th>
            <td>${dato.email}</td>
            <td>${dato.telefono}</td>
            <td>${dato.asunto}</td>
            <td>${dato.mensaje}</td>
           
          </tr>
        `;
    });

    tablebody.innerHTML = html;


};

mostrar_datos()