window.onload = getProducts('frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1');

async function getProducts(url) {
    
    const response = await axios.get(`https://${url}`);
    const products = response.data.products;
    const nextPage = response.data.nextPage;

    let button = document.querySelector('#more-products');

    button.setAttribute('onclick', `getMoreProducts('${nextPage}')`);

    const list = document.querySelector('#products-list');
    
    let html = list.innerHTML;

    products.forEach((product) => {

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
    })

    list.innerHTML = html;

}

async function getMoreProducts(url) {

    let buttonMoreProducts = document.querySelector('#more-products');
    let messageLoadProducts = document.querySelector('#load-products');

    buttonMoreProducts.style.display = "none";
    messageLoadProducts.style.display = "initial";

    await getProducts(url);

    buttonMoreProducts.style.display = "initial";
    messageLoadProducts.style.display = "none";
}