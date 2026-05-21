// Isotope Explorer - JavaScript //
async function loadIsotopes() {
    try {
        const response = await fetch('isotope-data.json');
        const data = await response.json();

        populateSelect(data.isotopes);
    }   catch (error) {
        console.error('Error loading isotope data: ', error)
    }
}

function populateSelect(elements) {
    const select = document.getElementById('element-select');

    elements.forEach(element => {
        const option = document.createElement('option');
        option.value = element.atomicNumber;
        option.textContent = `${element.element} (${element.symbol})`;
        select.appendChild(option);
    });

    select.addEventListener('change', () => {
        const selected = elements.find(e =>
            e.atomicNumber === parseInt(select.value)
        );
        if (selected) displayIsotopes(selected);
    });
}

function displayIsotopes(element) {
    const display = document.getElementById('isotope-display');
    display.innerHTML = '';

    element.isotopes.forEach(isotope => {
     const card = document.createElement('div');
     card.className = 'isotope-card';
     card.innerHTML = `
        <h3>${isotope.name}</h3>
        <p>Mass Number: ${isotope.massNumber}</p>
        <p>Neutrons: ${isotope.neutrons}</p>
        <p>Abundance: ${isotope.abundance}</p>
        <p>Half-life:
            <span class="${isotope.stable ? 'stable' : 'unstable'}">
                ${isotope.halfLife}
            </span>
        </p>
    `;
     display.appendChild(card);
    });
}

loadIsotopes();
