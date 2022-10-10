
import { BASE_URL, BASE_URL_IMG, PROMOTIONS_URL } from '@utils/config';


async function promotionsApi(country, lenguaje) {
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
                        backgroundcolor: promocion.backgroundcolor
                    });
                });
            });
        return promociones;
    } catch (error) {
        console.error(error, 'ERROR EN PROMOCION');
        return promociones;
    }
}

async function promotionsbyCodeApi(promotion, Language) {
    let raw = {
        code: promotion.code,
        idLanguage: Language._id
    }
    let url = `${BASE_URL}/promotion.valprombycode`;
    let aplica = {};
    try {
        console.log(raw)
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify(raw),
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            redirect: 'follow',
        })
            .then(res => res.json())
            .catch(error => console.error('Error PROMOCION APLICA', error))
            .then(response => {
                aplica = response
            });
        return aplica;
    } catch (error) {
        console.error(error, 'ERROR EN PROMOCION APLICA');
        return aplica;
    }
}

export { promotionsApi, promotionsbyCodeApi };