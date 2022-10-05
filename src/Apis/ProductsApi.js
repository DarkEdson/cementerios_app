import { BASE_URL, BASE_URL_IMG, PRODUCTS_URL } from '@utils/config';

async function productbyCountry(country, lenguaje) {
    let url = `${BASE_URL}/product.getprodsbycou/${country.value}/${lenguaje._id}`;
    let productos = [];
    try {
        await fetch(url, {
            method: 'GET',
            redirect: 'follow',
        })
            .then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
                response.forEach(producto => {
                    productos.push({
                        _id: producto._id,
                        idCategory: producto.idCategory,
                        idHeadquarter: producto.idHeadquarter,
                        code: producto.code,
                        principalImage: `${BASE_URL_IMG}${PRODUCTS_URL}${producto.image}`,
                        name: producto.labels[0].name,
                        description: producto.labels[0].description,
                        price: producto.labels[0].price,
                        multimedia: producto.labels
                    });
                });
            });
        return productos;
    } catch (error) {
        console.error(error);
        return productos;
    }
}

async function productbyCategory(Category, lenguaje) {
    let url = `${BASE_URL}/product.getprdsbycat/${Category._id}`;
    let product = { _id: '1' }
    let urlComplement = `${BASE_URL}/product.getprdsbycat/${product._id}/${lenguaje._id}`;
    let productos = [];
    try {
        await fetch(url, {
            method: 'GET',
            redirect: 'follow',
        })
            .then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
                response.forEach(async producto => {
                    product = producto;
                    console.log(urlComplement, 'URL COMPLEMENTARIA')
                    try {
                        await fetch(urlComplement, {
                            method: 'GET',
                            redirect: 'follow',
                        })
                            .then(resp => resp.json())
                            .catch(error => console.error('Error', error))
                            .then(responseP => {
                                responseP.forEach(productoR => {
                                    productos.push({
                                        _id: productoR._id,
                                        idCategory: productoR.idCategory,
                                        idHeadquarter: productoR.idHeadquarter,
                                        code: productoR.code,
                                        principalImage: `${BASE_URL_IMG}${PRODUCTS_URL}${productoR.image}`,
                                        name: productoR.labels[0].name,
                                        description: productoR.labels[0].description,
                                        price: productoR.labels[0].price,
                                        multimedia: productoR.labels
                                    });
                                });
                            });
                    } catch (error) {
                        console.error(error);
                        return productos;
                    }
                });
            });
        return productos;
    } catch (error) {
        console.error(error);
        return productos;
    }
}

async function productbyHeadquarters(Sede, lenguaje) {
    let url = `${BASE_URL}/product.getprdsbyhq/${Sede._id}/${lenguaje._id}`;
    let productos = [];
    try {
        await fetch(url, {
            method: 'GET',
            redirect: 'follow',
        })
            .then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
                response.forEach(producto => {
                    productos.push({
                        _id: producto._id,
                        idCategory: producto.idCategory,
                        idHeadquarter: producto.idHeadquarter,
                        code: producto.code,
                        principalImage: `${BASE_URL_IMG}${PRODUCTS_URL}${producto.image}`,
                        name: producto.labels[0].name,
                        description: producto.labels[0].description,
                        price: producto.labels[0].price,
                        multimedia: producto.labels
                    });
                });
            });
        return productos;
    } catch (error) {
        console.error(error);
        return productos;
    }
}

export { productbyCountry, productbyCategory, productbyHeadquarters };
