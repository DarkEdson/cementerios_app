
import { BASE_URL, BASE_URL_IMG, PROMOTIONS_URL } from '@utils/config';


export default async function promotionsApi(country, lenguaje) {
    let url = `${BASE_URL}/promotion.getpromsbycou/${country.value}/${lenguaje._id}`;
    let promociones = [];
    try {
        await fetch(url, {
            method: 'GET',
            redirect: 'follow',
        })
            .then(res => res.json())
            .catch(error => console.error('Error PROMOCION', error))
            .then(response => {
                response.forEach(promocion => {
                    promociones.push({
                        _id: promocion._id,
                        idProduct: promocion.idProduct,
                        code: promocion.code,
                        image: `${BASE_URL_IMG}${PROMOTIONS_URL}${promocion.image}`,
                        name: promocion.labels[0].name,
                        description: promocion.labels[0].description,
                        price: promocion.labels[0].price,
                        percentage: promocion.labels[0].percentage,
                    });
                });
            });
        return promociones;
    } catch (error) {
        console.error(error, 'ERROR EN PROMOCION');
    }
}