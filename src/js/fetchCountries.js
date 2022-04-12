
export function fetchCountries(name) {
    const url = `https://restcountries.com/v2/name/`;

    return fetch(`${url}${name}?fields=name,official,capital,population,flags,languages`)
    .then(response => {
        if(!response.ok) {
            throw new Error(response.status);
        }
        return response.json();        
    });
}