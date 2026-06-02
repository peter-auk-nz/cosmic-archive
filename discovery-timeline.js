async function loadTimeline() {
    try {
        const response = await fetch('timeline-data.json');
        const data = await response.json();
        buildTimeline(data.discoveries);
    } catch (error) {
        console.error('Error loading timeline data:', error);
    }
}

function buildTimeline(discoveries) {
    const container = document.getElementById('timeline-container');

    discoveries.forEach(item => {
     const entry = document.createElement('div');
     entry.className = ' timeline-entry';
     entry.innerHTML = `
        <div class="timeline-year">${item.year}</div>
        <div class="timeline-content">
            <h2>${item.element} (${item.symbol})</h2>
            <p class="discoverer">Discovered by ${item.discoverer}</p>
            <p class="description">${item.description}</p>
        </div>
    `;
    container.appendChild(entry);
    });
}

loadTimeline();
