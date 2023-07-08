var filteredCountriesEasy = [
    'Germany', 'Argentina', 'Australia', 'Brazil', 'Canada', 'China', 'France', 'India', 'Italy', 'Japan', 'Mexico', 'Netherlands', 'Russia', 
    'South Africa', 'Spain', 'Sweden', 'Switzerland', 'Turkey', 'United Kingdom', 'United States', 'Belgium', 'Bolivia', 'Uruguay', 'Nigeria', 'Ivory Coast'
];

var filteredCountriesHard = [
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

var countries = [];
var currentCountry = null;
const spanCorrectGuesses = document.getElementById('correctGuesses');
const spanIncorrectGuesses = document.getElementById('incorrectGuesses');
var correctGuesses = 0;
var incorrectGuesses = 0;

document.getElementById('startGame').addEventListener('click', function () {
    var gameDifficulty = document.getElementById('select-difficulty').value;
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            if (gameDifficulty === 'easy') {
                countries = data.filter(country => filteredCountriesEasy.includes(country.name.common));
            } else if (gameDifficulty === 'hard') {
                countries = data.filter(country => filteredCountriesHard.includes(country.name.common));
            }
            correctGuesses = 0;
            incorrectGuesses = 0;
            startGame();
            startTimer();
        })
        .catch(error => {
            console.log('Error:', error);
        });
})

function startGame(difficulty) {
    if (difficulty === 'easy') {
        countries = filteredCountriesEasy
    } else if (difficulty === 'hard') {
        countries = filteredCountriesHard;
    }

    currentCountry = getRandomCountry();

    displayFlags();

    displayCountryName(currentCountry);
}

function getRandomCountry() {
    return countries[Math.floor(Math.random() * countries.length)].name.common;
}

function displayFlags() {
    if (document.getElementById('select-difficulty').value === 'easy') {
        spanCorrectGuesses.textContent = 'Paises acertados = ' + correctGuesses + '/25';
    } else {
        spanCorrectGuesses.textContent = 'Paises acertados = ' + correctGuesses + '/103';
    }
    spanIncorrectGuesses.textContent = 'Errores = ' + incorrectGuesses;
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

var startTime;
var timerInterval;

function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    var currentTime = Date.now() - startTime;
    var hours = Math.floor(currentTime / (1000 * 60 * 60));
    var minutes = Math.floor((currentTime % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((currentTime % (1000 * 60)) / 1000);

    var timeString = formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds);

    document.getElementById('timer').textContent = timeString;
}

function formatTime(time) {
    return time.toString().padStart(2, '0');
}

function stopTimer() {
    clearInterval(timerInterval);
}

function win() {
    correctGuesses++;
    var countryIndex = countries.findIndex(country => country.name.common === currentCountry);
    if (countryIndex !== -1) {
        countries.splice(countryIndex, 1);
    }

    verificar(true);
    if (countries.length === 0) {
        stopTimer();
        var totalTime = document.getElementById('timer').textContent;
        var accuracy = (correctGuesses / (correctGuesses + incorrectGuesses)) * 100;
        var modalTime = document.getElementById('modal-time');
        var modalAccuracy = document.getElementById('modal-accuracy');

        modalTime.textContent = 'Tiempo: ' + totalTime;
        modalAccuracy.textContent = 'Precisión: ' + accuracy.toFixed(2) + '%';

        var modal = document.getElementById('modal');
        modal.style.display = 'block';
    } else {
        changeCountry();
        displayCountryName(currentCountry);
        displayFlags();
    }
}

function lose() {
    verificar(false);
}

function changeCountry() {
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
        notificacion.innerHTML += 'mal :(, volve a intentar.';
        notificacion.className = 'notification error';
        incorrectGuesses++;
        spanIncorrectGuesses.textContent = 'Errores = ' + incorrectGuesses;
    }
    document.body.appendChild(notificacion);
    setTimeout(function () {
        notificacion.style.display = 'none';
    }, 2000);
}
function closeModal(){
    var modal = document.getElementById('modal');
    modal.style.display = 'none';
}
