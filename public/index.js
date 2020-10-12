window.onload = getProducts('https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1');

async function getProducts(url) {
    
    const response = await axios.get(url);
    const products = response.data.products;
    const nextPage = response.data.nextPage;

    let button = document.querySelector('#more-products');

    button.setAttribute('onclick', `getProducts('https://${nextPage}')`);

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
                                <h5 id="prod-old-price" class="m-auto mt-10 regular size-2">De: R$${product.oldPrice}</h5>
                                <h3 id="prod-price" class="m-auto mt-5 size-5">Por: R$${product.price}</h3>
                                <h5 id="prod-conditions" class="m-auto mt-5 regular size-2">ou ${product.installments.count}x de R$${product.installments.value}</h5>
                                
                                <a class="inherit button mt-15">Comprar</a>
                            </div>
                        </article>`

        html = html + newHtml;
    })

    list.innerHTML = html;
}