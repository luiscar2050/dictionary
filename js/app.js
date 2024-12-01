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