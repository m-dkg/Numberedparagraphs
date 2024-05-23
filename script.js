document.addEventListener("DOMContentLoaded", () => {
    const textDisplay = document.getElementById('text-display');
    const progressBar = document.getElementById('progress-bar');

    let titleSection;
    let sections = [];
    let finalMessage;
    let firstClick = true;

    // Function to fetch sections from the JSON file
    async function fetchSections() {
        try {
            const response = await fetch('sections.json');
            const data = await response.json();
            titleSection = data.title;
            sections = data.sections;
            finalMessage = data.finalMessage;
            remainingSections = [...sections];
            totalSections = sections.length; // Set total sections count
            displayNextSection(); // Display the first section (title) on load
        } catch (error) {
            console.error('Error fetching text sections:', error);
        }
    }

    let remainingSections = [];
    let totalSections = 0;

    function updateProgressBar() {
        const sectionsRead = totalSections - remainingSections.length;
        const percentage = (sectionsRead / totalSections) * 100;
        progressBar.style.width = `${percentage}%`;
    }

    function getRandomSection() {
        if (remainingSections.length === 0) {
            return finalMessage;
        }
        const randomIndex = Math.floor(Math.random() * remainingSections.length);
        const section = remainingSections.splice(randomIndex, 1)[0];
        return section;
    }

    function displayNextSection() {
        let section;
        if (firstClick) {
            section = titleSection;
            firstClick = false;
        } else {
            section = getRandomSection();
        }
        textDisplay.innerHTML = section; // Use innerHTML to render HTML content
        if (section === finalMessage) {
            textDisplay.removeEventListener('click', displayNextSection); // Remove click event listener
            textDisplay.classList.add('final-message'); // Add class to hide arrow cursor
            textDisplay.style.cursor = 'auto'; // Change cursor back to default
        } else {
            updateProgressBar(); // Update the progress bar
        }
    }

    textDisplay.addEventListener('click', displayNextSection);

    fetchSections(); // Fetch the sections from the JSON file
});
