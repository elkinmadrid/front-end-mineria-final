function saveInfoContactUs() {

    const nombre = document.getElementById("nombre").value;
    const email_user = document.getElementById("email_user").value;
    const telefono = document.getElementById("telefono").value;
    const asunto = document.getElementById("asunto").value;
    const mensaje = document.getElementById("mensaje").value;

    let formValues = {
        "nombre_solicitante": nombre,
        "email": email_user,
        "telefono": telefono,
        "asunto": asunto,
        "mensaje": mensaje
    };

    let config = {
        method: 'POST',
        maxBodyLength: Infinity,
        url: 'https://mineria.onrender.com/api/v1/contact-us',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        data: formValues
    };

    axios.request(config).then(function (response) {
        console.log(response);
        let diag = document.getElementById('diag')
        if (response.status === 201) {            
            diag.innerHTML = response.data.message

        } else {
            diag.innerHTML = response.data.message + ': comuniquese con el admin'
        }
        $('#informationModal').modal({ show: true });
    })
    .catch((error) => {
        console.log(error);
        
    });

}