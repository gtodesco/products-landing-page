window.onload = getProducts;

function getProducts() {
    
    axios.get('https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1')
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log('Erro ao buscar os produtos.');
        })

}