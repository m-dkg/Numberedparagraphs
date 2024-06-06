document.addEventListener("DOMContentLoaded", () => {
    const textDisplay = document.getElementById('text-display');
    const progressBar = document.getElementById('progress-bar');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');

    let titleSection;
    let sections = [];
    let finalMessage;
    let firstClick = true;
    let currentSectionIndex = -1; // Start at -1 to account for the title section

    // Function to fetch sections from the JSON file
    async function fetchSections() {
        try {
            const response = await fetch('sections.json');
            const data = await response.json();
            titleSection = data.title;
            sections = data.sections;
            finalMessage = data.finalMessage;
            totalSections = sections.length; // Set total sections count
            displayNextSection(); // Display the first section (title) on load
        } catch (error) {
            console.error('Error fetching text sections:', error);
        }
    }

    let totalSections = 0;

    function updateProgressBar() {
        const sectionsRead = Math.max(0, currentSectionIndex);
        const percentage = (sectionsRead / totalSections) * 100;
        progressBar.style.width = `${percentage}%`;
    }

    function getNextSection() {
        if (currentSectionIndex >= sections.length) {
            return finalMessage;
        }
        return sections[currentSectionIndex];
    }

    function getPrevSection() {
        if (currentSectionIndex === 0) {
            return titleSection;
        }
        return sections[currentSectionIndex - 1];
    }

    function displayNextSection() {
        currentSectionIndex++;
        let section;
        if (firstClick) {
            section = titleSection;
            firstClick = false;
        } else {
            section = getNextSection();
        }
        textDisplay.innerHTML = section; // Use innerHTML to render HTML content
        updateProgressBar(); // Update the progress bar

        // Disable/enable navigation buttons as needed
        prevButton.disabled = currentSectionIndex <= 0;
        nextButton.disabled = section === finalMessage;
    }

    function displayPrevSection() {
        currentSectionIndex--;
        let section;
        if (currentSectionIndex < 0) {
            section = titleSection;
        } else {
            section = getPrevSection();
        }
        textDisplay.innerHTML = section; // Use innerHTML to render HTML content
        updateProgressBar(); // Update the progress bar

        // Disable/enable navigation buttons as needed
        prevButton.disabled = currentSectionIndex <= 0;
        nextButton.disabled = false;
    }

    nextButton.addEventListener('click', displayNextSection);
    prevButton.addEventListener('click', displayPrevSection);

    fetchSections(); // Fetch the sections from the JSON file
});
