
import { BASE_URL, BASE_URL_IMG, PRODUCTS_URL } from '@utils/config';


export default async function sedesApi(cementery) {
    let url = `${BASE_URL}/affiliate.headquarters.getheadquartersbyid/${cementery._id}`;
    let sedes = [];
    try {
        await fetch(url, {
            method: 'GET',
            redirect: 'follow',
        })
            .then(res => res.json())
            .catch(error => console.error('Error Categoria', error))
            .then(response => {
                response.forEach(sede => {
                    sedes.push({     
                        _id: sede._id,
                        idAffiliate: sede.idAffiliate,
                        idCountry: sede.idCountry,
                        code: sede.code,       
                        name: sede.name,
                        description: sede.description,
                        image: `${BASE_URL_IMG}${PRODUCTS_URL}${sede.image}`,
                        address: sede.address,
                        state: sede.state,
                        town: sede.town,
                    });
                });
            });
        return sedes;
    } catch (error) {
        console.error(error);
        return sedes;
    }
}