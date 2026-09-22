// 1. DATA IS EMBEDDED DIRECTLY
const simulatorsData = [
  {
    id: "sim-1",
    title: "3D Monolayer Oil Drop Experiment",
    category: "Sciences",
    description: "Explore the classical physics of the Oil Drop Experiment in an interactive 3D environment.",
    image: "images/oildrop.jpg",
    url: "sims/simulator1.html"
  },
  {
    id: "sim-2",
    title: "Stationary Waves Simulator Pro",
    category: "Sciences",
    description: "Explore the physics of standing waves. Manipulate harmonic frequencies.",
    image: "images/stationarywaves.jpg",
    url: "sims/simulator2.html"
  },
  {
    id: "sim-3",
    title: "Cathode Ray Oscilloscope (CRO) Simulator",
    category: "Sciences",
    description: "Master the operation of an analog Cathode Ray Oscilloscope.",
    image: "images/cathoderayoscilloscope.jpg",
    url: "sims/simulator3.html"
  },
  {
    id: "sim-4",
    title: "Advanced X-Ray Tube Physics Simulator",
    category: "Sciences",
    description: "Experiment with the internal mechanisms of a functional X-ray tube.",
    image: "images/xraytube.jpg",
    url: "sims/simulator4.html"
  },
  {
    id: "sim-5",
    title: "3D Radiation Detectors Simulator",
    category: "Sciences",
    description: "Explore the mechanics of nuclear physics by simulating alpha, beta, and gamma particle interactions.",
    image: "images/radiationdetectors.jpg",
    url: "sims/simulator5.html"
  },
  {
    id: "sim-6",
    title: "MagicBlockBuilder",
    category: "Exploration & Others",
    description: "A fun and interactive digital sandbox designed for young children.",
    image: "images/blockbuilder.jpg",
    url: "sims/simulator6.html"
  }
];

// 2. PAGINATION & STATE
const CARDS_PER_PAGE = 6;
let currentVisibleCount = CARDS_PER_PAGE;
let currentFilteredData = [...simulatorsData]; 

// 3. RENDER CARDS
function displaySimulators(simulators) {
    const grid = document.getElementById('simulatorGrid');
    const loadMoreContainer = document.getElementById('loadMoreContainer');
    
    if (!grid) return;
    grid.innerHTML = ''; 

    if (!simulators || simulators.length === 0) {
        grid.innerHTML = '<p style="text-align:center; grid-column: 1/-1; color: #00f3ff; font-size: 1.2rem; padding: 2rem;">No simulators found matching your criteria.</p>';
        if (loadMoreContainer) loadMoreContainer.style.display = 'none';
        return;
    }

    const visibleSimulators = simulators.slice(0, currentVisibleCount);

    visibleSimulators.forEach(sim => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${sim.image}" alt="${sim.title}" class="card-img" loading="lazy">
            <div class="card-content">
                <h3>${sim.title}</h3>
                <span class="category-tag">${sim.category}</span>
                <p>${sim.description}</p>
                <a href="${sim.url}" class="play-btn">Launch Simulator</a>
            </div>
        `;
        grid.appendChild(card);
    });

    if (loadMoreContainer) {
        loadMoreContainer.style.display = (currentVisibleCount < simulators.length) ? 'block' : 'none';
    }
}

// 4. SEARCH AND FILTER FUNCTION
function filterSims() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');

    const searchText = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const selectedCategory = categoryFilter ? categoryFilter.value.trim() : 'All';

    currentFilteredData = simulatorsData.filter(sim => {
        const matchesSearch = sim.title.toLowerCase().includes(searchText) || sim.description.toLowerCase().includes(searchText);
        const matchesCategory = (selectedCategory === 'All') || (sim.category.toLowerCase() === selectedCategory.toLowerCase());
        return matchesSearch && matchesCategory;
    });

    currentVisibleCount = CARDS_PER_PAGE;
    displaySimulators(currentFilteredData);
}

// 5. LOAD MORE FUNCTION
function loadMoreCards() {
    currentVisibleCount += CARDS_PER_PAGE;
    displaySimulators(currentFilteredData);
}

// 6. INITIALIZE ON LOAD
document.addEventListener('DOMContentLoaded', () => {
    displaySimulators(simulatorsData);
    
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    if (searchInput) searchInput.addEventListener('input', filterSims);
    if (categoryFilter) categoryFilter.addEventListener('change', filterSims);
    if (loadMoreBtn) loadMoreBtn.addEventListener('click', loadMoreCards);
});