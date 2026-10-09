// ===================================================
// 1. DATA REPOSITORY
// ===================================================
const simulatorsData = [
  {
    id: "sim-1",
    title: "3D Monolayer Oil Drop Experiment",
    category: "Sciences",
    description: "Physics: Explore the classical physics of the Oil Drop Experiment in an interactive 3D environment.",
    image: "images/oildrop.jpeg",
    url: "sims/simulator1.html"
  },
  {
    id: "sim-2",
    title: "Stationary Waves Simulator Pro",
    category: "Sciences",
    description: "Physics: Explore the physics of standing waves. Manipulate harmonic frequencies.",
    image: "images/stationarywaves.jpeg",
    url: "sims/simulator2.html"
  },
  {
    id: "sim-3",
    title: "Cathode Ray Oscilloscope (CRO) Simulator",
    category: "Sciences",
    description: "Physics: Master the operation of an analog Cathode Ray Oscilloscope.",
    image: "images/cathoderayoscilloscope.jpeg",
    url: "sims/simulator3.html"
  },
  {
    id: "sim-4",
    title: "Advanced X-Ray Tube Physics Simulator",
    category: "Sciences",
    description: "Physics: Experiment with the internal mechanisms of a functional X-ray tube.",
    image: "images/xraytube.jpeg",
    url: "sims/simulator4.html"
  },
  {
    id: "sim-5",
    title: "3D Radiation Detectors Simulator",
    category: "Sciences",
    description: "Physics: Explore the mechanics of nuclear physics by simulating alpha, beta, and gamma particle interactions.",
    image: "images/radiationdetectors.jpeg",
    url: "sims/simulator5.html"
  },
  {
    id: "sim-6",
    title: "MagicBlockBuilder",
    category: "Exploration & Others",
    description: "Kids Game: A fun and interactive digital sandbox designed for young children.",
    image: "images/blockbuilder.jpeg",
    url: "sims/simulator6.html"
  },
  {
    id: "sim-7",
    title: "The Periodic Table: Elemental Rummy",
    category: "Sciences",
    description: "Chemistry: An interactive card game laboratory simulator where learners assemble chemical melds, track valence electrons, and master periodic table trends.",
    image: "images/elementalrummy.jpeg",
    url: "sims/simulator7.html"
  },
  {
    id: "sim-8",
    title: "English Language: Grammar Dash",
    category: "Exploration & Others",
    description: "English Games: An interactive sentence-building laboratory where students identify parts of speech, assemble phrases and sentences, and explore English grammar rules.",
    image: "images/grammardash.jpeg",
    url: "sims/simulator8.html"
  },
  {
    id: "sim-9",
    title: "AC to DC Rectification Laboratory",
    category: "Sciences",
    description: "Physics: Explore half-wave, center-tapped, and bridge rectifiers with dual-trace oscilloscope waveforms, diode biasing, and capacitor smoothing filters.",
    image: "images/rectification.jpeg",
    url: "sims/simulator9.html"
  },
  {
    id: "sim-10",
    title: "Gas Preparation & Inorganic Synthesis",
    category: "Sciences",
    description: "Chemistry: An interactive inorganic synthesis simulator where students assemble glassware trains, test gas collection methods, and safely generate gases like Cl₂, O₂, and NH₃.",
    image: "images/gasprep.jpeg",
    url: "sims/simulator10.html"
  },
  {
    id: "sim-11",
    title: "Ultimate Physics Circuit Lab Pro",
    category: "Sciences",
    description: "Physics: An interactive circuit workbench to design AC/DC circuits, calibrate components, inspect CRO oscilloscope waveforms, and log experimental data.",
    image: "images/circuitlab.jpeg",
    url: "sims/simulator11.html"
  },
  {
    id: "sim-12",
    title: "Photoelectric Effect & Circuit Laboratory",
    category: "Sciences",
    description: "Physics: An interactive quantum physics simulator to construct circuits, illuminate metal cathodes, determine stopping potentials, and plot characteristic I-V curves.",
    image: "images/photoelectric.jpeg",
    url: "sims/simulator12.html"
  },
  {
    id: "sim-13",
    title: "Cathode Ray Tube & CRO Advanced Lab",
    category: "Sciences",
    description: "Physics: Explore electron beam electrodynamics inside a CRT cutaway and analyze real-time waveforms on an authentic 8×10 phosphor CRO graticule.",
    image: "images/cro-crt.jpeg",
    url: "sims/simulator13.html"
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

// Attach globally to the window object for inline onclick triggers
window.openModal = openModal;
window.closeModal = closeModal;

// ===================================================
// 7. ANNOUNCEMENT STRIP CONTROLLER (with LocalStorage)
// ===================================================
function setupAnnouncementStrip() {
    const strip = document.getElementById('announcementStrip');
    const closeBtn = document.getElementById('closeAnnouncementBtn');
    
    if (!strip || !closeBtn) return;

    // Change this key whenever you release a new update so visitors see the new announcement
    const CURRENT_UPDATE_KEY = 'luyalisims_dismissed_update_v2.3';

    // If user previously closed this announcement, hide it immediately
    if (localStorage.getItem(CURRENT_UPDATE_KEY) === 'true') {
        strip.classList.add('hidden');
    }

    // Dismiss button click handler
    closeBtn.addEventListener('click', () => {
        strip.classList.add('hidden');
        localStorage.setItem(CURRENT_UPDATE_KEY, 'true');
    });
}

// ===================================================
// 8. EVENT LISTENERS & INITIALIZATION
// ===================================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize announcement banner
    setupAnnouncementStrip();

    // Initial render of simulators
    displaySimulators(simulatorsData);
    
    // Search & Filter listeners
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    if (searchInput) searchInput.addEventListener('input', filterSims);
    if (categoryFilter) categoryFilter.addEventListener('change', filterSims);
    if (loadMoreBtn) loadMoreBtn.addEventListener('click', loadMoreCards);

    // Backdrop click listener for modals
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('policy-modal')) {
            closeModal(e.target.id);
        }
    });

    // Keyboard ESC key to close active modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' || e.key === 'Esc') {
            const activeModal = document.querySelector('.policy-modal.active');
            if (activeModal) {
                closeModal(activeModal.id);
            }
        }
    });
});
