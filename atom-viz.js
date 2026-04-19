// Atom Visualizer JavaScript - Phase 2: JSON Integration
// Now loading from elements-data.json for all 118 elements!

const canvas = document.getElementById('atomCanvas');
const ctx = canvas.getContext('2d');

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

// Will store all element data
let elementsData = {};

// Function to parse electron configuration string
function parseElectronConfig(configString) {
    // Example: "Electron Configuration:Shell 1: ●● (2), Shell 2: ●●●●●●●● (8)"
    // We want to extract: [2, 8]
    
    const shells = [];
    
    // Find all numbers in parentheses
    const matches = configString.match(/\((\d+)\)/g);
    
    if (matches) {
        matches.forEach(match => {
            // Extract number from parentheses
            const num = parseInt(match.replace(/[()]/g, ''));
            shells.push(num);
        });
    }
    
    return shells;
}

// Function to load JSON data
async function loadElementsData() {
    try {
        const response = await fetch('elements-data.json');
        const data = await response.json();
        
        // Process each element
        data.forEach(element => {
            const atomicNumber = element.atomicNumber;
            const shells = parseElectronConfig(element.electronConfig);
            
            elementsData[atomicNumber] = {
                name: element.name,
                symbol: element.symbol,
                atomicNumber: atomicNumber,
                electrons: shells.reduce((sum, num) => sum + num, 0),
                shells: shells
            };
        });
        
        console.log('Loaded', Object.keys(elementsData).length, 'elements! ⚛️');
        
        // Populate dropdown
        populateDropdown();
        
        // Draw first element
        drawAtom(1);
        
    } catch (error) {
        console.error('Error loading elements data:', error);
    }
}

// Function to populate dropdown with all elements
function populateDropdown() {
    const elementSelect = document.getElementById('elementSelect');
    elementSelect.innerHTML = ''; // Clear existing
    
    // Add all elements
    for (let i = 1; i <= 118; i++) {
        if (elementsData[i]) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `${i} - ${elementsData[i].name} (${elementsData[i].symbol})`;
            elementSelect.appendChild(option);
        }
    }
}

// Function to draw nucleus
function drawNucleus() {
    ctx.beginPath();
    ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
    ctx.fillStyle = '#FF6B6B';
    ctx.fill();
    ctx.strokeStyle = '#C92A2A';
    ctx.lineWidth = 2;
    ctx.stroke();
}

// Function to draw electron shells
function drawShells(numShells) {
    const shellSpacing = 60;
    
    for (let i = 1; i <= numShells; i++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, shellSpacing * i, 0, Math.PI * 2);
        ctx.strokeStyle = '#868E96';
        ctx.lineWidth = 1;
        ctx.stroke();
    }
}

// Function to draw electrons
function drawElectrons(shellConfig) {
    const shellSpacing = 60;
    
    shellConfig.forEach((electronsInShell, shellIndex) => {
        const shellRadius = shellSpacing * (shellIndex + 1);
        const angleStep = (Math.PI * 2) / electronsInShell;
        
        for (let i = 0; i < electronsInShell; i++) {
            const angle = angleStep * i;
            const electronX = centerX + shellRadius * Math.cos(angle);
            const electronY = centerY + shellRadius * Math.sin(angle);
            
            ctx.beginPath();
            ctx.arc(electronX, electronY, 8, 0, Math.PI * 2);
            ctx.fillStyle = '#4DABF7';
            ctx.fill();
            ctx.strokeStyle = '#1971C2';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    });
}

// Function to draw complete atom
function drawAtom(atomicNumber) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const atom = elementsData[atomicNumber];
    
    if (!atom) {
        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Element not available', centerX, centerY);
        return;
    }
    
    // Check if atom will fit on canvas
    const maxShellRadius = atom.shells.length * 60;
    if (maxShellRadius > 280) {
        // Too big to draw - show message
        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`${atom.name} (${atom.symbol})`, centerX, centerY - 20);
        ctx.font = '16px Arial';
        ctx.fillText(`${atom.shells.length} electron shells`, centerX, centerY + 10);
        ctx.fillText(`Shells: ${atom.shells.join(', ')}`, centerX, centerY + 35);
        return;
    }
    
    // Draw components
    drawShells(atom.shells.length);
    drawNucleus();
    drawElectrons(atom.shells);
    
    // Draw element info
    ctx.fillStyle = 'black';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(atom.name, centerX, 30);
    ctx.font = '18px Arial';
    ctx.fillText(`(${atom.symbol}) - ${atom.electrons} electrons`, centerX, 55);
}

// Event listener for dropdown
const elementSelect = document.getElementById('elementSelect');
elementSelect.addEventListener('change', function() {
    const atomicNumber = parseInt(this.value);
    drawAtom(atomicNumber);
});

// Load data when page loads
loadElementsData();

console.log('Atom Visualizer Phase 2 ready! 🎨⚛️📊');