const url_base = 'https://mineria.onrender.com';
var token = localStorage.getItem('token');

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