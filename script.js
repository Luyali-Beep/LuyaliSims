// ===================================================
// 1. DATA REPOSITORY
// ===================================================
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

// ===================================================
// 2. PAGINATION & FILTER STATE
// ===================================================
const CARDS_PER_PAGE = 6;
let currentVisibleCount = CARDS_PER_PAGE;
let currentFilteredData = [...simulatorsData]; 

// ===================================================
// 3. RENDER CARDS FUNCTION
// ===================================================
function displaySimulators(simulators) {
    const grid = document.getElementById('simulatorGrid');
    const loadMoreContainer = document.getElementById('loadMoreContainer');
    
    if (!grid) return;
    grid.innerHTML = ''; 

    if (!simulators || simulators.length === 0) {
        grid.innerHTML = `
            <div style="text-align:center; grid-column: 1/-1; padding: 3rem 1rem;">
                <p style="color: var(--neon-cyan); font-size: 1.25rem; font-family: 'Orbitron', sans-serif; margin-bottom: 0.5rem;">
                    No Simulators Found
                </p>
                <p style="color: var(--text-muted); font-size: 1rem;">
                    Try adjusting your search query or selecting a different category filter.
                </p>
            </div>
        `;
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

// ===================================================
// 4. SEARCH AND CATEGORY FILTERING
// ===================================================
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

// ===================================================
// 5. LOAD MORE PAGINATION HANDLER
// ===================================================
function loadMoreCards() {
    currentVisibleCount += CARDS_PER_PAGE;
    displaySimulators(currentFilteredData);
}

// ===================================================
// 6. POLICY MODAL CONTROLS (AdSense & UI Fixed)
// ===================================================
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Freeze page scrolling
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore page scrolling
    }
}

// Attach globally to the window object so inline onclick attributes work 100% of the time
window.openModal = openModal;
window.closeModal = closeModal;

// ===================================================
// 7. EVENT LISTENERS & INITIALIZATION
// ===================================================
document.addEventListener('DOMContentLoaded', () => {
    // Initial Render
    displaySimulators(simulatorsData);
    
    // Search & Filter Listeners
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    if (searchInput) searchInput.addEventListener('input', filterSims);
    if (categoryFilter) categoryFilter.addEventListener('change', filterSims);
    if (loadMoreBtn) loadMoreBtn.addEventListener('click', loadMoreCards);

    // Backdrop Click Listener for Modals
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('policy-modal')) {
            closeModal(e.target.id);
        }
    });

    // Keyboard ESC Key to Close Modals (Accessibility Compliance)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' || e.key === 'Esc') {
            const activeModal = document.querySelector('.policy-modal.active');
            if (activeModal) {
                closeModal(activeModal.id);
            }
        }
    });
});
