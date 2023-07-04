var filteredCountries = [
    'Albania', 'Germany', 'Angola', 'Saudi Arabia', 'Algeria', 'Argentina', 'Australia', 'Austria', 'Bangladesh', 'Belarus',
    'Myanmar', 'Bolivia', 'Bosnia and Herzegovina', 'Brazil', 'Bulgaria', 'Belgium', 'Cameroon', 'Canada', 'Chile', 'China',
    'Colombia', 'North Korea', 'South Korea', 'Costa Rica', 'Ivory Coast', 'Croatia', 'Cuba', 'Denmark', 'Ecuador',
    'Egypt', 'El Salvador', 'Slovakia', 'Slovenia', 'Spain', 'United States', 'Estonia', 'Ethiopia', 'Philippines',
    'Finland', 'France', 'Ghana', 'Greece', 'Guatemala', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'India', 'Indonesia',
    'Iraq', 'Ireland', 'Iran', 'Iceland', 'Israel', 'Italy', 'Japan', 'Kenya', 'Latvia', 'Lithuania', 'North Macedonia',
    'Madagascar', 'Malaysia', 'Malawi', 'Morocco', 'Moldova', 'Montenegro', 'Mozambique', 'Mexico', 'Nicaragua', 'Nigeria',
    'Norway', 'New Zealand', 'Niger', 'Pakistan', 'Panama', 'Paraguay', 'Netherlands', 'Peru', 'Poland', 'Portugal',
    'United Kingdom', 'Czech Republic', 'Dominican Republic', 'Romania', 'Russia', 'Serbia', 'Somalia', 'South Africa', 'Sudan',
    'Sweden', 'Switzerland', 'Suriname', 'Thailand', 'Taiwan', 'Tanzania', 'Turkey', 'Tunisia', 'Ukraine', 'Uganda', 'Uruguay',
    'Venezuela', 'Vietnam', 'Zambia', 'Zimbabwe', 'Democratic Republic of the Congo'
];

var countries = filteredCountries;
var currentCountry = null;

fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
        countries = data.filter(country => filteredCountries.includes(country.name.common));

        startGame();
    })
    .catch(error => {
        console.log('Error:', error);
    });

function startGame() {
    currentCountry = getRandomCountry();

    displayFlags();

    displayCountryName(currentCountry);
}

function getRandomCountry() {
    return countries[Math.floor(Math.random() * countries.length)].name.common;
}

function displayFlags() {
    var flagsContainer = document.getElementById('flags-container');
    flagsContainer.innerHTML = '';

    countries.forEach(country => {
        var flagItem = document.createElement('div');
        flagItem.className = 'flag-item';

        var flagImage = document.createElement('img');
        flagImage.className = 'flag-image';
        flagImage.src = country.flags.png;

        flagItem.appendChild(flagImage);
        flagsContainer.appendChild(flagItem);

        flagItem.addEventListener('click', function () {
            checkGuess(country.name.common);
        });
    });
}

function displayCountryName(countryName) {
    var countryNameElement = document.getElementById('country-name');
    countryNameElement.textContent = countryName;
}

function checkGuess(guess) {
    if (guess === currentCountry) {
        win();
    } else {
        lose();
    }
}

function win() {
    verificar(true);
    changeCountry();
}

function lose() {
    verificar(false);
}

function changeCountry() { // funcion para cambiar el pais a adivinar
    currentCountry = getRandomCountry();
    displayCountryName(currentCountry);
}

function verificar(value) {
    var esCorrecto = value;

    var notificacion = document.createElement('div');
    notificacion.innerHTML = 'Respondiste ';
    notificacion.classList = 'notification';

    if (esCorrecto) {
        notificacion.innerHTML += 'bien!';
        notificacion.className = 'notification success';
    } else {
        notificacion.innerHTML += 'mal :(, volve a intentar';
        notificacion.className = 'notification error';
    }
    document.body.appendChild(notificacion);
    setTimeout(function () {
        notificacion.style.display = 'none';
    }, 2000); //Despues de 2 seg desaparece la notificacion.
}

