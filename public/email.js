window.onload = getEmailData();

async function getEmailData() {
    await getProducts('frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1');
    getFriendName();
}

/**
 * Função responsável por requisitar os produtos para a API com base em uma url de paginação
 * e adicionar 2 cards de produtos no e-mail
 *  
 * @param {String} url 
 */
async function getProducts(url) {
    
    const response = await axios.get(`https://${url}`);
    const products = response.data.products;

    const list = document.querySelector('#products-list');
    
    let html = list.innerHTML;

    for (i = 0; i < 2; i ++) {
        let product = products[i];

        let newHtml = `<article>
                            <picture>
                                <img  src="${product.image}" alt="Product">
                            </picture>
                            <div id="product-info" class="text grey">
                                <h2 id="prod-name" class="m-auto mt-15 regular size-4">${product.name}</h2>
                                <h5 id="prod-description" class="m-auto mt-10 regular size-2">${product.description}</h5>
                                <h5 id="prod-old-price" class="m-auto mt-10 regular size-2">De: ${product.oldPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h5>
                                <h3 id="prod-price" class="m-auto mt-5 size-5">Por: ${product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
                                <h5 id="prod-conditions" class="m-auto mt-5 regular size-2">ou ${product.installments.count}x de ${product.installments.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h5>
                                
                                <a class="inherit button mt-15">Comprar</a>
                            </div>
                        </article>`

        html = html + newHtml;

    }

    list.innerHTML = html;
}

/**
 * Função responsável por buscar o nome do amigo indicado na URL
 * e escrever na página do E-mail
 */
function getFriendName() {

    const params = new URLSearchParams(window.location.search);

    let name = params.get('friend-name');

    if (name == "") {
        name = "Fulano";
    }

    document.querySelector('#general h3').innerHTML = `Olá, ${name}`

}

/**
 * Função que irá redirecionar o usuário para a landing page principal
 * 
 */
function goToLandingPage() {
    window.location = 'https://main.d86zqfytrsipk.amplifyapp.com/';
}