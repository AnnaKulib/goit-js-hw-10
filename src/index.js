import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import { getRefs } from './js/refs';

import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import counrtieMarkup from './templates/countrie.hbs';
import counrtiesMarkup from './templates/countries.hbs';

const DEBOUNCE_DELAY = 300;
const refs = getRefs();
refs.inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
    const inputValue = refs.inputEl.value.trim();
    if (inputValue === '') {
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = '';
    }
    fetchCountries(inputValue).then(renderMarkup).catch(onError);
};

function renderMarkup(data) {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    console.log(data);
    if(data.length === 1) {
        refs.countryInfo.insertAdjacentHTML('beforeend', counrtieMarkup(data))
    } else if(data.length > 1 && data.length <= 10) {
        refs.countryList.insertAdjacentHTML('beforeend', counrtiesMarkup(data))
    } else Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
};

function onError() {
    Notiflix.Notify.failure('Oops, there is no country with that name');
};