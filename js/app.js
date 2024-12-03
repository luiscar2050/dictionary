import dictionary from './dictionary.js';

document.addEventListener("DOMContentLoaded", () => {
    // Desmarcar todas las categorías al cargar la página
    const clearRadioSelection = (className) => {
        const radioButtons = document.querySelectorAll(`.${className} input[type="radio"]`);
        radioButtons.forEach(radio => radio.checked = false); // Desmarca todos los radios
    };

    // Limpia las selecciones en ambas secciones
    clearRadioSelection('radio-category');
    clearRadioSelection('radio-category-form');

    // Asocia el botón de traducción con la función translateWord
    const translateButton = document.querySelector('.animated-button');
    translateButton.addEventListener('click', translateWord);
});

// Función para traducir palabras
function translateWord() {
    const wordInput = document.querySelector('.wordInput').value.trim();
    const language = document.querySelector('input[name="language"]:checked');

    if (!language) {
        document.querySelector('.result-search p').textContent = "Por favor, selecciona un idioma de traducción.";
        return;
    }

    if (wordInput === "") {
        document.querySelector('.result-search p').textContent = "Por favor, ingresa una palabra.";
        return;
    }

    let translation = "";

    for (const category in dictionary.categories) {
        const words = dictionary.categories[category];
        for (const word of words) {
            if (language.value === "en-es" && word.english.toLowerCase() === wordInput.toLowerCase()) {
                translation = word.spanish;
                break;
            } else if (language.value === "es-en" && word.spanish.toLowerCase() === wordInput.toLowerCase()) {
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

/* Funcionalidades del diccionario */
function displayWords() {
    const selectedCategory = document.querySelector('input[name="category"]:checked');

    if (!selectedCategory) {
        const tableResult = document.querySelector('.table-result');
        tableResult.innerHTML = `<h1>Palabras</h1><p>Selecciona una categoría para ver las palabras.</p>`;
        return;
    }

    const categoryValue = selectedCategory.value;
    console.log("Categoría seleccionada:", categoryValue);
    const wordsList = dictionary.categories[categoryValue];

    const tableResult = document.querySelector('.table-result');
    tableResult.innerHTML = `<h1>Palabras de ${categoryValue}</h1>`;

    if (wordsList && Array.isArray(wordsList)) {
        const ul = document.createElement('ul');
        wordsList.forEach(word => {
            const li = document.createElement('li');
            li.textContent = `${word.english} - ${word.spanish}: ${word.example}`;
            ul.appendChild(li);
        });
        tableResult.appendChild(ul);
    } else {
        tableResult.innerHTML += `<p>No se encontraron palabras para esta categoría.</p>`;
    }
}

// Función para ordenar palabras
function sortDictionary() {
    const selectedCategory = document.querySelector('input[name="category"]:checked');

    if (!selectedCategory) {
        console.error("No hay una categoría seleccionada para ordenar.");
        return;
    }

    const categoryValue = selectedCategory.value;
    let wordsList = dictionary.categories[categoryValue];

    if (wordsList && Array.isArray(wordsList)) {
        wordsList.sort((a, b) => a.english.localeCompare(b.english));
        displayWords(); // Vuelve a mostrar las palabras ordenadas
    } else {
        console.error("No se pueden ordenar las palabras porque no hay ninguna categoría seleccionada.");
    }
}

// Eventos para mostrar y ordenar palabras
document.addEventListener('DOMContentLoaded', () => {
    const categoryRadios = document.querySelectorAll('input[name="category"]');
    categoryRadios.forEach(radio => {
        radio.addEventListener('change', displayWords);
    });

    const sortButton = document.querySelector('.btn');
    sortButton.addEventListener('click', sortDictionary);
});

/* Funcionalidades del formulario */
document.addEventListener('DOMContentLoaded', () => {
    const addWordForm = document.getElementById('addWordForm');

    addWordForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const newWord = document.getElementById('newWord').value.trim();
        const translation = document.getElementById('translation').value.trim();
        const addExample = document.getElementById('addExample').value.trim();
        const selectedCategory = document.querySelector('input[name="newCategory"]:checked');

        if (!newWord || !translation || !addExample) {
            alert("Por favor, ingresa todos los campos.");
            return;
        }

        if (!selectedCategory) {
            alert("Por favor, selecciona una categoría.");
            return;
        }

        const categoryValue = selectedCategory.value;

        if (!dictionary.categories.hasOwnProperty(categoryValue)) {
            alert("La categoría seleccionada no existe.");
            return;
        }

        const newEntry = {
            id: dictionary.categories[categoryValue].length + 1,
            english: newWord,
            spanish: translation,
            example: addExample
        };

        dictionary.categories[categoryValue].push(newEntry);

        // Limpiar campos del formulario
        document.getElementById('newWord').value = "";
        document.getElementById('translation').value = "";
        document.getElementById('addExample').value = "";

        displayWords(); // Actualiza la lista de palabras

        alert(`La palabra "${newWord}" ha sido añadida correctamente.`);
    });
});
