function login() {

    const url_base = 'https://mineria.onrender.com';
    const fromulario = document.querySelector('form')
    const username = fromulario.elements.username.value
    const password = fromulario.elements.password.value

    let body = {
        username: username,
        password: password
    }

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        withCredentials: true,
        url: `${url_base}/login`,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': '*'
        },
        data: body
    };

    axios.request(config).then(function (response) {    
        console.log(response);
        if (response.status === 200) {
            localStorage.setItem('token', response.data.token);

            console.log(localStorage.getItem('token'));
            window.location.href = '/front-end-mineria-final/tables.html';
        } else {
            alert('Intente de nuevo, por favor.');
        }
    })
    .catch((error) => {
        console.log(error);
        alert('Intente de nuevo, usuario o contraseña invalida.');
    });
}