
let requestOptions = {
method: 'GET',
redirect: 'follow'
};


export default function fetchCountries(name) {
    if (name != "") {
        return fetch(`https://restcountries.com/v3.1/name/${name}`, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.status);
                }
                return response.json();
            });    
    }
    return [];
}