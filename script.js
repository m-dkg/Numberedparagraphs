document.addEventListener("DOMContentLoaded", () => {
    const textDisplay = document.getElementById('text-display');
    const progressBar = document.getElementById('progress-bar');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');

    let titleSection;
    let sections = [];
    let finalMessage;
    let firstClick = true;
    let currentSectionIndex = -1;
    let currentSubsectionIndex = 0;
    let currentSection = null;
    let currentSubsections = [];
    let sectionOrder = [];

    // Function to fetch sections from the JSON file
    async function fetchSections() {
        try {
            const response = await fetch('sections.json');
            const data = await response.json();
            titleSection = data.title;
            sections = data.sections;
            finalMessage = data.finalMessage;
            totalSections = sections.length;
            sectionOrder = shuffleArray([...Array(totalSections).keys()]);
            console.log("Fetched sections:", sections);
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

    function splitSection(section) {
        const subsections = section.split('<p>').map((s, i) => {
            if (i > 0) {
                return `<p>${s}`;
            } else {
                return s;
            }
        });

        console.log("Split section into subsections:", subsections);
        return subsections;
    }

    function getNextSection() {
        if (currentSubsectionIndex < currentSubsections.length - 1) {
            currentSubsectionIndex++;
            return currentSubsections[currentSubsectionIndex];
        }

        currentSectionIndex++;
        if (currentSectionIndex >= sections.length) {
            return finalMessage;
        }

        currentSection = sections[sectionOrder[currentSectionIndex]];
        currentSubsections = splitSection(currentSection);
        currentSubsectionIndex = 0;
        return currentSubsections[currentSubsectionIndex];
    }

    function getPrevSection() {
        if (currentSubsectionIndex > 0) {
            currentSubsectionIndex--;
            return currentSubsections[currentSubsectionIndex];
        }

        currentSectionIndex--;
        if (currentSectionIndex < 0) {
            currentSectionIndex = -1;
            currentSubsections = [titleSection];
            currentSubsectionIndex = 0;
            return titleSection;
        }

        currentSection = sections[sectionOrder[currentSectionIndex]];
        currentSubsections = splitSection(currentSection);
        currentSubsectionIndex = currentSubsections.length - 1;
        return currentSubsections[currentSubsectionIndex];
    }

    function appendSymbol(content) {
        return content + ' ✺';
    }

    function displayNextSection() {
        let section;
        if (firstClick) {
            section = titleSection;
            firstClick = false;
        } else {
            section = getNextSection();
        }

        section = appendSymbol(section);
        console.log("Displaying section:", section);
        textDisplay.innerHTML = section;
        updateProgressBar();

        // Disable/enable navigation buttons as needed
        prevButton.disabled = currentSectionIndex <= 0 && currentSubsectionIndex === 0;
        nextButton.disabled = section === finalMessage;
    }

    function displayPrevSection() {
        let section = getPrevSection();

        section = appendSymbol(section);
        console.log("Displaying section:", section);
        textDisplay.innerHTML = section;
        updateProgressBar();

        // Disable/enable navigation buttons as needed
        prevButton.disabled = currentSectionIndex <= 0 && currentSubsectionIndex === 0;
        nextButton.disabled = false;
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i++) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    textDisplay.addEventListener('click', displayNextSection);
    nextButton.addEventListener('click', displayNextSection);
    prevButton.addEventListener('click', displayPrevSection);

    fetchSections();
});
