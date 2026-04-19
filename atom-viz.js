// Atom Visualizer JavaScript
// Phase 3: Drawing Real Atoms!

// Get the canvas and its 2D drawing context
const canvas = document.getElementById('atomCanvas');
const ctx = canvas.getContext('2d');

// Canvas center point
const centerX = canvas.width / 2;  // 300
const centerY = canvas.height / 2; // 300

// SIMPLE ATOM DATA (we'll connect to JSON later!)
// For now, just hydrogen as a test

    const simpleAtoms = {
    1: { name: 'Hydrogen', symbol: 'H', electrons: 1, shells: [1] },
    2: { name: 'Helium', symbol: 'He', electrons: 2, shells: [2] },
    3: { name: 'Lithium', symbol: 'Li', electrons: 3, shells: [2, 1] },
    4: { name: 'Beryllium', symbol: 'Be', electrons: 4, shells: [2, 2] },
    5: { name: 'Boron', symbol: 'B', electrons: 5, shells: [2, 3] },
    6: { name: 'Carbon', symbol: 'C', electrons: 6, shells: [2, 4] },
    7: { name: 'Nitrogen', symbol: 'N', electrons: 7, shells: [2, 5] },
    8: { name: 'Oxygen', symbol: 'O', electrons: 8, shells: [2, 6] },
    9: { name: 'Fluorine', symbol: 'F', electrons: 9, shells: [2, 7] },
    10: { name: 'Neon', symbol: 'Ne', electrons: 10, shells: [2, 8] },
    11: { name: 'Sodium', symbol: 'Na', electrons: 11, shells: [2, 8, 1] },
    12: { name: 'Magnesium', symbol: 'Mg', electrons: 12, shells: [2, 8, 2] },
    13: { name: 'Aluminum', symbol: 'Al', electrons: 13, shells: [2, 8, 3] },
    14: { name: 'Silicon', symbol: 'Si', electrons: 14, shells: [2, 8, 4] },
    15: { name: 'Phosphorus', symbol: 'P', electrons: 15, shells: [2, 8, 5] },
    16: { name: 'Sulfur', symbol: 'S', electrons: 16, shells: [2, 8, 6] },
    17: { name: 'Chlorine', symbol: 'Cl', electrons: 17, shells: [2, 8, 7] },
    18: { name: 'Argon', symbol: 'Ar', electrons: 18, shells: [2, 8, 8] },
    19: { name: 'Potassium', symbol: 'K', electrons: 19, shells: [2, 8, 8, 1] },
    20: { name: 'Calcium', symbol: 'Ca', electrons: 20, shells: [2, 8, 8, 2] }
};
    


// Function to draw the nucleus (center circle)
function drawNucleus() {
    // Draw the nucleus
    ctx.beginPath();
    ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
    ctx.fillStyle = '#FF6B6B';  // Red nucleus
    ctx.fill();
    ctx.strokeStyle = '#C92A2A';
    ctx.lineWidth = 2;
    ctx.stroke();
}

// Function to draw electron shells (circles around nucleus)
function drawShells(numShells) {
    const shellSpacing = 60;  // Distance between shells
    
    for (let i = 1; i <= numShells; i++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, shellSpacing * i, 0, Math.PI * 2);
        ctx.strokeStyle = '#868E96';  // Gray shells
        ctx.lineWidth = 1;
        ctx.stroke();
    }
}

// Function to draw electrons on shells
function drawElectrons(shellConfig) {
    const shellSpacing = 60;
    
    shellConfig.forEach((electronsInShell, shellIndex) => {
        const shellRadius = shellSpacing * (shellIndex + 1);
        
        // Calculate angle between electrons on this shell
        const angleStep = (Math.PI * 2) / electronsInShell;
        
        // Draw each electron
        for (let i = 0; i < electronsInShell; i++) {
            const angle = angleStep * i;
            const electronX = centerX + shellRadius * Math.cos(angle);
            const electronY = centerY + shellRadius * Math.sin(angle);
            
            // Draw electron
            ctx.beginPath();
            ctx.arc(electronX, electronY, 8, 0, Math.PI * 2);
            ctx.fillStyle = '#4DABF7';  // Blue electrons
            ctx.fill();
            ctx.strokeStyle = '#1971C2';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    });
}

// Function to draw complete atom
function drawAtom(atomicNumber) {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Get atom data
    const atom = simpleAtoms[atomicNumber];
    
    if (!atom) {
        // Show error message
        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Element not available', centerX, centerY);
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

// Listen for element selection changes
const elementSelect = document.getElementById('elementSelect');
elementSelect.addEventListener('change', function() {
    const atomicNumber = parseInt(this.value);
    drawAtom(atomicNumber);
});

// Draw hydrogen on page load
drawAtom(1);

console.log('Atom Visualizer ready! 🎨⚛️');