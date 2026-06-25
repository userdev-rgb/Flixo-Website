document.addEventListener("DOMContentLoaded", () => {
    // 1. Initial Injection Execution
    renderCommands(commandsDataset);
    renderFAQ(faqDataset);

    // 2. Real-Time Adaptive Latency Module
    const pingDisplay = document.getElementById("live-ping");
    setInterval(() => {
        // Simulating the ultra-fast enterprise network cards logic (16ms to 20ms range)
        const activePing = Math.floor(Math.random() * (20 - 16 + 1)) + 16;
        if(pingDisplay) {
            pingDisplay.textContent = `${activePing}ms`;
        }
    }, 4000);

    // 3. Dynamic Filtering Logic (Search Array Setup)
    const searchBar = document.getElementById("command-search");
    if(searchBar) {
        searchBar.addEventListener("input", (e) => {
            const keyword = e.target.value.toLowerCase();
            const filtered = commandsDataset.filter(cmd => 
                cmd.trigger.toLowerCase().includes(keyword) || 
                cmd.description.toLowerCase().includes(keyword)
            );
            renderCommands(filtered);
        });
    }
});

// Structural Components Builders
function renderCommands(data) {
    const target = document.getElementById("commands-display");
    if(!target) return;
    if(data.length === 0) {
        target.innerHTML = `<div class="command-card"><span class="command-desc">No core parameters match the search context...</span></div>`;
        return;
    }
    target.innerHTML = data.map(item => `
        <div class="command-card">
            <span class="command-trigger">${escapeHTML(item.trigger)}</span>
            <p class="command-desc">${escapeHTML(item.description)}</p>
        </div>
    `).join("");
}

function renderFAQ(data) {
    const target = document.getElementById("faq-matrix");
    if(!target) return;
    target.innerHTML = data.map(item => `
        <div class="faq-item">
            <div class="faq-header" onclick="toggleAccordion(this)">
                <span>${escapeHTML(item.q)}</span>
                <i class="fa-solid fa-chevron-down"></i>
            </div>
            <div class="faq-content">
                <p>${escapeHTML(item.a)}</p>
            </div>
        </div>
    `).join("");
}

function toggleAccordion(element) {
    const item = element.parentElement;
    item.classList.toggle("active");
    const icon = element.querySelector("i");
    if(item.classList.contains("active")) {
        icon.className = "fa-solid fa-chevron-up";
    } else {
        icon.className = "fa-solid fa-chevron-down";
    }
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}