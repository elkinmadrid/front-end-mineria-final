const url_base = 'https://mineria.onrender.com';
const token = localStorage.getItem('token');


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
                window.location.href = '/frontend_mineria/index.html';
            }
        });
    return dataset;
};

const tbody = document.querySelector('#userList tbody');
var idActualizar = 0
let mostrar_datos = async () => {
    let dataset = await listar_info();
    let html = '';

    dataset.forEach(dato => {
        html += `
          <tr>
            <th scope="row">${dato.id}</th>
            <td>${dato.edad}</td>
            <td>${dato.anemia}</td>
            <td>${dato.creatinina_fosfoquinasa}</td>
            <td>${dato.diabetes}</td>
            <td>${dato.fraccion_de_eyeccion}</td>
            <td>${dato.presion_arterial_alta}</td>
            <td>${dato.plaquetas}</td>
            <td>${dato.creatinina_serica}</td>
            <td>${dato.sodio_serico}</td>
            <td>${dato.sexo}</td>
            <td>${dato.fumador}</td>
            <td>${dato.Seguimiento_dias}</td>
            <td>${dato.Muerte}</td>
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

    

};


mostrar_datos();