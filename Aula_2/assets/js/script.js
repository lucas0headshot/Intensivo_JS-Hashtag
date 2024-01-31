function setupProduct(productData) {
    const nameElement = document.getElementById('name');
    const priceElement = document.getElementById('price');
    const colorsElement = document.querySelector('.colors-list');
    const previewElement = document.getElementById('preview');
    const previewsElement = document.querySelector('.previews-list');


    function setVariation(index) {
        const variation = productData.product.variations[index];

        if (variation) {
            previewElement.src = variation.images[1].src;
            setPreviews(variation, index);
        }
    };

    function setPreviews(variation, variationIndex) {
        if (variation.images.length > 0) {
            variation.images.forEach((index) => {
                previewsElement.innerHTML += 
                    `<li class="preview-item">
                        <input type="radio" data-current-preview="${index}" name="preview-option">
                            <img src="data/image/${variationIndex}/${index + 1}.png" alt="Foto do Produto">
                        </input>
                    </li>`;
            });
        }
    };


    if (productData.product.colors.length > 0) { //Checar se há colors
        productData.product.colors.forEach((index) => {
            let colorElement = document.createElement('li');
            colorElement.innerHTML = 
                `<li class="color">
                    <input type="radio" data-current-color="${index}" name="color-option">
                        <img src="data/image/${index + 1}.png" alt="Foto da cor">
                    </input>
                </li>`;

            colorsElement[0].appendChild(colorElement);
        });
    }

    if (productData.product.variations.length > 0) {
        previewElement.src = productData.product.variations[0].images[1].src;
    }

    if (productData.product.name) { //Checar se há name
        nameElement.textContent = productData.product.name;
    }

    if (productData.product.price) { //Checar se há price
        priceElement.textContent = `R$${productData.product.price}`;
    }
};



//GET JSON do product.json
fetch('data/product.json')
    .then(response => response.json())
    .then(productData => setupProduct(productData))
    .catch(error => console.error('An error ocurred while trying to fetch the Product JSON... ', error))