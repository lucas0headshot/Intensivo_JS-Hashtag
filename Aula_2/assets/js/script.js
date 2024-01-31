function setupProduct(productData) {
    const nameElement = document.getElementById('name');
    const priceElement = document.getElementById('price');
    const colorsElement = document.getElementById('color-list');
    const previewElement = document.getElementById('preview');
    const previewsElement = document.getElementById('preview-list');

    

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
                let previewElement = document.createElement('li');
                previewElement.innerHTML = 
                    `<li class="preview-item">
                        <input type="radio" data-current-preview="${index}" name="preview-option">
                            <img src="data/products/${variationIndex}/images/${index}.png" alt="Foto do Produto">
                        </input>
                    </li>`;

                previewElement.addEventListener('click', function() {
                    setPreview(variationIndex, this.getAttribute('data-current-preview'));
                });

                previewsElement.appendChild(previewElement);
            });
        }
    };

    function setPreview(variationIndex, index) {
        const preview = productData.product.variations[variationIndex].images[index]; 

        if (preview) {
            previewElement.src = preview.src;
        }
    };


    if (productData.product.variations.length > 0) { //Checar se há variations
        previewElement.src = productData.product.variations[0].images[1].src;

        productData.product.variations.forEach((variation, index) => { //Montar colors
            console.warn(variation);

            if (variation.color[0].src) { //Checar se variation tem color
                let colorElement = document.createElement('li');
                colorElement.innerHTML += 
                    `<li class="color">
                        <input type="radio" data-current-color="${index}" name="color-option">
                            <img src="data/products/${index + 1}/color.png" alt="Foto da cor">
                        </input>
                    </li>`;

                colorElement.addEventListener('click', function() {
                    setVariation(this.getAttribute('data-current-color'));
                });

                colorsElement.appendChild(colorElement);
            }
        });
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