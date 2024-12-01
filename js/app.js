import dictionary from './dictionary.js';

document.addEventListener("DOMContentLoaded", () => {
    const translateButton = document.querySelector('.animated-button');

    translateButton.addEventListener('click', translateWord);
});

function translateWord() {
    const wordInput = document.querySelector('.wordInput').value.trim();
   
    const language = document.querySelector('input[name="language"]:checked').value;
   
    if (wordInput === "") {
        document.querySelector('.result-search p').textContent = "Por favor, ingresa una palabra.";
        return;
    }
   
    let translation = "";
   
    for (const category in dictionary.categories) {
        const words = dictionary.categories[category];
        for (const word of words) {
            if (language === "en-es" && word.english.toLowerCase() === wordInput.toLowerCase()) {
                translation = word.spanish;
                break;
            } else if (language === "es-en" && word.spanish.toLowerCase() === wordInput.toLowerCase()) {
                translation = word.english;
                break;
            }
        }
        if (translation) break;
    }
   
    const resultElement = document.querySelector('.result-search p');
    if (translation) {
        resultElement.textContent = `La traducción de "${wordInput}" es: ${translation}`;
    } else {
        resultElement.textContent = `No se encontró la palabra "${wordInput}" en el diccionario.`;
    }
}

/*----------------------*/

function displayWords() {
    const selectedCategory = document.querySelector('input[name="category"]:checked').value;
    console.log("Categoría seleccionada:", selectedCategory);
    const wordsList = dictionary.categories[selectedCategory];

    if (wordsList && Array.isArray(wordsList)) {
        const tableResult = document.querySelector('.table-result');
        tableResult.innerHTML = `<h1>Palabras de ${selectedCategory}</h1>`;

        const ul = document.createElement('ul');
        wordsList.forEach(word => {
            const li = document.createElement('li');
            li.textContent = word.english + " - " + word.spanish + ": " + word.example;
            ul.appendChild(li);
        });

        tableResult.appendChild(ul);
    } else {
        const tableResult = document.querySelector('.table-result');
        tableResult.innerHTML = `<h1>Palabras de ${selectedCategory}</h1><p>No se encontraron palabras para esta categoría.</p>`;
        console.error("No se encontraron palabras para esta categoría.");
    }
}

function sortDictionary() {
    const selectedCategory = document.querySelector('input[name="category"]:checked').value;
    console.log("Categoría seleccionada para ordenar:", selectedCategory); // Para depuración
    let wordsList = dictionary.categories[selectedCategory]; // Obtiene las palabras de la categoría seleccionada

    if (wordsList && Array.isArray(wordsList)) {
        wordsList.sort((a, b) => a.english.localeCompare(b.english)); // Ordena las palabras alfabéticamente por su nombre en inglés

        displayWords();
    } else {
        console.error("No se pueden ordenar las palabras porque no hay ninguna categoría seleccionada.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    displayWords();

    const categoryRadios = document.querySelectorAll('input[name="category"]');
    categoryRadios.forEach(radio => {
        radio.addEventListener('change', displayWords);
    });

    const sortButton = document.querySelector('.btn');
    sortButton.addEventListener('click', sortDictionary);
});
