document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("searchBtn");
    const resetBtn = document.getElementById("resetBtn");
    const searchInput = document.getElementById("searchInput");
    const resultsDiv = document.getElementById("results");

    let travelData = null;

    // Load JSON file using a cleaner async pattern
    async function loadData() {
        try {
            const response = await fetch("travel_recommendation_api.json");
            if (!response.ok) throw new Error("Failed to load data.");
            travelData = await response.json();
            console.log("Data loaded successfully");
        } catch (error) {
            console.error("Error loading JSON:", error);
            resultsDiv.innerHTML = "<p>Unable to load recommendations at this time.</p>";
        }
    }
    loadData();

    // Search Logic
    searchBtn.addEventListener("click", () => {
        const query = searchInput.value.trim().toLowerCase();
        resultsDiv.innerHTML = "";

        if (!travelData) {
            resultsDiv.textContent = "Data is still loading, please try again.";
            return;
        }

        if (!query) {
            resultsDiv.textContent = "Please enter a keyword.";
            return;
        }

        // Handle variations (Normalization)
        let keyword = query;
        if (query.includes("beach")) keyword = "beach";
        if (query.includes("temple")) keyword = "temple";
        if (query.includes("countr")) keyword = "country"; // Matches "country" and "countries"

        // Search and Display
        if (keyword === "beach") {
            displayResults(travelData.beaches, "Beach Destinations");
        } else if (keyword === "temple") {
            displayResults(travelData.temples, "Temple Destinations");
        } else if (keyword === "country") {
            // Flatten country cities into one list
            const allCities = travelData.countries.flatMap(c => c.cities);
            displayResults(allCities, "Country Destinations");
        } else {
            resultsDiv.textContent = "No recommendations found for your search.";
        }
    });

    // Reset Logic
    resetBtn.addEventListener("click", () => {
        searchInput.value = "";
        resultsDiv.innerHTML = "";
    });

    // Generic display function to reduce repetitive code
    function displayResults(items, title) {
        resultsDiv.innerHTML = `<h2>${title}</h2><div class="results-grid"></div>`;
        const grid = resultsDiv.querySelector(".results-grid");
        
        items.forEach(item => {
            grid.innerHTML += createCard(item.name, item.imageUrl, item.description);
        });
    }

    // Card template
    function createCard(title, image, description) {
        return `
            <div class="card">
                <img src="${image}" alt="${title}" onerror="this.src='https://via.placeholder.com'">
                <h3>${title}</h3>
                <p>${description}</p>
                <button class="visit-btn" data-name="${title}">Visit</button>
            </div>
        `;
    }

    // Event Delegation for "Visit" buttons
    resultsDiv.addEventListener("click", (e) => {
        if (e.target.classList.contains("visit-btn")) {
            const destination = e.target.getAttribute("data-name");
            alert(`Taking you to ${destination}!`);
            // You can replace this with: window.location.href = `booking.html?dest=${destination}`;
        }
    });
});
