import './css/styles.css';
import fetchCountries from "./fetchCountries";
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const fetchPostInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

fetchPostInput.addEventListener('input', debounce(async () => {
        try {
            const posts = await fetchCountries(fetchPostInput.value.trim());
            renderPost(posts);
        } catch (error) {
            Notiflix.Notify.failure(`Oops (${error}), there is no country with that name`);
            countryList.innerHTML = "";
            countryInfo.innerHTML = "";
        }
}, DEBOUNCE_DELAY));


function renderPost(posts) {
switch (true) {
    case posts.length === 0:
        countryList.innerHTML = "";
        countryInfo.innerHTML = "";
        Notiflix.Notify.failure("Oops, there is no country with that name");
      break;
    case posts.length === 1:
      // genera la cadena de texto HTML para el país encontrado
        countryList.innerHTML = "";
        const markup1 = posts.map(({ name, flags, capital, population, languages }) => {
          return `
          <div class="country">
              <img src="${flags.svg}" alt="canada-flag">
              <h2 class=country__name>${name.common}</h2>        
          </div>
          <p><b>Capital:</b> ${capital}</p>
          <p><b>Habitantes:</b> ${population}</p>
          <p><b>Idioma:</b> ${Object.values(languages)}</p>`
      });
      countryInfo.innerHTML = markup1;
        break;
    case posts.length > 1 && posts.length <= 10:
      // genera la cadena de texto HTML para la lista de países
        countryInfo.innerHTML = "";
      const markupDeft = posts.map(({ name, flags }) => {
          return `<li>
          <div class="country">
              <img src="${flags.svg}" alt="canada-flag">
              <h2 class=country__name>${name.common}</h2>        
          </div>
          </li>`
      }).join("");
      countryList.innerHTML = markupDeft;
        break;
    default:
        countryList.innerHTML = "";
        Notiflix.Notify.warning("Too many matches found. Please enter a more specific name.");
        break;
    };
}

