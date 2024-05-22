document.addEventListener("DOMContentLoaded", () => {
    const textDisplay = document.getElementById('text-display');

    let remainingSections = []; // Array to store text sections

    // Fetch text sections from a separate file (e.g., sections.json)
    fetch('sections.json')
        .then(response => response.json())
        .then(data => {
            remainingSections = data.sections; // Store text sections in the array
            displayNextSection(); // Display the first section
        })
        .catch(error => console.error('Error fetching text sections:', error));

    const finalMessage = "<p>Matthew de Kersaint Giraudeau, 2024</p>";

    function getRandomSection() {
        if (remainingSections.length === 0) {
            return finalMessage;
        }
        const randomIndex = Math.floor(Math.random() * remainingSections.length);
        const section = remainingSections.splice(randomIndex, 1)[0];
        return section;
    }

    function displayNextSection() {
        const section = getRandomSection();
        textDisplay.innerHTML = section; // Use innerHTML to render HTML content
        if (section === finalMessage) {
            textDisplay.removeEventListener('click', displayNextSection); // Remove click event listener
            textDisplay.style.cursor = 'auto'; // Change cursor back to default
        }
    }

    textDisplay.addEventListener('click', displayNextSection);
});
