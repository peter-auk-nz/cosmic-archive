// Fetch element data and build the periodic table
async function buildPeriodicTable() {
  try {
    const response = await fetch('elements-data.json');
    const elements = await response.json();
    
    const table = document.getElementById('periodicTable');
    
    // Create 118 grid positions (7 periods × 18 columns)
    const positions = createGridPositions(elements);
    
    // Fill the grid
    positions.forEach(item => {
      const div = document.createElement('div');
      
      if (item.element) {
        // Real element
        const el = item.element;
        const period = getPeriod(el.atomicNumber);
        div.className = `element period-${period}`;
        div.innerHTML = `
          <span class="atomic-number">${el.atomicNumber}</span>
          <div class="symbol">${el.symbol}</div>
          <div class="name">${el.name}</div>
        `;
        
        // Click to open element page
        div.addEventListener('click', () => {
          window.location.href = `element-${el.atomicNumber}.html`;
        });
      } else {
        // Gap in the table
        div.className = 'element gap';
      }
      
      table.appendChild(div);
    });
    
  } catch (error) {
    console.error('Error loading elements:', error);
  }
}

// Calculate period from atomic number
function getPeriod(atomicNumber) {
  if (atomicNumber <= 2) return 1;
  if (atomicNumber <= 10) return 2;
  if (atomicNumber <= 18) return 3;
  if (atomicNumber <= 36) return 4;
  if (atomicNumber <= 54) return 5;
  if (atomicNumber <= 86) return 6;
  return 7;
}

// Create grid positions with proper gaps
function createGridPositions(elements) {
  const positions = [];
  
  // Period 1: H (col 1) and He (col 18)
  positions.push({ element: elements.find(el => el.atomicNumber === 1) }); // H
  for (let i = 0; i < 16; i++) positions.push({ element: null }); // gaps
  positions.push({ element: elements.find(el => el.atomicNumber === 2) }); // He
  
  // Period 2: Li-Ne (8 elements, cols 1-2 and 13-18)
  for (let z = 3; z <= 10; z++) {
    if (z === 5) {
      // After Be, add 10 gaps
      for (let i = 0; i < 10; i++) positions.push({ element: null });
    }
    positions.push({ element: elements.find(el => el.atomicNumber === z) });
  }
  
  // Period 3: Na-Ar (8 elements, cols 1-2 and 13-18)
  for (let z = 11; z <= 18; z++) {
    if (z === 13) {
      // After Mg, add 10 gaps
      for (let i = 0; i < 10; i++) positions.push({ element: null });
    }
    positions.push({ element: elements.find(el => el.atomicNumber === z) });
  }
  
  // Periods 4-7: Full 18 columns each
  for (let z = 19; z <= 118; z++) {
    positions.push({ element: elements.find(el => el.atomicNumber === z) });
  }
  
  return positions;
}

// Initialize when page loads
buildPeriodicTable();