function setupProduct(productData) {
    const nameElement = document.getElementById('name');
    const priceElement = document.getElementById('price');
    const colorsElement = document.getElementById('color-list');
    const previewElement = document.getElementById('preview');
    const previewsElement = document.getElementById('preview-list');
    const sizesElement = document.getElementById('sizes-list');

    

    function setVariation(index) {
        const variation = productData.product.variations[index];

        if (variation) {
            previewElement.src = variation.images[1].src;
            setPreviews(variation, index);
        }
    };

    function setPreviews(variation, variationIndex) {
        if (variation.images.length > 0) {
            previewsElement.innerHTML = '';

            variation.images.forEach((image, index) => {
                let previewElement = document.createElement('li');
                previewElement.classList.add('preview-item');
                previewElement.innerHTML = 
                    `<input type="radio" data-current-preview="${index}" id="preview-${index}" name="preview-option">
                     <label for="preview-${index}">
                        <img src="${image.src}" alt="Foto do Produto">
                      </label>`;

                previewElement.addEventListener('click', function() {
                    setPreview(variationIndex, document.getElementById(`preview-${index}`).dataset.currentPreview);
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

    function setSize(size) {
        if (size == 45) {
            previewElement.style.scale = 1.1;
        } else {
            previewElement.style.scale = 1.0;
        }
    };


    if (productData.product.variations.length > 0) { //Checar se há variations
        previewElement.src = productData.product.variations[0].images[1].src; //Setar preview como a 2º imagem da 1º variation

        setPreviews(productData.product.variations[0], 0);

        productData.product.variations.forEach((variation, index) => { //Montar colors
            const color = variation.color[0];

            if (color) { //Checar se variation tem color
                let colorElement = document.createElement('li');
                colorElement.classList.add('color');
                colorElement.innerHTML = 
                    `<input type="radio" id="color-${index}" data-current-color="${index}" name="color-option">
                     <label for="color-${index}">
                        <img src="${color.src}" alt="Foto da cor">
                     </label>`;

                colorElement.addEventListener('click', () => {
                    setVariation(document.getElementById(`color-${index}`).dataset.currentColor);
                });

                colorsElement.appendChild(colorElement);
            }
        });
    }

    if (productData.product.sizes.length > 0) { //Checar se há sizes
        productData.product.sizes.forEach((size, index) => {
            let sizeElement = document.createElement('li');
            sizeElement.classList.add('size-item');
            sizeElement.innerHTML = 
                `<input type="radio" name="size-option" id="size-${index}">
                 <label for="size-${index}">
                    ${size.size} mm
                 </label>`;

            sizeElement.addEventListener('click', () => {
                setSize(size.size);
            });

            sizesElement.appendChild(sizeElement);
        });
    }

    if (productData.product.name) { //Checar se há name
        nameElement.textContent = productData.product.name;
    }

    if (productData.product.price) { //Checar se há price
        priceElement.textContent = `R$ ${productData.product.price}`;
    }
};



//GET JSON do product.json
fetch('data/product.json')
    .then(response => response.json())
    .then(productData => setupProduct(productData))
    .catch(error => console.error('An error ocurred while trying to fetch the Product JSON... ', error))